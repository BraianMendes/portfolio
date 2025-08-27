import type { LucideIcon } from "lucide-react";

import { Brain, BarChart3, Cpu, Triangle } from "@/components/icons/index";
import {
  ReactIcon,
  CSSIcon,
  JavaScriptIcon,
  PythonIcon,
} from "@/components/icons/index";

export type TechFilter = {
  name: string;
  icon: LucideIcon;
  tags: string[];
};

export const techFilters: TechFilter[] = [
  {
    name: "JavaScript",
    icon: JavaScriptIcon,
    tags: ["JavaScript", "JS", "TypeScript"],
  },
  { name: "React", icon: ReactIcon, tags: ["React", "Next.js"] },
  { name: "Next.js", icon: Triangle, tags: ["Next.js"] },
  { name: "Python", icon: PythonIcon, tags: ["Python", "Tesseract.js", "OCR"] },
  { name: "CSS", icon: CSSIcon, tags: ["CSS", "Tailwind CSS", "Styling"] },
  {
    name: "AI/ML",
    icon: Brain,
    tags: [
      "AI",
      "Machine Learning",
      "NLP",
      "OCR",
      "Compromise",
      "Tesseract.js",
    ],
  },
  {
    name: "Frontend",
    icon: BarChart3,
    tags: [
      "React",
      "Next.js",
      "HeroUI",
      "Framer Motion",
      "TypeScript",
      "JavaScript",
    ],
  },
  {
    name: "UI/UX",
    icon: Cpu,
    tags: [
      "HeroUI",
      "Tailwind CSS",
      "next-themes",
      "Framer Motion",
      "UI",
      "Portfolio",
    ],
  },
];
