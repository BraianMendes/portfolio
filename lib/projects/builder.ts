import type { ProjectListItem } from "@/types/domain";
import type { SortStrategy } from "@/lib/projects/sorting";
import type { Specification } from "@/lib/projects/specifications";
import type { NormalizableProject, SearchStrategy } from "@/lib/search/text";

import { getDefaultSearchStrategy } from "@/lib/search/factory";
import { ProjectsFilterConfigurator } from "@/lib/projects/configurator";

export class ProjectsFilterBuilder {
  private search: SearchStrategy<NormalizableProject> =
    getDefaultSearchStrategy();
  private sort?: SortStrategy<ProjectListItem>;
  private specs: Specification<ProjectListItem>[] = [];

  withSearch(s: SearchStrategy<NormalizableProject>): this {
    this.search = s;

    return this;
  }

  withSort(s?: SortStrategy<ProjectListItem>): this {
    this.sort = s;

    return this;
  }

  withSpecification(spec: Specification<ProjectListItem>): this {
    this.specs.push(spec);

    return this;
  }

  withSpecifications(specs: Specification<ProjectListItem>[]): this {
    this.specs.push(...specs);

    return this;
  }

  build(): ProjectsFilterConfigurator {
    return new ProjectsFilterConfigurator(this.search, this.sort, this.specs);
  }
}

export default ProjectsFilterBuilder;
