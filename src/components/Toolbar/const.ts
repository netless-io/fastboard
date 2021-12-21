import type { IconProps } from "../../types";

import { ApplianceNames, ShapeType } from "white-web-sdk";
import { Icons } from "./icons";

export const ShapesMap: Partial<{
  [key in ApplianceNames | ShapeType]: React.ComponentType<IconProps>;
}> = {
  [ApplianceNames.rectangle]: Icons.Rectangle,
  [ApplianceNames.ellipse]: Icons.Circle,
  [ApplianceNames.straight]: Icons.Line,
  [ApplianceNames.arrow]: Icons.Arrow,
  [ShapeType.Pentagram]: Icons.Star,
  [ShapeType.Rhombus]: Icons.Diamond,
  [ShapeType.Triangle]: Icons.Triangle,
  [ShapeType.SpeechBalloon]: Icons.SpeechBalloon,
};

export const ItemHeight = 32;
export const ItemsCount = 8;
export const MaxHeight = ItemHeight * ItemsCount - 8;
export const MinHeight = ItemHeight * 2 - 8;
