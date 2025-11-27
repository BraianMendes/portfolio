import type { ProjectListItem } from "@/types/domain";
import type { IProjectsRepository } from "@/lib/projects";

import { z, type ZodIssue } from "zod";

const projectListItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  overview: z.string(),
  howItWorks: z.array(z.string()),
  tools: z.array(z.string()),
  limitations: z.array(z.string()),
  image: z.string(),
  tags: z.array(z.string()),
  slug: z.string(),
  githubUrl: z.string().optional(),
});

const projectListSchema = z.array(projectListItemSchema);

export class ProjectsRepository implements IProjectsRepository {
  async getAll(): Promise<ProjectListItem[]> {
    const data = (await import("@/app/projects/projects.json")).default;

    const parsed = projectListSchema.safeParse(data);

    if (!parsed.success) {
      const message = parsed.error.issues
        .map((e: ZodIssue) => `${e.path.join(".")}: ${e.message}`)
        .join("; ");

      throw new Error(`Invalid projects.json: ${message}`);
    }

    return parsed.data as ProjectListItem[];
  }
}

export const projectsRepository = new ProjectsRepository();
