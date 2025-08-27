import type { ProjectListItem } from "@/types/domain";

import { Suspense } from "react";

import ProjectsClient from "./ProjectsClient";
import projectsDataRaw from "./projects.json";

import { title } from "@/components/primitives";
import { getUILabel } from "@/config/i18n";

const projectsData: ProjectListItem[] = projectsDataRaw as ProjectListItem[];

export default function ProjectsPage() {
  return (
    <div className="px-4 sm:px-8 py-6 max-w-[1440px] mx-auto">
      <h1 className={title()}>{getUILabel("projectsTitle")}</h1>

      <Suspense>
        <ProjectsClient projects={projectsData} />
      </Suspense>
    </div>
  );
}
