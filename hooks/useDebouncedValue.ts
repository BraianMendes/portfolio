"use client";

import { useEffect, useMemo, useState } from "react";

import { searchConfig } from "@/config";

export function useDebouncedValue<T>(
  value: T,
  delay = searchConfig.debounceMs,
) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);

    return () => clearTimeout(id);
  }, [value, delay]);

  return useMemo(() => debounced, [debounced]);
}
