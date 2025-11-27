import type { ProjectListItem } from "@/types/domain";
import type { TechFilter } from "@/config";
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
  private readonly selected: Set<string>;

  constructor(private readonly selectedTags: string[]) {
    this.selected = new Set(selectedTags);
  }

  isSatisfiedBy(item: ProjectListItem): boolean {
    return !this.selected.size || item.tags.some((t) => this.selected.has(t));
  }
}

export class ToolSpecification implements Specification<ProjectListItem> {
  private readonly selected: Set<string>;

  constructor(private readonly selectedTools: string[]) {
    this.selected = new Set(selectedTools);
  }

  isSatisfiedBy(item: ProjectListItem): boolean {
    return !this.selected.size || item.tools.some((t) => this.selected.has(t));
  }
}

export class GroupSpecification implements Specification<ProjectListItem> {
  constructor(
    private readonly selectedGroups: string[],
    private readonly techMap: Map<string, TechFilter>,
  ) {}

  isSatisfiedBy(item: ProjectListItem): boolean {
    if (!this.selectedGroups.length) return true;

    const tagSet = new Set(item.tags);
    const toolSet = new Set(item.tools);

    return this.selectedGroups.some((groupName) => {
      const filter = this.techMap.get(groupName);

      if (!filter) return false;

      return filter.tags.some((t) => tagSet.has(t) || toolSet.has(t));
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

export class HasGithubSpecification implements Specification<ProjectListItem> {
  isSatisfiedBy(item: ProjectListItem): boolean {
    return Boolean(item.githubUrl && item.githubUrl.trim().length > 0);
  }
}
