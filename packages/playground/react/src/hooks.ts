import { useState, useEffect } from "react";

export function useAsyncValue<T>(fn: () => Promise<T>) {
  const [value, setValue] = useState<T | null>(null);
  useEffect(() => {
    fn().then(setValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return value;
}
