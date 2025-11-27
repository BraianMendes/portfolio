/// <reference types="vitest" />
import { describe, it, expect, vi } from "vitest";

import {
  CachingProjectsRepository,
  LoggingProjectsRepository,
} from "@/lib/projects";
import type { IProjectsRepository } from "@/lib/projects";
import type { ProjectListItem } from "@/types/domain";

const sample: ProjectListItem[] = [
  {
    id: "1",
    title: "X",
    description: "",
    overview: "",
    howItWorks: [],
    tools: [],
    limitations: [],
    image: "/x.png",
    tags: ["t"],
    slug: "x",
  },
];

class StubRepo implements IProjectsRepository {
  calls = 0;
  async getAll(): Promise<ProjectListItem[]> {
    this.calls += 1;
    return sample;
  }
}

describe("Repository decorators", () => {
  it("CachingProjectsRepository caches getAll result", async () => {
    const stub = new StubRepo();
    const repo = new CachingProjectsRepository(stub);

    const a = await repo.getAll();
    const b = await repo.getAll();

    expect(a).toEqual(sample);
    expect(b).toEqual(sample);
    expect(stub.calls).toBe(1);
  });

  it("LoggingProjectsRepository logs a debug line", async () => {
    const stub = new StubRepo();
    const repo = new LoggingProjectsRepository(stub);

    const spy = vi.spyOn(console, "debug").mockImplementation(() => {});
    await repo.getAll();
    expect(spy).toHaveBeenCalledOnce();
    spy.mockRestore();
  });
});
