import App from "./App.svelte";

(window as any).app = new App({ target: document.querySelector("#app") });
