// Wrapper around the Next.js CLI that works around a @swc/core native-binding
// failure on Windows. See README.md ("Windows: SWC native binding cache").
//
// @swc/core is loaded while Next evaluates next.config.ts (next-intl's plugin
// imports it). Before handing over the native addon, @swc/core materializes its
// payload into a cache directory and validates that directory's ACLs. On
// Windows the default root (%LOCALAPPDATA%\swc) is rejected because every
// ancestor under AppData\Local grants replacement rights to app-container SIDs,
// so the binding never loads and the build dies with ERR_SWC_NATIVE_CACHE.
//
// Pointing SWC_NATIVE_BINDING_CACHE at a short directory in the user's profile
// satisfies both the ACL check and the 260-character MAX_PATH limit that the
// cache lock file would otherwise blow through inside the repository tree.

import { spawn } from "node:child_process";
import { mkdirSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

// Cache root + "\v1\" + a 128-character hash + ".lock" must stay under
// MAX_PATH (260) unless the machine has long paths enabled.
const LOCK_PATH_OVERHEAD = 140;
const MAX_PATH = 260;

function resolveSwcCacheRoot() {
  const root = path.join(os.homedir(), ".swc-native-cache");

  if (root.length + LOCK_PATH_OVERHEAD > MAX_PATH) {
    console.warn(
      `[run-next] SWC cache root is too long for MAX_PATH: ${root}\n` +
        "[run-next] Set SWC_NATIVE_BINDING_CACHE to a shorter writable directory.",
    );
    return null;
  }

  try {
    mkdirSync(root, { recursive: true });
  } catch (error) {
    console.warn(`[run-next] Could not create ${root}: ${error.message}`);
    return null;
  }

  return root;
}

const env = { ...process.env };

if (process.platform === "win32" && !env.SWC_NATIVE_BINDING_CACHE) {
  const root = resolveSwcCacheRoot();
  if (root) {
    env.SWC_NATIVE_BINDING_CACHE = root;
  }
}

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const nextBin = path.join(
  projectRoot,
  "node_modules",
  "next",
  "dist",
  "bin",
  "next",
);

const child = spawn(process.execPath, [nextBin, ...process.argv.slice(2)], {
  stdio: "inherit",
  env,
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 1);
});

child.on("error", (error) => {
  console.error(`[run-next] Failed to start the Next.js CLI: ${error.message}`);
  process.exit(1);
});
