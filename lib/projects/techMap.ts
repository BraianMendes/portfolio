import type { TechFilter } from "@/config";

export function toTechMap(
  techFilters: TechFilter[] | Map<string, TechFilter>,
): Map<string, TechFilter> {
  return Array.isArray(techFilters)
    ? new Map(techFilters.map((f) => [f.name, f]))
    : techFilters;
}

export default toTechMap;
