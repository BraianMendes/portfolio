"use client";

import type { ProjectListItem } from "@/types/domain";

import projectsDataRaw from "./projects.json";

import { title } from "@/components/primitives";
import { ProjectFilterBar } from "@/components/projects/ProjectFilterBar";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { useProjectsFilter } from "@/hooks/useProjectsFilter";
import { getUILabel } from "@/config/i18n";

const projectsData: ProjectListItem[] = projectsDataRaw as ProjectListItem[];

export default function ProjectsPage() {
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
  } = useProjectsFilter(projectsData);

  return (
    <div className="px-4 sm:px-8 py-6 max-w-[1440px] mx-auto">
      <h1 className={title()}>{getUILabel("projectsTitle")}</h1>

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
    </div>
  );
}
