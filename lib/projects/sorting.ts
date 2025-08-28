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

export class ByUpdatedAtDesc implements SortStrategy<ProjectListItem> {
  compare(a: ProjectListItem, b: ProjectListItem): number {
    const aDate = Date.parse((a as any).updatedAt ?? "1970-01-01T00:00:00Z");
    const bDate = Date.parse((b as any).updatedAt ?? "1970-01-01T00:00:00Z");

    return bDate - aDate;
  }
}
