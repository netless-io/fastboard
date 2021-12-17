import clsx from "clsx";
import React from "react";

export const Line = ({ theme }: { theme: string }) => {
  return <div className={clsx("line", theme)}></div>;
};
