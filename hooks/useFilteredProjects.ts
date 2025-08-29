"use client";

import type { ProjectListItem } from "@/types/domain";
import type { TechFilter } from "@/config";
import type { SortStrategy } from "@/lib/projects/sorting";
import type { ProjectsFilterState } from "@/lib/projects";

import { useMemo } from "react";

import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { searchConfig } from "@/config";
import { useProjectsFilterFactory } from "@/lib/projects";

type Options = {
  techFilters: Map<string, TechFilter>;
  sortStrategy?: SortStrategy<ProjectListItem>;
};

export function useFilteredProjects(
  projects: ProjectListItem[],
  state: ProjectsFilterState,
  options: Options,
) {
  const debouncedSearchText = useDebouncedValue(
    state.searchText,
    searchConfig.debounceMs,
  );

  const getFacade = useProjectsFilterFactory();

  const facade = useMemo(
    () => getFacade(options.sortStrategy),
    [getFacade, options.sortStrategy],
  );

  const filtered = useMemo(() => {
    return facade.filter(
      projects,
      { ...state, searchText: debouncedSearchText },
      options.techFilters,
    );
  }, [projects, state, debouncedSearchText, options.techFilters, facade]);

  return filtered;
}
