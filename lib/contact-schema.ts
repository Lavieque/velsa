import { z } from "zod";

/** Limits shared by the form (maxLength) and the API route (validation). */
export const contactLimits = {
  name: 100,
  company: 120,
  email: 254,
  phone: 30,
  message: 5000,
} as const;

/**
 * Error codes, not messages: the API stays language-agnostic and the form maps
 * each code to its translated copy.
 */
export type ContactErrorCode =
  | "invalid"
  | "captcha"
  | "rateLimit"
  | "server";

export const contactSchema = z.object({
  name: z.string().trim().min(1).max(contactLimits.name),
  company: z.string().trim().max(contactLimits.company).default(""),
  email: z.string().trim().max(contactLimits.email).pipe(z.email()),
  phone: z
    .string()
    .trim()
    .max(contactLimits.phone)
    .regex(/^[0-9+()\-.\s]*$/)
    .default(""),
  projectType: z.string().trim().min(1).max(60),
  message: z.string().trim().min(10).max(contactLimits.message),
  locale: z.enum(["pt", "en"]),
  /** Honeypot: hidden field a person leaves empty and a bot fills in. */
  website: z.string().max(200).default(""),
  turnstileToken: z.string().min(1).max(2048),
});

export type ContactInput = z.infer<typeof contactSchema>;
