"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

interface SmartTagsProps {
  tags: string[];
  tools: string[];
  maxVisibleTags?: number;
  className?: string;
}

const tagHierarchy = {
  primary: {
    tags: [
      "AI",
      "React",
      "Next.js",
      "Python",
      "JavaScript",
      "TypeScript",
      "Node.js",
    ],
    colors: "bg-blue-500/20 text-blue-300 border-blue-500/40",
    size: "text-sm font-semibold",
  },
  conceptual: {
    tags: [
      "Machine Learning",
      "NLP",
      "OCR",
      "Business Intelligence",
      "RAG",
      "Vector Search",
      "UI/UX",
    ],
    colors: "bg-purple-500/20 text-purple-300 border-purple-500/40",
    size: "text-sm font-medium",
  },
  secondary: {
    tags: [
      "Express.js",
      "Tailwind CSS",
      "HeroUI",
      "Framer Motion",
      "Groq",
      "LLaMA",
      "Tesseract.js",
    ],
    colors: "bg-green-500/20 text-green-300 border-green-500/40",
    size: "text-xs font-medium",
  },
  technical: {
    tags: [
      "WhatsApp Bot",
      "Document Processing",
      "PDF Export",
      "Custom RAG System",
      "Compromise",
    ],
    colors: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    size: "text-xs",
  },
};

function getTagCategory(tag: string): keyof typeof tagHierarchy {
  for (const [category, config] of Object.entries(tagHierarchy)) {
    if (
      config.tags.some(
        (t) =>
          tag.toLowerCase().includes(t.toLowerCase()) ||
          t.toLowerCase().includes(tag.toLowerCase()),
      )
    ) {
      return category as keyof typeof tagHierarchy;
    }
  }

  return "technical";
}

function sortTagsByPriority(tags: string[]): string[] {
  const priorityOrder = ["primary", "conceptual", "secondary", "technical"];

  return tags.sort((a, b) => {
    const categoryA = getTagCategory(a);
    const categoryB = getTagCategory(b);

    const priorityA = priorityOrder.indexOf(categoryA);
    const priorityB = priorityOrder.indexOf(categoryB);

    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }

    return a.length - b.length;
  });
}

export function SmartTags({
  tags,
  tools,
  maxVisibleTags = 3,
  className = "",
}: SmartTagsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const allTags = Array.from(new Set([...tags, ...tools]));
  const sortedTags = sortTagsByPriority(allTags);

  const visibleTags = sortedTags.slice(0, maxVisibleTags);
  const hiddenTags = sortedTags.slice(maxVisibleTags);
  const hasMoreTags = hiddenTags.length > 0;

  return (
    <div
      className={clsx("relative", className)}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="min-h-[3.5rem] relative overflow-hidden">
        <div className="flex flex-wrap gap-2 items-start">
          {visibleTags.map((tag, index) => {
            const category = getTagCategory(tag);
            const config = tagHierarchy[category];

            return (
              <motion.span
                key={`visible-${tag}`}
                animate={{ opacity: 1, scale: 1 }}
                className={clsx(
                  "px-2 py-1 rounded-md border transition-all duration-300",
                  "hover:scale-105 cursor-default",
                  "group-hover:shadow-lg group-hover:brightness-110",
                  config.colors,
                  config.size,
                )}
                initial={{ opacity: 0, scale: 0.8 }}
                title={tag}
                transition={{ delay: index * 0.05 }}
              >
                {tag}
              </motion.span>
            );
          })}

          {hasMoreTags && !isExpanded && (
            <motion.div
              animate={{ opacity: 1 }}
              className="px-2 py-1 rounded-md border border-neutral-600 bg-neutral-800/50 text-neutral-400 text-xs font-medium cursor-pointer hover:bg-neutral-700/50 transition-all duration-300 group-hover:bg-neutral-700/70 group-hover:text-neutral-300 group-hover:border-neutral-500"
              initial={{ opacity: 0 }}
              title={`+${hiddenTags.length} more tags`}
            >
              +{hiddenTags.length}
            </motion.div>
          )}
        </div>

        <AnimatePresence>
          {isExpanded && hasMoreTags && (
            <motion.div
              animate={{ opacity: 1, y: 0, height: "auto" }}
              className="mt-2 flex flex-wrap gap-2 items-start"
              exit={{ opacity: 0, y: -10, height: 0 }}
              initial={{ opacity: 0, y: 10, height: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {hiddenTags.map((tag, index) => {
                const category = getTagCategory(tag);
                const config = tagHierarchy[category];

                return (
                  <motion.span
                    key={`expanded-${tag}`}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className={clsx(
                      "px-2 py-1 rounded-md border transition-all duration-200",
                      "hover:scale-105 cursor-default",
                      config.colors,
                      config.size,
                      "shadow-lg backdrop-blur-sm",
                    )}
                    exit={{ opacity: 0, scale: 0.8, y: -10 }}
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    title={tag}
                    transition={{
                      delay: index * 0.03,
                      duration: 0.2,
                      ease: "easeOut",
                    }}
                  >
                    {tag}
                  </motion.span>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {hasMoreTags && !isExpanded && (
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-neutral-900/50 to-transparent pointer-events-none" />
      )}
    </div>
  );
}

export function TagBadge({
  tag,
  size = "sm",
  variant = "auto",
}: {
  tag: string;
  size?: "xs" | "sm" | "md";
  variant?: "auto" | "primary" | "conceptual" | "secondary" | "technical";
}) {
  const category = variant === "auto" ? getTagCategory(tag) : variant;
  const config =
    tagHierarchy[category as keyof typeof tagHierarchy] ||
    tagHierarchy.technical;

  const sizeClasses = {
    xs: "text-xs px-1.5 py-0.5",
    sm: "text-sm px-2 py-1",
    md: "text-base px-3 py-1.5",
  };

  return (
    <span
      className={clsx(
        "rounded-md border transition-all duration-200",
        "hover:scale-105 cursor-default",
        config.colors,
        sizeClasses[size],
      )}
      title={tag}
    >
      {tag}
    </span>
  );
}
