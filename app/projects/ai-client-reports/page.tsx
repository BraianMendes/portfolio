"use client";

import { Card, CardBody, Chip, Image, Button, Tooltip } from "@heroui/react";

import data from "./ai-client-reports.json";

import { Github, Bot, Database, FileText, Zap } from "@/components/icons/index";

export default function AIClientReportsPage() {
  const project = data;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="flex items-center gap-3 mb-3 justify-center w-full">
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
        <h2 className="text-lg text-gray-400 mb-4 font-medium">
          {project.subtitle}
        </h2>
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {project.tags.map((tag) => (
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
          className="object-cover w-full h-[280px] md:h-[400px]"
          height={400}
          src={project.coverImage}
          width={1000}
        />
      </Card>
      <div className="grid gap-6">
        <Card className="rounded-2xl shadow-xl">
          <CardBody className="p-6">
            <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
              <Bot className="text-secondary" size={24} />
              Overview
            </h3>
            <p className="mb-6 text-lg leading-relaxed">{project.overview}</p>

            <h4 className="font-semibold text-lg mb-3">How It Works</h4>
            <ul className="list-disc pl-6 space-y-2 text-base mb-6">
              {project.howItWorks.map((item, index) => (
                <li key={index}>{item}</li>
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
                View on GitHub
              </Button>
            </div>
          </CardBody>
        </Card>

        <Card className="rounded-2xl shadow-xl">
          <CardBody className="p-6">
            <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
              <Database className="text-warning" size={24} />
              RAG System (Retrieval-Augmented Generation)
            </h3>
            <p className="mb-6 text-base leading-relaxed">
              {project.ragHighlights}
            </p>

            <h4 className="font-semibold text-lg mb-3">Main Features</h4>
            <ul className="list-disc pl-6 space-y-2 text-base">
              {project.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </CardBody>
        </Card>

        <Card className="rounded-2xl shadow-xl">
          <CardBody className="p-6">
            <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
              <Zap className="text-success" size={24} />
              Technical Architecture
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-base mb-6">
              {project.architecture.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </CardBody>
        </Card>

        <Card className="rounded-2xl shadow-xl">
          <CardBody className="p-6">
            <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
              <FileText className="text-primary" size={24} />
              Technical Highlights
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-base mb-6">
              {project.technicalHighlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>

            <h4 className="font-semibold text-lg mb-3">Current Limitations</h4>
            <ul className="list-disc pl-6 space-y-1 text-base text-gray-600 dark:text-gray-400">
              {project.limitations.map((limitation, index) => (
                <li key={index}>{limitation}</li>
              ))}
            </ul>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
