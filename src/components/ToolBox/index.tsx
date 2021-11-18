import type { MouseEvent } from "react";
import type { WhiteboardApp } from "../../internal";

import React, { useCallback } from "react";
import { ApplianceNames } from "white-web-sdk";
import { classNames } from "../../helpers/utils";

export interface ToolBoxProps {
  instance: WhiteboardApp;
  position?: "left" | "top";
}

const DefaultTools: ApplianceNames[] = [
  ApplianceNames.clicker,
  ApplianceNames.selector,
  ApplianceNames.pencil,
];

export function ToolBox({ instance, position = "left" }: ToolBoxProps) {
  const onClickTool = useCallback(
    (ev: MouseEvent<HTMLButtonElement>) => {
      const tool = ev.currentTarget.dataset.tool as ApplianceNames;
      instance.room && instance.room.setMemberState({ currentApplianceName: tool });
    },
    [instance]
  );

  const currentTool = instance.room?.state.memberState.currentApplianceName;

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
