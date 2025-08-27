import type { ProjectListItem } from "@/types/domain";
import type { TechFilter } from "@/config/tech-filters";
import type { NormalizableProject, SearchStrategy } from "@/lib/search/text";

export interface Specification<T> {
  isSatisfiedBy(item: T): boolean;
}

export class AndSpecification<T> implements Specification<T> {
  constructor(private readonly specs: Specification<T>[]) {}

  isSatisfiedBy(item: T): boolean {
    for (const spec of this.specs) {
      if (!spec.isSatisfiedBy(item)) return false;
    }

    return true;
  }
}

export class OrSpecification<T> implements Specification<T> {
  constructor(private readonly specs: Specification<T>[]) {}

  isSatisfiedBy(item: T): boolean {
    for (const spec of this.specs) {
      if (spec.isSatisfiedBy(item)) return true;
    }

    return false;
  }
}

export class NotSpecification<T> implements Specification<T> {
  constructor(private readonly spec: Specification<T>) {}

  isSatisfiedBy(item: T): boolean {
    return !this.spec.isSatisfiedBy(item);
  }
}

export class TagSpecification implements Specification<ProjectListItem> {
  constructor(private readonly selectedTags: string[]) {}

  isSatisfiedBy(item: ProjectListItem): boolean {
    return (
      !this.selectedTags.length ||
      item.tags.some((t) => this.selectedTags.includes(t))
    );
  }
}

export class ToolSpecification implements Specification<ProjectListItem> {
  constructor(private readonly selectedTools: string[]) {}

  isSatisfiedBy(item: ProjectListItem): boolean {
    return (
      !this.selectedTools.length ||
      item.tools.some((t) => this.selectedTools.includes(t))
    );
  }
}

export class LanguageSpecification implements Specification<ProjectListItem> {
  constructor(
    private readonly selectedLanguages: string[],
    private readonly techMap: Map<string, TechFilter>,
  ) {}

  isSatisfiedBy(item: ProjectListItem): boolean {
    if (!this.selectedLanguages.length) return true;

    return this.selectedLanguages.some((lang) => {
      const filter = this.techMap.get(lang);

      return (
        !!filter &&
        (filter.tags.some((tag) => item.tags.includes(tag)) ||
          filter.tags.some((tag) => item.tools.includes(tag)))
      );
    });
  }
}

export class SearchSpecification<T> implements Specification<T> {
  constructor(
    private readonly query: string,
    private readonly mapper: (item: T) => NormalizableProject,
    private readonly strategy: SearchStrategy<NormalizableProject>,
  ) {}

  isSatisfiedBy(item: T): boolean {
    return this.strategy.matches(this.mapper(item), this.query);
  }
}

export class FilterBuilder<T> {
  private specs: Specification<T>[] = [];

  and(...s: Specification<T>[]) {
    this.specs.push(...s);

    return this;
  }

  or(...s: Specification<T>[]) {
    this.specs.push(new OrSpecification<T>(s));

    return this;
  }

  not(s: Specification<T>) {
    this.specs.push(new NotSpecification<T>(s));

    return this;
  }

  build(): Specification<T> {
    return new AndSpecification<T>(this.specs);
  }
}
