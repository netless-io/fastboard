import type { RoomState, ViewVisionMode } from "white-web-sdk";
import type { CommonProps, GenericIcon } from "../types";

import clsx from "clsx";
import React, { useCallback, useEffect, useState } from "react";
import { Icon } from "../icons";
import { FilePlus } from "../icons/FilePlus";
import { ChevronLeft } from "../icons/ChevronLeft";
import { ChevronRight } from "../icons/ChevronRight";

export const name = "fastboard-page-control";

export type PageControlProps = CommonProps &
  GenericIcon<"add" | "prev" | "next">;

export function PageControl({
  room,
  manager,
  theme = "light",
  addIcon,
  addIconDisable,
  prevIcon,
  prevIconDisable,
  nextIcon,
  nextIconDisable,
}: PageControlProps) {
  const [writable, setWritable] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const addPage = useCallback(async () => {
    if (room?.isWritable) {
      const path = room.state.sceneState.scenePath;
      room.putScenes(path, [{}], pageIndex);
      if (manager) {
        await manager.setMainViewSceneIndex(pageIndex);
      }
    }
  }, [room, manager, pageIndex]);

  const prevPage = useCallback(() => {
    if (room?.isWritable) {
      if (manager) {
        manager.setMainViewSceneIndex(pageIndex - 1);
      } else {
        room.pptPreviousStep();
      }
    }
  }, [room, manager, pageIndex]);

  const nextPage = useCallback(() => {
    if (room?.isWritable) {
      if (manager) {
        manager.setMainViewSceneIndex(pageIndex + 1);
      } else {
        room.pptNextStep();
      }
    }
  }, [room, manager, pageIndex]);

  useEffect(() => {
    if (room) {
      setPageIndex(room.state.sceneState.index);
      setPageCount(room.state.sceneState.scenes.length);
    }

    const onRoomStateChanged = (modifyState: Partial<RoomState>) => {
      if (modifyState.sceneState) {
        setPageIndex(modifyState.sceneState.index);
        setPageCount(modifyState.sceneState.scenes.length);
      }
    };

    const onMainViewModeChanged = (mode: number) => {
      if (room && mode === (0 as ViewVisionMode.Writable)) {
        setPageIndex(room.state.sceneState.index);
        setPageCount(room.state.sceneState.scenes.length);
      }
    };

    if (room) {
      room.callbacks.on("onEnableWriteNowChanged", setWritable);
      room.callbacks.on("onRoomStateChanged", onRoomStateChanged);
      manager?.callbacks.on("mainViewModeChange", onMainViewModeChanged);
    }

    return () => {
      if (room) {
        room.callbacks.off("onEnableWriteNowChanged", setWritable);
        room.callbacks.off("onRoomStateChanged", onRoomStateChanged);
        manager?.callbacks.off("mainViewModeChange", onMainViewModeChanged);
      }
    };
  }, [room, manager]);

  const disabled = !writable;

  return (
    <div className={clsx(name, theme)}>
      <button
        className={clsx(`${name}-btn`, "add", theme)}
        disabled={disabled}
        onClick={addPage}
      >
        <Icon
          theme={theme}
          Fallback={FilePlus}
          src={disabled ? addIconDisable : addIcon}
          alt="[add]"
        />
      </button>
      <span className={clsx(`${name}-cut-line`, theme)} />
      <button
        className={clsx(`${name}-btn`, "prev", theme)}
        disabled={disabled || pageIndex === 0}
        onClick={prevPage}
      >
        <Icon
          theme={theme}
          Fallback={ChevronLeft}
          src={disabled ? prevIconDisable : prevIcon}
          alt="[prev]"
        />
      </button>
      <span className={clsx(`${name}-page`, theme)}>{pageIndex + 1}</span>
      <span className={clsx(`${name}-slash`, theme)}>/</span>
      <span className={clsx(`${name}-page-count`, theme)}>{pageCount}</span>
      <button
        className={clsx(`${name}-btn`, "next", theme)}
        disabled={disabled || pageIndex === pageCount - 1}
        onClick={nextPage}
      >
        <Icon
          theme={theme}
          Fallback={ChevronRight}
          src={disabled ? nextIconDisable : nextIcon}
          alt="[next]"
        />
      </button>
    </div>
  );
}
