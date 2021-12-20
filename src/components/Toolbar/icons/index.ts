import React from "react";
import { Apps } from "./Apps";
import { Arrow } from "./Arrow";
import { Circle } from "./Circle";
import { Clean } from "./Clean";
import { Clicker } from "./Clicker";
import { Collapse } from "./Collapse";
import { Diamond } from "./Diamond";
import { Eraser } from "./Eraser";
import { Expand } from "./Expand";
import { Line } from "./Line";
import { Pencil } from "./Pencil";
import { Rectangle } from "./Rectangle";
import { Selector } from "./Selector";
import { SpeechBalloon } from "./SpeechBalloon";
import { Star } from "./Star";
import { Text } from "./Text";
import { themes } from "../../../theme";
import { Triangle } from "./Triangle";
import { Up } from "./Up";
import { Down } from "./Down";
import type { IconProps } from "../../../types";

export const getStroke = (props: IconProps) => {
  let config;
  if (props.theme) {
    config = themes[props.theme];
  } else {
    config = themes.light;
  }
  return props.active ? config.activeColor : config.color;
};

export const Icons = {
  Clicker: React.memo(Clicker),
  Collapse: React.memo(Collapse),
  Eraser: React.memo(Eraser),
  Expand: React.memo(Expand),
  Pencil: React.memo(Pencil),
  Selector: React.memo(Selector),
  Rectangle: React.memo(Rectangle),
  Text: React.memo(Text),
  Apps: React.memo(Apps),
  Clean: React.memo(Clean),
  Circle: React.memo(Circle),
  Line: React.memo(Line),
  Arrow: React.memo(Arrow),
  Star: React.memo(Star),
  Diamond: React.memo(Diamond),
  SpeechBalloon: React.memo(SpeechBalloon),
  Triangle: React.memo(Triangle),
  Up: React.memo(Up),
  Down: React.memo(Down),
};
