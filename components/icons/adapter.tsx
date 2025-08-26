import type { LucideIcon } from "lucide-react";
import type { IconComponent, IconProps } from "./types";

export function wrapLucide(Lucide: LucideIcon): IconComponent {
  const Wrapped: IconComponent = ({
    size = 20,
    className,
    strokeWidth = 2,
    color,
    ...rest
  }: IconProps) => (
    <Lucide
      className={className}
      color={color}
      size={size as number}
      strokeWidth={strokeWidth}
      {...(rest as Record<string, unknown>)}
    />
  );

  (Wrapped as unknown as { displayName?: string }).displayName =
    `Icon(${Lucide.displayName || Lucide.name || "Lucide"})`;

  return Wrapped;
}

export function wrapLogo(Logo: IconComponent): IconComponent {
  const Wrapped: IconComponent = ({
    size = 20,
    className,
    color,
    ...rest
  }: IconProps) => (
    <Logo
      className={className}
      color={color}
      size={size}
      {...(rest as Record<string, unknown>)}
    />
  );

  (Wrapped as unknown as { displayName?: string }).displayName = `Icon(${
    (Logo as unknown as { displayName?: string; name?: string }).displayName ||
    (Logo as unknown as { name?: string }).name ||
    "Logo"
  })`;

  return Wrapped;
}
