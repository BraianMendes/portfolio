"use client";

import {
  Card,
  CardBody,
  Chip,
  Image,
  Button,
  Tooltip,
  Divider,
} from "@heroui/react";
import { Github, Bot, Database, FileText, Zap } from "lucide-react";

import data from "./ai-client-reports.json";

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
              aria-label="Ver código fonte no GitHub"
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
        {/* Overview */}
        <Card className="rounded-2xl shadow-xl">
          <CardBody className="p-6">
            <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
              <Bot className="text-secondary" size={24} />
              Visão Geral
            </h3>
            <p className="mb-6 text-lg leading-relaxed">{project.overview}</p>

            <h4 className="font-semibold text-lg mb-3">Como Funciona</h4>
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
                Ver no GitHub
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* RAG System Highlights */}
        <Card className="rounded-2xl shadow-xl">
          <CardBody className="p-6">
            <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
              <Database className="text-warning" size={24} />
              Sistema RAG (Retrieval-Augmented Generation)
            </h3>
            <p className="mb-6 text-base leading-relaxed">
              {project.ragHighlights}
            </p>

            <h4 className="font-semibold text-lg mb-3">Recursos Principais</h4>
            <ul className="list-disc pl-6 space-y-2 text-base">
              {project.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </CardBody>
        </Card>

        {/* Architecture */}
        <Card className="rounded-2xl shadow-xl">
          <CardBody className="p-6">
            <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
              <Zap className="text-success" size={24} />
              Arquitetura Técnica
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-base mb-6">
              {project.architecture.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <Divider className="my-4" />

            <h4 className="font-semibold text-lg mb-3">Estrutura do Projeto</h4>
            <ul className="list-disc pl-6 space-y-1 text-base">
              {project.projectStructure.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </CardBody>
        </Card>

        {/* Technical Highlights */}
        <Card className="rounded-2xl shadow-xl">
          <CardBody className="p-6">
            <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
              <FileText className="text-primary" size={24} />
              Destaques Técnicos
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-base mb-6">
              {project.technicalHighlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>

            <h4 className="font-semibold text-lg mb-3">Instalação</h4>
            <div className="bg-gray-900 rounded-lg p-4 mb-6">
              <code className="text-sm text-gray-300">
                {project.installation.map((step, index) => (
                  <div key={index} className="mb-1">
                    {step}
                  </div>
                ))}
              </code>
            </div>

            <h4 className="font-semibold text-lg mb-3">Limitações Atuais</h4>
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
