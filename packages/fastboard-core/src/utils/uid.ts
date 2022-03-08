// Copy from https://github.com/crimx/side-effect-manager/blob/main/src/gen-uid.ts
const SOUP = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const SOUP_LEN = 62; // SOUP.length
const ID_LEN = 20;
const reusedIdCarrier = /* @__PURE__ */ Array(ID_LEN);

export function genUID() {
  for (let i = 0; i < ID_LEN; i++) {
    reusedIdCarrier[i] = SOUP.charAt(Math.random() * SOUP_LEN);
  }
  return reusedIdCarrier.join("");
}
