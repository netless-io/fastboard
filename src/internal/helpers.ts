export type TaskFn = () => Promise<void> | void;

export class Lock {
  running = false;
  private nextFn: TaskFn | null = null;
  schedule(fn: TaskFn) {
    if (this.running) {
      this.nextFn = fn;
    } else {
      this.running = true;
      Promise.resolve(fn()).then(this.step);
    }
  }
  private step = () => {
    if (this.nextFn) {
      const fn = this.nextFn;
      this.nextFn = null;
      Promise.resolve(fn()).then(this.step);
    } else {
      this.running = false;
    }
  };
}
