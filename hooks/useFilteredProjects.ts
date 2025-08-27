"use client";

import type { ProjectListItem } from "@/types/domain";
import type { TechFilter } from "@/config/tech-filters";
import type { SortStrategy } from "@/lib/projects/sorting";

import { useMemo } from "react";

import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import {
  filterProjects,
  toTechMap,
  type ProjectsFilterState,
} from "@/lib/projects/utils";
import {
  CachedSearchStrategy,
  IncludesSearchStrategy,
} from "@/lib/search/text";

type Options = {
  techFilters: TechFilter[] | Map<string, TechFilter>;
  sortStrategy?: SortStrategy<ProjectListItem>;
};

export function useFilteredProjects(
  projects: ProjectListItem[],
  state: ProjectsFilterState,
  options: Options,
) {
  const debouncedSearchText = useDebouncedValue(state.searchText, 300);

  const techMap = useMemo(
    () => toTechMap(options.techFilters),
    [options.techFilters],
  );

  const searchStrategy = useMemo(
    () => new CachedSearchStrategy(new IncludesSearchStrategy()),
    [],
  );

  const filtered = useMemo(() => {
    return filterProjects(
      projects,
      { ...state, searchText: debouncedSearchText },
      techMap,
      { searchStrategy, sortStrategy: options.sortStrategy },
    );
  }, [
    projects,
    state.selectedTags,
    state.selectedTools,
    state.selectedLanguages,
    debouncedSearchText,
    techMap,
    searchStrategy,
    options.sortStrategy,
  ]);

  return filtered;
}

export default useFilteredProjects;
