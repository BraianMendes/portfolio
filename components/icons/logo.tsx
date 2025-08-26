import type { IconComponent, IconProps } from "./types";
export const Logo: IconComponent = ({
  size = 36,
  className,
  ...props
}: IconProps) => (
  <svg
    className={className}
    fill="none"
    height={typeof size === "string" ? size : (size as number)}
    viewBox="0 0 32 32"
    width={typeof size === "string" ? size : (size as number)}
    {...(props as Record<string, unknown>)}
  >
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);
