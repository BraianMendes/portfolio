export function stripDiacritics(text: string): string {
  return text?.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function normalize(text: string): string {
  return stripDiacritics((text ?? "").toLowerCase()).trim();
}

export interface SearchStrategy<T = unknown> {
  matches(item: T, query: string): boolean;
}

export type NormalizableProject = {
  title: string;
  description: string;
  overview: string;
  tags: string[];
};

export class IncludesSearchStrategy
  implements SearchStrategy<NormalizableProject>
{
  matches(item: NormalizableProject, query: string): boolean {
    const q = normalize(query);

    if (!q) {
      return true;
    }

    const title = normalize(item.title);
    const description = normalize(item.description);
    const overview = normalize(item.overview);
    const tags = item.tags.map((t) => normalize(t));

    return (
      title.includes(q) ||
      description.includes(q) ||
      overview.includes(q) ||
      tags.some((t) => t.includes(q))
    );
  }
}

export class CachedSearchStrategy<T extends { title: string }>
  implements SearchStrategy<T>
{
  private cache = new Map<string, boolean>();

  constructor(private readonly inner: SearchStrategy<T>) {}

  private key(item: T, query: string) {
    return `${normalize(item.title)}::${normalize(query)}`;
  }

  matches(item: T, query: string): boolean {
    const k = this.key(item, query);

    if (this.cache.has(k)) return this.cache.get(k)!;

    const res = this.inner.matches(item, query);

    this.cache.set(k, res);

    return res;
  }
}
