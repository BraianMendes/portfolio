// File intentionally left empty; legacy helpers removed.
export {};
import type { ProjectListItem } from "@/types/domain";
import type { TechFilter } from "@/config/tech-filters";
import type { NormalizableProject, SearchStrategy } from "@/lib/search/text";
import type { SortStrategy } from "@/lib/projects/sorting";

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

export type ProjectsFilterState = {
  selectedTags: string[];
  selectedTools: string[];
  selectedGroups: string[];
  searchText: string;
};

export function getAllTags(data: ProjectListItem[]): string[] {
  const tags = new Set<string>();

  data.forEach((proj) => proj.tags.forEach((t) => tags.add(t)));

  return Array.from(tags).sort();
}

export function getAllTools(data: ProjectListItem[]): string[] {
  const tools = new Set<string>();

  data.forEach((proj) => proj.tools.forEach((t) => tools.add(t)));

  return Array.from(tools).sort();
}

export function toTechMap(
  techFilters: TechFilter[] | Map<string, TechFilter>,
): Map<string, TechFilter> {
  return Array.isArray(techFilters)
    ? new Map(techFilters.map((f) => [f.name, f]))
    : techFilters;
}

export function filterProjects(
  projects: ProjectListItem[],
  state: ProjectsFilterState,
  techFilters: TechFilter[] | Map<string, TechFilter>,
  options?: {
    searchStrategy?: SearchStrategy<NormalizableProject>;
    sortStrategy?: SortStrategy<ProjectListItem>;
  },
): ProjectListItem[] {
  const { selectedTags, selectedTools, selectedGroups, searchText } = state;

  const techMap = toTechMap(techFilters);

  const searchStrategy =
    options?.searchStrategy ?? new IncludesSearchStrategy();

  // Build a specification that composes all filter criteria
  const specs = new AndSpecification<ProjectListItem>([
    new TagSpecification(selectedTags),
    new ToolSpecification(selectedTools),
    new GroupSpecification(selectedGroups, techMap),
    new SearchSpecification<ProjectListItem>(
      searchText ?? "",
      (p) => mapProjectToSearchEntity(p),
      searchStrategy,
    ),
  ]);

  // Run through a small pipeline for extensibility/readability
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
