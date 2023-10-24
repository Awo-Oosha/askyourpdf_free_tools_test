import React, { useRef } from "react";
import { useMedia } from "react-use";
import Image from "next/image";
import HeroImage from "@/img/Hero.webp";
import { Container } from "@/styles/styles";
import { LandingFlexCol } from "@/styles/landing";
import { ArrowRight, CaretLeft } from "@phosphor-icons/react/dist/ssr";
import { Trans } from "@lingui/macro";
import { styled } from "styled-components";
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

  .heroImage {
    position: absolute;
    top: 80%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    opacity: 0.7;
  }

  @media (min-width: 576px) {
    padding-block: 180px;
    background-color: #f9f9fa;
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

const HeaderTitleTab = styled(Link)`
  margin-bottom: 15px;
  text-decoration: none;
  background: #fff;
  backdrop-filter: blur(18px);
  display: flex;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  border-radius: 24px;
  color: #edb01a;
  text-align: center;
  width: fit-content;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: -0.16px;
`;
const BottomNav = styled.div`
  width: 100%;
  padding: 50px;
  max-width: 1000px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 40px;
  margin-top: 50px;
  @media screen and (max-width: 900px) {
    display: none;
  }
`;
const NavButtons = styled(Link)`
  text-decoration: none;
  padding: 5px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  border-radius: 36px;
  border: 1px solid rgba(47, 43, 67, 0.1);
  background: #fff;
  color: #2f2b43;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 32px; /* 177.778% */
  letter-spacing: -0.288px;
`;

export const ToolsHero = ({
  title,
  desc,
  tab,
  isHome = false,
}: {
  title: any;
  desc: any;
  tab: any;
  isHome?: boolean;
}) => {
  const ref = useRef(null);
  const isSmallScreen = useMedia("(min-width: 576px)", false);
  return (
    <HeroContainer ref={ref} style={{ backgroundColor: "#f9f9fa" }}>
      <div className="heroImage">
        <Image
          src={HeroImage}
          alt="Hero"
          priority={true}
          sizes="100vw"
          style={isSmallScreen == false ? { transform: "scale(0.6)" } : {}}
        />
      </div>
      <Container>
        <LandingFlexCol>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <HeaderTitleTab href={isHome == false ? "./" : ""}>
              {isHome == false ? (
                <CaretLeft
                  style={{ color: "black", width: "17px", marginRight: "10px" }}
                />
              ) : (
                <></>
              )}
              {tab}
            </HeaderTitleTab>
          </div>
          <HeroText>
            <h1 style={{ width: "100%", maxWidth: "100%" }}>
              <div
                style={{
                  color: "#000",
                  fontWeight: "300",
                  textAlign: "center",
                  width: "100%",
                  maxWidth: "100%",
                }}
              >
                {title}
              </div>
            </h1>
            <p
              style={{ color: "#000", fontWeight: "400", textAlign: "center" }}
            >
              {desc}
            </p>
          </HeroText>
        </LandingFlexCol>
      </Container>
    </HeroContainer>
  );
};

export const BottomNavigation = () => {
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <BottomNav>
        <NavButtons href="./literature-review-writer">
          <div>
            <Trans>Literature Review Tool</Trans>
          </div>
          <ArrowRight style={{ height: "20px" }} />
        </NavButtons>
        <NavButtons href="./split">
          <div>
            <Trans>PDF Splitter</Trans>
          </div>
          <ArrowRight style={{ height: "20px" }} />
        </NavButtons>
        <NavButtons href="./merge">
          <div>
            <Trans>PDF Merger</Trans>
          </div>
          <ArrowRight style={{ height: "20px" }} />
        </NavButtons>
        <NavButtons href="./ocr">
          <div>
            <Trans>OCR PDF Reader</Trans>
          </div>
          <ArrowRight style={{ height: "20px" }} />
        </NavButtons>
        <NavButtons href="" style={{ display: "none" }}>
          <div>
            <Trans>PDF Compressor</Trans>
          </div>
          <ArrowRight style={{ height: "20px" }} />
        </NavButtons>
        <NavButtons href="source-tool">
          <div>
            <Trans>Source Tool</Trans>
          </div>
          <ArrowRight style={{ height: "20px" }} />
        </NavButtons>
      </BottomNav>
    </div>
  );
};
