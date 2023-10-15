import styled from "styled-components";
import { StyleFlexCol } from "./styles";
import { motion } from "framer-motion";

export const LandingFlexCol = styled(StyleFlexCol)`
  align-items: unset;
  @media (min-width: 576px) {
    align-items: center;
  }
`;

export const LandingSection = styled.section<{
  $backgroundImage?: string;
  $backgroundSize?: string;
}>`
  margin-top: 64px;

  background-image: url(${(props) => props.$backgroundImage});
  background-repeat: no-repeat;
  background-size: ${(props) => props.$backgroundSize};
  background-position: center;
`;

export const SectionHead = styled(motion.div)`
  h1 {
    margin: 0;
    margin-bottom: 17px;
    font-family: var(--font-eudoxus);
    font-style: normal;
    font-weight: 700;
    font-size: 28px;
    line-height: 44px;
    color: #2f2b43;
    letter-spacing: -0.02em;

    span {
      color: #cf9401;
    }
  }

  p {
    margin: 0;
    font-family: var(--font-satoshi);
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 26px;
    color: #2f2b4399;
    letter-spacing: -0.012em;
  }

  @media (min-width: 576px) {
    text-align: center;
    max-width: 588px;
    margin: 0 auto;

    h1 {
      margin-bottom: 24px;
      font-size: 36px;
      line-height: 54px;
    }
  }

  // @media (min-width: 992px) {
  //   h1 {
  //     font-size: 48px;
  //   }
  // }
`;

