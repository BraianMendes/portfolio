import type { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type { ProjectListItem, ProjectDetail, Certification } from "./domain";
