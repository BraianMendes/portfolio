export {
  createSearchStrategy,
  getDefaultSearchStrategy,
  TokenSearchStrategy,
  FuzzySearchStrategy,
  CompositeSearchStrategy,
  LoggingSearchStrategy,
  TimedSearchStrategy,
  type SearchFactoryOptions,
} from "./factory";
export {
  stripDiacritics,
  normalize,
  IncludesSearchStrategy,
  CachedSearchStrategy,
  type SearchStrategy,
  type NormalizableProject,
} from "./text";
