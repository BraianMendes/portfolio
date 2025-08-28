import type { Certification } from "@/types/domain";
import type { NormalizableProject } from "@/lib/search/text";

export function mapCertificationToSearchEntity(
  c: Certification,
): NormalizableProject {
  return {
    title: c.title,
    description: c.issuer,
    overview: "",
    tags: c.tags ?? [],
  };
}

export default mapCertificationToSearchEntity;
