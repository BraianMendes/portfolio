"use client";

import { useState, useMemo, Fragment } from "react";
import { Card, CardBody, CardFooter, Image, Input } from "@heroui/react";
import { Popover, Transition, Dialog } from "@headlessui/react";
import { ChevronDownIcon, XMarkIcon, CheckIcon } from "@heroicons/react/24/solid";

import certificationsData from "./certifications.json";
import { title } from "@/components/primitives";

type CertType = (typeof certificationsData)[number];

function getAllYears(data: typeof certificationsData) {
  const years = new Set<string>();
  data.forEach((cert) => {
    if (cert.date) years.add(new Date(cert.date).getFullYear().toString());
  });
  return Array.from(years).sort((a, b) => Number(b) - Number(a));
}

function getAllTags(data: typeof certificationsData) {
  const tags = new Set<string>();
  data.forEach((cert) => cert.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}

function getAllIssuers(data: typeof certificationsData) {
  const issuers = new Set<string>();
  data.forEach((cert) => cert.issuer && issuers.add(cert.issuer));
  return Array.from(issuers).sort();
}

function MultiSelectPopover({
  label,
  items,
  selected,
  setSelected,
  allLabel = "All",
}: {
  label: string;
  items: string[];
  selected: string[];
  setSelected: (val: string[]) => void;
  allLabel?: string;
}) {
  function toggleItem(item: string) {
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
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl shadow transition text-base font-medium border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 outline-none ${open ? "ring-2 ring-primary-500" : ""
              } ${selected.length ? "text-primary-400" : "text-neutral-200"}`}
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
            <Popover.Panel className="absolute z-20 mt-2 w-56 rounded-xl shadow-2xl bg-neutral-900 ring-1 ring-black/30 flex flex-col max-h-72 overflow-auto">
              <button
                onClick={clearAll}
                className={`text-left px-4 py-2 rounded-xl transition hover:bg-primary-900/10 focus:bg-primary-900/10 ${!selected.length ? "text-primary-400 font-semibold" : "text-neutral-200"
                  }`}
              >
                {allLabel}
              </button>
              <div className="h-px bg-neutral-800 my-1" />
              {items.map((item) => (
                <label
                  key={item}
                  className={`flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-primary-900/10 rounded-xl transition ${selected.includes(item) ? "text-primary-400 font-semibold" : "text-neutral-200"
                    }`}
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

export default function CertificationsPage() {
  const allTags = useMemo(() => getAllTags(certificationsData), []);
  const allYears = useMemo(() => getAllYears(certificationsData), []);
  const allIssuers = useMemo(() => getAllIssuers(certificationsData), []);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [selectedIssuers, setSelectedIssuers] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalCert, setModalCert] = useState<CertType | null>(null);
  const [modalMode, setModalMode] = useState<"card" | "image">("image");

  const filtered = useMemo(
    () =>
      certificationsData.filter((cert) => {
        const year = new Date(cert.date).getFullYear().toString();
        const tagMatch = !selectedTags.length || cert.tags.some((t) => selectedTags.includes(t));
        const yearMatch = !selectedYears.length || selectedYears.includes(year);
        const issuerMatch = !selectedIssuers.length || selectedIssuers.includes(cert.issuer);
        const searchMatch =
          !searchText ||
          cert.title.toLowerCase().includes(searchText.toLowerCase()) ||
          cert.tags.some((t) => t.toLowerCase().includes(searchText.toLowerCase())) ||
          cert.issuer.toLowerCase().includes(searchText.toLowerCase());
        return tagMatch && yearMatch && issuerMatch && searchMatch;
      }),
    [selectedTags, selectedYears, selectedIssuers, searchText]
  );

  function openModal(cert: CertType, mode: "card" | "image" = "image") {
    setModalCert(cert);
    setModalOpen(true);
    setModalMode(mode);
  }
  function closeModal() {
    setModalOpen(false);
    setTimeout(() => setModalCert(null), 200);
  }

  return (
    <div className="px-4 sm:px-8 py-6 max-w-[1440px] mx-auto">
      <h1 className={title()}>Certifications</h1>

      <div className="flex flex-wrap gap-4 mt-8 items-center">
        <Input
          placeholder="Search by title, area, institution..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="max-w-xs rounded-xl bg-neutral-900 border border-neutral-700 text-sm focus:ring-primary-500"
        />
        <MultiSelectPopover label="Areas" items={allTags} selected={selectedTags} setSelected={setSelectedTags} allLabel="All Areas" />
        <MultiSelectPopover label="Year" items={allYears} selected={selectedYears} setSelected={setSelectedYears} allLabel="All Years" />
        <MultiSelectPopover
          label="Institution"
          items={allIssuers}
          selected={selectedIssuers}
          setSelected={setSelectedIssuers}
          allLabel="All Institutions"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-10">
        {filtered.length === 0 && (
          <div className="col-span-full text-center text-neutral-400 text-lg py-12">
            No certificates found.
          </div>
        )}
        {filtered.map((cert) => (
          <Card
            key={cert.id}
            isHoverable
            isPressable
            className="flex flex-col cursor-pointer min-h-[340px] bg-neutral-900 border border-neutral-800 shadow-lg transition duration-150 ease-out hover:shadow-xl focus:shadow-xl active:shadow-lg"
            onClick={() => openModal(cert, "card")}
          >
            <CardBody className="p-0 flex flex-col">
              <div
                className="w-full h-[140px] bg-neutral-800 flex items-center justify-center rounded-t-2xl overflow-hidden group relative"
                style={{ minHeight: 140, maxHeight: 180, cursor: "zoom-in" }}
                role="button"
                tabIndex={0}
                aria-label={`View certificate ${cert.title} in detail`}
                onClick={(e) => {
                  e.stopPropagation();
                  openModal(cert, "image");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openModal(cert, "image");
                  }
                }}
              >
                <Image
                  alt={cert.title}
                  className="object-contain py-1 w-full h-full transition-transform group-hover:scale-105"
                  height={140}
                  width={240}
                  src={cert.image}
                  style={{ maxHeight: 180, maxWidth: "100%" }}
                />
              </div>
              <h3 className="font-bold mt-4 mb-1 text-white leading-snug text-base px-4 self-start text-center">
                {cert.title}
              </h3>
            </CardBody>

            <CardFooter className="flex flex-col items-start pt-0 pb-4 px-4 w-full">
              <div className="text-xs text-neutral-400 mb-1">{cert.issuer}</div>
              <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 items-center">
                {cert.tags.map((t, idx) => (
                  <span
                    key={t}
                    className={idx === 0 ? "text-sm font-semibold text-primary-300" : "text-sm text-primary-300"}
                    title={t}
                  >
                    {t}
                  </span>
                ))}
                <span className="text-xs text-neutral-400 ml-2">
                  {new Date(cert.date + "T00:00:00Z").toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                    timeZone: "UTC",
                  })}
                </span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Transition show={modalOpen} as={Fragment}>
        <Dialog as="div" open={modalOpen} className="fixed inset-0 z-50 flex items-center justify-center" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/80" aria-hidden="true" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition duration-200 transform"
            enterFrom="scale-90 opacity-0"
            enterTo="scale-100 opacity-100"
            leave="transition duration-150 transform"
            leaveFrom="scale-100 opacity-100"
            leaveTo="scale-90 opacity-0"
          >
            <Dialog.Panel className="relative z-50 bg-neutral-950 rounded-2xl p-4 max-w-2xl w-full flex flex-col items-center outline-none shadow-2xl">
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 p-2 rounded-full bg-neutral-900/70 hover:bg-neutral-800 hover:text-white cursor-pointer transition z-50"
                aria-label="Close modal"
              >
                <XMarkIcon className="w-6 h-6 text-white" />
              </button>

              {modalCert && modalMode === "card" && (
                <>
                  <div className="w-full flex flex-col items-center mb-3">
                    <Image
                      alt={modalCert.title}
                      className="object-contain rounded-xl"
                      height={500}
                      width={800}
                      src={modalCert.image}
                      style={{ maxHeight: 420, maxWidth: "100%" }}
                    />
                  </div>
                  <div className="text-xl md:text-2xl font-bold text-white mb-1 text-center">{modalCert.title}</div>
                  <div className="text-sm text-neutral-500 mb-2">{modalCert.issuer}</div>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 mb-2 items-center">
                    {modalCert.tags.map((t, idx) => (
                      <span
                        key={t}
                        className={idx === 0 ? "text-sm font-semibold text-primary-300" : "text-sm text-primary-300"}
                        title={t}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs text-neutral-400">
                    {new Date(modalCert.date + "T00:00:00Z").toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                      timeZone: "UTC",
                    })}
                  </div>
                  {modalCert.certificateUrl && (
                    <a
                      href={modalCert.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-400 underline mt-2 text-sm hover:text-primary-300"
                    >
                      View original certificate
                    </a>
                  )}
                </>
              )}
              {modalCert && modalMode === "image" && (
                <div className="w-full flex flex-col items-center mb-3">
                  <Image
                    alt={modalCert.title}
                    className="object-contain rounded-xl"
                    height={500}
                    width={800}
                    src={modalCert.image}
                    style={{ maxHeight: 420, maxWidth: "100%" }}
                  />
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </div>
  );
}
