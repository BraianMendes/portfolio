import type { ProjectListItem } from "@/types/domain";

import { Suspense } from "react";

import ProjectsClient from "./ProjectsClient";

import { defaultProjectsService } from "@/lib/projects/service";
import { title } from "@/components/primitives";
import { getUILabel } from "@/config/i18n";

export default async function ProjectsPage() {
  const projectsData: ProjectListItem[] =
    await defaultProjectsService.listFiltered(
      {
        selectedTags: [],
        selectedTools: [],
        selectedGroups: [],
        searchText: "",
      },
      new Map(),
    );

  return (
    <div className="px-4 sm:px-8 py-6 max-w-[1440px] mx-auto">
      <h1 className={title()}>{getUILabel("projectsTitle")}</h1>

      <Suspense>
        <ProjectsClient projects={projectsData} />
      </Suspense>
    </div>
  );
}
