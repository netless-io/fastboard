/* eslint-disable @typescript-eslint/no-explicit-any */
import { noop } from "svelte/internal";

const listeners: Record<any, any[]> = {};
export const callbacks = {
  on(name: string, listener: any) {
    console.log("[room.callbacks] +=", name);
    (listeners[name] ||= []).push(listener);
  },
  off(name: string, listener: any) {
    console.log("[room.callbacks] -=", name);
    let callbacks = (listeners[name] as any[]) || [];
    if (listener) {
      callbacks = callbacks.filter(e => e !== listener);
    } else {
      callbacks = [];
    }
    if (callbacks.length) {
      listeners[name] = callbacks;
    } else {
      delete listeners[name];
    }
  },
  forwardTo: noop,
  once: noop,
};

export function trigger(
  name: `onCan${"Undo" | "Redo"}StepsUpdate`,
  arg: number
): void;

export function trigger(name: string, arg: any) {
  listeners[name].forEach(fn => fn(arg));
}
