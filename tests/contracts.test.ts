/// <reference types="vitest" />
import { describe, it, expect } from "vitest";

import type { ProjectListItem } from "@/types/domain";
import { ByTitleAsc, ByTitleDesc, NoopSort } from "@/lib/projects/sorting";
import {
  AndSpecification,
  NotSpecification,
  OrSpecification,
  TagSpecification,
} from "@/lib/projects/specifications";

const a: ProjectListItem = {
  id: "a",
  title: "A",
  description: "",
  overview: "",
  howItWorks: [],
  tools: [],
  limitations: [],
  image: "/a.png",
  tags: ["x"],
  slug: "a",
};

const b: ProjectListItem = {
  ...a,
  id: "b",
  title: "B",
  slug: "b",
  tags: [],
};

describe("SortStrategy contracts", () => {
  it("NoopSort returns 0 for any pair", () => {
    const s = new NoopSort();
    expect(s.compare(a, b as any)).toBe(0);
    expect(s.compare(b, a as any)).toBe(0);
  });

  it("ByTitleAsc ordering is antisymmetric and transitive for two items", () => {
    const s = new ByTitleAsc();
    expect(s.compare(a, b)).toBeLessThan(0);
    expect(s.compare(b, a)).toBeGreaterThan(0);
    expect(s.compare(a, a)).toBe(0);
  });

  it("ByTitleDesc reverses ByTitleAsc", () => {
    const asc = new ByTitleAsc();
    const desc = new ByTitleDesc();
    expect(Math.sign(asc.compare(a, b))).toBe(-Math.sign(desc.compare(a, b)));
  });
});

describe("Specification contracts", () => {
  it("TagSpecification matches when tag present and is pure/idempotent", () => {
    const spec = new TagSpecification(["x"]);
    expect(spec.isSatisfiedBy(a)).toBe(true);
    expect(spec.isSatisfiedBy(a)).toBe(true);
    expect(spec.isSatisfiedBy(b)).toBe(false);
  });

  it("Combinators behave as expected", () => {
    const x = new TagSpecification(["x"]);
    const y = new TagSpecification(["y"]);
    expect(new OrSpecification([x, y]).isSatisfiedBy(a)).toBe(true);
    expect(new AndSpecification([x, y]).isSatisfiedBy(a)).toBe(false);
    expect(new NotSpecification(x).isSatisfiedBy(a)).toBe(false);
  });
});
