"use client";

import type { ReactNode } from "react";
import type { ProjectListItem } from "@/types/domain";
import type { SortStrategy } from "@/lib/projects/sorting";
import type { ProjectsService } from "@/lib/projects/service";
import type { ProjectsFilterFacade } from "@/lib/projects/configurator";

import React, { createContext, useContext, useMemo } from "react";

import { defaultProjectsService } from "@/lib/projects/service";
import { createProjectsFilterFacade } from "@/lib/projects/configurator";

export type ProjectsFilterFactory = (
  sort?: SortStrategy<ProjectListItem>,
) => ProjectsFilterFacade;

const ProjectsServiceContext = createContext<ProjectsService | null>(null);
const ProjectsFilterFactoryContext =
  createContext<ProjectsFilterFactory | null>(null);

export function useProjectsService(): ProjectsService {
  const ctx = useContext(ProjectsServiceContext);

  return ctx ?? defaultProjectsService;
}

export function useProjectsFilterFactory(): ProjectsFilterFactory {
  const ctx = useContext(ProjectsFilterFactoryContext);

  return ctx ?? createProjectsFilterFacade;
}

export function ProjectsDIProvider({
  children,
  service,
  filterFactory,
}: {
  children: ReactNode;
  service?: ProjectsService;
  filterFactory?: ProjectsFilterFactory;
}) {
  const svc = useMemo(() => service ?? defaultProjectsService, [service]);
  const factory = useMemo(
    () => filterFactory ?? createProjectsFilterFacade,
    [filterFactory],
  );

  return (
    <ProjectsServiceContext.Provider value={svc}>
      <ProjectsFilterFactoryContext.Provider value={factory}>
        {children}
      </ProjectsFilterFactoryContext.Provider>
    </ProjectsServiceContext.Provider>
  );
}

export default ProjectsDIProvider;
