"use client";

import { Input, Button } from "@heroui/react";
import clsx from "clsx";

import MultiSelectPopover from "@/components/filters/MultiSelectPopover";
import { techFilters } from "@/config/tech-filters";
import { getFilterLabel, getUILabel } from "@/config/i18n";

type Props = {
  searchText: string;
  onSearchChange: (val: string) => void;
  allTags: string[];
  selectedTags: string[];
  setSelectedTags: (val: string[]) => void;
  allTools: string[];
  selectedTools: string[];
  setSelectedTools: (val: string[]) => void;
  selectedGroups: string[];
  toggleGroupFilter: (name: string) => void;
  clearAll?: () => void;
  className?: string;
};

export function ProjectFilterBar({
  searchText,
  onSearchChange,
  allTags,
  selectedTags,
  setSelectedTags,
  allTools,
  selectedTools,
  setSelectedTools,
  selectedGroups,
  toggleGroupFilter,
  clearAll,
  className,
}: Props) {
  return (
    <div className={clsx("flex flex-col gap-4 mt-8", className)}>
      <div className="flex flex-wrap gap-4 items-center">
        <Input
          className="max-w-xs rounded-xl bg-neutral-900 border border-neutral-700 text-sm focus:ring-primary-500"
          placeholder={getUILabel("searchPlaceholder")}
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <MultiSelectPopover
          allLabel={getFilterLabel("allTags")}
          items={allTags}
          label={getUILabel("tags")}
          selected={selectedTags}
          setSelected={setSelectedTags}
        />
        <MultiSelectPopover
          allLabel={getFilterLabel("allTools")}
          items={allTools}
          label={getUILabel("tools")}
          selected={selectedTools}
          setSelected={setSelectedTools}
        />
        {clearAll && (
          <Button size="sm" variant="flat" onPress={clearAll}>
            {getUILabel("reset")}
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <span className="text-sm font-medium text-neutral-300 mr-2">
          {getUILabel("technologies")}
        </span>
        {techFilters.map((filter) => {
          const Icon = filter.icon;
          const isSelected = selectedGroups.includes(filter.name);

          return (
            <button
              key={filter.name}
              className={clsx(
                "flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200",
                isSelected
                  ? "bg-primary-500/20 border-primary-500 text-primary-300"
                  : "bg-neutral-800/50 border-neutral-700 text-neutral-300 hover:bg-neutral-700/70 hover:border-neutral-600",
              )}
              title={`${getUILabel("filterBy")} ${filter.name}`}
              type="button"
              onClick={() => toggleGroupFilter(filter.name)}
            >
              <Icon size={16} />
              <span className="text-sm font-medium">{filter.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ProjectFilterBar;
