"use client";

import { useMemo } from "react";
import { Card, CardBody, CardFooter, Image, Input } from "@heroui/react";
import clsx from "clsx";

import booksDataRaw from "./books.json";

import { title } from "@/components/primitives";
import MultiSelectPopover from "@/components/filters/MultiSelectPopover";
import { useToggleList } from "@/hooks/useToggleList";
import { useSearchQuery } from "@/hooks/useSearchQuery";
import { bookCategoryFilters } from "@/config/book-categories";
import { getFilterLabel } from "@/config/i18n";

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

const booksData: Book[] = booksDataRaw as Book[];

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

export default function BooksPage() {
  const allAreas = useMemo(() => getAllAreas(booksData), []);
  const allYears = useMemo(() => getAllYears(booksData), []);
  const { list: selectedAreas, setList: setSelectedAreas } =
    useToggleList<string>([]);
  const { list: selectedYears, setList: setSelectedYears } =
    useToggleList<number>([]);
  const { list: selectedCategories, toggle: toggleCategoryFilter } =
    useToggleList<string>([]);
  const { query: searchText, onChange: onSearchChange } = useSearchQuery("");

  const categoryFilters = bookCategoryFilters;

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

  return (
    <div className="px-4 sm:px-8 py-6 max-w-[1440px] mx-auto">
      <h1 className={`${title()} text-left`}>Books I Recommend</h1>
      <div className="flex flex-wrap gap-4 mt-8 items-center">
        <Input
          className="max-w-xs rounded-xl bg-neutral-900 border border-neutral-700 text-sm focus:ring-primary-500"
          placeholder="Search by title, author, area, year..."
          value={searchText}
          onChange={onSearchChange}
        />
        <MultiSelectPopover<string>
          allLabel={getFilterLabel("allAreas")}
          items={allAreas}
          label="Areas"
          selected={selectedAreas}
          setSelected={setSelectedAreas}
        />
        <MultiSelectPopover<number>
          allLabel={getFilterLabel("allYears")}
          items={allYears}
          label="Year"
          selected={selectedYears}
          setSelected={setSelectedYears}
        />
      </div>

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
              type="button"
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
