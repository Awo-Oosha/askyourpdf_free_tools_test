import React, { useState, useRef } from "react";
import { Container } from "@/styles/styles";
import styled from "styled-components";
import HeroImage from "../../img/Hero.webp";
import UploadIcon from "../../img/Upload.svg?url";
import ArrowRightIcon from "../../img/ArrowRight.svg?url";
import { LandingFlexCol } from "@/styles/landing";
import { Trans } from "@lingui/macro";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useMedia } from "react-use";

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

  .heroImage {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
  }

  @media (min-width: 576px) {
    padding-block: 250px;
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
    max-width: 588px;
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
  margin-top: 32px;
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

const BadgeContainer = styled.div`
  margin-bottom: 28px;

  @media (min-width: 576px) {
    margin-bottom: 36px;
  }
`;
const FormatContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
`;
const FormatBox = styled.div`
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
const Badge = styled.a`
  display: flex;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(220, 218, 226, 0.07);
  border-radius: 20px;
  padding: 0px 8px 0px 6px;
  gap: 8px;
  cursor: pointer;
  width: fit-content;

  text-decoration: none;

  p {
    margin: 0;
    color: #ffffff;
    font-family: var(--font-satoshi);
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 20px;
  }

  div {
    background: #383838;
    border-radius: 20px;
    padding: 0px 8px 0px 8px;
  }

  @media (min-width: 576px) {
    width: unset;
    p {
      font-size: 16px;
      line-height: 28px;
    }
  }

  @media (min-width: 360px) {
    p {
      font-size: 14px;
    }
  }
`;

const DocumentUploadModal = dynamic(
  () => import("../Modals/DocumentUploadModal"),
  {ssr: false}
);

export default function Hero() {
  const ref = useRef(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const formats = ["PDF", "TXT", "PPT", "PPTX", "EPUB", "RTF"];

  const isSmallScreen = useMedia('(min-width: 576px)', false);

  return (
      <HeroContainer ref={ref}>
          <div className="heroImage">
              {isSmallScreen && (
                  <Image
                      src={HeroImage}
                      alt="Hero"
                      priority={true}
                      sizes="100vw"
                  />
              )}
          </div>
          <Container>
              <LandingFlexCol>
                  <BadgeContainer>
                      <Badge
                          href="https://docs.askyourpdf.com/askyourpdf-docs/how-to-use-askyourpdf-plugin-for-chatgpt"
                          target="_blank"
                          rel="noreferrer noopener"
                          style={{ alignItems: "center" }}
                      >
                          <div>
                              <p>
                                  <Trans>Get Our Plugin</Trans>
                              </p>
                          </div>
                          <p>
                              <Trans>Install directly on ChatGPT</Trans>
                          </p>
                          <Image src={ArrowRightIcon} alt="" />
                      </Badge>
                  </BadgeContainer>
                  <HeroText>
                      <h1>
                          <Trans>It&apos;s not just reading anymore</Trans>,
                      </h1>
                      <h1>
                          <Trans>
                              it&apos;s a{" "}
                              <span style={{ color: "#EDB01A" }}>
                                  conversation
                              </span>
                          </Trans>
                      </h1>
                      <p>
                          <Trans>
                              Say hello to documents that respond to you! With
                              AskYourPDF, your reading isn&apos;t just simple,
                              it&apos;s fun!
                          </Trans>
                      </p>
                  </HeroText>
                  <HeroActions>
                      <button
                          onClick={() => {
                              setIsUploadModalOpen(true);
                          }}
                      >
                          <Image src={UploadIcon} alt="" />{" "}
                          <Trans>Upload Document</Trans>
                      </button>
                      {/* <button>
              <Image src={ProductHuntIcon} alt="" />
              Find Us On Product Hunt
            </button> */}
                  </HeroActions>
                  <HeroText>
                      <p>
                          <Trans>Supported formats</Trans>
                      </p>
                  </HeroText>
                  <FormatContainer>
                      {formats.map((format: string, index: number) => (
                          <FormatBox key={index}>{format}</FormatBox>
                      ))}
                  </FormatContainer>
              </LandingFlexCol>
          </Container>
          {isUploadModalOpen && (
              <DocumentUploadModal
                  open={isUploadModalOpen}
                  setOpen={setIsUploadModalOpen}
              />
          )}
      </HeroContainer>
  );
}
