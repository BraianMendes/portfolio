/// <reference types="vitest" />
import { describe, it, expect, beforeEach } from "vitest";

import { IncludesSearchStrategy } from "@/lib/search/text";
import {
  createSearchStrategy,
  TokenSearchStrategy,
  FuzzySearchStrategy,
} from "@/lib/search/factory";
import type { NormalizableProject } from "@/lib/search/text";

const item: NormalizableProject = {
  title: "AI Client Reports",
  description: "Business insights",
  overview: "RAG and vector search",
  tags: ["AI", "RAG"],
};

// Helper to set and reset env
const withEnv = (key: string, value: string | undefined, fn: () => void) => {
  const prev = process.env[key];
  if (value === undefined) delete process.env[key];
  else process.env[key] = value;
  try {
    fn();
  } finally {
    if (prev === undefined) delete process.env[key];
    else process.env[key] = prev;
  }
};

describe("createSearchStrategy", () => {
  beforeEach(() => {
    delete process.env.NEXT_PUBLIC_SEARCH_STRATEGY;
    delete process.env.NEXT_PUBLIC_SEARCH_FUZZY_THRESHOLD;
  });

  it("defaults to includes", () => {
    const s = createSearchStrategy();
    expect(s).toBeInstanceOf(IncludesSearchStrategy);
  });

  it("respects kind option", () => {
    expect(createSearchStrategy({ kind: "token" })).toBeInstanceOf(
      TokenSearchStrategy,
    );
    expect(createSearchStrategy({ kind: "fuzzy" })).toBeInstanceOf(
      FuzzySearchStrategy,
    );
  });

  it("respects env flag", () => {
    withEnv("NEXT_PUBLIC_SEARCH_STRATEGY", "token", () => {
      expect(createSearchStrategy()).toBeInstanceOf(TokenSearchStrategy);
    });
  });

  it("passes fuzzy threshold from env", () => {
    withEnv("NEXT_PUBLIC_SEARCH_FUZZY_THRESHOLD", "0.9", () => {
      const s = createSearchStrategy({ kind: "fuzzy" }) as FuzzySearchStrategy;
      expect((s as any).threshold).toBeDefined();
    });
  });
});

describe("strategies", () => {
  it("token strategy matches all tokens (AND)", () => {
    const s = new TokenSearchStrategy();
    expect(s.matches(item, "AI Reports")).toBe(true);
    expect(s.matches(item, "AI missingword")).toBe(false);
  });

  it("fuzzy strategy matches near strings", () => {
    const s = new FuzzySearchStrategy(0.6);
    expect(s.matches(item, "client report")).toBe(true);
    expect(s.matches(item, "portfolio"))
      .toBe(false);
  });
});
