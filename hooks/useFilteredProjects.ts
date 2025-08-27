"use client";

import type { ProjectListItem } from "@/types/domain";
import type { TechFilter } from "@/config/tech-filters";

import { useMemo } from "react";

import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { filterProjects, type ProjectsFilterState } from "@/lib/projects/utils";
import { IncludesSearchStrategy } from "@/lib/search/text";

type Options = {
  techFilters: TechFilter[] | Map<string, TechFilter>;
};

export function useFilteredProjects(
  projects: ProjectListItem[],
  state: ProjectsFilterState,
  options: Options,
) {
  const debouncedSearchText = useDebouncedValue(state.searchText, 300);

  const techMap: Map<string, TechFilter> = Array.isArray(options.techFilters)
    ? new Map(options.techFilters.map((f) => [f.name, f]))
    : options.techFilters;

  const filtered = useMemo(() => {
    return filterProjects(
      projects,
      { ...state, searchText: debouncedSearchText },
      techMap,
      { searchStrategy: new IncludesSearchStrategy() },
    );
  }, [
    projects,
    state.selectedTags,
    state.selectedTools,
    state.selectedLanguages,
    debouncedSearchText,
    techMap,
  ]);

  return filtered;
}

export default useFilteredProjects;
