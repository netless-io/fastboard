import type { RoomState, ViewVisionMode } from "white-web-sdk";
import type { CommonProps, GenericIcon } from "../types";

import clsx from "clsx";
import React, { useCallback, useEffect, useState } from "react";
import Tippy from "@tippyjs/react";

import { TopOffset } from "../theme";
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
  const [writable, setWritable] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const addPage = useCallback(async () => {
    if (manager && room) {
      await manager.switchMainViewToWriter();
      const path = room.state.sceneState.contextPath;
      room.putScenes(path, [{}], pageCount);
      await manager.setMainViewSceneIndex(pageIndex);
    } else if (!manager && room) {
      const path = room.state.sceneState.contextPath;
      room.putScenes(path, [{}], pageCount);
      room.setSceneIndex(pageIndex);
    }
  }, [room, manager, pageCount, pageIndex]);

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
      setWritable(room.isWritable);
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
      {/* <span className={clsx(`${name}-cut-line`, theme)} />{" "} */}
      <Tippy
        content="Prev Page"
        theme={theme}
        disabled={disabled}
        placement="top"
        duration={500}
        offset={TopOffset}
      >
        <button
          className={clsx(`${name}-btn`, "prev", theme)}
          disabled={disabled || pageIndex === 0}
          onClick={prevPage}
        >
          <Icon
            fallback={<ChevronLeft theme={theme} />}
            src={disabled ? prevIconDisable : prevIcon}
            alt="[prev]"
          />
        </button>
      </Tippy>
      <span className={clsx(`${name}-page`, theme)}>
        {pageCount === 0 ? "\u2026" : pageIndex + 1}
      </span>
      <span className={clsx(`${name}-slash`, theme)}>/</span>
      <span className={clsx(`${name}-page-count`, theme)}>{pageCount}</span>
      <Tippy
        content="Next Page"
        theme={theme}
        disabled={disabled}
        placement="top"
        duration={500}
        offset={TopOffset}
      >
        <button
          className={clsx(`${name}-btn`, "next", theme)}
          disabled={disabled || pageIndex === pageCount - 1}
          onClick={nextPage}
        >
          <Icon
            fallback={<ChevronRight theme={theme} />}
            src={disabled ? nextIconDisable : nextIcon}
            alt="[next]"
          />
        </button>
      </Tippy>
      <Tippy
        content="Add Page"
        theme={theme}
        disabled={disabled}
        placement="top"
        duration={500}
        offset={TopOffset}
      >
        <button
          className={clsx(`${name}-btn`, "add", theme)}
          disabled={disabled}
          onClick={addPage}
        >
          <Icon
            fallback={<FilePlus theme={theme} />}
            src={disabled ? addIconDisable : addIcon}
            alt="[add]"
          />
        </button>
      </Tippy>
    </div>
  );
}
