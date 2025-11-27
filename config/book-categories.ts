import type { LucideIcon } from "lucide-react";

import {
  BarChart3,
  Code2,
  Brain,
  Settings,
  Users,
  Palette,
} from "@/components/icons";

export type BookCategoryFilter = {
  name: string;
  icon: LucideIcon;
  areas: string[];
};

export const bookCategoryFilters: BookCategoryFilter[] = [
  {
    name: "Programming",
    icon: Code2,
    areas: ["Programming", "Software Engineering", "Development"],
  },
  {
    name: "Design",
    icon: Palette,
    areas: ["Design", "UI/UX", "Visual Design", "User Experience"],
  },
  {
    name: "Psychology",
    icon: Brain,
    areas: [
      "Psychology",
      "Decision Making",
      "Behavioral Science",
      "Cognitive Science",
    ],
  },
  {
    name: "Engineering",
    icon: Settings,
    areas: ["Software Engineering", "System Design", "Architecture"],
  },
  {
    name: "Data Science",
    icon: BarChart3,
    areas: ["Data Science", "Analytics", "Statistics", "Machine Learning"],
  },
  {
    name: "Leadership",
    icon: Users,
    areas: ["Leadership", "Management", "Business", "Team Building"],
  },
];
