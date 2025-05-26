"use client";

import { useState, useMemo } from "react";
import { Card, CardBody, CardFooter, Button, Chip, Image } from "@heroui/react";

import certificationsData from "./certifications.json";

import { title } from "@/components/primitives";

// Get all unique years from the certifications
function getAllYears(data: typeof certificationsData) {
  const years = new Set<string>();

  data.forEach((cert) => {
    if (cert.date) {
      years.add(new Date(cert.date).getFullYear().toString());
    }
  });

  return Array.from(years).sort((a, b) => Number(b) - Number(a));
}

// Get all unique tags from the certifications
function getAllTags(data: typeof certificationsData) {
  const tags = new Set<string>();

  data.forEach((cert) => {
    cert.tags.forEach((tag) => tags.add(tag));
  });

  return Array.from(tags).sort();
}

export default function CertificationsPage() {
  const allTags = useMemo(() => getAllTags(certificationsData), []);
  const allYears = useMemo(() => getAllYears(certificationsData), []);

  const [selectedTag, setSelectedTag] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");

  // Filter certifications by tag and year
  const filtered = useMemo(() => {
    return certificationsData.filter((cert) => {
      const tagMatch = selectedTag ? cert.tags.includes(selectedTag) : true;
      const yearMatch = selectedYear
        ? new Date(cert.date).getFullYear().toString() === selectedYear
        : true;

      return tagMatch && yearMatch;
    });
  }, [selectedTag, selectedYear]);

  return (
    <div className="px-8 py-6">
      <h1 className={title()}>Certifications</h1>
      <div className="flex gap-4 mt-6 flex-wrap">
        <div className="flex gap-2">
          <Button
            variant={!selectedTag ? "solid" : "light"}
            onPress={() => setSelectedTag("")}
          >
            All Areas
          </Button>
          {allTags.map((tag) => (
            <Button
              key={tag}
              variant={selectedTag === tag ? "solid" : "light"}
              onPress={() => setSelectedTag(tag)}
            >
              {tag}
            </Button>
          ))}
        </div>
        <div className="flex gap-2 ml-8">
          <Button
            variant={!selectedYear ? "solid" : "light"}
            onPress={() => setSelectedYear("")}
          >
            All Years
          </Button>
          {allYears.map((year) => (
            <Button
              key={year}
              variant={selectedYear === year ? "solid" : "light"}
              onPress={() => setSelectedYear(year)}
            >
              {year}
            </Button>
          ))}
        </div>
      </div>

      {/* Certification Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
        {filtered.map((cert) => (
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
              className="flex flex-col cursor-pointer"
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
                      },
                    )}
                  </Chip>
                </div>
              </CardFooter>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}
