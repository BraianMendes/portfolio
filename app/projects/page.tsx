"use client";

import { useState, useMemo, Fragment } from "react";
import { Image, Input, Button } from "@heroui/react";
import { Popover, Transition } from "@headlessui/react";
import {
  ChevronDown,
  Check,
  Github,
  Brain,
  BarChart3,
  Cpu,
  Triangle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

import projectsDataRaw from "./projects.json";

import { title } from "@/components/primitives";
import {
  ReactIcon,
  CSSIcon,
  JavaScriptIcon,
  PythonIcon,
} from "@/components/icons";
import { SmartTags } from "@/components/smart-tags";

type ProjectType = {
  id: string;
  title: string;
  description: string;
  overview: string;
  howItWorks: string[];
  tools: string[];
  limitations: string[];
  image: string;
  tags: string[];
  slug: string;
  githubUrl?: string;
};

const projectsData: ProjectType[] = projectsDataRaw;

function getAllTags(data: ProjectType[]) {
  const tags = new Set<string>();

  data.forEach((proj) => proj.tags.forEach((t) => tags.add(t)));

  return Array.from(tags).sort();
}

function getAllTools(data: ProjectType[]) {
  const tools = new Set<string>();

  data.forEach((proj) => proj.tools.forEach((tool) => tools.add(tool)));

  return Array.from(tools).sort();
}

function MultiSelectPopover({
  label,
  items,
  selected,
  setSelected,
  allLabel = "All",
}: {
  label: string;
  items: string[];
  selected: string[];
  setSelected: (val: string[]) => void;
  allLabel?: string;
}) {
  function toggleItem(item: string) {
    setSelected(
      selected.includes(item)
        ? selected.filter((i) => i !== item)
        : [...selected, item],
    );
  }
  function clearAll() {
    setSelected([]);
  }

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl shadow transition text-base font-medium border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 outline-none ${open ? "ring-2 ring-primary-500" : ""} ${selected.length ? "text-primary-400" : "text-neutral-200"}`}
          >
            {selected.length ? `${label}: ${selected.length}` : label}
            <ChevronDown
              className={`w-4 h-4 ml-1 transition-transform ${open ? "rotate-180" : ""}`}
            />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition duration-150 ease-out"
            enterFrom="opacity-0 scale-95 -translate-y-2"
            enterTo="opacity-100 scale-100 translate-y-0"
            leave="transition duration-100 ease-in"
            leaveFrom="opacity-100 scale-100 translate-y-0"
            leaveTo="opacity-0 scale-95 -translate-y-2"
          >
            <Popover.Panel className="absolute z-20 mt-2 w-56 rounded-xl shadow-2xl bg-neutral-900 ring-1 ring-black/30 flex flex-col max-h-72 overflow-auto">
              <button
                className={`text-left px-4 py-2 rounded-xl transition hover:bg-primary-900/10 focus:bg-primary-900/10 ${!selected.length ? "text-primary-400 font-semibold" : "text-neutral-200"}`}
                onClick={clearAll}
              >
                {allLabel}
              </button>
              <div className="h-px bg-neutral-800 my-1" />
              {items.map((item) => (
                <label
                  key={item}
                  className={`flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-primary-900/10 rounded-xl transition ${selected.includes(item) ? "text-primary-400 font-semibold" : "text-neutral-200"}`}
                >
                  <input
                    checked={selected.includes(item)}
                    className="accent-primary-500 rounded mr-2"
                    type="checkbox"
                    onChange={() => toggleItem(item)}
                  />
                  {item}
                  {selected.includes(item) && (
                    <Check className="w-4 h-4 text-primary-400 ml-auto" />
                  )}
                </label>
              ))}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

export default function ProjectsPage() {
  const router = useRouter();
  const allTags = useMemo(() => getAllTags(projectsData), []);
  const allTools = useMemo(() => getAllTools(projectsData), []);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");

  // Technology/Language filter definitions
  const techFilters = [
    {
      name: "JavaScript",
      icon: JavaScriptIcon,
      tags: ["JavaScript", "JS", "TypeScript"],
    },
    {
      name: "React",
      icon: ReactIcon,
      tags: ["React", "Next.js"],
    },
    {
      name: "Next.js",
      icon: Triangle,
      tags: ["Next.js"],
    },
    {
      name: "Python",
      icon: PythonIcon,
      tags: ["Python", "Tesseract.js", "OCR"],
    },
    {
      name: "CSS",
      icon: CSSIcon,
      tags: ["CSS", "Tailwind CSS", "Styling"],
    },
    {
      name: "AI/ML",
      icon: Brain,
      tags: [
        "AI",
        "Machine Learning",
        "NLP",
        "OCR",
        "Compromise",
        "Tesseract.js",
      ],
    },
    {
      name: "Frontend",
      icon: BarChart3,
      tags: [
        "React",
        "Next.js",
        "HeroUI",
        "Framer Motion",
        "TypeScript",
        "JavaScript",
      ],
    },
    {
      name: "UI/UX",
      icon: Cpu,
      tags: [
        "HeroUI",
        "Tailwind CSS",
        "next-themes",
        "Framer Motion",
        "UI",
        "Portfolio",
      ],
    },
  ];

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

  function toggleLanguageFilter(languageName: string) {
    setSelectedLanguages((prev) =>
      prev.includes(languageName)
        ? prev.filter((l) => l !== languageName)
        : [...prev, languageName],
    );
  }

  return (
    <div className="px-4 sm:px-8 py-6 max-w-[1440px] mx-auto">
      <h1 className={title()}>Projects</h1>

      <div className="flex flex-wrap gap-4 mt-8 items-center">
        <Input
          className="max-w-xs rounded-xl bg-neutral-900 border border-neutral-700 text-sm focus:ring-primary-500"
          placeholder="Search by title, tag, tool..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <MultiSelectPopover
          allLabel="All Tags"
          items={allTags}
          label="Tags"
          selected={selectedTags}
          setSelected={setSelectedTags}
        />
        <MultiSelectPopover
          allLabel="All Tools"
          items={allTools}
          label="Tools"
          selected={selectedTools}
          setSelected={setSelectedTools}
        />
      </div>

      {/* Technology/Language Filters */}
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
            <div
              className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden min-h-[400px] flex flex-col cursor-pointer transition-all duration-300 ease-out hover:shadow-2xl hover:shadow-primary-500/20 hover:border-primary-500/30 group-hover:scale-105 group-hover:z-50 group-hover:relative"
              role="button"
              tabIndex={0}
              onClick={() => router.push(`/projects/${project.slug}`)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  router.push(`/projects/${project.slug}`);
                }
              }}
            >
              {/* Seção da imagem */}
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
                    target="_blank"
                    variant="light"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github size={20} />
                  </Button>
                )}
              </div>

              {/* Conteúdo do card */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Header do card */}
                <div className="">
                  <h3 className="font-bold text-white text-lg mb-2 transition-colors duration-300 group-hover:text-primary-300">
                    {project.title}
                  </h3>

                  {/* Overview - truncada normalmente, completa no hover */}
                  <div className="relative overflow-hidden mb-3">
                    <p className="text-neutral-300 text-sm leading-relaxed transition-all duration-300 group-hover:line-clamp-none line-clamp-3">
                      {project.overview}
                    </p>
                    {/* Gradiente para indicar texto truncado - só aparece quando não há hover */}
                    <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-neutral-900 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none" />
                  </div>
                </div>

                {/* Tags inteligentes */}
                <div className="mt-auto">
                  <SmartTags
                    className="w-full"
                    maxVisibleTags={3}
                    tags={project.tags}
                    tools={project.tools}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
