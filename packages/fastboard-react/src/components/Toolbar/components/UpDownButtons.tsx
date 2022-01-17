import React, { useCallback, useContext } from "react";

import { Icon } from "../../../icons";
import { Icons } from "../icons";
import { Button } from "./Button";
import { CutLine } from "./CutLine";
import { ToolbarContext } from "../Toolbar";
import { ItemHeight } from "../const";

export interface UpButtonProps {
  disabled: boolean;
  scrollTo: (height: number) => void;
}

export function UpButton({ disabled, scrollTo }: UpButtonProps) {
  const { theme, icons } = useContext(ToolbarContext);
  const scrollUp = useCallback(() => scrollTo(-ItemHeight), [scrollTo]);

  return (
    <>
      <Button content="Up" disabled={disabled} onClick={scrollUp}>
        <Icon
          fallback={<Icons.Up theme={theme} />}
          src={disabled ? icons?.upIconDisable : icons?.upIcon}
          alt="[up]"
        />
      </Button>
      <CutLine />
    </>
  );
}

export function DownButton({ disabled, scrollTo }: UpButtonProps) {
  const { theme, icons } = useContext(ToolbarContext);
  const scrollDown = useCallback(() => scrollTo(ItemHeight), [scrollTo]);

  return (
    <>
      <CutLine />
      <Button content="Down" disabled={disabled} onClick={scrollDown}>
        <Icon
          fallback={<Icons.Down theme={theme} />}
          src={disabled ? icons?.downIconDisable : icons?.downIcon}
          alt="[down]"
        />
      </Button>
    </>
  );
}
