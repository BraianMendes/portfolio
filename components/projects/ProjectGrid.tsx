"use client";

import type { ProjectListItem } from "@/types/domain";

import { ProjectCard } from "@/components/projects/ProjectCard";
import { getUILabel } from "@/config";

type Props = {
  projects: ProjectListItem[];
};

export function ProjectGrid({ projects }: Props) {
  if (!projects.length) {
    return (
      <div className="col-span-full text-center text-neutral-400 text-lg py-12">
        {getUILabel("noProjects")}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-10">
      {projects.map((project) => {
        return <ProjectCard key={project.id} project={project} />;
      })}
    </div>
  );
}

export default ProjectGrid;
