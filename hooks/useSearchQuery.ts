"use client";

import { useCallback, useState, type ChangeEvent } from "react";

type InputChange =
  | string
  | ChangeEvent<HTMLInputElement>
  | ChangeEvent<HTMLTextAreaElement>;

export function useSearchQuery(initial = "") {
  const [query, setQuery] = useState(initial);

  const clear = useCallback(() => setQuery(""), []);

  const onChange = useCallback((value: InputChange) => {
    const next = typeof value === "string" ? value : value.target.value;

    setQuery(next);
  }, []);

  return { query, setQuery, clear, onChange } as const;
}

export default useSearchQuery;
