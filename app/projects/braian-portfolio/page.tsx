"use client";
import { Card, CardBody, Chip, Image, Button, Tooltip } from "@heroui/react";
import { Github } from "lucide-react";

import data from "./braian-portfolio.json";

export default function BraianPortfolioPage() {
  const project = data;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="flex flex-col items-center text-center mb-6">
        <div className="flex items-center gap-2 mb-2 justify-center w-full">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            {project.title}
          </h1>
          <Tooltip content="GitHub" placement="top">
            <Button
              aria-label="View source code on GitHub"
              as="a"
              className="p-1 rounded-full"
              color="secondary"
              href={project.githubUrl}
              rel="noopener noreferrer"
              style={{ minWidth: 0, height: "40px" }}
              target="_blank"
              variant="light"
            >
              <Github size={28} />
            </Button>
          </Tooltip>
        </div>
        <h2 className="text-lg text-gray-400 mb-3 font-medium">
          {project.subtitle}
        </h2>
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {project.tags.map((tag: string) => (
            <Chip
              key={tag}
              className="uppercase font-semibold tracking-wide"
              variant="flat"
            >
              {tag}
            </Chip>
          ))}
        </div>
      </div>

      <Card
        isHoverable
        className="mb-8 rounded-2xl overflow-hidden"
        shadow="lg"
      >
        <Image
          alt={project.title}
          className="object-cover w-full h-[280px] md:h-[350px]"
          height={350}
          src={project.coverImage}
          width={900}
        />
      </Card>

      <Card className="rounded-2xl shadow-xl">
        <CardBody className="p-6">
          <p className="mb-5 text-lg leading-relaxed">{project.overview}</p>
          <h3 className="font-semibold text-base mb-2 mt-4">How it works</h3>
          <ul className="list-disc pl-6 space-y-1 text-base mb-4">
            {project.howItWorks.map((item: string) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {project.features && (
            <>
              <h3 className="font-semibold text-base mb-2">Features</h3>
              <ul className="list-disc pl-6 space-y-1 text-base mb-4">
                {project.features.map((item: string) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </>
          )}
          {project.mainSections && (
            <>
              <h3 className="font-semibold text-base mb-2">Main Sections</h3>
              <ul className="list-disc pl-6 space-y-1 text-base mb-4">
                {project.mainSections.map((item: string) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </>
          )}
          <h3 className="font-semibold text-base mb-2">Tech Stack</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.map((tech: string) => (
              <Chip key={tech} className="font-semibold" variant="flat">
                {tech}
              </Chip>
            ))}
          </div>
          <h3 className="font-semibold text-base mb-2">Limitations</h3>
          <ul className="list-disc pl-6 space-y-1 text-base mb-4">
            {project.limitations.map((item: string) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="flex justify-end">
            <Button
              as="a"
              className="shadow-md"
              color="secondary"
              href={project.githubUrl}
              rel="noopener noreferrer"
              startContent={<Github size={20} />}
              target="_blank"
              variant="solid"
            >
              GitHub
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
