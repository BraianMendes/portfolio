import type { IProjectsRepository } from "@/lib/projects/repository.types";
import type { ProjectListItem } from "@/types/domain";

/**
 * Simple in-memory caching decorator.
 * Caches the result of getAll() for the lifetime of the process.
 */
export class CachingProjectsRepository implements IProjectsRepository {
  private cache: ProjectListItem[] | null = null;

  constructor(private readonly inner: IProjectsRepository) {}

  async getAll(): Promise<ProjectListItem[]> {
    if (this.cache) return this.cache;

    const data = await this.inner.getAll();

    this.cache = data;

    return data;
  }
}

/**
 * Logging decorator to measure getAll() duration.
 */
export class LoggingProjectsRepository implements IProjectsRepository {
  constructor(private readonly inner: IProjectsRepository) {}

  async getAll(): Promise<ProjectListItem[]> {
    const label = "ProjectsRepository.getAll";
    const start =
      typeof performance !== "undefined" ? performance.now() : Date.now();

    try {
      const res = await this.inner.getAll();

      return res;
    } finally {
      const end =
        typeof performance !== "undefined" ? performance.now() : Date.now();
      const ms = end - start;

      // eslint-disable-next-line no-console
      console.debug(`[repo] ${label} took ${ms.toFixed(1)}ms`);
    }
  }
}

export default CachingProjectsRepository;
