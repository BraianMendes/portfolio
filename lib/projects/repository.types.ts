import type { ProjectListItem } from "@/types/domain";

export interface IProjectsRepository {
  getAll(): Promise<ProjectListItem[]>;
}

export default IProjectsRepository;
