import type { i18n } from "i18next";
import type { Room } from "white-web-sdk";
import type { Theme } from "@netless/fastboard";

import clsx from "clsx";
import { useEffect, useState } from "preact/hooks";
import { room } from "./mock";
import {
  RedoUndo,
  Toolbar,
  PageControl,
  ZoomControl,
} from "@netless/fastboard";
import {
  PageControlControls,
  RedoUndoControls,
  ToolbarControls,
  WritableControls,
  ZoomControlControls,
} from "./controls";

export function Online({ dark, i18n }: { dark: boolean; i18n: i18n | null }) {
  const [writable, set_writable] = useState(true);
  const [redo_undo, set_redo_undo] = useState(true);
  const [page_control, set_page_control] = useState(true);
  const [zoom_control, set_zoom_control] = useState(true);
  const [toolbar, set_toolbar] = useState(true);

  useEffect(() => {
    room.setWritable(writable);
  }, [writable]);

  const theme: Theme = dark ? "dark" : "light";

  const props = { theme, room: room as unknown as Room, i18n };

  return (
    <>
      <div className={clsx("wrapper", { dark })}>
        <div className="left">{toolbar && <Toolbar {...props} />}</div>
        <div className="bottom-left">
          {redo_undo && <RedoUndo {...props} />}
          {zoom_control && <ZoomControl {...props} />}
        </div>
        <div className="bottom-right">
          {page_control && <PageControl {...props} />}
        </div>
      </div>
      <div className="bottom-hang">
        <WritableControls writable={writable} setWritable={set_writable} />
        <RedoUndoControls visible={redo_undo} setVisible={set_redo_undo} />
        <PageControlControls
          visible={page_control}
          setVisible={set_page_control}
        />
        <ZoomControlControls
          visible={zoom_control}
          setVisible={set_zoom_control}
        />
        <ToolbarControls visible={toolbar} setVisible={set_toolbar} />
      </div>
    </>
  );
}
