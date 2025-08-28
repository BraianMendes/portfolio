import type { ProjectListItem } from "@/types/domain";
import type { NormalizableProject } from "@/lib/search/text";

export function mapProjectToSearchEntity(
  p: ProjectListItem,
): NormalizableProject {
  return {
    title: p.title,
    description: p.description,
    overview: p.overview,
    tags: p.tags,
  };
}
