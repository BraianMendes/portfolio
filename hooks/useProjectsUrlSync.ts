"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { QUERY_KEYS, parseArrayParam, toArrayParam } from "@/lib/url";

export type ProjectsUrlSyncState = {
  selectedTags: string[];
  selectedTools: string[];
  selectedGroups: string[];
  searchText: string;
};

export type ProjectsUrlSyncActions = {
  setSelectedTags: (v: string[]) => void;
  setSelectedTools: (v: string[]) => void;
  setSelectedGroups: (v: string[]) => void;
  onSearchChange: (v: string) => void;
};

export function useProjectsUrlSync(
  state: ProjectsUrlSyncState,
  actions: ProjectsUrlSyncActions,
) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const initial = {
      tags: parseArrayParam(params.get(QUERY_KEYS.tags)),
      tools: parseArrayParam(params.get(QUERY_KEYS.tools)),
      langs: parseArrayParam(params.get(QUERY_KEYS.langs)),
      q: params.get(QUERY_KEYS.q) ?? "",
    };

    if (initial.tags.length) actions.setSelectedTags(initial.tags);
    if (initial.tools.length) actions.setSelectedTools(initial.tools);
    if (initial.langs.length) actions.setSelectedGroups(initial.langs);
    if (initial.q) actions.onSearchChange(initial.q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const next = new URLSearchParams(params.toString());

    const tags = toArrayParam(state.selectedTags);
    const tools = toArrayParam(state.selectedTools);
    const langs = toArrayParam(state.selectedGroups);
    const q = state.searchText?.trim() || "";

    const setOrDelete = (key: string, val: string | null) => {
      if (!val) next.delete(key);
      else next.set(key, val);
    };

    setOrDelete(QUERY_KEYS.tags, tags);
    setOrDelete(QUERY_KEYS.tools, tools);
    setOrDelete(QUERY_KEYS.langs, langs);
    setOrDelete(QUERY_KEYS.q, q || null);

    const newQuery = next.toString();
    const oldQuery = params.toString();

    if (newQuery !== oldQuery) {
      router.replace(`${pathname}${newQuery ? `?${newQuery}` : ""}`);
    }
  }, [
    state.selectedTags,
    state.selectedTools,
    state.selectedGroups,
    state.searchText,
    params,
    pathname,
    router,
  ]);
}
