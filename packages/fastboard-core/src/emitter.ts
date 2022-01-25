export type FastboardListener<T> = (event: T) => void;

export class FastboardEmitter<T> {
  listeners = new Set<FastboardListener<T>>();

  get length(): number {
    return this.listeners.size;
  }

  dispatch(message: T) {
    this.listeners.forEach(callback => callback(message));
  }

  addListener(listener: FastboardListener<T>) {
    this.listeners.add(listener);
  }

  removeListener(listener: FastboardListener<T>) {
    this.listeners.delete(listener);
  }
}
