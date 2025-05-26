"use client";

import { title, subtitle } from "@/components/primitives";
import { siteConfig } from "@/config/site";
import { GithubIcon } from "@/components/icons";
import { button as buttonStyles } from "@heroui/theme";
import { Link } from "@heroui/link";

export default function Home() {
  return (
    <section className="relative  h-[80vh]  flex flex-col items-center justify-center text-center px-4">
      {/* Título Principal */}
      <h1 className={title()}>
        Hi, I’m <span className="text-primary">Braian Mendes</span>
      </h1>

      {/* Subtítulo */}
      <p className={subtitle({ class: "mt-4 max-w-lg" })}>
        Software Engineer crafting AI-powered solutions.
      </p>

      {/* Botões de Ação */}
      <div className="flex gap-4 mt-8">
        <Link
          href="/projects"
          className={buttonStyles({
            color: "primary",
            size: "lg",
            variant: "shadow",
            radius: "full",
          })}
        >
          Browse My Projects
        </Link>
        <Link
          isExternal
          href={siteConfig.links.github}
          className={buttonStyles({
            size: "lg",
            variant: "bordered",
            radius: "full",
          })}
        >
          <GithubIcon size={20} className="mr-2" />
          GitHub
        </Link>
      </div>
    </section>
  );
}