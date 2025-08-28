import type { ProjectListItem } from "@/types/domain";
import type { TechFilter } from "@/config/tech-filters";
import type { NormalizableProject, SearchStrategy } from "@/lib/search/text";
import type { SortStrategy } from "@/lib/projects/sorting";
import type { ProjectsFilterState } from "@/lib/projects/types";
import type { Specification } from "@/lib/projects/specifications";

import { HasGithubSpecification } from "@/lib/projects/specifications";
import { filterProjects } from "@/lib/projects/filtering";
import { toTechMap } from "@/lib/projects/techMap";
import { getDefaultSearchStrategy } from "@/lib/search/factory";

export class ProjectsFilterConfigurator {
  constructor(
    private readonly search: SearchStrategy<NormalizableProject>,
    private readonly sort?: SortStrategy<ProjectListItem>,
  ) {}

  run(
    items: ProjectListItem[],
    state: ProjectsFilterState,
    techFilters: TechFilter[] | Map<string, TechFilter>,
  ): ProjectListItem[] {
    const techMap = toTechMap(techFilters);

    const extraSpecifications: Specification<ProjectListItem>[] = [];

    if (
      (process.env.NEXT_PUBLIC_PROJECTS_ONLY_GITHUB || "")
        .toLowerCase()
        .trim() === "true"
    ) {
      extraSpecifications.push(new HasGithubSpecification());
    }

    return filterProjects(items, state, techMap, {
      searchStrategy: this.search,
      sortStrategy: this.sort,
      extraSpecifications,
    });
  }
}

export class ProjectsFilterFacade {
  constructor(private readonly configurator: ProjectsFilterConfigurator) {}

  filter(
    items: ProjectListItem[],
    state: ProjectsFilterState,
    techFilters: TechFilter[] | Map<string, TechFilter>,
  ) {
    return this.configurator.run(items, state, techFilters);
  }
}

export function createProjectsFilterFacade(
  sort?: SortStrategy<ProjectListItem>,
) {
  const search = getDefaultSearchStrategy();

  return new ProjectsFilterFacade(new ProjectsFilterConfigurator(search, sort));
}
