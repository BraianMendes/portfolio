import type { LucideIcon } from "lucide-react";

import {
  RIcon,
  SQLIcon,
  ExcelIcon,
  TableauIcon,
  ArduinoIcon,
  RaspberryPiIcon,
  AIIcon,
  DataIcon,
  IoTIcon,
  PythonIcon,
} from "@/components/icons/index";

export type CertificationsTechFilter = {
  name: string;
  icon: LucideIcon;
  tags: string[];
};

export const certificationsTechFilters: CertificationsTechFilter[] = [
  { name: "Python", icon: PythonIcon, tags: ["Python"] },
  { name: "R", icon: RIcon, tags: ["R", "RStudio"] },
  { name: "SQL", icon: SQLIcon, tags: ["SQL"] },
  { name: "Excel", icon: ExcelIcon, tags: ["Excel"] },
  { name: "Tableau", icon: TableauIcon, tags: ["Tableau"] },
  { name: "Arduino", icon: ArduinoIcon, tags: ["Arduino"] },
  { name: "Raspberry Pi", icon: RaspberryPiIcon, tags: ["Raspberry Pi"] },
  {
    name: "AI",
    icon: AIIcon,
    tags: [
      "AI",
      "Artificial Intelligence",
      "Machine Learning",
      "Prompt Engineering",
    ],
  },
  {
    name: "Data",
    icon: DataIcon,
    tags: [
      "Data Analytics",
      "Data Science",
      "Data Analysis",
      "Big Data",
      "BI",
      "Dashboard",
      "Data Storytelling",
      "Data Visualization",
    ],
  },
  {
    name: "IoT",
    icon: IoTIcon,
    tags: ["IoT", "Internet of Things", "Robotics", "Micro:Bit"],
  },
];
