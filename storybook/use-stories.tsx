/* eslint-disable @typescript-eslint/no-explicit-any */
import loadable from "@loadable/component";
import React, { useState } from "react";

const stories = import.meta.glob("../src/**/*.stories.{ts,tsx}");

type LoadFn = () => Promise<React.ComponentType>;

const wrapper =
  (path: string, fn: () => Promise<Record<string, any>>): LoadFn =>
  async () => {
    const exports = await fn();
    const components: [name: string, component: React.ComponentType][] = [];
    for (const name of Object.keys(exports)) {
      if (/^[A-Z]/.test(name)) {
        const story: React.ComponentType = exports[name];
        components.push([name, story]);
      }
    }
    const Component: React.FC = () => (
      <div className="file" data-path={path}>
        <div className="path">{path}</div>
        {components.map(([name, Component]) => (
          <Component key={name} />
        ))}
      </div>
    );
    Component.displayName = path;
    return Component;
  };

export default function useStories() {
  const [components] = useState(() => {
    const result: [path: string, component: React.ComponentType][] = [];
    for (const [path, fn] of Object.entries(stories)) {
      result.push([path, loadable(wrapper(path, fn))]);
    }
    return result;
  });
  return components;
}
