"use client";

import { useState, useMemo } from "react";
import { Card, CardBody, CardFooter, Button, Chip, Image } from "@heroui/react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

import certificationsData from "./certifications.json";
import { title } from "@/components/primitives";

// Utilitários para pegar anos e tags únicos
function getAllYears(data: typeof certificationsData) {
  const years = new Set<string>();
  data.forEach((cert) => {
    if (cert.date) {
      years.add(new Date(cert.date).getFullYear().toString());
    }
  });
  return Array.from(years).sort((a, b) => Number(b) - Number(a));
}
function getAllTags(data: typeof certificationsData) {
  const tags = new Set<string>();
  data.forEach((cert) => {
    cert.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}

// ------ Component principal --------
export default function CertificationsPage() {
  const allTags = useMemo(() => getAllTags(certificationsData), []);
  const allYears = useMemo(() => getAllYears(certificationsData), []);
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");

  // Filtrando os certificados conforme seleção
  const filtered = useMemo(() => {
    return certificationsData.filter((cert) => {
      const tagMatch = selectedTag ? cert.tags.includes(selectedTag) : true;
      const yearMatch = selectedYear
        ? new Date(cert.date).getFullYear().toString() === selectedYear
        : true;
      return tagMatch && yearMatch;
    });
  }, [selectedTag, selectedYear]);

  // UI premium: botão popover customizado
  function FilterPopover({
    label,
    items,
    selected,
    setSelected,
    allLabel = "Todos",
  }: {
    label: string;
    items: string[];
    selected: string;
    setSelected: (val: string) => void;
    allLabel?: string;
  }) {
    return (
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl shadow transition
                text-base font-medium outline-none
                border border-neutral-700
                bg-neutral-900 hover:bg-neutral-800
                ${open ? "ring-2 ring-primary-500" : ""}
                ${selected ? "text-primary-400" : "text-neutral-200"}
              `}
            >
              {selected ? selected : label}
              <ChevronDownIcon
                className={`w-4 h-4 ml-1 transition-transform ${open ? "rotate-180" : ""}`}
              />
            </Popover.Button>
            <Transition
              enter="transition duration-150 ease-out"
              enterFrom="opacity-0 scale-95 -translate-y-2"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="transition duration-100 ease-in"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 -translate-y-2"
            >
              <Popover.Panel
                className="absolute z-20 mt-2 w-48 rounded-xl shadow-2xl bg-neutral-900 ring-1 ring-black/30
                flex flex-col max-h-72 overflow-auto"
              >
                <button
                  onClick={() => setSelected("")}
                  className={`text-left px-4 py-2 rounded-xl transition
                    hover:bg-primary-900/10 focus:bg-primary-900/10
                    ${!selected ? "text-primary-400 font-semibold" : "text-neutral-200"}
                  `}
                >
                  {allLabel}
                </button>
                <div className="h-px bg-neutral-800 my-1" />
                {items.map((item) => (
                  <button
                    key={item}
                    onClick={() => setSelected(item)}
                    className={`text-left px-4 py-2 rounded-xl transition
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

  return (
    <div className="px-8 py-6">
      <h1 className={title()}>Certifications</h1>

      {/* Filtros: Popover Dropdown */}
      <div className="flex flex-wrap gap-4 mt-8 items-center">
        <FilterPopover
          label="Areas"
          items={allTags}
          selected={selectedTag}
          setSelected={setSelectedTag}
          allLabel="All Areas"
        />
        <FilterPopover
          label="Ano"
          items={allYears}
          selected={selectedYear}
          setSelected={setSelectedYear}
          allLabel="Todos os Anos"
        />
      </div>

      {/* Grade de Certificados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
        {filtered.map((cert) =>
          cert.certificateUrl ? (
            <a
              key={cert.id}
              className="contents"
              href={cert.certificateUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Card
                isHoverable
                isPressable
                className="flex flex-col cursor-pointer transition duration-200 shadow-lg hover:shadow-2xl border border-neutral-800 hover:border-primary-500 bg-neutral-900"
              >
                <CardBody className="p-0">
                  <div className="w-full h-[120px] bg-neutral-800 flex items-center justify-center rounded-t-2xl overflow-hidden">
                    <Image
                      alt={cert.title}
                      className="object-contain py-1 w-full h-full"
                      height={120}
                      src={cert.image}
                      style={{ maxHeight: 120, maxWidth: "100%" }}
                      width={180}
                    />
                  </div>
                </CardBody>
                <CardFooter className="flex flex-col items-start p-4 w-full">
                  <h3 className="text-md font-semibold">{cert.title}</h3>
                  <div className="text-sm text-gray-500 my-1">{cert.issuer}</div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {cert.tags.map((t) => (
                      <Chip key={t} color="primary" variant="flat">
                        {t}
                      </Chip>
                    ))}
                    <Chip color="default" variant="flat">
                      {new Date(cert.date + "T00:00:00Z").toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "2-digit",
                          timeZone: "UTC",
                        }
                      )}
                    </Chip>
                  </div>
                </CardFooter>
              </Card>
            </a>
          ) : (
            <Card
              key={cert.id}
              isHoverable
              className="flex flex-col cursor-default transition duration-200 shadow-lg border border-neutral-800 bg-neutral-900"
            >
              <CardBody className="p-0">
                <div className="w-full h-[120px] bg-neutral-800 flex items-center justify-center rounded-t-2xl overflow-hidden">
                  <Image
                    alt={cert.title}
                    className="object-contain py-1 w-full h-full"
                    height={120}
                    src={cert.image}
                    style={{ maxHeight: 120, maxWidth: "100%" }}
                    width={180}
                  />
                </div>
              </CardBody>
              <CardFooter className="flex flex-col items-start p-4 w-full">
                <h3 className="text-md font-semibold">{cert.title}</h3>
                <div className="text-sm text-gray-500 my-1">{cert.issuer}</div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {cert.tags.map((t) => (
                    <Chip key={t} color="primary" variant="flat">
                      {t}
                    </Chip>
                  ))}
                  <Chip color="default" variant="flat">
                    {new Date(cert.date + "T00:00:00Z").toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                        timeZone: "UTC",
                      }
                    )}
                  </Chip>
                </div>
              </CardFooter>
            </Card>
          )
        )}
      </div>
    </div>
  );
}
