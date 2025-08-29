import type { Certification } from "@/types/domain";
import type { CertificationsTechFilter } from "@/config";
import type { NormalizableProject, SearchStrategy } from "@/lib/search/text";
import type { SortStrategy } from "@/lib/projects/sorting";

import {
  AndSpecification,
  SearchSpecification,
  type Specification,
} from "@/lib/projects/specifications";
import { IncludesSearchStrategy } from "@/lib/search/text";
import { Pipeline, SpecificationStep, SortStep } from "@/lib/projects/pipeline";
import { mapCertificationToSearchEntity } from "@/lib/certifications";

export type CertificationsFilterState = {
  selectedTags: string[];
  selectedIssuers: string[];
  selectedYears: number[];
  selectedGroups: string[];
  searchText: string;
};

export function filterCertifications(
  list: Certification[],
  state: CertificationsFilterState,
  techFilters: Map<string, CertificationsTechFilter>,
  options?: {
    searchStrategy?: SearchStrategy<NormalizableProject>;
    sortStrategy?: SortStrategy<Certification>;
  },
): Certification[] {
  const {
    selectedTags,
    selectedIssuers,
    selectedYears,
    selectedGroups,
    searchText,
  } = state;

  const techMap = techFilters;

  const searchStrategy =
    options?.searchStrategy ?? new IncludesSearchStrategy();

  // Inline checks for tags/years/issuers/groups using simple Specification objects
  const tagSpec: Specification<Certification> = {
    isSatisfiedBy: (c) =>
      !selectedTags.length || c.tags.some((t) => selectedTags.includes(t)),
  };

  const issuerSpec: Specification<Certification> = {
    isSatisfiedBy: (c) =>
      !selectedIssuers.length || selectedIssuers.includes(c.issuer),
  };

  const yearSpec: Specification<Certification> = {
    isSatisfiedBy: (c) =>
      !selectedYears.length ||
      selectedYears.includes(new Date(c.date).getFullYear()),
  };

  const groupSpec: Specification<Certification> = {
    isSatisfiedBy: (c) =>
      !selectedGroups.length ||
      selectedGroups.some((g) => {
        const f = techMap.get(g);

        return f ? f.tags.some((t) => c.tags.includes(t)) : false;
      }),
  };

  const spec = new AndSpecification<Certification>([
    tagSpec,
    issuerSpec,
    yearSpec,
    groupSpec,
    new SearchSpecification<Certification>(
      searchText ?? "",
      (c) => mapCertificationToSearchEntity(c),
      searchStrategy,
    ),
  ]);

  const pipeline = new Pipeline<Certification>()
    .use(new SpecificationStep(spec))
    .use(
      options?.sortStrategy
        ? new SortStep<Certification>((a, b) =>
            options.sortStrategy!.compare(a, b),
          )
        : new SortStep<Certification>(() => 0),
    );

  return pipeline.run(list);
}

export default filterCertifications;
