/// <reference types="vitest" />
import { describe, it, expect } from "vitest";

import type { ProjectListItem } from "@/types/domain";
import { ProjectsFilterBuilder } from "@/lib/projects/builder";
import { TagSpecification } from "@/lib/projects/specifications";

const items: ProjectListItem[] = [
  {
    id: "1",
    title: "A",
    description: "",
    overview: "",
    howItWorks: [],
    tools: [],
    limitations: [],
    image: "/a.png",
    tags: ["x"],
    slug: "a",
  },
  {
    id: "2",
    title: "B",
    description: "",
    overview: "",
    howItWorks: [],
    tools: [],
    limitations: [],
    image: "/b.png",
    tags: [],
    slug: "b",
  },
];

describe("ProjectsFilterBuilder", () => {
  it("applies extra specifications provided by builder", () => {
    const configurator = new ProjectsFilterBuilder()
      .withSpecification(new TagSpecification(["x"]))
      .build();

    const res = configurator.run(
      items,
      { selectedTags: [], selectedTools: [], selectedGroups: [], searchText: "" },
      new Map(),
    );

    expect(res.map((p) => p.id)).toEqual(["1"]);
  });
});
