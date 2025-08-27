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
