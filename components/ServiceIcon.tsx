import { Code2, Database, Globe, Lightbulb, Plug, Wrench, Zap } from "lucide-react";
import type { ServiceIcon as ServiceIconKey } from "@/lib/content";

const icons = {
  globe: Globe,
  plug: Plug,
  zap: Zap,
  database: Database,
  code: Code2,
  wrench: Wrench,
  lightbulb: Lightbulb,
};

export function ServiceIcon({
  icon,
  className,
}: {
  icon: ServiceIconKey;
  className?: string;
}) {
  const Icon = icons[icon];
  return <Icon className={className} strokeWidth={1.5} aria-hidden />;
}
