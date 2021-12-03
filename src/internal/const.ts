import type { Tool } from "./typings";

export const ToolbarIcons: Partial<Record<Tool, [d: string, s: "stroke" | "fill", more: Tool[]]>> =
  {
    drawer: ["M17 5h4v4M7 5H3v4m14 10h4v-4M7 19H3v-4m2.5-7.5h13v9h-13z", "stroke", []],
    clicker: [
      "m7 5.072 10.33 7.892-4.879.549 3.232 5.598-.866.5-3.233-5.597-2.914 3.95L7 5.072Z",
      "fill",
      ["clicker", "drawer"],
    ],
  };
