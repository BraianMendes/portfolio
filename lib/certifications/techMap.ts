import type { CertificationsTechFilter } from "@/config";

export function toCertTechMap(
  filters: CertificationsTechFilter[] | Map<string, CertificationsTechFilter>,
): Map<string, CertificationsTechFilter> {
  return Array.isArray(filters)
    ? new Map(filters.map((f) => [f.name, f]))
    : filters;
}

export default toCertTechMap;
