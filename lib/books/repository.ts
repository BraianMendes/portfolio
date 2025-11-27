import { z } from "zod";

export type Book = {
  id: number;
  title: string;
  author: string;
  cover: string;
  area: string[];
  year: number;
  recommendation: string;
  slug: string;
};

const bookSchema = z.object({
  id: z.number(),
  title: z.string(),
  author: z.string(),
  cover: z.string(),
  area: z.array(z.string()),
  year: z.number(),
  recommendation: z.string(),
  slug: z.string(),
});

const booksSchema = z.array(bookSchema);

export interface IBooksRepository {
  getAll(): Promise<Book[]>;
}

export class BooksRepository implements IBooksRepository {
  async getAll(): Promise<Book[]> {
    const data = (await import("@/app/books/books.json")).default as unknown;

    const parsed = booksSchema.safeParse(data);

    if (!parsed.success) {
      const message = parsed.error.issues
        .map((e) => `${e.path.join(".")}: ${e.message}`)
        .join("; ");

      throw new Error(`Invalid books.json: ${message}`);
    }

    return parsed.data as Book[];
  }
}

export const booksRepository = new BooksRepository();
