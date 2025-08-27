"use client";

import type { ProjectListItem } from "@/types/domain";

import { techFilters } from "@/config/tech-filters";
import { ByTitleAsc } from "@/lib/projects/sorting";
import { useAvailableFilters } from "@/hooks/useAvailableFilters";
import { useProjectFilterState } from "@/hooks/useProjectFilterState";
import { useFilteredProjects } from "@/hooks/useFilteredProjects";

export function useProjectsFilter(projects: ProjectListItem[]) {
  const { allTags, allTools } = useAvailableFilters(projects);

  const { state, actions } = useProjectFilterState();

  const filtered = useFilteredProjects(projects, state, {
    techFilters: new Map(techFilters.map((f) => [f.name, f])),
    sortStrategy: new ByTitleAsc(),
  });

  return {
    allTags,
    allTools,
    filtered,
    selectedTags: state.selectedTags,
    selectedTools: state.selectedTools,
    selectedLanguages: state.selectedLanguages,
    searchText: state.searchText,
    setSelectedTags: actions.setSelectedTags,
    setSelectedTools: actions.setSelectedTools,
    toggleLanguageFilter: actions.toggleLanguageFilter,
    onSearchChange: actions.onSearchChange,
    clearAll: actions.clearAll,
  } as const;
}

export default useProjectsFilter;
