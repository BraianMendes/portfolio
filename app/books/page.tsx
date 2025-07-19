"use client";

import { useState, useMemo, Fragment } from "react";
import { Card, CardBody, CardFooter, Image, Input } from "@heroui/react";
import { Popover, Transition } from "@headlessui/react";
import {
  ChevronDown,
  Check,
  BarChart3,
  Code2,
  Brain,
  Settings,
  Users,
  Palette,
} from "lucide-react";
import clsx from "clsx";

import booksDataRaw from "./books.json";

import { title } from "@/components/primitives";

type Book = {
  id: number;
  title: string;
  author: string;
  cover: string;
  area: string[];
  year: number;
  recommendation: string;
  slug: string;
};

const booksData: Book[] = booksDataRaw;

function getAllAreas(data: Book[]) {
  const set = new Set<string>();

  data.forEach((book) => book.area.forEach((a) => set.add(a)));

  return Array.from(set).sort();
}

function getAllYears(data: Book[]) {
  const set = new Set<number>();

  data.forEach((book) => set.add(book.year));

  return Array.from(set).sort((a, b) => b - a);
}

function MultiSelectPopover<T extends string | number>({
  label,
  items,
  selected,
  setSelected,
  allLabel = "All",
}: {
  label: string;
  items: T[];
  selected: T[];
  setSelected: (val: T[]) => void;
  allLabel?: string;
}) {
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
            <Popover.Panel className="absolute z-20 mt-2 w-52 rounded-xl shadow-2xl bg-neutral-900 ring-1 ring-black/30 flex flex-col max-h-72 overflow-auto">
              <button
                className={`text-left px-4 py-2 rounded-xl transition hover:bg-primary-900/10 focus:bg-primary-900/10 ${!selected.length ? "text-primary-400 font-semibold" : "text-neutral-200"}`}
                onClick={clearAll}
              >
                {allLabel}
              </button>
              <div className="h-px bg-neutral-800 my-1" />
              {items.map((item) => (
                <label
                  key={item.toString()}
                  className={`flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-primary-900/10 rounded-xl transition ${selected.includes(item) ? "text-primary-400 font-semibold" : "text-neutral-200"}`}
                >
                  <input
                    checked={selected.includes(item)}
                    className="accent-primary-500 rounded mr-2"
                    type="checkbox"
                    onChange={() => toggleItem(item)}
                  />
                  {item}
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

export default function BooksPage() {
  const allAreas = useMemo(() => getAllAreas(booksData), []);
  const allYears = useMemo(() => getAllYears(booksData), []);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");

  // Technology/Category filter definitions
  const categoryFilters = [
    {
      name: "Programming",
      icon: Code2,
      areas: ["Programming", "Software Engineering", "Development"],
    },
    {
      name: "Design",
      icon: Palette,
      areas: ["Design", "UI/UX", "Visual Design", "User Experience"],
    },
    {
      name: "Psychology",
      icon: Brain,
      areas: [
        "Psychology",
        "Decision Making",
        "Behavioral Science",
        "Cognitive Science",
      ],
    },
    {
      name: "Engineering",
      icon: Settings,
      areas: ["Software Engineering", "System Design", "Architecture"],
    },
    {
      name: "Data Science",
      icon: BarChart3,
      areas: ["Data Science", "Analytics", "Statistics", "Machine Learning"],
    },
    {
      name: "Leadership",
      icon: Users,
      areas: ["Leadership", "Management", "Business", "Team Building"],
    },
  ];

  const filtered = useMemo(() => {
    return booksData.filter((book) => {
      const areaMatch =
        !selectedAreas.length ||
        book.area.some((a) => selectedAreas.includes(a));
      const yearMatch =
        !selectedYears.length || selectedYears.includes(book.year);
      const categoryMatch =
        !selectedCategories.length ||
        selectedCategories.some((cat) => {
          const filter = categoryFilters.find((f) => f.name === cat);

          return (
            filter && filter.areas.some((area) => book.area.includes(area))
          );
        });
      const searchMatch =
        !searchText ||
        book.title.toLowerCase().includes(searchText.toLowerCase()) ||
        book.author.toLowerCase().includes(searchText.toLowerCase()) ||
        book.area.some((a) =>
          a.toLowerCase().includes(searchText.toLowerCase()),
        ) ||
        book.recommendation.toLowerCase().includes(searchText.toLowerCase());

      return areaMatch && yearMatch && categoryMatch && searchMatch;
    });
  }, [
    selectedAreas,
    selectedYears,
    selectedCategories,
    searchText,
    categoryFilters,
  ]);

  function toggleCategoryFilter(categoryName: string) {
    setSelectedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((c) => c !== categoryName)
        : [...prev, categoryName],
    );
  }

  return (
    <div className="px-4 sm:px-8 py-6 max-w-[1440px] mx-auto">
      <h1 className={`${title()} text-left`}>Books I Recommend</h1>
      <div className="flex flex-wrap gap-4 mt-8 items-center">
        <Input
          className="max-w-xs rounded-xl bg-neutral-900 border border-neutral-700 text-sm focus:ring-primary-500"
          placeholder="Search by title, author, area, year..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <MultiSelectPopover<string>
          allLabel="All Areas"
          items={allAreas}
          label="Areas"
          selected={selectedAreas}
          setSelected={setSelectedAreas}
        />
        <MultiSelectPopover<number>
          allLabel="All Years"
          items={allYears}
          label="Year"
          selected={selectedYears}
          setSelected={setSelectedYears}
        />
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-3 mt-6 items-center">
        <span className="text-sm font-medium text-neutral-300 mr-2">
          Categories:
        </span>
        {categoryFilters.map((filter) => {
          const Icon = filter.icon;
          const isSelected = selectedCategories.includes(filter.name);

          return (
            <button
              key={filter.name}
              className={clsx(
                "flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200",
                isSelected
                  ? "bg-primary-500/20 border-primary-500 text-primary-300"
                  : "bg-neutral-800/50 border-neutral-700 text-neutral-300 hover:bg-neutral-700/70 hover:border-neutral-600",
              )}
              title={`Filter by ${filter.name}`}
              onClick={() => toggleCategoryFilter(filter.name)}
            >
              <Icon size={16} />
              <span className="text-sm font-medium">{filter.name}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-10">
        {filtered.length === 0 && (
          <div className="col-span-full text-center text-neutral-400 text-lg py-12">
            No books found.
          </div>
        )}
        {filtered.map((book) => (
          <Card
            key={book.slug}
            isHoverable
            className="flex flex-col transition hover:scale-[1.04] hover:shadow-xl rounded-2xl border border-neutral-800 bg-neutral-900"
          >
            <CardBody className="p-0 flex flex-col">
              <div className="w-full h-[240px] md:h-[320px] bg-neutral-800 flex items-center justify-center rounded-t-2xl overflow-hidden">
                <Image
                  alt={book.title}
                  className="object-contain w-full h-full"
                  height={320}
                  src={book.cover}
                  style={{ maxHeight: 320, maxWidth: "100%" }}
                  width={220}
                />
              </div>
              <h3 className="font-bold mt-4 mb-1 text-white leading-snug text-base px-4 text-center">
                {book.title}
              </h3>
            </CardBody>
            <CardFooter className="flex flex-col items-start pt-3 pb-4 px-4 w-full">
              <div className="text-xs text-neutral-400 mb-1">{book.author}</div>
              <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 items-center">
                {book.area.map((a, idx) => (
                  <span
                    key={a}
                    className={
                      idx === 0
                        ? "text-sm font-semibold text-primary-300"
                        : "text-sm text-primary-300"
                    }
                    title={a}
                  >
                    {a}
                  </span>
                ))}
                <span className="text-xs text-neutral-400 ml-2">
                  {book.year}
                </span>
              </div>
              <div className="text-xs mt-2 text-gray-400">
                {book.recommendation}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
