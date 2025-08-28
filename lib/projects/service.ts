import type { ProjectListItem } from "@/types/domain";
import type { TechFilter } from "@/config/tech-filters";
import type { SortStrategy } from "@/lib/projects/sorting";
import type { ProjectsFilterState } from "@/lib/projects/types";
import type { NormalizableProject, SearchStrategy } from "@/lib/search/text";

import { projectsRepository } from "@/lib/projects/repository";
import { ProjectsFilterConfigurator } from "@/lib/projects/configurator";
import { getDefaultSearchStrategy } from "@/lib/search/factory";

export interface IProjectsRepository {
  getAll(): Promise<ProjectListItem[]>;
}

export class ProjectsService {
  constructor(
    private readonly repo: IProjectsRepository,
    private readonly searchStrategy: SearchStrategy<NormalizableProject>,
  ) {}

  async listFiltered(
    state: ProjectsFilterState,
    techFilters: TechFilter[] | Map<string, TechFilter>,
    sort?: SortStrategy<ProjectListItem>,
  ): Promise<ProjectListItem[]> {
    const data = await this.repo.getAll();
    const configurator = new ProjectsFilterConfigurator(
      this.searchStrategy,
      sort,
    );

    return configurator.run(data, state, techFilters);
  }

  listFilteredSync(
    data: ProjectListItem[],
    state: ProjectsFilterState,
    techFilters: TechFilter[] | Map<string, TechFilter>,
    sort?: SortStrategy<ProjectListItem>,
  ): ProjectListItem[] {
    const configurator = new ProjectsFilterConfigurator(
      this.searchStrategy,
      sort,
    );

    return configurator.run(data, state, techFilters);
  }
}

export const defaultProjectsService = new ProjectsService(
  projectsRepository,
  getDefaultSearchStrategy(),
);
