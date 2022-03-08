import { Component, h, render } from "preact";

export class App extends Component {
  render() {
    return <div>Hello</div>;
  }
}

export function mount(dom: HTMLElement) {
  render(<App />, dom);
}
