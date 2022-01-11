import type { Room, RoomState } from "white-web-sdk";
import type { WindowManager } from "@netless/window-manager";
import { useCallback, useEffect, useState } from "react";

export function usePageControl(
  room?: Room | null,
  manager?: WindowManager | null
) {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const addPage = useCallback(async () => {
    if (manager && room) {
      await manager.switchMainViewToWriter();
      const path = room.state.sceneState.contextPath;
      room.putScenes(path, [{}], pageIndex + 1);
      await manager.setMainViewSceneIndex(pageIndex + 1);
    } else if (!manager && room) {
      const path = room.state.sceneState.contextPath;
      room.putScenes(path, [{}], pageIndex + 1);
      room.setSceneIndex(pageIndex + 1);
    }
  }, [room, manager, pageIndex]);

  const prevPage = useCallback(() => {
    if (manager) {
      manager.setMainViewSceneIndex(pageIndex - 1);
    } else if (room) {
      room.pptPreviousStep();
    }
  }, [room, manager, pageIndex]);

  const nextPage = useCallback(() => {
    if (manager) {
      manager.setMainViewSceneIndex(pageIndex + 1);
    } else if (room) {
      room.pptNextStep();
    }
  }, [room, manager, pageIndex]);

  useEffect(() => {
    if (room) {
      setPageIndex(room.state.sceneState.index);
      setPageCount(room.state.sceneState.scenes.length);

      if (manager) {
        // TODO: on mainViewSceneIndexChanged
        manager.callbacks.on;
      } else {
        const onRoomStateChanged = (modifyState: Partial<RoomState>) => {
          if (modifyState.sceneState) {
            setPageIndex(modifyState.sceneState.index);
            setPageCount(modifyState.sceneState.scenes.length);
          }
        };

        room.callbacks.on("onRoomStateChanged", onRoomStateChanged);

        return () => {
          room.callbacks.off("onRoomStateChanged", onRoomStateChanged);
        };
      }
    }
  }, [room, manager]);

  return { pageIndex, pageCount, prevPage, nextPage, addPage };
}
