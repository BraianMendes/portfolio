import type { ProjectListItem } from "@/types/domain";
import type { SortStrategy } from "@/lib/projects/sorting";

import {
  ByTagCountDesc,
  ByTitleAsc,
  ByTitleDesc,
  ByUpdatedAtDesc,
  NoopSort,
} from "@/lib/projects/sorting";

export type SortKey =
  | "none"
  | "titleAsc"
  | "titleDesc"
  | "tagCountDesc"
  | "updatedAtDesc";

const registry = new Map<SortKey, SortStrategy<ProjectListItem>>([
  ["none", new NoopSort()],
  ["titleAsc", new ByTitleAsc()],
  ["titleDesc", new ByTitleDesc()],
  ["tagCountDesc", new ByTagCountDesc()],
  ["updatedAtDesc", new ByUpdatedAtDesc()],
]);

export function getSortStrategy(key: SortKey): SortStrategy<ProjectListItem> {
  return registry.get(key) ?? new NoopSort();
}

export function registerSortStrategy(
  key: SortKey,
  strategy: SortStrategy<ProjectListItem>,
): void {
  registry.set(key, strategy);
}
