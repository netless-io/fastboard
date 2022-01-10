import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

type MaskProps = {
  children: React.ReactNode;
  toolbarRef: React.RefObject<HTMLDivElement>;
};

export const Mask = React.memo((props: MaskProps) => {
  const { toolbarRef } = props;
  const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const rootElement = createRootElement();
    if (rootElement && toolbarRef.current) {
      const toolbarRect = toolbarRef.current.getBoundingClientRect();
      const halfHeight = toolbarRect.height / 2 - 31;
      rootElement.style.top = halfHeight + "px";
      rootElement.style.left = "41px";
      rootElement.style.width = "17px";
      rootElement.style.height = "62px";
    }
    return () => {
      if (rootElement && toolbarRef.current) {
        toolbarRef.current.removeChild(rootElement);
      }
    };
  }, []);

  const createRootElement = () => {
    if (!rootElement) {
      const element = document.createElement("div");
      element.style.position = "absolute";
      if (props.toolbarRef.current) {
        props.toolbarRef.current.appendChild(element);
      }
      setRootElement(element);
      return element;
    } else {
      return rootElement;
    }
  };
  if (rootElement) {
    return ReactDOM.createPortal(props.children, rootElement);
  } else {
    return null;
  }
});
