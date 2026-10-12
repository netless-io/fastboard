/** Keep factory defaults readable by old dependencies while new consumers retain their source. */
const parameterLayersKey = "__netlessDynamicConfigLayers";
const forbidden = ["__proto__", "prototype", "constructor"];
function isPlainObject(value: unknown): value is Record<string, any> {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null)
  );
}
function mergeDefaults(defaults: Record<string, any>, explicit: Record<string, any>): Record<string, any> {
  const result = { ...defaults };
  Object.keys(explicit).forEach(key => {
    if (forbidden.indexOf(key) !== -1 || explicit[key] === undefined) return;
    result[key] =
      key !== "hotKeys" && key !== "floatBar" && isPlainObject(result[key]) && isPlainObject(explicit[key])
        ? mergeDefaults(result[key], explicit[key])
        : explicit[key];
  });
  return result;
}
export function withDynamicConfigDefaults<T extends object>(defaults: object, explicit: T): T {
  const result = mergeDefaults(defaults, explicit) as T;
  Object.defineProperty(result, parameterLayersKey, {
    value: { version: 1, defaults: { ...defaults }, explicit: { ...explicit } },
  });
  return result;
}
