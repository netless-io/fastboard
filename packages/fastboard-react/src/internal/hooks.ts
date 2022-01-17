import { useCallback, useEffect, useRef, useState } from "react";

export function useLastValue<T>(value: T) {
  const ref = useRef<T>(value);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export function useAsyncValue<T>(fn: () => Promise<T>) {
  const [value, setValue] = useState<T | null>(null);
  useEffect(() => {
    fn().then(setValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return value;
}

export function useForceUpdate() {
  const [, forceUpdate] = useState({});
  return useCallback(() => forceUpdate({}), []);
}
