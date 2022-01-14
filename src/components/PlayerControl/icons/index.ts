import { memo } from "preact/compat";
import { Loading } from "./Loading";
import { Pause } from "./Pause";
import { Play } from "./Play";

export const Icons = {
  Play: memo(Play),
  Pause: memo(Pause),
  Loading: memo(Loading),
};
