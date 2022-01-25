import { FastboardEmitter } from "./emitter";
import { noop } from "./utils";

export type FastboardDisposer = () => void;

export interface FastboardReadable<T> {
  readonly value: T;
  subscribe(callback: (value: T) => void): FastboardDisposer;
  reaction(callback: (value: T) => void): FastboardDisposer;
}

export interface FastboardWritable<T, SetFn = (value: T) => void> extends FastboardReadable<T> {
  setValue: SetFn;
}

export interface FastboardInternalValue<T> extends FastboardWritable<T> {
  dispose: FastboardDisposer;
}

/**
 * Create a readonly, reactive value.
 * @example
 * createValue(manager.getMainViewSceneIndex(), (set) => {
 *   manager.emitter.on("mainViewSceneIndexChanged", set)
 *   return () => manager.emitter.off("mainViewSceneIndexChanged", set)
 * })
 */
export function createValue<T>(
  value: T,
  effect: (set: (value: T) => void) => FastboardDisposer | void
): FastboardReadable<T>;

/**
 * Create a writable, reactive value.
 * @example
 * createValue(manager.getMainViewSceneIndex(), (set) => {
 *   manager.emitter.on("mainViewSceneIndexChanged", set)
 *   return () => manager.emitter.off("mainViewSceneIndexChanged", set)
 * }, (newValue) => {
 *   manager.setMainViewSceneIndex(newValue)
 * })
 */
export function createValue<T, SetFn = (value: T) => void>(
  value: T,
  effect: (set: (value: T) => void) => FastboardDisposer | void,
  set: (value: T) => void
): FastboardWritable<T, SetFn>;

export function createValue<T>(
  value: T,
  effect: (set: (value: T) => void) => FastboardDisposer | void,
  setValue: (value: T) => void = noop
): FastboardInternalValue<T> {
  const emitter = new FastboardEmitter<T>();

  function set(newValue: T) {
    emitter.dispatch((value = newValue));
  }

  const dispose = effect(set) || noop;

  function subscribe(callback: (value: T) => void) {
    emitter.addListener(callback);
    callback(value);
    return () => emitter.removeListener(callback);
  }

  function reaction(callback: (value: T) => void) {
    emitter.addListener(callback);
    return () => emitter.removeListener(callback);
  }

  return { value, subscribe, reaction, setValue, dispose };
}
