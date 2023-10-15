import React, { useState, useRef } from "react";
import { Container } from "@/styles/styles";
import styled from "styled-components";
import HeroImage from "../../img/Hero.png";
import { LandingFlexCol } from "@/styles/landing";
import { motion } from "framer-motion";
import { Trans } from "@lingui/macro";
import Link from "next/link";
import { DOCUMENTATION_URL } from "@/config/config";
import Image from "next/image";
const HeroContainer = styled.section<{ $backgroundImage?: string }>`
  background-color: #0a0a0a;
  background-image: url(${(props) => props.$backgroundImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  padding-block: 150px;
  position: relative;
  overflow: hidden;
  z-index: 0;

  .heroImage {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
  }
  @media (min-width: 576px) {
    padding-block: 250px;
  }

  @media (min-width: 1200px) {
    .heroImage {
      animation: animatedHero 7s linear infinite alternate;
    }

    @keyframes animatedHero {
      0% {
        transform: translate(-50%, -50%) scale(0.8);
      }

      50% {
        transform: translate(-50%, -50%) scale(1);
      }

      100% {
        transform: translate(-50%, -50%) scale(0.8);
      }
    }
  }
`;

const HeroText = styled(motion.div)`
  h1 {
    margin: 0;
    color: #ffffff;
    font-family: var(--font-eudoxus);
    font-style: normal;
    font-weight: 700;
    font-size: 38px;
    line-height: 48px;
    max-width: 368px;
    text-align: center;
  }

  h1:nth-of-type(2) {
    margin-bottom: 24px;
  }

  p {
    margin: 0 auto;
    max-width: 588px;
    color: #ffffff;
    font-family: var(--font-satoshi);
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 28px;
    text-align: center;
  }

  @media (min-width: 390px) {
    h1 {
      font-size: 32px;
    }
  }

  @media (min-width: 576px) {
    text-align: center;

    h1 {
      font-size: 38px;
      line-height: 68px;
      max-width: unset;
    }
  }

  @media (min-width: 992px) {
    h1 {
      font-size: 50px;
    }
  }
`;

const HeroActions = styled(motion.div)`
  margin-top: 32px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  a {
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border: 0;
    box-shadow: 0px 1px 3px rgba(47, 43, 67, 0.1),
      inset 0px -1px 0px rgba(47, 43, 67, 0.1);
    border-radius: 12px;
    padding: 12px 40px;
    background: #edb01a;
    font-family: var(--font-satoshi);
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    color: #000;
    cursor: pointer;
  }

  button:nth-of-type(2) {
    background: #ffffff;
    border: 1px solid rgba(47, 43, 67, 0.1);
  }

  @media (min-width: 576px) {
    align-items: stretch;
    flex-direction: row;
  }
`;

export default function Header() {
  const ref = useRef(null);
  return (
    <HeroContainer ref={ref}>
      <div className="heroImage">
        <Image src={HeroImage} alt="" priority={true} />
      </div>
      <Container>
        <LandingFlexCol>
          <HeroText>
            <h1>
              <Trans>Build Better With The</Trans>,
            </h1>
            <h1>
              <span style={{ color: "#EDB01A" }}>AskYourPDF API</span>
            </h1>
            <p>
              <Trans>
                Experience Seamless Integration and Unparalleled PDF Processing
                Capabilities with AskYourPDF API
              </Trans>
            </p>
          </HeroText>
          <HeroActions>
            <Link href={DOCUMENTATION_URL} target="_blank">
              <Trans>Read Documentation</Trans>
            </Link>
          </HeroActions>
        </LandingFlexCol>
      </Container>
    </HeroContainer>
  );
}
