import { useCallback } from "react";
import { useFastboardApp, useFastboardValue } from "../hooks";

export function usePageControl() {
  const app = useFastboardApp();
  const pageIndex = useFastboardValue(app.sceneIndex);
  const pageCount = useFastboardValue(app.sceneLength);

  const addPage = useCallback(async () => {
    await app.manager.switchMainViewToWriter();
    app.room.putScenes(app.manager.mainViewSceneDir, [{}], pageIndex + 1);
    await app.manager.setMainViewSceneIndex(pageIndex + 1);
  }, [app, pageIndex]);

  const prevPage = useCallback(async () => {
    await app.manager.setMainViewSceneIndex(pageIndex - 1);
  }, [app, pageIndex]);

  const nextPage = useCallback(async () => {
    await app.manager.setMainViewSceneIndex(pageIndex + 1);
  }, [app, pageIndex]);

  return { pageIndex, pageCount, prevPage, nextPage, addPage };
}
