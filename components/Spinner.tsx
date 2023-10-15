import React from "react";
import AltSpinner from "../img/AltSpinner.gif";
import PrimarySpinner from "../img/PrimarySpinner.gif";
import Image from "next/image";

export default function Spinner({
  type = "primary",
  style,
}: {
  type?: "primary" | "alt";
  style?: React.CSSProperties;
}) {
  return type === "primary" ? (
    <Image src={PrimarySpinner} alt="" style={{width: "auto", height: "auto", ...style}} />
  ) : (
    <Image src={AltSpinner} alt="" style={{width: "auto", height: "auto", ...style}} />
  );
}
