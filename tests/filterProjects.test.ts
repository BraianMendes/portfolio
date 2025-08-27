/// <reference types="vitest" />
import { describe, it, expect } from "vitest";

import { filterProjects, toTechMap } from "@/lib/projects/utils";
import { IncludesSearchStrategy } from "@/lib/search/text";

const projects = [
  {
    id: "1",
    title: "AI Client Reports",
    description: "Business insights",
    overview: "AI + RAG",
    howItWorks: [],
    tools: ["Node.js", "TypeScript"],
    limitations: [],
    image: "/images/1.png",
    tags: ["AI", "RAG"],
    slug: "ai-client-reports",
    githubUrl: "https://github.com/example",
  },
  {
    id: "2",
    title: "Portfolio Website",
    description: "Next.js portfolio",
    overview: "UI/UX",
    howItWorks: [],
    tools: ["Next.js", "Tailwind CSS"],
    limitations: [],
    image: "/images/2.png",
    tags: ["Portfolio", "Next.js"],
    slug: "portfolio",
  },
] as const;

const techFilters = toTechMap(
  [
    { name: "AI/ML", icon: {} as any, tags: ["AI", "RAG"] },
    { name: "Frontend", icon: {} as any, tags: ["Next.js", "Tailwind CSS"] },
  ] as any,
);

describe("filterProjects", () => {
  it("filters by tag", () => {
    const res = filterProjects(
      projects as any,
      { selectedTags: ["AI"], selectedTools: [], selectedLanguages: [], searchText: "" },
      techFilters,
      { searchStrategy: new IncludesSearchStrategy() },
    );

    expect(res).toHaveLength(1);
    expect(res[0].id).toBe("1");
  });

  it("filters by tech language group", () => {
    const res = filterProjects(
      projects as any,
      { selectedTags: [], selectedTools: [], selectedLanguages: ["Frontend"], searchText: "" },
      techFilters,
      { searchStrategy: new IncludesSearchStrategy() },
    );

    expect(res.map((p) => p.id)).toEqual(["2"]);
  });
});
