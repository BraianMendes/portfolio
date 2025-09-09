/// <reference types="vitest" />
import { describe, it, expect } from "vitest";

import { CertificationsRepository } from "@/lib/certifications/repository";

describe("CertificationsRepository", () => {
  it("loads and parses certifications.json", async () => {
    const repo = new CertificationsRepository();
    const data = await repo.getAll();

    expect(Array.isArray(data)).toBe(true);
    if (data.length) {
      const c = data[0];
      expect(typeof c.id).toBe("number");
      expect(typeof c.title).toBe("string");
      expect(Array.isArray(c.tags)).toBe(true);
    }
  });
});
