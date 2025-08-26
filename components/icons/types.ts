export type IconSize = number | string;

export interface IconProps {
  size?: IconSize;
  className?: string;
  strokeWidth?: number;
  color?: string;
  "aria-label"?: string;
}

export type IconComponent = (props: IconProps) => JSX.Element;
