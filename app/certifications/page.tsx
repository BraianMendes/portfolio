"use client";

import { useState, useMemo, Fragment } from "react";
import { Card, CardBody, CardFooter, Image, Input } from "@heroui/react";
import { Transition, Dialog } from "@headlessui/react";
import clsx from "clsx";

import certificationsData from "./certifications.json";

import { X } from "@/components/icons/index";
import { title } from "@/components/primitives";
import MultiSelectPopover from "@/components/filters/MultiSelectPopover";
import { useToggleList } from "@/hooks/useToggleList";
import { useSearchQuery } from "@/hooks/useSearchQuery";
import { certificationsTechFilters as techFilters } from "@/config/certifications-tech-filters";
import { getFilterLabel } from "@/config/i18n";

type CertType = (typeof certificationsData)[number];

function getAllYears(data: typeof certificationsData) {
  const years = new Set<number>();

  data.forEach((cert) => {
    if (cert.date) years.add(new Date(cert.date).getFullYear());
  });

  return Array.from(years).sort((a, b) => b - a);
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

export default function CertificationsPage() {
  const allTags = useMemo(() => getAllTags(certificationsData), []);
  const allYears = useMemo(() => getAllYears(certificationsData), []);
  const allIssuers = useMemo(() => getAllIssuers(certificationsData), []);
  const { list: selectedTags, setList: setSelectedTags } =
    useToggleList<string>([]);
  const { list: selectedYears, setList: setSelectedYears } =
    useToggleList<number>([]);
  const { list: selectedIssuers, setList: setSelectedIssuers } =
    useToggleList<string>([]);
  const { list: selectedLanguages, toggle: toggleLanguageFilter } =
    useToggleList<string>([]);
  const { query: searchText, onChange: onSearchChange } = useSearchQuery("");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalCert, setModalCert] = useState<CertType | null>(null);
  const [modalMode, setModalMode] = useState<"card" | "image">("image");

  // tech filters imported from config

  const filtered = useMemo(
    () =>
      certificationsData.filter((cert) => {
        const year = new Date(cert.date).getFullYear();
        const tagMatch =
          !selectedTags.length ||
          cert.tags.some((t) => selectedTags.includes(t));
        const yearMatch = !selectedYears.length || selectedYears.includes(year);
        const issuerMatch =
          !selectedIssuers.length || selectedIssuers.includes(cert.issuer);
        const languageMatch =
          !selectedLanguages.length ||
          selectedLanguages.some((lang) => {
            const filter = techFilters.find((f) => f.name === lang);

            return filter && filter.tags.some((tag) => cert.tags.includes(tag));
          });
        const searchMatch =
          !searchText ||
          cert.title.toLowerCase().includes(searchText.toLowerCase()) ||
          cert.tags.some((t) =>
            t.toLowerCase().includes(searchText.toLowerCase()),
          ) ||
          cert.issuer.toLowerCase().includes(searchText.toLowerCase());

        return (
          tagMatch && yearMatch && issuerMatch && languageMatch && searchMatch
        );
      }),
    [
      selectedTags,
      selectedYears,
      selectedIssuers,
      selectedLanguages,
      searchText,
      techFilters,
    ],
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
          className="max-w-xs rounded-xl bg-neutral-900 border border-neutral-700 text-sm focus:ring-primary-500"
          placeholder="Search by title, area, institution..."
          value={searchText}
          onChange={onSearchChange}
        />
        <MultiSelectPopover
          allLabel={getFilterLabel("allAreas")}
          items={allTags}
          label="Areas"
          selected={selectedTags}
          setSelected={setSelectedTags}
        />
        <MultiSelectPopover
          allLabel={getFilterLabel("allYears")}
          items={allYears}
          label="Year"
          selected={selectedYears}
          setSelected={setSelectedYears}
        />
        <MultiSelectPopover
          allLabel={getFilterLabel("allInstitutions")}
          items={allIssuers}
          label="Institution"
          selected={selectedIssuers}
          setSelected={setSelectedIssuers}
        />
      </div>

      <div className="flex flex-wrap gap-3 mt-6 items-center">
        <span className="text-sm font-medium text-neutral-300 mr-2">
          Technologies:
        </span>
        {techFilters.map((filter) => {
          const Icon = filter.icon;
          const isSelected = selectedLanguages.includes(filter.name);

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
              onClick={() => toggleLanguageFilter(filter.name)}
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
              <button
                aria-label={`View certificate ${cert.title} in detail`}
                className="w-full h-[140px] bg-neutral-800 flex items-center justify-center rounded-t-2xl overflow-hidden group relative cursor-zoom-in"
                style={{ minHeight: 140, maxHeight: 180 }}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  openModal(cert, "image");
                }}
              >
                <Image
                  alt={cert.title}
                  className="object-contain py-1 w-full h-full transition-transform group-hover:scale-105"
                  height={140}
                  src={cert.image}
                  style={{ maxHeight: 180, maxWidth: "100%" }}
                  width={240}
                />
              </button>
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
                    className={
                      idx === 0
                        ? "text-sm font-semibold text-primary-300"
                        : "text-sm text-primary-300"
                    }
                    title={t}
                  >
                    {t}
                  </span>
                ))}
                <span className="text-xs text-neutral-400 ml-2">
                  {new Date(cert.date + "T00:00:00Z").toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                      timeZone: "UTC",
                    },
                  )}
                </span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Transition as={Fragment} show={modalOpen}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 flex items-center justify-center"
          open={modalOpen}
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div aria-hidden="true" className="fixed inset-0 bg-black/80" />
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
                aria-label="Close modal"
                className="absolute top-3 right-3 p-2 rounded-full bg-neutral-900/70 hover:bg-neutral-800 hover:text-white cursor-pointer transition z-50"
                onClick={closeModal}
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {modalCert && modalMode === "card" && (
                <>
                  <div className="w-full flex flex-col items-center mb-3">
                    <Image
                      alt={modalCert.title}
                      className="object-contain rounded-xl"
                      height={500}
                      src={modalCert.image}
                      style={{ maxHeight: 420, maxWidth: "100%" }}
                      width={800}
                    />
                  </div>
                  <div className="text-xl md:text-2xl font-bold text-white mb-1 text-center">
                    {modalCert.title}
                  </div>
                  <div className="text-sm text-neutral-500 mb-2">
                    {modalCert.issuer}
                  </div>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 mb-2 items-center">
                    {modalCert.tags.map((t, idx) => (
                      <span
                        key={t}
                        className={
                          idx === 0
                            ? "text-sm font-semibold text-primary-300"
                            : "text-sm text-primary-300"
                        }
                        title={t}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs text-neutral-400">
                    {new Date(modalCert.date + "T00:00:00Z").toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                        timeZone: "UTC",
                      },
                    )}
                  </div>
                  {modalCert.certificateUrl && (
                    <a
                      className="text-primary-400 underline mt-2 text-sm hover:text-primary-300"
                      href={modalCert.certificateUrl}
                      rel="noopener noreferrer"
                      target="_blank"
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
                    src={modalCert.image}
                    style={{ maxHeight: 420, maxWidth: "100%" }}
                    width={800}
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
