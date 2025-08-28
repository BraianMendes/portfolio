import type { ProjectListItem } from "@/types/domain";

export class ProjectsRepository {
  async getAll(): Promise<ProjectListItem[]> {
    const data = (await import("@/app/projects/projects.json")).default;

    return data as ProjectListItem[];
  }
}

export const projectsRepository = new ProjectsRepository();
