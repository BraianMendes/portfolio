import type { ProjectListItem } from "@/types/domain";
import type { TechFilter } from "@/config/tech-filters";
import type { NormalizableProject, SearchStrategy } from "@/lib/search/text";
import type { SortStrategy } from "@/lib/projects/sorting";
import type { Specification } from "@/lib/projects/specifications";
import type { ProjectsFilterState } from "@/lib/projects/types";

import {
  AndSpecification,
  GroupSpecification,
  SearchSpecification,
  TagSpecification,
  ToolSpecification,
} from "@/lib/projects/specifications";
import { IncludesSearchStrategy } from "@/lib/search/text";
import { mapProjectToSearchEntity } from "@/lib/projects/mappers";
import { Pipeline, SpecificationStep, SortStep } from "@/lib/projects/pipeline";
// toTechMap adapter is handled at call sites (edge). Internally we use Map-only.

export function filterProjects(
  projects: ProjectListItem[],
  state: ProjectsFilterState,
  techFilters: Map<string, TechFilter>,
  options?: {
    searchStrategy?: SearchStrategy<NormalizableProject>;
    sortStrategy?: SortStrategy<ProjectListItem>;
    extraSpecifications?: Specification<ProjectListItem>[];
  },
): ProjectListItem[] {
  const { selectedTags, selectedTools, selectedGroups, searchText } = state;

  const techMap = techFilters;

  const searchStrategy =
    options?.searchStrategy ?? new IncludesSearchStrategy();

  const baseSpecs: Specification<ProjectListItem>[] = [
    new TagSpecification(selectedTags),
    new ToolSpecification(selectedTools),
    new GroupSpecification(selectedGroups, techMap),
    new SearchSpecification<ProjectListItem>(
      searchText ?? "",
      (p) => mapProjectToSearchEntity(p),
      searchStrategy,
    ),
  ];

  const allSpecs = options?.extraSpecifications
    ? baseSpecs.concat(options.extraSpecifications)
    : baseSpecs;

  const specs = new AndSpecification<ProjectListItem>(allSpecs);

  const pipeline = new Pipeline<ProjectListItem>()
    .use(new SpecificationStep(specs))
    .use(
      options?.sortStrategy
        ? new SortStep<ProjectListItem>((a, b) =>
            options.sortStrategy!.compare(a, b),
          )
        : new SortStep<ProjectListItem>(() => 0),
    );

  return pipeline.run(projects);
}

export default filterProjects;
