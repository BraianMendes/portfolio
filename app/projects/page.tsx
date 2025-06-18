"use client";

import { useState, useMemo, Fragment } from "react";
import { Card, CardBody, CardFooter, Image, Input, Button, Tooltip } from "@heroui/react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/24/solid";
import { title } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import projectsDataRaw from "./projects.json";
import { useRouter } from "next/navigation";

type ProjectType = {
  id: string;
  title: string;
  description: string;
  overview: string;
  howItWorks: string[];
  tools: string[];
  limitations: string[];
  projectStructure: string[];
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
    setSelected(selected.includes(item) ? selected.filter((i) => i !== item) : [...selected, item]);
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
            <ChevronDownIcon className={`w-4 h-4 ml-1 transition-transform ${open ? "rotate-180" : ""}`} />
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
                onClick={clearAll}
                className={`text-left px-4 py-2 rounded-xl transition hover:bg-primary-900/10 focus:bg-primary-900/10 ${!selected.length ? "text-primary-400 font-semibold" : "text-neutral-200"}`}
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
                    type="checkbox"
                    checked={selected.includes(item)}
                    onChange={() => toggleItem(item)}
                    className="accent-primary-500 rounded mr-2"
                  />
                  {item}
                  {selected.includes(item) && <CheckIcon className="w-4 h-4 text-primary-400 ml-auto" />}
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
  const [searchText, setSearchText] = useState("");

  const filtered = useMemo(
    () =>
      projectsData.filter((proj) => {
        const tagMatch = !selectedTags.length || proj.tags.some((t) => selectedTags.includes(t));
        const toolMatch = !selectedTools.length || proj.tools.some((t) => selectedTools.includes(t));
        const searchMatch =
          !searchText ||
          proj.title.toLowerCase().includes(searchText.toLowerCase()) ||
          proj.tags.some((t) => t.toLowerCase().includes(searchText.toLowerCase())) ||
          proj.description.toLowerCase().includes(searchText.toLowerCase()) ||
          proj.overview.toLowerCase().includes(searchText.toLowerCase());
        return tagMatch && toolMatch && searchMatch;
      }),
    [selectedTags, selectedTools, searchText]
  );

  return (
    <div className="px-4 sm:px-8 py-6 max-w-[1440px] mx-auto">
      <h1 className={title()}>Projects</h1>

      <div className="flex flex-wrap gap-4 mt-8 items-center">
        <Input
          placeholder="Search by title, tag, tool..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="max-w-xs rounded-xl bg-neutral-900 border border-neutral-700 text-sm focus:ring-primary-500"
        />
        <MultiSelectPopover label="Tags" items={allTags} selected={selectedTags} setSelected={setSelectedTags} allLabel="All Tags" />
        <MultiSelectPopover label="Tools" items={allTools} selected={selectedTools} setSelected={setSelectedTools} allLabel="All Tools" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-10">
        {filtered.length === 0 && (
          <div className="col-span-full text-center text-neutral-400 text-lg py-12">
            No projects found.
          </div>
        )}
        {filtered.map((project) => (
          <Card
            key={project.id}
            isHoverable
            isPressable
            className="flex flex-col cursor-pointer min-h-[340px] bg-neutral-900 border border-neutral-800 shadow-lg transition duration-150 ease-out hover:shadow-xl focus:shadow-xl active:shadow-lg"
            onClick={() => router.push(`/projects/${project.slug}`)}
          >
            <CardBody className="p-0">
              <div className="w-full h-[140px] bg-neutral-800 flex items-center justify-center rounded-t-2xl overflow-hidden group relative"
                style={{ minHeight: 140, maxHeight: 180, cursor: "pointer" }}
              >
                <Image
                  alt={project.title}
                  className="object-cover py-1 w-full h-full transition-transform group-hover:scale-105"
                  height={140}
                  width={240}
                  src={project.image}
                  style={{ maxHeight: 180, maxWidth: "100%" }}
                />
                {project.githubUrl && (
                  <Tooltip content="View on GitHub">
                    <Button
                      as="a"
                      href={project.githubUrl}
                      target="_blank"
                      variant="light"
                      className="absolute top-3 right-3 z-10 p-1 rounded-full bg-white/80 backdrop-blur hover:bg-white"
                      onClick={(e) => e.stopPropagation()}
                      aria-label="GitHub"
                    >
                      <GithubIcon size={20} />
                    </Button>
                  </Tooltip>
                )}
              </div>
            </CardBody>
            <CardFooter className="flex flex-col items-start pt-0 pb-4 px-4 w-full">
              <h3 className="font-bold mb-1 text-white leading-snug self-start text-base">{project.title}</h3>
              <div className="text-xs text-neutral-400 mb-1">{project.tools.join(", ")}</div>
              <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 items-center">
                {project.tags.map((t, idx) => (
                  <span
                    key={t}
                    className={idx === 0 ? "text-sm font-semibold text-primary-300" : "text-sm text-primary-300"}
                    title={t}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
