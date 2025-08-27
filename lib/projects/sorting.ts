import type { ProjectListItem } from "@/types/domain";

export interface SortStrategy<T = unknown> {
  compare(a: T, b: T): number;
}

export class NoopSort implements SortStrategy<ProjectListItem> {
  compare(): number {
    return 0;
  }
}

export class ByTitleAsc implements SortStrategy<ProjectListItem> {
  compare(a: ProjectListItem, b: ProjectListItem): number {
    return a.title.localeCompare(b.title);
  }
}

export class ByTitleDesc implements SortStrategy<ProjectListItem> {
  compare(a: ProjectListItem, b: ProjectListItem): number {
    return b.title.localeCompare(a.title);
  }
}

export class ByTagCountDesc implements SortStrategy<ProjectListItem> {
  compare(a: ProjectListItem, b: ProjectListItem): number {
    return (b.tags?.length ?? 0) - (a.tags?.length ?? 0);
  }
}
