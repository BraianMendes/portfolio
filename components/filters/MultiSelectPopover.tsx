"use client";

import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";

import { ChevronDown, Check } from "@/components/icons/index";

type MultiSelectPopoverProps<T extends string | number> = {
  label: string;
  items: T[];
  selected: T[];
  setSelected: (val: T[]) => void;
  allLabel?: string;
};

export function MultiSelectPopover<T extends string | number>({
  label,
  items,
  selected,
  setSelected,
  allLabel = "All",
}: MultiSelectPopoverProps<T>) {
  function toggleItem(item: T) {
    setSelected(
      selected.includes(item)
        ? selected.filter((i) => i !== item)
        : [...selected, item],
    );
  }
  function clearAll() {
    setSelected([]);
  }

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl shadow transition text-base font-medium border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 outline-none ${open ? "ring-2 ring-primary-500" : ""} ${selected.length ? "text-primary-400" : "text-neutral-200"}`}
          >
            {selected.length ? `${label}: ${selected.length}` : label}
            <ChevronDown
              className={`w-4 h-4 ml-1 transition-transform ${open ? "rotate-180" : ""}`}
            />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition duration-150 ease-out"
            enterFrom="opacity-0 scale-95 -translate-y-2"
            enterTo="opacity-100 scale-100 translate-y-0"
            leave="transition duration-100 ease-in"
            leaveFrom="opacity-100 scale-100 translate-y-0"
            leaveTo="opacity-0 scale-95 -translate-y-2"
          >
            <Popover.Panel className="absolute z-20 mt-2 w-56 rounded-xl shadow-2xl bg-neutral-900 ring-1 ring-black/30 flex flex-col max-h-72 overflow-auto">
              <button
                className={`text-left px-4 py-2 rounded-xl transition hover:bg-primary-900/10 focus:bg-primary-900/10 ${!selected.length ? "text-primary-400 font-semibold" : "text-neutral-200"}`}
                type="button"
                onClick={clearAll}
              >
                {allLabel}
              </button>
              <div className="h-px bg-neutral-800 my-1" />
              {items.map((item) => (
                <label
                  key={String(item)}
                  className={`flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-primary-900/10 rounded-xl transition ${selected.includes(item) ? "text-primary-400 font-semibold" : "text-neutral-200"}`}
                >
                  <input
                    checked={selected.includes(item)}
                    className="accent-primary-500 rounded mr-2"
                    type="checkbox"
                    onChange={() => toggleItem(item)}
                  />
                  {String(item)}
                  {selected.includes(item) && (
                    <Check className="w-4 h-4 text-primary-400 ml-auto" />
                  )}
                </label>
              ))}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

export default MultiSelectPopover;
