declare module "semver" {
  type Pre<T extends string> = T | `pre${T}`;
  const content: {
    inc: (version: string, type: Pre<"major" | "minor" | "patch"> | "prerelease", preid?: string) => string;
    valid: (version: string) => string | null;
  };
  export default content;
}
