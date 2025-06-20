"use client";

import { useState, useMemo, Fragment } from "react";
import { Card, CardBody, CardFooter, Image, Input, Chip } from "@heroui/react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/24/solid";
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
        setSelected(selected.includes(item) ? selected.filter((i) => i !== item) : [...selected, item]);
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
                        <ChevronDownIcon className={`w-4 h-4 ml-1 transition-transform ${open ? "rotate-180" : ""}`} />
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
                                onClick={clearAll}
                                className={`text-left px-4 py-2 rounded-xl transition hover:bg-primary-900/10 focus:bg-primary-900/10 ${!selected.length ? "text-primary-400 font-semibold" : "text-neutral-200"}`}
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
                                        type="checkbox"
                                        checked={selected.includes(item)}
                                        onChange={() => toggleItem(item)}
                                        className="accent-primary-500 rounded mr-2"
                                    />
                                    {item}
                                    {selected.includes(item) && <CheckIcon className="w-4 h-4 text-primary-400 ml-auto" />}
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
    const [searchText, setSearchText] = useState("");

    const filtered = useMemo(() => {
        return booksData.filter((book) => {
            const areaMatch = !selectedAreas.length || book.area.some((a) => selectedAreas.includes(a));
            const yearMatch = !selectedYears.length || selectedYears.includes(book.year);
            const searchMatch =
                !searchText ||
                book.title.toLowerCase().includes(searchText.toLowerCase()) ||
                book.author.toLowerCase().includes(searchText.toLowerCase()) ||
                book.area.some((a) => a.toLowerCase().includes(searchText.toLowerCase())) ||
                book.recommendation.toLowerCase().includes(searchText.toLowerCase());
            return areaMatch && yearMatch && searchMatch;
        });
    }, [selectedAreas, selectedYears, searchText]);

    return (
        <div className="px-4 sm:px-8 py-6 max-w-[1440px] mx-auto">
            <h1 className={`${title()} text-left`}>Books I Recommend</h1>
            <div className="flex flex-wrap gap-4 mt-8 items-center">
                <Input
                    placeholder="Search by title, author, area, year..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="max-w-xs rounded-xl bg-neutral-900 border border-neutral-700 text-sm focus:ring-primary-500"
                />
                <MultiSelectPopover<string>
                    label="Areas"
                    items={allAreas}
                    selected={selectedAreas}
                    setSelected={setSelectedAreas}
                    allLabel="All Areas"
                />
                <MultiSelectPopover<number>
                    label="Year"
                    items={allYears}
                    selected={selectedYears}
                    setSelected={setSelectedYears}
                    allLabel="All Years"
                />
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
                                    width={220}
                                    style={{ maxHeight: 320, maxWidth: "100%" }}
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
                                        className={idx === 0 ? "text-sm font-semibold text-primary-300" : "text-sm text-primary-300"}
                                        title={a}
                                    >
                                        {a}
                                    </span>
                                ))}
                                <span className="text-xs text-neutral-400 ml-2">
                                    {book.year}
                                </span>
                            </div>
                            <div className="text-xs mt-2 text-gray-400">{book.recommendation}</div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
