import type { Appliance, Color } from "@netless/fastboard-core";
import type { I18nData } from "../../../typings";
import Icons from "../../Icons";

export const colors: Record<string, Color> = {
  "#E02020": [224, 32, 32],
  "#F7B500": [247, 181, 0],
  "#6DD400": [109, 212, 0],
  "#32C5FF": [50, 197, 255],
  "#0091FF": [0, 145, 255],
  "#6236FF": [98, 54, 255],
  "#B620E0": [182, 32, 224],
  "#6D7278": [109, 114, 120],
};

export const shapes = [
  "rectangle",
  "ellipse",
  "straight",
  "arrow",
  "pentagram",
  "rhombus",
  "triangle",
  "speechBalloon",
] as const;

export type Shape = typeof shapes[number];

export const applianceShapes = shapes.slice(0, 4) as Appliance[];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const shapesIcon: Record<Shape, any> = {
  rectangle: Icons.Rectangle,
  ellipse: Icons.Circle,
  straight: Icons.Line,
  arrow: Icons.Arrow,
  pentagram: Icons.Star,
  rhombus: Icons.Rhombus,
  triangle: Icons.Triangle,
  speechBalloon: Icons.Balloon,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const shapesIconActive: Record<Shape, any> = {
  rectangle: Icons.RectangleBolded,
  ellipse: Icons.CircleBolded,
  straight: Icons.LineBolded,
  arrow: Icons.ArrowBolded,
  pentagram: Icons.StarBolded,
  rhombus: Icons.RhombusBolded,
  triangle: Icons.TriangleBolded,
  speechBalloon: Icons.BalloonBolded,
};

export const i18n: I18nData<
  "clicker" | "selector" | "pencil" | "text" | "shapes" | "eraser" | "clear" | "apps"
> = {
  en: {
    clicker: "clicker",
    selector: "selector",
    pencil: "pencil",
    eraser: "eraser",
    text: "text",
    shapes: "shapes",
    clear: "clear",
    apps: "apps",
  },
  "zh-CN": {
    clicker: "点击",
    selector: "选择",
    pencil: "铅笔",
    eraser: "橡皮",
    text: "文字",
    shapes: "形状",
    clear: "清屏",
    apps: "Apps",
  },
};

export const colorKeys = Object.keys(colors);
