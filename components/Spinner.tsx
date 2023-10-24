import React from "react";
import AltSpinner from "../img/AltSpinner.gif";
import PrimarySpinner from "../img/PrimarySpinner.gif";
import ToolSpinner from "../img/souce-tool-loader.gif";
import Image from "next/image";

export default function Spinner({
  type = "primary",
  style,
}: {
  type?: "primary" | "alt" | "tool";
  style?: React.CSSProperties;
}) {
  let spinnerImage;

  switch (type) {
    case "primary":
      spinnerImage = PrimarySpinner;
      break;
    case "alt":
      spinnerImage = AltSpinner;
      break;
    case "tool":
      spinnerImage = ToolSpinner;
      break;
    default:
      spinnerImage = PrimarySpinner;
  }
  return (
    <Image
      src={spinnerImage}
      alt=""
      style={{ width: "auto", height: "auto", ...style }}
    />
  );
}
