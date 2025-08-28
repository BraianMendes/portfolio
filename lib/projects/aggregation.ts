import type { ProjectListItem } from "@/types/domain";

export function getAllTags(data: ProjectListItem[]): string[] {
  const tags = new Set<string>();

  data.forEach((proj) => proj.tags.forEach((t) => tags.add(t)));

  return Array.from(tags).sort();
}

export function getAllTools(data: ProjectListItem[]): string[] {
  const tools = new Set<string>();

  data.forEach((proj) => proj.tools.forEach((t) => tools.add(t)));

  return Array.from(tools).sort();
}
