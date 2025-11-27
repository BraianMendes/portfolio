import type { Certification } from "@/types/domain";
import type { CertificationsTechFilter } from "@/config";
import type { NormalizableProject, SearchStrategy } from "@/lib/search/text";
import type { SortStrategy } from "@/lib/projects/sorting";

import {
  filterCertifications,
  type CertificationsFilterState,
} from "@/lib/certifications";
import { getDefaultSearchStrategy } from "@/lib/search/factory";

export class CertificationsFilterConfigurator {
  constructor(
    private readonly search: SearchStrategy<NormalizableProject>,
    private readonly sort?: SortStrategy<Certification>,
  ) {}

  run(
    items: Certification[],
    state: CertificationsFilterState,
    techFilters: Map<string, CertificationsTechFilter>,
  ): Certification[] {
    return filterCertifications(items, state, techFilters, {
      searchStrategy: this.search,
      sortStrategy: this.sort,
    });
  }
}

export class CertificationsFilterFacade {
  constructor(
    private readonly configurator: CertificationsFilterConfigurator,
  ) {}

  filter(
    items: Certification[],
    state: CertificationsFilterState,
    techFilters: Map<string, CertificationsTechFilter>,
  ) {
    return this.configurator.run(items, state, techFilters);
  }
}

export function createCertificationsFilterFacade(
  sort?: SortStrategy<Certification>,
) {
  const search = getDefaultSearchStrategy();

  return new CertificationsFilterFacade(
    new CertificationsFilterConfigurator(search, sort),
  );
}
