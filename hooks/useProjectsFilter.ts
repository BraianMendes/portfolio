"use client";

import type { ProjectListItem } from "@/types/domain";

import { useMemo } from "react";

import { techFilters } from "@/config/tech-filters";
import { useToggleList } from "@/hooks/useToggleList";
import { useSearchQuery } from "@/hooks/useSearchQuery";
import {
  getAllTags,
  getAllTools,
  filterProjects,
  type ProjectsFilterState,
} from "@/lib/projects/utils";

export function useProjectsFilter(projects: ProjectListItem[]) {
  const allTags = useMemo(() => getAllTags(projects), [projects]);
  const allTools = useMemo(() => getAllTools(projects), [projects]);

  const {
    list: selectedTags,
    setList: setSelectedTags,
    clear: clearTags,
  } = useToggleList<string>([]);
  const {
    list: selectedTools,
    setList: setSelectedTools,
    clear: clearTools,
  } = useToggleList<string>([]);
  const {
    list: selectedLanguages,
    toggle: toggleLanguageFilter,
    clear,
  } = useToggleList<string>([]);
  const {
    query: searchText,
    onChange: onSearchChange,
    clear: clearSearch,
  } = useSearchQuery("");

  const state: ProjectsFilterState = {
    selectedTags,
    selectedTools,
    selectedLanguages,
    searchText,
  };

  const filtered = useMemo(
    () => filterProjects(projects, state, techFilters),
    [
      projects,
      state.selectedTags,
      state.selectedTools,
      state.selectedLanguages,
      state.searchText,
    ],
  );

  function clearAll() {
    clearTags();
    clearTools();
    clear();
    clearSearch();
  }

  return {
    // data
    allTags,
    allTools,
    filtered,
    // filters state
    selectedTags,
    selectedTools,
    selectedLanguages,
    searchText,
    // actions
    setSelectedTags,
    setSelectedTools,
    toggleLanguageFilter,
    onSearchChange,
    clearAll,
  } as const;
}

export default useProjectsFilter;
