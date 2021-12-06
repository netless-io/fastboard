import type { Room } from "white-web-sdk";
import type { WindowManager } from "@netless/window-manager";
import React, { useEffect, useRef } from "react";
import SvelteRedoUndo from "../components/RedoUndo.svelte";
import version from "../version";

export { version };

export interface CommonProps {
  room?: Room;
  manager?: WindowManager;
}

export function RedoUndo({ room, manager }: CommonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const instance = useRef<SvelteRedoUndo>();

  useEffect(() => {
    if (ref.current) {
      instance.current = new SvelteRedoUndo({ target: ref.current });
    }
    return () => instance.current && instance.current.$destroy();
  }, []);

  useEffect(() => {
    if (instance.current) {
      instance.current.$set({ room, manager });
    }
  }, [room, manager]);

  return <div ref={ref} />;
}
