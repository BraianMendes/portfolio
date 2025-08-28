"use client";

import { useToggleList } from "@/hooks/useToggleList";
import { useSearchQuery } from "@/hooks/useSearchQuery";

export function useProjectFilterState() {
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
    list: selectedGroups,
    toggle: toggleGroupFilter,
    clear: clearGroups,
    setList: setSelectedGroups,
  } = useToggleList<string>([]);

  const {
    query: searchText,
    onChange: onSearchChange,
    clear: clearSearch,
  } = useSearchQuery("");

  function clearAll() {
    clearTags();
    clearTools();
    clearGroups();
    clearSearch();
  }

  return {
    state: {
      selectedTags,
      selectedTools,
      selectedGroups,
      searchText,
    },
    actions: {
      setSelectedTags,
      setSelectedTools,
      setSelectedGroups,
      toggleGroupFilter,
      onSearchChange,
      clearAll,
    },
  } as const;
}
