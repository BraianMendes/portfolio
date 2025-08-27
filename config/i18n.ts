export type Locale = "en" | "pt";

type FilterLabelKeys =
  | "allAreas"
  | "allYears"
  | "allInstitutions"
  | "allTags"
  | "allTools";

export const filterLabels: Record<Locale, Record<FilterLabelKeys, string>> = {
  en: {
    allAreas: "All Areas",
    allYears: "All Years",
    allInstitutions: "All Institutions",
    allTags: "All Tags",
    allTools: "All Tools",
  },
  pt: {
    allAreas: "Todas as áreas",
    allYears: "Todos os anos",
    allInstitutions: "Todas as instituições",
    allTags: "Todas as tags",
    allTools: "Todas as ferramentas",
  },
};

type UILabelKeys =
  | "projectsTitle"
  | "searchPlaceholder"
  | "technologies"
  | "noProjects"
  | "tags"
  | "tools"
  | "filterBy"
  | "reset";

export const uiLabels: Record<Locale, Record<UILabelKeys, string>> = {
  en: {
    projectsTitle: "Projects",
    searchPlaceholder: "Search by title, tag, tool...",
    technologies: "Technologies:",
    noProjects: "No projects found.",
    tags: "Tags",
    tools: "Tools",
    filterBy: "Filter by",
    reset: "Reset",
  },
  pt: {
    projectsTitle: "Projetos",
    searchPlaceholder: "Busque por título, tag, ferramenta...",
    technologies: "Tecnologias:",
    noProjects: "Nenhum projeto encontrado.",
    tags: "Tags",
    tools: "Ferramentas",
    filterBy: "Filtrar por",
    reset: "Limpar",
  },
};

export let defaultLocale: Locale = "en";

export function setDefaultLocale(locale: Locale) {
  defaultLocale = locale;
}

export function getFilterLabel(
  key: FilterLabelKeys,
  locale: Locale = defaultLocale,
): string {
  return filterLabels[locale][key];
}

export function getUILabel(
  key: UILabelKeys,
  locale: Locale = defaultLocale,
): string {
  return uiLabels[locale][key];
}
