import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import {
  LandingFlexCol,
} from "../../styles/landing";
import { Container } from "../../styles/styles";
import { motion, useAnimation, useInView } from "framer-motion";
import DownloadIcon from "../../img/DownloadIcon.svg";
import ExtensionPromo from "../../img/ExtensionPromo2.svg?url";
import {Trans} from "@lingui/macro";
import Image from "next/image";
import HeroImage from "../../img/Hero.png";



const DownloadButton = styled(motion.a)`
  margin-bottom: 24px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 12px;
  background: #edb01a;
  /* Shadows/1 */
  box-shadow: 0px -1px 0px 0px rgba(47, 43, 67, 0.1) inset,
    0px 1px 3px 0px rgba(47, 43, 67, 0.1);

  text-decoration: none;
  color: #000;
  text-align: center;
  font-family: var(--font-satoshi);
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 150% */
  letter-spacing: -0.16px;

  @media (min-width: 576px) {
    margin-top: 24px;
  }
`;

const CustomSectionHead = styled.div`
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;

  h1 {
    margin-top: 200px;
    text-align: center;
    font-family: var(--font-eudoxus);
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: 52px; 
    letter-spacing: -0.64px;

    span {
      color: #cf9401;
    }
  }

  p {
    margin-top: 24px;
    margin-bottom:24px;
    font-family: var(--font-satoshi);
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 26px;
    color: #2f2b4399;
    letter-spacing: -0.012em;
  }

  .promo__image {
    position: absolute;
    inset: 0;
    max-width: 100%;
    display: block;
    z-index: -1;
  }

  @media (min-width: 320px) {
    h1 {

      margin-top: 220px;
    }
  }

  @media (min-width: 420px) {
    h1 {

      margin-top: 300px;
    }
  }

  @media (min-width: 576px) {
    text-align: center;
    max-width: 588px;
    margin: 0 auto;
    h1 {
      font-size: 36px;
      line-height: 54px;
      margin-top: 340px;
    }
  }
`;

const ExtensionSection = styled.section`
  background-color: #0a0a0a;
  padding-block: 140px;
  position: relative;
  overflow: hidden;
  z-index: 1;

  h1 {
    font-style: normal;
    font-weight: 700;
    line-height: 52px; /* 162.5% */
    letter-spacing: -0.64px;
    font-size: 32px;
    width: 100%;
    color: #fff;
    text-align: center;
  }

  p {
    color: #D0D5DD;
    width: 100%;
    text-align: center;
    font-family: var(--font-satoshi);
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 28px; /* 175% */
    letter-spacing: -0.224px;
    
  }

  .heroImage {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
  }
  @media (min-width: 576px) {
    p {
      width: 501px
    }
    h1{
      width: 801px;
      font-size: 50px;
      line-height: 68px; 
      letter-spacing: -1.2px;
    }
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

`
const FormatContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  margin-top: 16px;
`;
const FormatBox = styled(motion.div)`
  border-radius: 8px;
  border: 1px solid rgba(234, 236, 240, 0.01);
  background: rgba(249, 250, 251, 0.07);
  display: flex;
  padding: 2px 8px;
  margin-right: 5px;
  align-items: center;
  color: #a6a6a6;
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px; /* 150% */
`;
// million-ignore
export default function ExtensionAnnouncement() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const control = useAnimation();

  const textVariant = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { when: "beforeChildren", staggerChildren: 0.3 },
    },
    hidden: { opacity: 0, y: 30 },
  };

  useEffect(() => {
    if (isInView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, isInView]);

    const formats = ["PDF", "TXT", "PPT", "PPTX", "EPUB", "RTF"];


  return (
    <ExtensionSection ref={ref}>
      <div className="heroImage">
        <Image src={HeroImage} alt="" priority={true} />
      </div>
      <Container>
        <LandingFlexCol>
          <CustomSectionHead>
            <motion.img className="promo__image" variants={textVariant} src={ExtensionPromo.src} alt="chrome extension image" />
            <motion.h1 variants={textVariant}>
              <Trans>
                Chat with any PDF via our  <span>Chrome Extension</span>
              </Trans>
            </motion.h1>
            <motion.p variants={textVariant}>
              <Trans>
                Add the AskyourPDF extension to your Chrome browser to start
                chatting effortlessly with any PDF. It saves you hours and boosts
                your productivity!
              </Trans>
            </motion.p>
            <DownloadButton
              href="https://chrome.google.com/webstore/detail/askyourpdf/gaieenaffioioljpcocdkpphlifbhaig"
              target="_blank"
              rel="noreferrer noopener"
            >
              <DownloadIcon />
              <Trans>
                Download Extension
              </Trans>
            </DownloadButton>
            <FormatContainer style={{fontFamily: "var(--font-satoshi"}}>
              {formats.map((format: string, index: number) => (
                <FormatBox key={index}>{format}</FormatBox>
              ))}
            </FormatContainer>
          </CustomSectionHead>
        </LandingFlexCol>
      </Container>
    </ExtensionSection>
  );
}
