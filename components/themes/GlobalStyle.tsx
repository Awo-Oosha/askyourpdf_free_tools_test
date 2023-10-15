import { createGlobalStyle } from "styled-components";
import { satoshi, eudoxusSans, inter, franie } from "@/utils/fonts"

export const GlobalStyle = createGlobalStyle`

  :root {
    --font-satoshi: ${satoshi.style.fontFamily};
    --font-inter: ${inter.style.fontFamily};
    --font-eudoxus: ${eudoxusSans.style.fontFamily};
    --font-franie: ${franie.style.fontFamily};
  }

`;
