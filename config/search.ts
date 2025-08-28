export type SearchConfig = {
  debounceMs: number;
  fuzzyThreshold: number;
  strategyKind: "includes" | "token" | "fuzzy";
  cached: boolean;
  log?: boolean;
  timed?: boolean;
};

export function getSearchConfig(): SearchConfig {
  const debounceMs =
    (typeof process !== "undefined" &&
      Number(process.env.NEXT_PUBLIC_SEARCH_DEBOUNCE_MS)) ||
    300;

  const fuzzyThreshold =
    (typeof process !== "undefined" &&
      Number(process.env.NEXT_PUBLIC_SEARCH_FUZZY_THRESHOLD)) ||
    0.7;

  const strategyKind = ((typeof process !== "undefined" &&
    String(
      process.env.NEXT_PUBLIC_SEARCH_STRATEGY || "includes",
    ).toLowerCase()) ||
    "includes") as "includes" | "token" | "fuzzy";

  const cached =
    (typeof process !== "undefined" &&
      String(process.env.NEXT_PUBLIC_SEARCH_CACHED || "true")
        .toLowerCase()
        .trim() === "true") ||
    true;

  const log =
    typeof process !== "undefined" &&
    String(process.env.NEXT_PUBLIC_SEARCH_LOG || "false")
      .toLowerCase()
      .trim() === "true";

  const timed =
    typeof process !== "undefined" &&
    String(process.env.NEXT_PUBLIC_SEARCH_TIMED || "false")
      .toLowerCase()
      .trim() === "true";

  return {
    debounceMs,
    fuzzyThreshold,
    strategyKind,
    cached,
    log,
    timed,
  } as const;
}

// Backwards-compatible constant snapshot
export const searchConfig: SearchConfig = getSearchConfig();
