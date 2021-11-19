import type { MouseEvent } from "react";
import type { Room, RoomState } from "white-web-sdk";

import React, { useState, useCallback, useEffect } from "react";
import { ApplianceNames } from "white-web-sdk";

import { classNames } from "../../helpers/utils";

export interface ToolBoxProps {
  room: Room;
  position?: "left" | "top";
}

const DefaultTools: ApplianceNames[] = [
  ApplianceNames.clicker,
  ApplianceNames.selector,
  ApplianceNames.pencil,
];

export function ToolBox({ room, position = "left" }: ToolBoxProps) {
  const [currentTool, setTool] = useState(room.state.memberState.currentApplianceName);

  // listen to the change of the selected tool
  useEffect(() => {
    const listener = (e: Partial<RoomState>) => {
      e.memberState && setTool(e.memberState.currentApplianceName);
    };
    room.callbacks.on("onRoomStateChanged", listener);
    return () => {
      room.callbacks.off("onRoomStateChanged", listener);
    };
  }, [room]);

  const onClickTool = useCallback(
    (ev: MouseEvent<HTMLButtonElement>) => {
      const tool = ev.currentTarget.dataset.tool as ApplianceNames;
      if (tool in ApplianceNames) {
        room.setMemberState({ currentApplianceName: tool });
      }
    },
    [room]
  );

  return (
    <div className={classNames("tool-box", position)}>
      <div className={classNames("tool-box-container")}>
        {DefaultTools.map(tool => (
          <button
            key={tool}
            title={tool}
            data-tool={tool}
            className={classNames("tool-box-item", tool, { active: tool === currentTool })}
            onClick={onClickTool}
          />
        ))}
      </div>
    </div>
  );
}
