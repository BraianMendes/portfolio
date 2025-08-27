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
    list: selectedLanguages,
    toggle: toggleLanguageFilter,
  clear: clearLanguages,
  setList: setSelectedLanguages,
  } = useToggleList<string>([]);

  const {
    query: searchText,
    onChange: onSearchChange,
    clear: clearSearch,
  } = useSearchQuery("");

  function clearAll() {
    clearTags();
    clearTools();
    clearLanguages();
    clearSearch();
  }

  return {
    state: {
      selectedTags,
      selectedTools,
      selectedLanguages,
      searchText,
    },
    actions: {
      setSelectedTags,
      setSelectedTools,
  setSelectedLanguages,
      toggleLanguageFilter,
      onSearchChange,
      clearAll,
    },
  } as const;
}

export default useProjectFilterState;
