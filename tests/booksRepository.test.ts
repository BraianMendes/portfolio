/// <reference types="vitest" />
import { describe, it, expect } from "vitest";

import { BooksRepository } from "@/lib/books/repository";

describe("BooksRepository", () => {
  it("loads and parses books.json", async () => {
    const repo = new BooksRepository();
    const data = await repo.getAll();

    expect(Array.isArray(data)).toBe(true);
    if (data.length) {
      const b = data[0];
      expect(typeof b.id).toBe("number");
      expect(typeof b.title).toBe("string");
      expect(Array.isArray(b.area)).toBe(true);
    }
  });
});
