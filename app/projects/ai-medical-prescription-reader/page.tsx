"use client";
import {
  Card,
  CardBody,
  Chip,
  Image,
  Button,
  Tooltip,
} from "@heroui/react";
import { Github } from "lucide-react";
import data from "./ai-medical-prescription-reader.json";

export default function MedicalPrescriptionReaderPage() {
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
              as="a"
              href={project.githubUrl}
              variant="light"
              color="secondary"
              className="p-1 rounded-full"
              style={{ minWidth: 0, height: "40px" }}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ver código fonte no GitHub"
            >
              <Github size={28} />
            </Button>
          </Tooltip>
        </div>
        <h2 className="text-lg text-gray-400 mb-3 font-medium">
          {project.subtitle}
        </h2>
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {project.tags.map((tag) => (
            <Chip
              key={tag}
              variant="flat"
              className="uppercase font-semibold tracking-wide"
            >
              {tag}
            </Chip>
          ))}
        </div>
      </div>

      <Card isHoverable shadow="lg" className="mb-8 rounded-2xl overflow-hidden">
        <Image
          alt={project.title}
          height={350}
          src={project.coverImage}
          width={900}
          className="object-cover w-full h-[280px] md:h-[350px]"
        />
      </Card>

      <Card className="rounded-2xl shadow-xl">
        <CardBody className="p-6">
          <p className="mb-5 text-lg leading-relaxed">{project.overview}</p>
          <h3 className="font-semibold text-base mb-2 mt-4">Como funciona</h3>
          <ul className="list-disc pl-6 space-y-1 text-base mb-4">
            {project.howItWorks.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h3 className="font-semibold text-base mb-2">Destaques de NLP</h3>
          <p className="mb-6 text-base">{project.nlpHighlights}</p>
          <div className="flex justify-end">
            <Button
              as="a"
              href={project.githubUrl}
              startContent={<Github size={20} />}
              variant="solid"
              color="secondary"
              className="shadow-md"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
