"use client";

import type { ProjectListItem } from "@/types/domain";

import Link from "next/link";
import { Button } from "@heroui/react";

import Cover from "@/components/cover/Cover";
import { Github } from "@/components/icons/index";
import { SmartTags } from "@/components/smart-tags";

type Props = {
  project: ProjectListItem;
};

export function ProjectCard({ project }: Props) {
  return (
    <div className="relative group">
      <Link
        className="block text-left bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden min-h-[400px] w-full flex flex-col cursor-pointer transition-all duration-300 ease-out hover:shadow-2xl hover:shadow-primary-500/20 hover:border-primary-500/30 group-hover:scale-105 group-hover:z-50 group-hover:relative"
        href={`/projects/${project.slug}`}
      >
        <div
          className="w-full h-[140px] bg-neutral-800 flex items-center justify-center overflow-hidden relative"
          style={{ minHeight: 140, maxHeight: 180 }}
        >
          <Cover
            alt={project.title}
            className="object-cover w-full h-full transition-all duration-300 group-hover:scale-110"
            fallbackTitle={project.title}
            height={140}
            src={project.image}
            style={{ maxHeight: 180, maxWidth: "100%" }}
            width={240}
          />
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
      </Link>

      {project.githubUrl && (
        <Button
          aria-label="GitHub"
          as="a"
          className="absolute top-3 right-3 z-10 p-1 rounded-full bg-white/80 backdrop-blur hover:bg-white"
          href={project.githubUrl}
          rel="noopener noreferrer"
          target="_blank"
          variant="light"
        >
          <Github size={20} />
        </Button>
      )}
    </div>
  );
}

export default ProjectCard;
