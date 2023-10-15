import localFont from "next/font/local";

export const satoshi = localFont({
  src: [
    {
      path: "../assets/fonts/Satoshi/Satoshi-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fonts/Satoshi/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/Satoshi/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/Satoshi/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/Satoshi/Satoshi-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  fallback: ["sans-serif"]
});

export const eudoxusSans = localFont({
  src: [
    {
      path: "../assets/fonts/EudoxusSans/EudoxusSans-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fonts/EudoxusSans/EudoxusSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/EudoxusSans/EudoxusSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/EudoxusSans/EudoxusSans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  fallback: ["sans-serif"],
});

export const inter = localFont({
  src: [
    {
      path: "../assets/fonts/Inter/Inter-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/Inter/Inter-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/Inter/Inter-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  fallback: ["sans-serif"],
});

export const franie = localFont({
  src: [
    {
      path: "../assets/fonts/Franie/FranieBold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  fallback: ["sans-serif"],
});
