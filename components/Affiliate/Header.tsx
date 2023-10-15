import React, { useState, useRef, useEffect } from "react";
import { Container } from "../../styles/styles";
import styled from "styled-components";
import HeroImage from "../../img/Hero.webp";
import ArrowIcon from "../../img/arrowRightButton.svg?url";
import { LandingFlexCol } from "../../styles/landing";
import { Trans } from "@lingui/macro";
import Image from "next/image";
import { useMedia } from "react-use";
import Link from "next/link";
const HeroContainer = styled.section<{ $backgroundImage?: string }>`
  background-color: #141314;
  background-image: url(${(props) => props.$backgroundImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  padding-block: 150px;
  position: relative;
  overflow: hidden;
  z-index: 1;
  a {
    text-decoration: none;
    @media (max-width: 576px) {
      width: 100%;
    }
  }
  .heroImage {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
  }

  @media (min-width: 576px) {
    padding: 180px 80px 100px 100px;
    background-color: #0a0a0a;
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

const HeroText = styled.div`
  h1 {
    margin: 0;
    color: #ffffff;
    font-family: var(--font-eudoxus);
    font-style: normal;
    font-weight: 700;
    font-size: 38px;
    line-height: 48px;
    max-width: 368px;
  }

  h1:nth-of-type(2) {
    margin-bottom: 24px;
  }

  p {
    margin: 0 auto;
    max-width: 540px;
    color: #ffffff;
    font-family: var(--font-satoshi);
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 28px;
  }

  @media (min-width: 390px) {
    h1 {
      font-size: 41px;
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

const HeroActions = styled.div`
  margin-top: 16px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border: 0;
    box-shadow: 0px 1px 3px rgba(47, 43, 67, 0.1),
      inset 0px -1px 0px rgba(47, 43, 67, 0.1);
    border-radius: 12px;
    padding: 12px 16px;
    background: #edb01a;

    font-family: var(--font-satoshi);
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 24px;
    cursor: pointer;
    color: #000000;
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
const HeroButton = styled.button`
  background: #edb01a;
  margin-top: 40px;
  color: #000000;
  padding: 12px 16px 12px 16px;
  border-radius: 12px;
  font-family: var(--font-satoshi);
  border: none;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  letter-spacing: -0.01em;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 268px;
  img {
    padding-left: 8px;
  }
  @media (max-width: 576px) {
    width: 100%;
  }
`;
export default function Header() {
  const ref = useRef(null);
  const isSmallScreen = useMedia("(min-width: 576px)", false);
  return (
    <HeroContainer ref={ref}>
      <div className="heroImage">
        {isSmallScreen && (
          <Image src={HeroImage} alt="Hero" priority={true} sizes="100vw" />
        )}
      </div>
      <Container>
        <LandingFlexCol>
          <HeroText>
            <h1>
              <Trans>Join Our Affiliate Program and</Trans>
            </h1>
            <h1>
              <span style={{ color: "#EDB01A" }}>
                <Trans>Earn 30% Commission</Trans>
              </span>
            </h1>
            <p>
              <Trans>
                At AskYourPDF we cherish our community and think you should be
                rewarded for spreading the word about our platform's advantages.
                To earn 30% commission on all payments made by users you refer
                within the first 12 months, Join our affiliate program.
              </Trans>
            </p>
          </HeroText>
          <HeroActions>
            <Link href="https://askyourpdf.getrewardful.com/" target="_blank">
              <HeroButton>
                <Trans>Join Now</Trans> <Image src={ArrowIcon} alt="" />
              </HeroButton>
            </Link>
          </HeroActions>
        </LandingFlexCol>
      </Container>
    </HeroContainer>
  );
}
