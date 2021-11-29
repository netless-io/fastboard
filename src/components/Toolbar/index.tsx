import React from "react";

export interface ToolbarProps {
  position: "top" | "bottom" | "left" | "right";
}

const NS = "agora-whiteboard-toolbar";

export default function Toolbar({ position }: ToolbarProps) {
  return (
    <div className={`${NS} ${position}`}>
      <div className={`${NS}-container`}>
        <button className={`${NS}-item clicker`} />
        <button className={`${NS}-item selector`} />
      </div>
    </div>
  );
}
