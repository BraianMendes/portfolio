import type { SearchStrategy, NormalizableProject } from "@/lib/search/text";

import { IncludesSearchStrategy } from "@/lib/search/text";
import { searchConfig } from "@/config/search";

export class TokenSearchStrategy
  implements SearchStrategy<NormalizableProject>
{
  matches(item: NormalizableProject, query: string): boolean {
    const q = query?.toLowerCase().trim() ?? "";

    if (!q) return true;

    const tokens = q.split(/\s+/).filter(Boolean);

    if (!tokens.length) return true;

    const haystack = [
      item.title ?? "",
      item.description ?? "",
      item.overview ?? "",
      ...(item.tags ?? []),
    ]
      .join(" \n ")
      .toLowerCase();

    return tokens.every((t) => haystack.includes(t));
  }
}

export class FuzzySearchStrategy
  implements SearchStrategy<NormalizableProject>
{
  constructor(private readonly threshold: number = 0.7) {}

  private levenshtein(a: string, b: string): number {
    const m = a.length;
    const n = b.length;

    if (m === 0) return n;

    if (n === 0) return m;

    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

    for (let i = 0; i <= m; i++) dp[i][0] = i;

    for (let j = 0; j <= n; j++) dp[0][j] = j;

    for (let i = 1; i <= m; i++) {
      const ca = a.charCodeAt(i - 1);

      for (let j = 1; j <= n; j++) {
        const cb = b.charCodeAt(j - 1);
        const cost = ca === cb ? 0 : 1;

        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1,
          dp[i - 1][j - 1] + cost,
        );
      }
    }

    return dp[m][n];
  }

  private similarity(a: string, b: string): number {
    const len = Math.max(a.length, b.length) || 1;
    const dist = this.levenshtein(a, b);

    return 1 - dist / len;
  }

  private bestFieldSimilarity(item: NormalizableProject, q: string): number {
    const haystacks = [
      item.title ?? "",
      item.description ?? "",
      item.overview ?? "",
      ...(item.tags ?? []),
    ];

    return haystacks.reduce((best, field) => {
      const sim = this.similarity(field.toLowerCase(), q);

      return Math.max(best, sim);
    }, 0);
  }

  matches(item: NormalizableProject, query: string): boolean {
    const q = (query || "").trim().toLowerCase();

    if (!q) return true;

    const quick = new TokenSearchStrategy();

    if (quick.matches(item, q)) return true;

    return this.bestFieldSimilarity(item, q) >= this.threshold;
  }
}

export class CompositeSearchStrategy
  implements SearchStrategy<NormalizableProject>
{
  constructor(
    private readonly primary: SearchStrategy<NormalizableProject>,
    private readonly secondary: SearchStrategy<NormalizableProject>,
  ) {}

  matches(item: NormalizableProject, query: string): boolean {
    return this.primary.matches(item, query)
      ? true
      : this.secondary.matches(item, query);
  }
}

export type SearchFactoryOptions = {
  kind?: "includes" | "token" | "fuzzy";
  cached?: boolean;
  fuzzyThreshold?: number;
};

function getCachedWrapper<T>(inner: SearchStrategy<T>) {
  const max = 500;
  const ttlMs = 60_000;
  const cache = new Map<string, { v: boolean; t: number }>();

  return new (class implements SearchStrategy<T> {
    matches(item: T, query: string): boolean {
      const key = JSON.stringify([item, query]);
      const now = Date.now();
      const cached = cache.get(key);

      if (cached && now - cached.t < ttlMs) {
        cache.delete(key);
        cache.set(key, { v: cached.v, t: now });

        return cached.v;
      }

      const v = inner.matches(item, query);

      cache.set(key, { v, t: now });

      if (cache.size > max) {
        const first = cache.keys().next().value as string | undefined;

        if (first) cache.delete(first);
      }

      return v;
    }
  })();
}

export function createSearchStrategy(
  options: SearchFactoryOptions = {},
): SearchStrategy<NormalizableProject> {
  const envKind = (process.env.NEXT_PUBLIC_SEARCH_STRATEGY || "").toLowerCase();
  const resolvedKind = (options.kind || envKind || "includes") as
    | "includes"
    | "token"
    | "fuzzy";

  const envThreshold = Number(process.env.NEXT_PUBLIC_SEARCH_FUZZY_THRESHOLD);
  const threshold = Number.isFinite(envThreshold)
    ? (envThreshold as number)
    : (options.fuzzyThreshold ?? searchConfig.fuzzyThreshold);

  let base: SearchStrategy<NormalizableProject>;

  if (resolvedKind === "token") {
    base = new TokenSearchStrategy();
  } else if (resolvedKind === "fuzzy") {
    base = new FuzzySearchStrategy(threshold ?? 0.7);
  } else {
    base = new IncludesSearchStrategy();
  }

  if (options.cached) {
    return getCachedWrapper(base);
  }

  return base;
}

let defaultStrategySingleton: SearchStrategy<NormalizableProject> | null = null;

export function getDefaultSearchStrategy(): SearchStrategy<NormalizableProject> {
  if (!defaultStrategySingleton) {
    const fuzzy = new FuzzySearchStrategy(searchConfig.fuzzyThreshold);
    const composite = new CompositeSearchStrategy(
      new IncludesSearchStrategy(),
      fuzzy,
    );

    defaultStrategySingleton = getCachedWrapper(composite);
  }

  return defaultStrategySingleton;
}
