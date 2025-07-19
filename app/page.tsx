"use client";

import { button as buttonStyles } from "@heroui/theme";
import { Link } from "@heroui/link";
import { Github } from "lucide-react";

import { title, subtitle } from "@/components/primitives";
import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <section className="relative  h-[80vh]  flex flex-col items-center justify-center text-center px-4">
      <h1 className={title()}>
        Hi, I’m <span className="text-primary">Braian Mendes</span>
      </h1>

      <p className={subtitle({ class: "mt-4 max-w-lg" })}>
        Software Engineer crafting AI-powered solutions.
      </p>

      <div className="flex gap-4 mt-8">
        <Link
          className={buttonStyles({
            color: "primary",
            size: "lg",
            variant: "shadow",
            radius: "full",
          })}
          href="/projects"
        >
          Browse My Projects
        </Link>
        <Link
          isExternal
          className={buttonStyles({
            size: "lg",
            variant: "bordered",
            radius: "full",
          })}
          href={siteConfig.links.github}
        >
          <Github className="mr-2" size={20} />
          GitHub
        </Link>
      </div>
    </section>
  );
}
