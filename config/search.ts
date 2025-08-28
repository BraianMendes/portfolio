export const searchConfig = {
  debounceMs:
    (typeof process !== "undefined" &&
      Number(process.env.NEXT_PUBLIC_SEARCH_DEBOUNCE_MS)) ||
    300,
  fuzzyThreshold:
    (typeof process !== "undefined" &&
      Number(process.env.NEXT_PUBLIC_SEARCH_FUZZY_THRESHOLD)) ||
    0.7,
} as const;
