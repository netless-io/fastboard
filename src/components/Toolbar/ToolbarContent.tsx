import clsx from "clsx";
import Tippy from "@tippyjs/react";
import { ApplianceNames } from "white-web-sdk";
import { Button } from "./Button";
import { Icon } from "../../icons";
import { Icons } from "./icons";
import { ShapesButton } from "./ShapesButton";
import { ToolbarContext, type ToolName } from "./Toolbar";
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
  setActiveTool: React.Dispatch<React.SetStateAction<ToolName>>;
  activeTool: ToolName;
  theme: Theme;
};

export const ToolbarContent = React.memo((props: ContentProps) => {
  const { icons, methods } = useContext(ToolbarContext);
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

  useEffect(() => {
    setSectionHeight(computedSectionHeight(parentHeight - ItemHeight * 3));
  }, [parentHeight]);

  useEffect(() => {
    const container = ref.current?.parentElement?.parentElement;
    if (container) {
      const getAndSetParentHeight = () => {
        setParentHeight(container.getBoundingClientRect().height);
      };
      const resizeObserver = new ResizeObserver(getAndSetParentHeight);
      resizeObserver.observe(container);
      return () => resizeObserver.disconnect();
    }
  }, []);

  return (
    <>
      <UpButton needScroll={needScroll} scrollTo={scrollTo} />
      <div
        ref={ref}
        className="section"
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
          />
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
        <PencilButton {...props} />
        <TextButton {...props} />
        <ShapesButton {...props} />
        <Button
          content="Eraser"
          onClick={() => setActiveTool(ApplianceNames.eraser)}
        >
          <Icon
            fallback={
              <Icons.Eraser
                theme={theme}
                active={activeTool === ApplianceNames.eraser}
              />
            }
            src={icons?.eraserIcon}
            alt="[eraser]"
          />
        </Button>
        <Button content="CleanScene" onClick={methods?.cleanCurrentScene}>
          <Icon
            fallback={<Icons.Clean theme={theme} />}
            src={icons?.cleanIcon}
            alt="[clean]"
          />
        </Button>
        <Button content="Apps" onClick={() => console.log("test")}>
          <Icon
            fallback={<Icons.Apps theme={theme} />}
            src={icons?.cleanIcon}
            alt="[apps]"
          />
        </Button>
      </div>
      <DownButton needScroll={needScroll} scrollTo={scrollTo} />
    </>
  );
});

const renderPencilContent = (theme: Theme) => {
  return (
    <div className="pencil-wrapper">
      <ToolbarSlider setStrokeWidth={v => console.log(v)} strokeWidth={15} />
      <div className={clsx("line", theme)} />
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
  const { icons, theme } = useContext(ToolbarContext);
  return (
    <Tippy
      content={renderPencilContent(theme)}
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
        <span className="triangle" />
      </button>
    </Tippy>
  );
};

type RenderUpButton = PropsWithChildren<{
  needScroll: boolean;
  scrollTo: (height: number) => void;
}>;

const UpButton = React.memo((props: RenderUpButton) => {
  const { icons, theme } = useContext(ToolbarContext);
  return props.needScroll ? (
    <>
      <Button content="Up" onClick={() => props.scrollTo(-ItemHeight)}>
        <Icon
          fallback={<Icons.Up theme={theme} />}
          src={icons?.upIcon}
          alt="[up]"
        />
      </Button>
      <div className={clsx("line", theme)} />
    </>
  ) : null;
});

const DownButton = React.memo((props: RenderUpButton) => {
  const { icons, theme } = useContext(ToolbarContext);
  return props.needScroll ? (
    <>
      <div className={clsx("line", theme)} />
      <Button content="Down" onClick={() => props.scrollTo(ItemHeight)}>
        <Icon
          fallback={<Icons.Down theme={theme} />}
          src={icons?.downIcon}
          alt="[down]"
        />
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
        />
        <span className="triangle" />
      </button>
    </Tippy>
  );
};

export const ColorBox = () => {
  const { theme } = useContext(ToolbarContext);
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
          />
        </div>
      </div>
    );
  });
};