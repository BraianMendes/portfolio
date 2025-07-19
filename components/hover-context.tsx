"use client";

import { useState, createContext, useContext } from "react";

interface HoverContextType {
  hoveredCardId: string | null;
  setHoveredCardId: (id: string | null) => void;
}

const HoverContext = createContext<HoverContextType>({
  hoveredCardId: null,
  setHoveredCardId: () => {},
});

export function HoverProvider({ children }: { children: React.ReactNode }) {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  return (
    <HoverContext.Provider value={{ hoveredCardId, setHoveredCardId }}>
      {children}
    </HoverContext.Provider>
  );
}

export function useHover() {
  const context = useContext(HoverContext);

  if (!context) {
    throw new Error("useHover must be used within a HoverProvider");
  }

  return context;
}
