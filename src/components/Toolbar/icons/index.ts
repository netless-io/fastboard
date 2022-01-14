import { memo } from "preact/compat";
import { Apps } from "./Apps";
import { Arrow } from "./Arrow";
import { Circle } from "./Circle";
import { Clean } from "./Clean";
import { Clicker } from "./Clicker";
import { Collapse } from "./Collapse";
import { Diamond } from "./Diamond";
import { Down } from "./Down";
import { Eraser } from "./Eraser";
import { Expand } from "./Expand";
import { Line } from "./Line";
import { Pencil } from "./Pencil";
import { Rectangle } from "./Rectangle";
import { Selector } from "./Selector";
import { SpeechBalloon } from "./SpeechBalloon";
import { Star } from "./Star";
import { Text } from "./Text";
import { Triangle } from "./Triangle";
import { Up } from "./Up";

export const Icons = {
  Clicker: memo(Clicker),
  Collapse: memo(Collapse),
  Eraser: memo(Eraser),
  Expand: memo(Expand),
  Pencil: memo(Pencil),
  Selector: memo(Selector),
  Rectangle: memo(Rectangle),
  Text: memo(Text),
  Apps: memo(Apps),
  Clean: memo(Clean),
  Circle: memo(Circle),
  Line: memo(Line),
  Arrow: memo(Arrow),
  Star: memo(Star),
  Diamond: memo(Diamond),
  SpeechBalloon: memo(SpeechBalloon),
  Triangle: memo(Triangle),
  Up: memo(Up),
  Down: memo(Down),
};
