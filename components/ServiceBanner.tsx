import Image from "next/image";
import type { Content, ServiceIcon as ServiceIconKey } from "@/lib/content";
import { ServiceIcon } from "./ServiceIcon";

export function ServiceBanner({
  icon,
  image,
  title,
  className,
  alt,
  priority,
}: {
  icon: ServiceIconKey;
  image: string;
  title: string;
  className?: string;
  alt: Content["ui"]["alt"];
  priority?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      <Image
        src={image}
        alt={alt.serviceBanner(title)}
        fill
        sizes="(min-width: 1024px) 768px, 100vw"
        className="object-cover"
        priority={priority}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />

      <div className="absolute bottom-5 left-5">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-parchment/30 bg-ink/60 backdrop-blur-sm sm:h-16 sm:w-16">
          <ServiceIcon icon={icon} className="h-6 w-6 text-parchment sm:h-7 sm:w-7" />
        </div>
      </div>
    </div>
  );
}
