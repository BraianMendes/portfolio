"use client";
import { title } from "@/components/primitives";
import {
  Card, CardHeader, CardBody, CardFooter,
  Tabs, Tab, Chip, Image,
  Snippet, Accordion, AccordionItem,
  Button
} from "@heroui/react";
import { Github } from "lucide-react";
import data from "./ai-chatbot.json";

// Define the GalleryImage type based on expected structure
type GalleryImage = {
  src: string;
  alt: string;
};

// Define the Resource type based on expected structure
type Resource = {
  title: string;
  description: string;
  link: string;
};

export default function AiChatbotPage() {
  const project = data; // JSON com todos os campos necessários

  return (
    <div className="px-8 py-6">
      <h1 className={title()}>{project.title}</h1>

      {/* Banner */}
      <Card isHoverable className="mt-4 mb-8">
        <CardHeader className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">{project.subtitle}</h2>
          <div className="flex gap-2 mt-1">
            {project.tags.map((t: string) => (
              <Chip key={t} variant="light">{t}</Chip>
            ))}
          </div>
        </CardHeader>
        <CardBody className="p-0">
          <Image src={project.coverImage} alt={project.title} width={800} height={450} />
        </CardBody>
        <CardFooter className="flex gap-4">
          <Button
            as="a"
            href={project.githubUrl}
            startContent={<Github size={20} />}
            variant="solid"
          >
            GitHub
          </Button>
          {project.demoUrl && (
            <Button as="a" href={project.demoUrl} variant="bordered">
              Live Demo
            </Button>
          )}
        </CardFooter>
      </Card>

      {/* Abas */}
      <Tabs defaultSelectedKey="overview" className="mb-8">
        <Tab key="overview" title="Overview">
          <p className="mb-4">{project.description}</p>
          <h3 className="font-semibold mb-2">História</h3>
          <p>{project.history}</p>
        </Tab>
        <Tab key="gallery" title="Galeria">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.gallery.map((img: GalleryImage) => (
              <Image
                key={img.src}
                src={img.src}
                alt={img.alt}
                width={300}
                height={200}
                className="rounded-lg"
              />
            ))}
          </div>
        </Tab>
        <Tab key="tech" title="Tech Stack">
          <div className="flex flex-wrap gap-3">
            {project.techStack.map((tech: string) => (
              <Chip key={tech} variant="flat">{tech}</Chip>
            ))}
          </div>
        </Tab>
        <Tab key="code" title="Código">
          <Snippet variant="solid">{project.codeSnippet}</Snippet>
        </Tab>
        <Tab key="resources" title="Recursos">
          <Accordion>
            {project.resources.map((res: Resource) => (
              <AccordionItem key={res.title} title={res.title}>
                <p>{res.description}</p>
                <Button as="a" href={res.link} variant="light">
                  Abrir recurso
                </Button>
              </AccordionItem>
            ))}
          </Accordion>
        </Tab>
      </Tabs>
    </div>
  );
}