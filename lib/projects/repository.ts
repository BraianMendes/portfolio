import type { ProjectListItem } from "@/types/domain";

// Minimal repository abstraction to centralize data access. Later can swap to remote fetch.
export class ProjectsRepository {
  async getAll(): Promise<ProjectListItem[]> {
    // Static import to keep Next.js bundling happy
    const data = (await import("@/app/projects/projects.json")).default;

    // Trust the local JSON shape; in future add zod validation here
    return data as ProjectListItem[];
  }
}

export const projectsRepository = new ProjectsRepository();
