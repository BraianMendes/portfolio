import type { IconComponent, IconProps } from "./types";

import {
  Github,
  Bot,
  Database,
  FileText,
  Zap,
  Search,
  Sun,
  Moon,
  Heart,
  ChevronDown,
  Check,
  X,
  Settings,
  Users,
  Palette,
  FileSpreadsheet,
  Code2,
  BarChart3,
  TrendingUp,
  Cpu,
  Wifi,
  Wrench,
  Crown,
  Paintbrush,
  Brain,
  Twitter,
  Mail,
  ExternalLink,
  Calendar,
  MapPin,
  Globe,
  Smartphone,
  Laptop,
  Monitor,
  Triangle,
  Terminal,
  HelpCircle,
  CircuitBoard,
  Table,
  Workflow,
  Sigma,
} from "lucide-react";

import { wrapLucide } from "./adapter";
import { Logo } from "./logo";

export const iconRegistry: Record<string, IconComponent> = {
  Github: wrapLucide(Github),
  Bot: wrapLucide(Bot),
  Database: wrapLucide(Database),
  FileText: wrapLucide(FileText),
  Zap: wrapLucide(Zap),
  Search: wrapLucide(Search),
  Sun: wrapLucide(Sun),
  Moon: wrapLucide(Moon),
  Heart: wrapLucide(Heart),
  ChevronDown: wrapLucide(ChevronDown),
  Check: wrapLucide(Check),
  X: wrapLucide(X),
  Settings: wrapLucide(Settings),
  Users: wrapLucide(Users),
  Palette: wrapLucide(Palette),
  FileSpreadsheet: wrapLucide(FileSpreadsheet),
  Code2: wrapLucide(Code2),
  BarChart3: wrapLucide(BarChart3),
  TrendingUp: wrapLucide(TrendingUp),
  Cpu: wrapLucide(Cpu),
  Wifi: wrapLucide(Wifi),
  Wrench: wrapLucide(Wrench),
  Crown: wrapLucide(Crown),
  Paintbrush: wrapLucide(Paintbrush),
  Brain: wrapLucide(Brain),
  Twitter: wrapLucide(Twitter),
  Mail: wrapLucide(Mail),
  ExternalLink: wrapLucide(ExternalLink),
  Calendar: wrapLucide(Calendar),
  MapPin: wrapLucide(MapPin),
  Globe: wrapLucide(Globe),
  Smartphone: wrapLucide(Smartphone),
  Laptop: wrapLucide(Laptop),
  Monitor: wrapLucide(Monitor),
  Triangle: wrapLucide(Triangle),
  Terminal: wrapLucide(Terminal),
  HelpCircle: wrapLucide(HelpCircle),

  AI: wrapLucide(Brain),
  Data: wrapLucide(BarChart3),
  IoT: wrapLucide(Cpu),
  Engineering: wrapLucide(Settings),
  Leadership: wrapLucide(Users),
  Design: wrapLucide(Palette),
  Excel: wrapLucide(FileSpreadsheet),
  JavaScript: wrapLucide(Code2),
  SQL: wrapLucide(Database),

  Python: wrapLucide(Workflow),
  React: wrapLucide(Monitor),
  R: wrapLucide(Sigma),
  Tableau: wrapLucide(Table),
  Arduino: wrapLucide(CircuitBoard),
  RaspberryPi: wrapLucide(Cpu),
  NextJS: wrapLucide(Monitor),
  CSS: wrapLucide(Paintbrush),

  AIIcon: wrapLucide(Brain),
  DataIcon: wrapLucide(BarChart3),
  IoTIcon: wrapLucide(Wifi),

  Logo,
  Discord: wrapLucide(Users),
};

export type IconName = keyof typeof iconRegistry;

function getFallback(): IconComponent {
  return iconRegistry.HelpCircle ?? wrapLucide(HelpCircle);
}

export function getIcon(name: IconName | string): IconComponent {
  return iconRegistry[name] || getFallback();
}

export function Icon({
  name,
  ...props
}: { name: IconName | string } & IconProps) {
  const Cmp = getIcon(name);

  return <Cmp {...props} />;
}
