"use client";

import { useCallback, useState } from "react";

export function useSearchQuery(initial = "") {
  const [query, setQuery] = useState(initial);

  const clear = useCallback(() => setQuery(""), []);
  const onChange = useCallback(
    (value: string | React.ChangeEvent<HTMLInputElement>) => {
      setQuery(typeof value === "string" ? value : value.target.value);
    },
    [],
  );

  return { query, setQuery, clear, onChange } as const;
}

export default useSearchQuery;
