export type RuntimeDisposer = () => unknown | Promise<unknown>;

// Release in reverse acquisition order; one failed cleanup must not skip the room.
export async function disposeRuntime(disposers: RuntimeDisposer[]): Promise<void> {
  for (const dispose of [...disposers].reverse()) {
    try {
      await dispose();
    } catch (error) {
      console.warn(error);
    }
  }
}
