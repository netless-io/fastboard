import { ApplianceNames, ShapeType } from "white-web-sdk";
import { Icons } from "./icons";

export const ShapesMap = {
  [ApplianceNames.rectangle]: Icons.Rectangle,
  [ApplianceNames.ellipse]: Icons.Circle,
  [ApplianceNames.straight]: Icons.Line,
  [ApplianceNames.arrow]: Icons.Arrow,
  [ShapeType.Pentagram]: Icons.Star,
  [ShapeType.Rhombus]: Icons.Diamond,
  [ShapeType.Triangle]: Icons.Triangle,
  [ShapeType.SpeechBalloon]: Icons.SpeechBalloon,
} as const;

export const ApplianceShapes = [
  ApplianceNames.rectangle,
  ApplianceNames.ellipse,
  ApplianceNames.straight,
  ApplianceNames.arrow,
] as const;

export const Shapes = [
  ShapeType.Pentagram,
  ShapeType.Rhombus,
  ShapeType.Triangle,
  ShapeType.SpeechBalloon,
] as const;

export const ItemHeight = 32;
export const ItemsCount = 8;
export const MaxHeight = ItemHeight * ItemsCount - 8;
export const MinHeight = ItemHeight * 2 - 8;
