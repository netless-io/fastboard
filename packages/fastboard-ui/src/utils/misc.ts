export const is_browser = typeof window !== "undefined";

export function clamp(value: number, min: number, max: number) {
  return value < min ? min : value > max ? max : value;
}
