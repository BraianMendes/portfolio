"use client";

import type { ProjectListItem } from "@/types/domain";

import { techFilters } from "@/config/tech-filters";
import { getSortStrategy } from "@/lib/projects/sortingRegistry";
import { useAvailableFilters } from "@/hooks/useAvailableFilters";
import { useProjectFilterState } from "@/hooks/useProjectFilterState";
import { useFilteredProjects } from "@/hooks/useFilteredProjects";

export function useProjectsFilter(projects: ProjectListItem[]) {
  const { allTags, allTools } = useAvailableFilters(projects);

  const { state, actions } = useProjectFilterState();

  const filtered = useFilteredProjects(projects, state, {
    techFilters: new Map(techFilters.map((f) => [f.name, f])),
    sortStrategy: getSortStrategy("titleAsc"),
  });

  return {
    allTags,
    allTools,
    filtered,
    selectedTags: state.selectedTags,
    selectedTools: state.selectedTools,
    selectedGroups: state.selectedGroups,
    searchText: state.searchText,
    setSelectedTags: actions.setSelectedTags,
    setSelectedTools: actions.setSelectedTools,
    toggleGroupFilter: actions.toggleGroupFilter,
    onSearchChange: actions.onSearchChange,
    clearAll: actions.clearAll,
  } as const;
}
