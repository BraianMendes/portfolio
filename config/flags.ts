export type FeatureFlags = {
  projectsOnlyGithub: boolean;
};

export function getFeatureFlags(): FeatureFlags {
  const projectsOnlyGithub =
    (typeof process !== "undefined" &&
      String(process.env.NEXT_PUBLIC_PROJECTS_ONLY_GITHUB || "")
        .toLowerCase()
        .trim() === "true") ||
    false;

  return { projectsOnlyGithub } as const;
}
