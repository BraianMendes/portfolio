"use client";

import type { ProjectListItem } from "@/types/domain";

import { ProjectFilterBar } from "@/components/projects/ProjectFilterBar";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { useUrlSyncedProjectsFilter } from "@/hooks/useUrlSyncedProjectsFilter";

type Props = {
  projects: ProjectListItem[];
};

export function ProjectsClient({ projects }: Props) {
  const {
    allTags,
    allTools,
    filtered,
    clearAll,
    selectedTags,
    setSelectedTags,
    selectedTools,
    setSelectedTools,
    selectedLanguages,
    toggleLanguageFilter,
    searchText,
    onSearchChange,
  } = useUrlSyncedProjectsFilter(projects);

  return (
    <>
      <ProjectFilterBar
        allTags={allTags}
        allTools={allTools}
        className="mt-8"
        clearAll={clearAll}
        searchText={searchText}
        selectedLanguages={selectedLanguages}
        selectedTags={selectedTags}
        selectedTools={selectedTools}
        setSelectedTags={setSelectedTags}
        setSelectedTools={setSelectedTools}
        toggleLanguageFilter={toggleLanguageFilter}
        onSearchChange={onSearchChange}
      />

      <ProjectGrid projects={filtered} />
    </>
  );
}

export default ProjectsClient;
