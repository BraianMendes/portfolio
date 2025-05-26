"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import projectsData from "./projects.json";
import { title } from "@/components/primitives";
import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Chip,
  Image
} from "@heroui/react";

// Docs HeroUI Card :contentReference[oaicite:0]{index=0}  
// Docs HeroUI Button :contentReference[oaicite:1]{index=1}  
// Docs HeroUI Chip   :contentReference[oaicite:2]{index=2}  

export default function ProjectsPage() {
  const router = useRouter();

  // Extrai lista única de tags dos projetos
  const allTags = useMemo(() => {
    const set = new Set<string>();
    projectsData.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set);
  }, []);

  // Estado do filtro (string vazia = sem filtro, exibe todos)
  const [selectedTag, setSelectedTag] = useState<string>("");

  // Filtra projetos conforme a tag selecionada
  const filtered = useMemo(() => {
    if (!selectedTag) return projectsData;
    return projectsData.filter((p) => p.tags.includes(selectedTag));
  }, [selectedTag]);

  return (
    <div className="px-8 py-6">
      <h1 className={title()}>Projects</h1>

      {/* Seletor de filtros */}
      <div className="flex gap-4 mt-6">
        {/* Botão para remover filtro */}
        <Button
          variant={!selectedTag ? "solid" : "light"}
          onPress={() => setSelectedTag("")}
        >
          All
        </Button>
        {allTags.map((tag) => (
          <Button
            key={tag}
            variant={selectedTag === tag ? "solid" : "light"}
            onPress={() => setSelectedTag(tag)}
          >
            {tag}
          </Button>
        ))}
      </div>

      {/* Grid de cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filtered.map((proj) => (
          <Card
            key={proj.id}
            isHoverable
            isPressable
            onPress={() => router.push(`/projects/${proj.slug}`)}
            className="flex flex-col"
          >
            {/* Imagem de capa */}
            <CardBody className="p-0">
              <Image
                src={proj.image}
                alt={proj.title}
                width={400}
                height={250}
              />
            </CardBody>

            {/* Rodapé com título e tags */}
            <CardFooter className="flex flex-col items-start p-4">
              <h3 className="text-lg font-semibold">{proj.title}</h3>
              <div className="flex gap-2 mt-2">
                {proj.tags.map((t) => (
                  <Chip key={t} variant="flat" color="primary">
                    {t}
                  </Chip>
                ))}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}