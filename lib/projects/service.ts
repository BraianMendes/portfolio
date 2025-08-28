import type { ProjectListItem } from "@/types/domain";
import type { TechFilter } from "@/config/tech-filters";
import type { SortStrategy } from "@/lib/projects/sorting";
import type { ProjectsFilterState } from "@/lib/projects/types";
import type { NormalizableProject, SearchStrategy } from "@/lib/search/text";
import type { Result } from "@/lib/result";
import type { IProjectsRepository } from "@/lib/projects/repository.types";

import { projectsRepository } from "@/lib/projects/repository";
import { ProjectsFilterConfigurator } from "@/lib/projects/configurator";
import { getDefaultSearchStrategy } from "@/lib/search/factory";
import { ok, err } from "@/lib/result";

export class ProjectsService {
  constructor(
    private readonly repo: IProjectsRepository,
    private readonly searchStrategy: SearchStrategy<NormalizableProject>,
  ) {}

  async listFiltered(
    state: ProjectsFilterState,
    techFilters: Map<string, TechFilter>,
    sort?: SortStrategy<ProjectListItem>,
  ): Promise<ProjectListItem[]> {
    const data = await this.repo.getAll();
    const configurator = new ProjectsFilterConfigurator(
      this.searchStrategy,
      sort,
    );

    return configurator.run(data, state, techFilters);
  }

  async listFilteredSafe(
    state: ProjectsFilterState,
    techFilters: Map<string, TechFilter>,
    sort?: SortStrategy<ProjectListItem>,
  ): Promise<Result<ProjectListItem[]>> {
    try {
      const data = await this.repo.getAll();
      const configurator = new ProjectsFilterConfigurator(
        this.searchStrategy,
        sort,
      );

      const res = configurator.run(data, state, techFilters);

      return ok(res);
    } catch (e: any) {
      const error = e instanceof Error ? e : new Error(String(e));

      return err(error);
    }
  }

  listFilteredSync(
    data: ProjectListItem[],
    state: ProjectsFilterState,
    techFilters: Map<string, TechFilter>,
    sort?: SortStrategy<ProjectListItem>,
  ): ProjectListItem[] {
    const configurator = new ProjectsFilterConfigurator(
      this.searchStrategy,
      sort,
    );

    return configurator.run(data, state, techFilters);
  }

  listFilteredSyncSafe(
    data: ProjectListItem[],
    state: ProjectsFilterState,
    techFilters: Map<string, TechFilter>,
    sort?: SortStrategy<ProjectListItem>,
  ): Result<ProjectListItem[]> {
    try {
      const configurator = new ProjectsFilterConfigurator(
        this.searchStrategy,
        sort,
      );

      const res = configurator.run(data, state, techFilters);

      return ok(res);
    } catch (e: any) {
      const error = e instanceof Error ? e : new Error(String(e));

      return err(error);
    }
  }
}

export const defaultProjectsService = new ProjectsService(
  projectsRepository,
  getDefaultSearchStrategy(),
);
