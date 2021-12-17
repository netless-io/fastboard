import clsx from "clsx";
import Tippy from "@tippyjs/react";
import { ApplianceNames } from "white-web-sdk";
import { Button } from "./Button";
import { Icon } from "../../icons";
import { Icons } from "./icons";
import { ShapesButton } from "./ShapesButton";
import { themes } from "../../theme";
import { ToolbarContext } from "./Toolbar";
import { ToolbarSlider } from "./Slider";
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import type { Theme } from "../../types";

const ItemHeight = 28;
const ItemsCount = 9;

export type ContentProps = {
  setActiveTool: React.Dispatch<React.SetStateAction<ApplianceNames>>;
  activeTool: string;
  theme: Theme;
};

export const ToolbarContent = React.memo((props: ContentProps) => {
  const { icons } = useContext(ToolbarContext);
  const { theme, activeTool, setActiveTool } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [parentHeight, setParentHeight] = useState(0);
  const [needScroll, setNeedScroll] = useState(false);
  const [sectionHeight, setSectionHeight] = useState(200);

  const scrollTo = (height: number) => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollTop + height;
    }
  };

  const computedSectionHeight = (height: number) => {
    const maxHeight = ItemsCount * ItemHeight;
    const minHeight = ItemHeight * 2;
    if (height > maxHeight) {
      return maxHeight;
    } else {
      return height < minHeight ? minHeight : height;
    }
  };

  useEffect(() => {
    if (parentHeight < ItemHeight * (ItemsCount + 2.3)) {
      setNeedScroll(true);
    } else {
      setNeedScroll(false);
    }
  }, [parentHeight]);

  const getAndSetParentHeight = () => {
    if (ref.current) {
      const rect =
        ref.current.parentElement?.parentElement?.getBoundingClientRect();
      if (rect) {
        setParentHeight(rect.height);
      }
    }
  };

  const resizeListener = () => {
    window.requestAnimationFrame(() => getAndSetParentHeight());
  };

  useEffect(() => {
    setSectionHeight(computedSectionHeight(parentHeight - ItemHeight * 3));
  }, [parentHeight]);

  useEffect(() => {
    getAndSetParentHeight();
    window.addEventListener("resize", resizeListener);
    return () => window.removeEventListener("resize", resizeListener);
  }, []);

  return (
    <>
      <UpButton needScroll={needScroll} scrollTo={scrollTo} />
      <div
        className={clsx("section")}
        ref={ref}
        style={{ height: `${sectionHeight}px` }}
      >
        <Button
          content="Clicker"
          onClick={() => setActiveTool(ApplianceNames.clicker)}
        >
          <Icon
            fallback={
              <Icons.Clicker
                theme={theme}
                active={activeTool === ApplianceNames.clicker}
              />
            }
            src={icons?.clickerIcon}
            alt="[clicker]"
          ></Icon>
        </Button>
        <Button
          content="Selector"
          onClick={() => setActiveTool(ApplianceNames.selector)}
        >
          <Icon
            fallback={
              <Icons.Selector
                theme={theme}
                active={activeTool === ApplianceNames.selector}
              />
            }
            src={icons?.selectorIcon}
            alt="[selector]"
          />
        </Button>
        {PencilButton(props)}
        {TextButton(props)}
        <ShapesButton {...props} />
        <Button
          content="Eraser"
          onClick={() => setActiveTool(ApplianceNames.eraser)}
        >
          <Icons.Eraser
            theme={theme}
            active={activeTool === ApplianceNames.eraser}
          />
        </Button>
        <Button content="CleanScene" onClick={() => console.log("test")}>
          <Icons.Clean theme={theme} />
        </Button>
        <Button content="Apps" onClick={() => console.log("test")}>
          <Icons.Apps theme={theme} />
        </Button>
      </div>
      <DownButton needScroll={needScroll} scrollTo={scrollTo} />
    </>
  );
});

const renderPencilContent = () => {
  return (
    <div className="pencil-wrapper">
      <ToolbarSlider setStrokeWidth={v => console.log(v)} strokeWidth={15} />
      <div className="line"></div>
      <div className="color-box">{ColorBox()}</div>
    </div>
  );
};

const renderTextContent = () => {
  return (
    <div className="text-wrapper">
      <div className="color-box">{ColorBox()}</div>
    </div>
  );
};

const PencilButton = (props: ContentProps) => {
  const { icons } = useContext(ToolbarContext);
  return (
    <Tippy
      content={renderPencilContent()}
      theme={props.theme}
      placement="right"
      trigger="click"
      offset={[55, 15]}
      arrow={false}
      interactive={true}
    >
      <button
        className="button"
        onClick={() => props.setActiveTool(ApplianceNames.pencil)}
      >
        <Icon
          fallback={
            <Icons.Pencil
              theme={props.theme}
              active={props.activeTool === ApplianceNames.pencil}
            />
          }
          src={icons?.pencilIcon}
          alt="[pencil]"
        />
        <span className="triangle"></span>
      </button>
    </Tippy>
  );
};

type RenderUpButton = PropsWithChildren<{
  needScroll: boolean;
  scrollTo: (height: number) => void;
}>;

const UpButton = React.memo((props: RenderUpButton) => {
  const { icons } = useContext(ToolbarContext);
  return props.needScroll ? (
    <>
      <Button content="Up" onClick={() => props.scrollTo(-ItemHeight)}>
        <Icon fallback={<Icons.Up />} src={icons?.upIcon} alt="[up]" />
      </Button>
      <div className="line"></div>
    </>
  ) : null;
});

const DownButton = React.memo((props: RenderUpButton) => {
  const { icons } = useContext(ToolbarContext);
  return props.needScroll ? (
    <>
      <div className="line"></div>
      <Button content="Down" onClick={() => props.scrollTo(ItemHeight)}>
        <Icon fallback={<Icons.Down />} src={icons?.downIcon} alt="[down]" />
      </Button>
    </>
  ) : null;
});

const TextButton = (props: ContentProps) => {
  const { icons } = useContext(ToolbarContext);
  const { theme, activeTool, setActiveTool } = props;
  return (
    <Tippy
      content={renderTextContent()}
      theme={theme}
      placement="right"
      trigger="click"
      offset={[20, 15]}
      arrow={false}
      interactive={true}
    >
      <button
        className="button"
        onClick={() => setActiveTool(ApplianceNames.text)}
      >
        <Icon
          fallback={
            <Icons.Text
              theme={theme}
              active={activeTool === ApplianceNames.text}
            />
          }
          src={icons?.textIcon}
          alt="[text]"
        ></Icon>
        <span className="triangle"></span>
      </button>
    </Tippy>
  );
};

export const ColorBox = () => {
  const { theme } = useContext(ToolbarContext);
  const config = themes[theme];
  const [activeColor, setColor] = useState("red");
  const colors = [
    "white",
    "black",
    "red",
    "blue",
    "green",
    "yellow",
    "orange",
    "purple",
  ];
  const activeStyle = computedActiveStyle(config.activeColor);

  return colors.map((color: string) => {
    return (
      <div key={color} className="color-item">
        <div
          className={clsx(
            "color-border",
            { active: activeColor === color },
            theme
          )}
        >
          <div
            className="color-button"
            style={{ background: color }}
            onClick={() => setColor(color)}
          ></div>
        </div>
      </div>
    );
  });
};

const computedActiveStyle = (color: string): React.CSSProperties => {
  return { border: `1px solid ${color}`, borderRadius: "4px" };
};
