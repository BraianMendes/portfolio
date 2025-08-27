import type { ProjectListItem } from "@/types/domain";
import type { TechFilter } from "@/config/tech-filters";

export type ProjectsFilterState = {
  selectedTags: string[];
  selectedTools: string[];
  selectedLanguages: string[]; // names from techFilters
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
  techFilters: TechFilter[],
): ProjectListItem[] {
  const { selectedTags, selectedTools, selectedLanguages, searchText } = state;
  const query = searchText?.toLowerCase() ?? "";

  return projects.filter((proj) => {
    const tagMatch =
      !selectedTags.length || proj.tags.some((t) => selectedTags.includes(t));

    const toolMatch =
      !selectedTools.length ||
      proj.tools.some((t) => selectedTools.includes(t));

    const languageMatch =
      !selectedLanguages.length ||
      selectedLanguages.some((lang) => {
        const filter = techFilters.find((f) => f.name === lang);

        return (
          !!filter &&
          (filter.tags.some((tag) => proj.tags.includes(tag)) ||
            filter.tags.some((tag) => proj.tools.includes(tag)))
        );
      });

    const searchMatch =
      !query ||
      proj.title.toLowerCase().includes(query) ||
      proj.tags.some((t) => t.toLowerCase().includes(query)) ||
      proj.description.toLowerCase().includes(query) ||
      proj.overview.toLowerCase().includes(query);

    return tagMatch && toolMatch && languageMatch && searchMatch;
  });
}
