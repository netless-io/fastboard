import type { Room } from "@netless/window-manager";
import { useEffect, useState } from "react";

export function useWritable(room?: Room | null) {
  const [writable, setWritable] = useState(false);

  useEffect(() => {
    if (room) {
      setWritable(room.isWritable);
      room.isWritable && (room.disableSerialization = false);

      const updateWritable = () => setWritable(room.isWritable);
      room.callbacks.on("onEnableWriteNowChanged", updateWritable);

      return () => {
        room.callbacks.off("onEnableWriteNowChanged", updateWritable);
      };
    }
  }, [room]);

  return writable;
}
