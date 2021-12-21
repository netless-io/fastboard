import React, { useCallback, useContext } from "react";

import { Icon } from "../../../icons";
import { Icons } from "../icons";
import { Button } from "./Button";
import { CutLine } from "./CutLine";
import { ToolbarContext } from "../Toolbar";
import { ItemHeight } from "../const";

export interface UpButtonProps {
  scrollTo: (height: number) => void;
}

export function UpButton({ scrollTo }: UpButtonProps) {
  const { theme, icons, writable } = useContext(ToolbarContext);
  const scrollUp = useCallback(() => scrollTo(-ItemHeight), [scrollTo]);

  const disabled = !writable;

  return (
    <>
      <Button content="Up" onClick={scrollUp} disabled={disabled}>
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

export function DownButton({ scrollTo }: UpButtonProps) {
  const { theme, icons, writable } = useContext(ToolbarContext);
  const scrollDown = useCallback(() => scrollTo(ItemHeight), [scrollTo]);

  const disabled = !writable;

  return (
    <>
      <CutLine />
      <Button content="Down" onClick={scrollDown} disabled={disabled}>
        <Icon
          fallback={<Icons.Down theme={theme} />}
          src={disabled ? icons?.downIconDisable : icons?.downIcon}
          alt="[down]"
        />
      </Button>
    </>
  );
}
