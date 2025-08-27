"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { QUERY_KEYS } from "@/lib/url/queryKeys";

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

export type ProjectsUrlSyncState = {
  selectedTags: string[];
  selectedTools: string[];
  selectedLanguages: string[];
  searchText: string;
};

export type ProjectsUrlSyncActions = {
  setSelectedTags: (v: string[]) => void;
  setSelectedTools: (v: string[]) => void;
  setSelectedLanguages: (v: string[]) => void;
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
      tags: parseArray(params.get(QUERY_KEYS.tags)),
      tools: parseArray(params.get(QUERY_KEYS.tools)),
      langs: parseArray(params.get(QUERY_KEYS.langs)),
      q: params.get(QUERY_KEYS.q) ?? "",
    };

    if (initial.tags.length) actions.setSelectedTags(initial.tags);
    if (initial.tools.length) actions.setSelectedTools(initial.tools);
    if (initial.langs.length) actions.setSelectedLanguages(initial.langs);
    if (initial.q) actions.onSearchChange(initial.q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    state.selectedLanguages,
    state.searchText,
    params,
    pathname,
    router,
  ]);
}

export default useProjectsUrlSync;
