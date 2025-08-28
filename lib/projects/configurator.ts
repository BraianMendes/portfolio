import type { ProjectListItem } from "@/types/domain";
import type { TechFilter } from "@/config/tech-filters";
import type { NormalizableProject, SearchStrategy } from "@/lib/search/text";
import type { SortStrategy } from "@/lib/projects/sorting";
import type { ProjectsFilterState } from "@/lib/projects/types";
import type { Specification } from "@/lib/projects/specifications";

import { HasGithubSpecification } from "@/lib/projects/specifications";
import { filterProjects } from "@/lib/projects/filtering";
// toTechMap adapter is handled at call sites (edge). Internally we use Map-only.
import { getDefaultSearchStrategy } from "@/lib/search/factory";
import { getFeatureFlags } from "@/config/flags";

export class ProjectsFilterConfigurator {
  constructor(
    private readonly search: SearchStrategy<NormalizableProject>,
    private readonly sort?: SortStrategy<ProjectListItem>,
    private readonly additionalSpecs?: Specification<ProjectListItem>[],
  ) {}

  run(
    items: ProjectListItem[],
    state: ProjectsFilterState,
    techFilters: Map<string, TechFilter>,
  ): ProjectListItem[] {
    const techMap = techFilters;
    const extraSpecifications: Specification<ProjectListItem>[] = [
      ...(this.additionalSpecs ?? []),
    ];

    const { projectsOnlyGithub } = getFeatureFlags();

    if (projectsOnlyGithub) {
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
    techFilters: Map<string, TechFilter>,
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
