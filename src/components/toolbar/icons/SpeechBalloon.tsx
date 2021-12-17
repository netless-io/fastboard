import React from "react";
import type { IconProps } from "../../../types";
import { getStroke } from "./index";

export const SpeechBalloon = (props: IconProps) => {
  const stroke = getStroke(props);
  return (
    <svg width="24px" height="24px" viewBox="0 0 24 24">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(-168.000000, -193.000000)" stroke={stroke}>
          <g transform="translate(96.000000, 153.000000)">
            <g transform="translate(72.000000, 40.000000)">
              <path d="M17,4.5 C17.4142136,4.5 17.7892136,4.66789322 18.0606602,4.93933983 C18.3321068,5.21078644 18.5,5.58578644 18.5,6 L18.5,6 L18.5,15 C18.5,15.4142136 18.3321068,15.7892136 18.0606602,16.0606602 C17.7892136,16.3321068 17.4142136,16.5 17,16.5 L17,16.5 L12.7928932,16.5 L10.0777124,19.2151808 L8.26759188,16.5 L7,16.5 C6.58578644,16.5 6.21078644,16.3321068 5.93933983,16.0606602 C5.66789322,15.7892136 5.5,15.4142136 5.5,15 L5.5,15 L5.5,6 C5.5,5.58578644 5.66789322,5.21078644 5.93933983,4.93933983 C6.21078644,4.66789322 6.58578644,4.5 7,4.5 L7,4.5 Z"></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};
