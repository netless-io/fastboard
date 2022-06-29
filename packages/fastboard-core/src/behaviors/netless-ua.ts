import { name, version } from "../index";

interface InjectTarget {
  __netlessUA?: string;
}

let injected = false;
export function ensureNetlessUA() {
  if (typeof window !== "undefined" && !injected) {
    injected = true;
    let str = (window as InjectTarget).__netlessUA || "";
    str += ` ${name}/${version} `;
    (window as InjectTarget).__netlessUA = str;
  }
}
