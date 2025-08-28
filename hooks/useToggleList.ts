"use client";

import { useCallback, useState } from "react";

export function useToggleList<T extends string | number>(initial: T[] = []) {
  const [list, setList] = useState<T[]>(initial);

  const toggle = useCallback((item: T) => {
    setList((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  }, []);

  const clear = useCallback(() => setList([]), []);

  return { list, setList, toggle, clear } as const;
}
