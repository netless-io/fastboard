export type StatePair<KV extends Record<string, unknown>> = KV extends Record<
  infer K,
  infer T
>
  ? K extends string
    ? Record<K, T> & Record<`set${Capitalize<K>}`, (v: T) => void>
    : never
  : never;
