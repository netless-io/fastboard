export const log = /* @__PURE__ */ console.log.bind(console);
export const delay = (ms: number) => new Promise<void>(r => setTimeout(r, ms));
