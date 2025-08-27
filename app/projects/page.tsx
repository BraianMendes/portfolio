"use client";

import type { ProjectListItem } from "@/types/domain";

import { useMemo } from "react";
import { Image, Input, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

import projectsDataRaw from "./projects.json";

import { Github } from "@/components/icons/index";
import { title } from "@/components/primitives";
import { SmartTags } from "@/components/smart-tags";
import MultiSelectPopover from "@/components/filters/MultiSelectPopover";
import { useToggleList } from "@/hooks/useToggleList";
import { useSearchQuery } from "@/hooks/useSearchQuery";
import { techFilters } from "@/config/tech-filters";
import { getFilterLabel } from "@/config/i18n";

const projectsData: ProjectListItem[] = projectsDataRaw as ProjectListItem[];

function getAllTags(data: ProjectListItem[]) {
  const tags = new Set<string>();

  data.forEach((proj) => proj.tags.forEach((t: string) => tags.add(t)));

  return Array.from(tags).sort();
}

function getAllTools(data: ProjectListItem[]) {
  const tools = new Set<string>();

  data.forEach((proj) => proj.tools.forEach((tool: string) => tools.add(tool)));

  return Array.from(tools).sort();
}

export default function ProjectsPage() {
  const router = useRouter();
  const allTags = useMemo(() => getAllTags(projectsData), []);
  const allTools = useMemo(() => getAllTools(projectsData), []);
  const { list: selectedTags, setList: setSelectedTags } =
    useToggleList<string>([]);
  const { list: selectedTools, setList: setSelectedTools } =
    useToggleList<string>([]);
  const { list: selectedLanguages, toggle: toggleLanguageFilter } =
    useToggleList<string>([]);
  const { query: searchText, onChange: onSearchChange } = useSearchQuery("");

  // techFilters now imported from config

  const filtered = useMemo(
    () =>
      projectsData.filter((proj) => {
        const tagMatch =
          !selectedTags.length ||
          proj.tags.some((t) => selectedTags.includes(t));
        const toolMatch =
          !selectedTools.length ||
          proj.tools.some((t) => selectedTools.includes(t));
        const languageMatch =
          !selectedLanguages.length ||
          selectedLanguages.some((lang) => {
            const filter = techFilters.find((f) => f.name === lang);

            return (
              filter &&
              (filter.tags.some((tag) => proj.tags.includes(tag)) ||
                filter.tags.some((tag) => proj.tools.includes(tag)))
            );
          });
        const searchMatch =
          !searchText ||
          proj.title.toLowerCase().includes(searchText.toLowerCase()) ||
          proj.tags.some((t) =>
            t.toLowerCase().includes(searchText.toLowerCase()),
          ) ||
          proj.description.toLowerCase().includes(searchText.toLowerCase()) ||
          proj.overview.toLowerCase().includes(searchText.toLowerCase());

        return tagMatch && toolMatch && languageMatch && searchMatch;
      }),
    [selectedTags, selectedTools, selectedLanguages, searchText, techFilters],
  );

  return (
    <div className="px-4 sm:px-8 py-6 max-w-[1440px] mx-auto">
      <h1 className={title()}>Projects</h1>

      <div className="flex flex-wrap gap-4 mt-8 items-center">
        <Input
          className="max-w-xs rounded-xl bg-neutral-900 border border-neutral-700 text-sm focus:ring-primary-500"
          placeholder="Search by title, tag, tool..."
          value={searchText}
          onChange={onSearchChange}
        />
        <MultiSelectPopover
          allLabel={getFilterLabel("allTags")}
          items={allTags}
          label="Tags"
          selected={selectedTags}
          setSelected={setSelectedTags}
        />
        <MultiSelectPopover
          allLabel={getFilterLabel("allTools")}
          items={allTools}
          label="Tools"
          selected={selectedTools}
          setSelected={setSelectedTools}
        />
      </div>

      <div className="flex flex-wrap gap-3 mt-6 items-center">
        <span className="text-sm font-medium text-neutral-300 mr-2">
          Technologies:
        </span>
        {techFilters.map((filter) => {
          const Icon = filter.icon;
          const isSelected = selectedLanguages.includes(filter.name);

          return (
            <button
              key={filter.name}
              className={clsx(
                "flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200",
                isSelected
                  ? "bg-primary-500/20 border-primary-500 text-primary-300"
                  : "bg-neutral-800/50 border-neutral-700 text-neutral-300 hover:bg-neutral-700/70 hover:border-neutral-600",
              )}
              title={`Filter by ${filter.name}`}
              type="button"
              onClick={() => toggleLanguageFilter(filter.name)}
            >
              <Icon size={16} />
              <span className="text-sm font-medium">{filter.name}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-10">
        {filtered.length === 0 && (
          <div className="col-span-full text-center text-neutral-400 text-lg py-12">
            No projects found.
          </div>
        )}
        {filtered.map((project) => (
          <div key={project.id} className="relative group">
            <button
              className="text-left bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden min-h-[400px] w-full flex flex-col cursor-pointer transition-all duration-300 ease-out hover:shadow-2xl hover:shadow-primary-500/20 hover:border-primary-500/30 group-hover:scale-105 group-hover:z-50 group-hover:relative"
              type="button"
              onClick={() => router.push(`/projects/${project.slug}`)}
            >
              <div
                className="w-full h-[140px] bg-neutral-800 flex items-center justify-center overflow-hidden relative"
                style={{ minHeight: 140, maxHeight: 180 }}
              >
                <Image
                  alt={project.title}
                  className="object-cover w-full h-full transition-all duration-300 group-hover:scale-110"
                  height={140}
                  src={project.image}
                  style={{ maxHeight: 180, maxWidth: "100%" }}
                  width={240}
                />
                {project.githubUrl && (
                  <Button
                    aria-label="GitHub"
                    as="a"
                    className="absolute top-3 right-3 z-10 p-1 rounded-full bg-white/80 backdrop-blur hover:bg-white"
                    href={project.githubUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                    variant="light"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github size={20} />
                  </Button>
                )}
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="">
                  <h3 className="font-bold text-white text-lg mb-2 transition-colors duration-300 group-hover:text-primary-300">
                    {project.title}
                  </h3>

                  <div className="relative overflow-hidden mb-3">
                    <p className="text-neutral-300 text-sm leading-relaxed transition-all duration-300 group-hover:line-clamp-none line-clamp-3">
                      {project.overview}
                    </p>
                    <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-neutral-900 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none" />
                  </div>
                </div>

                <div className="mt-auto">
                  <SmartTags
                    className="w-full"
                    maxVisibleTags={3}
                    tags={project.tags}
                    tools={project.tools}
                  />
                </div>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
