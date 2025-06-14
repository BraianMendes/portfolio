"use client";

import { useRouter } from "next/navigation";
import { Card, CardBody, CardFooter, Chip, Image, Button, Tooltip } from "@heroui/react";
import projectsData from "./projects.json";
import { title } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

export default function ProjectsPage() {
  const router = useRouter();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className={`${title()} mb-6`}>Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
        {projectsData.map((project) => (
          <Card
            key={project.id}
            isHoverable
            isPressable
            className="group flex flex-col max-w-xs mx-auto transition-transform hover:scale-[1.03] hover:shadow-xl rounded-2xl"
            onPress={() => router.push(`/projects/${project.slug}`)}
          >
            <CardBody className="p-0">
              <div className="relative">
                <Image
                  alt={project.title}
                  height={180}
                  src={project.image}
                  width={360}
                  className="object-cover w-full h-[180px] rounded-t-2xl"
                />
                <Tooltip content="Ver no GitHub">
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
              </div>
            </CardBody>
            <CardFooter className="flex flex-col items-start gap-2 p-4">
              <h3 className="text-base font-semibold truncate w-full">{project.title}</h3>
              <div className="flex flex-wrap gap-1 w-full">
                {project.tags.slice(0, 4).map((t) => (
                  <Chip key={t} variant="flat" className="text-xs px-2 py-0.5">{t}</Chip>
                ))}
                {project.tags.length > 4 && (
                  <Chip variant="flat" className="text-xs px-2 py-0.5">+{project.tags.length - 4}</Chip>
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
