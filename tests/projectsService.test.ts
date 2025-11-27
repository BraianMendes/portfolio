/// <reference types="vitest" />
import { describe, it, expect } from "vitest";

import { ProjectsService } from "@/lib/projects";
import type { IProjectsRepository } from "@/lib/projects";
import type { ProjectListItem } from "@/types/domain";
import { getDefaultSearchStrategy } from "@/lib/search/factory";

const items: ProjectListItem[] = [
  {
    id: "1",
    title: "A",
    description: "",
    overview: "",
    howItWorks: [],
    tools: ["ts"],
    limitations: [],
    image: "/a.png",
    tags: ["x"],
    slug: "a",
  },
];

class OkRepo implements IProjectsRepository {
  async getAll(): Promise<ProjectListItem[]> {
    return items;
  }
}

class FailingRepo implements IProjectsRepository {
  async getAll(): Promise<ProjectListItem[]> {
    throw new Error("boom");
  }
}

describe("ProjectsService", () => {
  it("listFilteredSafe returns ok on success", async () => {
    const svc = new ProjectsService(new OkRepo(), getDefaultSearchStrategy());
    const res = await svc.listFilteredSafe(
      { selectedTags: [], selectedTools: [], selectedGroups: [], searchText: "" },
      new Map(),
    );

    expect(res.ok).toBe(true);
    if (res.ok) {
      expect(res.value.length).toBe(1);
    }
  });

  it("listFilteredSafe returns err on repository failure", async () => {
    const svc = new ProjectsService(
      new FailingRepo(),
      getDefaultSearchStrategy(),
    );
    const res = await svc.listFilteredSafe(
      { selectedTags: [], selectedTools: [], selectedGroups: [], searchText: "" },
      new Map(),
    );

    expect(res.ok).toBe(false);
    if (!res.ok) {
      expect(res.error).toBeInstanceOf(Error);
    }
  });

  it("listFilteredSyncSafe wraps errors", () => {
    const svc = new ProjectsService(new OkRepo(), getDefaultSearchStrategy());
    const res = svc.listFilteredSyncSafe(
      items,
      { selectedTags: [], selectedTools: [], selectedGroups: [], searchText: "" },
      new Map(),
    );

    expect(res.ok).toBe(true);
  });
});
