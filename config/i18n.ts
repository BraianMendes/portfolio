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
