"use client";

import type { ProjectListItem } from "@/types/domain";

import { useMemo } from "react";

import { getAllTags, getAllTools } from "@/lib/projects/utils";

export function useAvailableFilters(projects: ProjectListItem[]) {
  const allTags = useMemo(() => getAllTags(projects), [projects]);
  const allTools = useMemo(() => getAllTools(projects), [projects]);

  return { allTags, allTools } as const;
}

export default useAvailableFilters;
