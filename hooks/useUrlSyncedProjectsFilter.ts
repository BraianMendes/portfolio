"use client";

import type { ProjectListItem } from "@/types/domain";

import { useAvailableFilters } from "@/hooks/useAvailableFilters";
import { useProjectFilterState } from "@/hooks/useProjectFilterState";
import { useFilteredProjects } from "@/hooks/useFilteredProjects";
import { techFilters } from "@/config/tech-filters";
import toTechMap from "@/lib/projects/techMap";
import { useProjectsUrlSync } from "@/hooks/useProjectsUrlSync";
import { ByTitleAsc } from "@/lib/projects/sorting";

export function useUrlSyncedProjectsFilter(projects: ProjectListItem[]) {
  const { allTags, allTools } = useAvailableFilters(projects);
  const { state, actions } = useProjectFilterState();

  useProjectsUrlSync(state, actions);

  const filtered = useFilteredProjects(projects, state, {
    techFilters: toTechMap(techFilters),
    sortStrategy: new ByTitleAsc(),
  });

  return {
    allTags,
    allTools,
    filtered,
    ...state,
    ...actions,
  } as const;
}
