"use client";

import { useState, useMemo } from "react";
import { Card, CardBody, CardFooter, Chip, Image } from "@heroui/react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

// Tipagem
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

import booksDataRaw from "./books.json";
const booksData: Book[] = booksDataRaw;

import { title } from "@/components/primitives";

// Helpers para pegar áreas e anos únicos
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

// Popover para filtro (reutilizável)
function FilterPopover({
    label,
    items,
    selected,
    setSelected,
    allLabel = "Todos"
}: {
    label: string;
    items: string[] | number[];
    selected: string | number | "";
    setSelected: (val: any) => void;
    allLabel?: string;
}) {
    return (
        <Popover className="relative">
            {({ open }) => (
                <>
                    <Popover.Button
                        className={`
              inline-flex items-center gap-2 px-3 py-1.5 rounded-lg shadow-sm
              text-sm font-medium outline-none border border-neutral-700
              bg-neutral-900 hover:bg-neutral-800 transition
              ${open ? "ring-2 ring-primary-500" : ""}
              ${selected ? "text-primary-400" : "text-neutral-200"}
            `}
                    >
                        {selected || label}
                        <ChevronDownIcon className={`w-4 h-4 ml-1 transition-transform ${open ? "rotate-180" : ""}`} />
                    </Popover.Button>
                    <Transition
                        enter="transition duration-150 ease-out"
                        enterFrom="opacity-0 scale-95 -translate-y-2"
                        enterTo="opacity-100 scale-100 translate-y-0"
                        leave="transition duration-100 ease-in"
                        leaveFrom="opacity-100 scale-100 translate-y-0"
                        leaveTo="opacity-0 scale-95 -translate-y-2"
                    >
                        <Popover.Panel className="absolute z-20 mt-2 w-44 rounded-lg shadow-xl bg-neutral-900 ring-1 ring-black/20 max-h-56 overflow-auto">
                            <button
                                onClick={() => setSelected("")}
                                className={`text-left px-4 py-2 rounded-lg w-full transition
                  hover:bg-primary-900/10 focus:bg-primary-900/10
                  ${!selected ? "text-primary-400 font-semibold" : "text-neutral-200"}
                `}
                            >
                                {allLabel}
                            </button>
                            <div className="h-px bg-neutral-800 my-1" />
                            {items.map((item) => (
                                <button
                                    key={item.toString()}
                                    onClick={() => setSelected(item)}
                                    className={`text-left px-4 py-2 rounded-lg w-full transition
                    hover:bg-primary-900/10 focus:bg-primary-900/10
                    ${selected === item ? "text-primary-400 font-semibold" : "text-neutral-200"}
                  `}
                                >
                                    {item}
                                </button>
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
    const [selectedArea, setSelectedArea] = useState<string>("");
    const [selectedYear, setSelectedYear] = useState<number | "">("");

    const filtered = useMemo(() => {
        return booksData.filter((book) => {
            const areaMatch = selectedArea ? book.area.includes(selectedArea) : true;
            const yearMatch = selectedYear ? book.year === selectedYear : true;
            return areaMatch && yearMatch;
        });
    }, [selectedArea, selectedYear]);

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h1 className={`${title()} mb-6`}>Books I Recommend</h1>
            <div className="flex flex-wrap gap-3 mb-8 items-center">
                <FilterPopover
                    label="Area"
                    items={allAreas}
                    selected={selectedArea}
                    setSelected={setSelectedArea}
                    allLabel="All Areas"
                />
                <FilterPopover
                    label="Year"
                    items={allYears}
                    selected={selectedYear}
                    setSelected={setSelectedYear}
                    allLabel="All Years"
                />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filtered.map((book) => (
                    <Card
                        key={book.slug}
                        isHoverable
                        className="flex flex-col transition hover:scale-[1.04] hover:shadow-xl rounded-2xl border border-neutral-800 bg-neutral-900"
                    >
                        <CardBody className="p-0">
                            <div className="w-full h-[270px] md:h-[340px] bg-neutral-800 flex items-center justify-center rounded-t-2xl overflow-hidden">
                                <Image
                                    alt={book.title}
                                    className="object-contain w-full h-full"
                                    height={340}
                                    src={book.cover}
                                    width={220}
                                    style={{ maxHeight: 340, maxWidth: "100%" }}
                                />
                            </div>
                        </CardBody>
                        <CardFooter className="flex flex-col items-start p-4 w-full">
                            <h3 className="text-sm font-semibold truncate w-full">{book.title}</h3>
                            <div className="text-xs text-gray-500 mb-2">{book.author}</div>
                            <div className="flex flex-wrap gap-1 mt-1">
                                {book.area.slice(0, 2).map((a) => (
                                    <Chip key={a} variant="flat" className="text-xs px-2 py-0.5">{a}</Chip>
                                ))}
                                <Chip color="default" variant="flat" className="text-xs px-2 py-0.5">{book.year}</Chip>
                            </div>
                            <div className="text-xs mt-2 text-gray-400">{book.recommendation}</div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
