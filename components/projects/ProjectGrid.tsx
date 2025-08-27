"use client";

import type { ProjectListItem } from "@/types/domain";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@heroui/react";

import { Github } from "@/components/icons/index";
import { SmartTags } from "@/components/smart-tags";
import { getUILabel } from "@/config/i18n";

type Props = {
  projects: ProjectListItem[];
};

export function ProjectGrid({ projects }: Props) {
  const router = useRouter();

  if (!projects.length) {
    return (
      <div className="col-span-full text-center text-neutral-400 text-lg py-12">
        {getUILabel("noProjects")}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-10">
      {projects.map((project) => (
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
              <div>
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
  );
}

export default ProjectGrid;
