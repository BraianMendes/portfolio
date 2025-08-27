import type { ProjectListItem } from "@/types/domain";
import type { TechFilter } from "@/config/tech-filters";
import type { NormalizableProject, SearchStrategy } from "@/lib/search/text";

import {
  AndSpecification,
  LanguageSpecification,
  SearchSpecification,
  TagSpecification,
  ToolSpecification,
} from "@/lib/projects/specifications";
import { IncludesSearchStrategy } from "@/lib/search/text";

export type ProjectsFilterState = {
  selectedTags: string[];
  selectedTools: string[];
  selectedLanguages: string[];
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

export function filterProjects(
  projects: ProjectListItem[],
  state: ProjectsFilterState,
  techFilters: TechFilter[] | Map<string, TechFilter>,
  options?: { searchStrategy?: SearchStrategy<NormalizableProject> },
): ProjectListItem[] {
  const { selectedTags, selectedTools, selectedLanguages, searchText } = state;

  const techMap: Map<string, TechFilter> = Array.isArray(techFilters)
    ? new Map(techFilters.map((f) => [f.name, f]))
    : techFilters;

  const searchStrategy =
    options?.searchStrategy ?? new IncludesSearchStrategy();

  const specs = new AndSpecification<ProjectListItem>([
    new TagSpecification(selectedTags),
    new ToolSpecification(selectedTools),
    new LanguageSpecification(selectedLanguages, techMap),
    new SearchSpecification<ProjectListItem>(
      searchText ?? "",
      (p) => ({
        title: p.title,
        description: p.description,
        overview: p.overview,
        tags: p.tags,
      }),
      searchStrategy,
    ),
  ]);

  return projects.filter((p) => specs.isSatisfiedBy(p));
}
