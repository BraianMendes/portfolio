export const QUERY_KEYS = {
  tags: "tags",
  tools: "tools",
  langs: "langs",
  q: "q",
} as const;

export type QueryKey = (typeof QUERY_KEYS)[keyof typeof QUERY_KEYS];
