import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import {
  LandingSection,
  LandingFlexCol,
  SectionHead,
} from "../../styles/landing";
import { Container } from "../../styles/styles";
import { motion, useAnimation, useInView } from "framer-motion";
import DownloadIcon from "../../img/DownloadIcon.svg";
import ExtensionPromo from "../../img/ExtensionPromo.svg?url";
import {Trans} from "@lingui/macro";

const DownloadButton = styled(motion.a)`
  margin-top: 17px;
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
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 150% */
  letter-spacing: -0.16px;

  @media (min-width: 576px) {
    margin-top: 24px;
  }
`;

const CustomSectionHead = styled(SectionHead)`
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;

  h1 {
    margin-top: 200px;
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
    h1 {

      margin-top: 360px;
    }
  }
`;

const ExtensionSection = styled(LandingSection)`
  background: #F8F9FF;
  margin-block: 0;
  padding-block: 64px;
`

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

  return (
    <ExtensionSection ref={ref}>
      <Container>
        <LandingFlexCol>
          <CustomSectionHead
            variants={textVariant}
            initial="hidden"
            animate={control}
          >
            <motion.img className="promo__image" variants={textVariant} src={ExtensionPromo.src} alt="chrome extension image" />
            <motion.h1 variants={textVariant}>
              <Trans>
                Chat with any PDF via our <br /> <span>Chrome Extension</span>
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
          </CustomSectionHead>
        </LandingFlexCol>
      </Container>
    </ExtensionSection>
  );
}
