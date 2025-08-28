/// <reference types="vitest" />
import { describe, it, expect, beforeEach, afterEach } from "vitest";

import type { ProjectListItem } from "@/types/domain";
import { ProjectsFilterConfigurator } from "@/lib/projects/configurator";
import { getDefaultSearchStrategy } from "@/lib/search/factory";

const projects: ProjectListItem[] = [
  {
    id: "1",
    title: "With GitHub",
    description: "",
    overview: "",
    howItWorks: [],
    tools: [],
    limitations: [],
    image: "/img.png",
    tags: [],
    slug: "with-gh",
    githubUrl: "https://github.com/example/repo",
  },
  {
    id: "2",
    title: "No GitHub",
    description: "",
    overview: "",
    howItWorks: [],
    tools: [],
    limitations: [],
    image: "/img.png",
    tags: [],
    slug: "no-gh",
  },
];

function withEnv(key: string, value: string | undefined, fn: () => void) {
  const prev = process.env[key];
  if (value === undefined) delete process.env[key];
  else process.env[key] = value;
  try {
    fn();
  } finally {
    if (prev === undefined) delete process.env[key];
    else process.env[key] = prev;
  }
}

describe("Projects extra specification via env flag", () => {
  const search = getDefaultSearchStrategy();
  const configurator = new ProjectsFilterConfigurator(search);

  beforeEach(() => {
    delete process.env.NEXT_PUBLIC_PROJECTS_ONLY_GITHUB;
  });

  afterEach(() => {
    delete process.env.NEXT_PUBLIC_PROJECTS_ONLY_GITHUB;
  });

  it("keeps all projects when flag is off", () => {
    const res = configurator.run(
      projects,
      { selectedTags: [], selectedTools: [], selectedGroups: [], searchText: "" },
      new Map(),
    );

    expect(res.map((p) => p.id)).toEqual(["1", "2"]);
  });

  it("filters to only GitHub projects when flag is on", () => {
    withEnv("NEXT_PUBLIC_PROJECTS_ONLY_GITHUB", "true", () => {
      const res = configurator.run(
        projects,
        { selectedTags: [], selectedTools: [], selectedGroups: [], searchText: "" },
        new Map(),
      );
      expect(res.map((p) => p.id)).toEqual(["1"]);
    });
  });
});
