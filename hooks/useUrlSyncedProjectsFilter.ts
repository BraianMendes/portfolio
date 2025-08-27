"use client";

import type { ProjectListItem } from "@/types/domain";

import { useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import { useAvailableFilters } from "@/hooks/useAvailableFilters";
import { useProjectFilterState } from "@/hooks/useProjectFilterState";
import { useFilteredProjects } from "@/hooks/useFilteredProjects";
import { techFilters } from "@/config/tech-filters";

function parseArray(param: string | null | undefined): string[] {
  if (!param) return [];

  return param
    .split(",")
    .map((v) => decodeURIComponent(v))
    .filter(Boolean);
}

function toParam(values: string[]): string | null {
  if (!values?.length) return null;

  return values.map((v) => encodeURIComponent(v)).join(",");
}

export function useUrlSyncedProjectsFilter(projects: ProjectListItem[]) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { allTags, allTools } = useAvailableFilters(projects);
  const { state, actions } = useProjectFilterState();

  useEffect(() => {
    const initial = {
      tags: parseArray(params.get("tags")),
      tools: parseArray(params.get("tools")),
      langs: parseArray(params.get("langs")),
      q: params.get("q") ?? "",
    };

    if (initial.tags.length) actions.setSelectedTags(initial.tags);
    if (initial.tools.length) actions.setSelectedTools(initial.tools);
    if (initial.langs.length) actions.setSelectedLanguages(initial.langs);
    if (initial.q) actions.onSearchChange(initial.q);
  }, []);

  useEffect(() => {
    const next = new URLSearchParams(params.toString());

    const tags = toParam(state.selectedTags);
    const tools = toParam(state.selectedTools);
    const langs = toParam(state.selectedLanguages);
    const q = state.searchText?.trim() || "";

    const setOrDelete = (key: string, val: string | null) => {
      if (!val) next.delete(key);
      else next.set(key, val);
    };

    setOrDelete("tags", tags);
    setOrDelete("tools", tools);
    setOrDelete("langs", langs);
    setOrDelete("q", q || null);

    const newQuery = next.toString();
    const oldQuery = params.toString();

    if (newQuery !== oldQuery) {
      router.replace(`${pathname}${newQuery ? `?${newQuery}` : ""}`);
    }
  }, [
    state.selectedTags,
    state.selectedTools,
    state.selectedLanguages,
    state.searchText,
  ]);

  const filtered = useFilteredProjects(projects, state, {
    techFilters: new Map(techFilters.map((f) => [f.name, f])),
  });

  return {
    allTags,
    allTools,
    filtered,
    ...state,
    ...actions,
  } as const;
}

export default useUrlSyncedProjectsFilter;
