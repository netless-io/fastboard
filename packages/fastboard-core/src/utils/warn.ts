const warnings = {
  "no-ppt-in-scenes":
    "You're probably inserting the slide app in a wrong way, there shouldn't exist `scenes[0].ppt`.",
} as const;
const warned = new Set<string>();

export function warn(id: keyof typeof warnings) {
  if (warned.has(id)) return;
  warned.add(id);
  console.warn(warnings[id]);
}
