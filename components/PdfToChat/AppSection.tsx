import React, { useEffect, useRef } from "react";
import { LandingSection, SectionHead } from "../../styles/landing";
import AppBG from "../../img/AppBg.png";
import MobilePhone from "../../img/MobilePhone.png";
import AppStoreLogo from "../../img/AppStore.svg?url";
import PlayStoreLogo from "../../img/PlayStore.svg?url";
import { CTA, Container, StyleFlexCol } from "../../styles/styles";
import styled from "styled-components";
import { motion, useAnimation, useInView } from "framer-motion";
import { Trans } from "@lingui/macro";
import Image from "next/image";

const AppImageContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 48px;
  position: relative;

  .breathing_circles {
    animation: animatedBackground 5s linear infinite alternate;
    position: absolute;
    inset: 0;
    overflow: hidden;
    z-index: -1;
    img {
      object-fit: cover;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  @keyframes animatedBackground {
    0% {
      transform: scale(0.8);
    }

    50% {
      transform: scale(1);
    }

    100% {
      transform: scale(0.8);
    }
  }
`;

const DownloadButtonContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin-top: 24px;
  margin-bottom: 48px;
  gap: 16px;

  @media (min-width: 576px) {
    margin-top: 32px;
    margin-bottom: 106px;
    flex-direction: row;
    width: unset;
  }

  button:nth-of-type(1) {
    background: #000000;
    color: #ffffff;
  }

  button:nth-of-type(2) {
    background: #ffffff;
    border: 1px solid #000000;
    color: #000000;
  }
`;

const DownloadButton = styled(CTA)`
  height: 48px;
  padding: 12px 16px 12px 16px;

  font-family: var(--font-inter);
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: -0.01em;

  &:disabled {
    cursor: default;
  }

  a {
    text-decoration: none;
    color: inherit;
    display: flex;
    align-items: center;
    gap: 6px;
  }
`;

export default function AppSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const control = useAnimation();

  useEffect(() => {
    if (isInView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, isInView]);

  const textVariant = {
    visible: { opacity: 1, y: 0, transition: { delay: 0.3, ease: "easeIn" } },
    hidden: { opacity: 0, y: 30 },
  };

  const appImageVariant = {
    visible: { opacity: 1, transition: { delay: 0.3, ease: "easeIn" } },
    hidden: { opacity: 0 },
  };

  return (
    <LandingSection ref={ref} id="App-Section">
      <Container>
        <StyleFlexCol>
          <AppImageContainer
            variants={appImageVariant}
            initial="hidden"
            animate={control}
          >
            <div className="breathing_circles">
              <Image fill src={AppBG} alt="" />
            </div>
            <Image src={MobilePhone} alt="" />
          </AppImageContainer>
          <SectionHead
            style={{ textAlign: "center" }}
            variants={textVariant}
            initial="hidden"
            animate={control}
          >
            <h1>
              <Trans>
                Download Our <span>App</span>
              </Trans>
            </h1>
            <p>
              <Trans>
                Take your document chats on the go with AskYourPDF app! Chat,
                track, learn - anytime, anywhere. Available on iOS and Android.
              </Trans>
            </p>
          </SectionHead>
          <DownloadButtonContainer
            variants={textVariant}
            initial="hidden"
            animate={control}
          >
            <DownloadButton disabled>
              <a
                href="https://apps.apple.com/ee/app/askyourpdf-chatpdf-ai/id6462732878"
                target="_blank"
              >
                <Image src={AppStoreLogo} alt="" /> App Store
              </a>
            </DownloadButton>
            <DownloadButton disabled>
              <a
                href="https://play.google.com/store/apps/details?id=com.askyourpdf.asking"
                target="_blank"
              >
                <Image src={PlayStoreLogo} alt="google play icon" /> Google Play
              </a>
            </DownloadButton>
          </DownloadButtonContainer>
        </StyleFlexCol>
      </Container>
    </LandingSection>
  );
}
