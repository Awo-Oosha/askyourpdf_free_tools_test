import type { NextPage, GetStaticProps } from "next";
import {PageContainer } from "@/styles/styles";
import { loadCatalog } from "@/utils/i18n";
import React, { useRef } from "react";
import { PAGE_DESCRIPTION, path } from "@/routes";
import { MAIN_APP_URL } from "@/config/config";
import { styled } from "styled-components";
import EyeIcon from "@/img/tools/eye.png";
import SplitIcon from "@/img/tools/split.png";
import MergeIcon from "@/img/tools/merge.png";
import ScanIcon from "@/img/tools/scan.png";
import SourceIcon from "@/img/SourceIcon.svg?url";
import { Trans, t } from "@lingui/macro";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ToolsHero } from "@/components/tools/ToolCommon";

const NavbarExt = dynamic(() => import("@/components/tools/ToolBarExt"), {
  ssr: false,
});
const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: false,
});
const Waitlist = dynamic(() => import("@/components/tools/ToolsWaitlist"), {
  ssr: false,
});

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
    opacity: 0.7;
  }

  @media (min-width: 576px) {
    padding-block: 250px;
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
const ToolsList = styled.div`
  width: 100%;
  box-sizing: border-box;
  background: #f9f9fa;
  position: relative;
  top: -160px;
  display: flex;
  justify-content: center;
  margin-bottom: -160px;
  z-index: 2;
  @media screen and (max-width: 900px) {
    padding: 0 20px;
    top: 0px;
    margin-bottom: 0px;
  }
`;
const ToolsListInner = styled.div`
  box-sizing: border-box;
  width: 1200px;
  max-width: 90%;
  border-radius: 18px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  border-bottom: 0;
  border: 1px solid rgba(47, 43, 67, 0.1);
  background: #fff;
  padding: 36px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding-bottom: 200px;
  @media screen and (max-width: 900px) {
    width: 100%;
    max-width: 100%;
    display: block;
    padding: 20px;
  }
`;
const ToolComp = styled(Link)`
  color: inherit;
  text-decoration: none;
  box-sizing: border-box;
  border-radius: 16px;
  background: #f9fafb;
  padding: 24px;
  width: calc(33% - 20px);
  margin-top: 30px;
  @media screen and (max-width: 900px) {
    width: 100%;
    margin-bottom: 50px;
    display: block;
  }
  img {
    width: 64px;
    height: 64px;
    position: relative;
    top: -50px;
    margin-bottom: -45px;
  }
  .thead {
    color: #101828;
    font-size: 19.844px;
    font-style: normal;
    font-weight: 700;
    line-height: 30px; /* 151.181% */
  }
  .tdesc {
    color: #646b82;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */
    letter-spacing: -0.14px;
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
export const getStaticProps: GetStaticProps = async (ctx) => {
  const translation = await loadCatalog(ctx.locale!);
  return {
    props: {
      translation,
      description: PAGE_DESCRIPTION[path.tools],
      canonicalUrl: `${MAIN_APP_URL}/`,
    },
  };
};

const ToolsSection = () => {
  return (
    <ToolsList>
      <ToolsListInner>
        <ToolComp href="literature-review-writer">
          <Image src={EyeIcon} alt="" />
          <div className="thead">
            <Trans>Literature Review Tool</Trans>
          </div>
          <div className="tdesc">
            <Trans>
              Streamline research, generate structured summaries, and create
              cohesive and comprehensive reviews that elevate your academic
              work.
            </Trans>
          </div>
        </ToolComp>
        <ToolComp href="split">
          <Image src={SplitIcon} alt="" />
          <div className="thead">
            <Trans>PDF Splitter</Trans>
          </div>
          <div className="tdesc">
            <Trans>
              Let artificial intelligence do the work as it divides your PDF
              documents into separate files, saving you time and streamlining
              your document management tasks.
            </Trans>
          </div>
        </ToolComp>
        <ToolComp href="merge">
          <Image src={MergeIcon} alt="" />
          <div className="thead">
            <Trans>PDF Merger</Trans>
          </div>
          <div className="tdesc">
            <Trans>
              With smart, automated merging, your PDFs are unified seamlessly
              into a single, cohesive document while maintaining quality and
              formatting.
            </Trans>
          </div>
        </ToolComp>
        <ToolComp href="ocr">
          <Image src={ScanIcon} alt="" />
          <div className="thead">
            <Trans>OCR PDF Reader</Trans>
          </div>
          <div className="tdesc">
            <Trans>
              Transform scanned or image-based PDFs into editable and searchable
              text with our AI powered OCR PDF Reader.
            </Trans>
          </div>
        </ToolComp>
        <ToolComp href="source-tool">
          <Image src={SourceIcon} alt="" />
          <div className="thead">
            <Trans>Source Tool</Trans>
          </div>
          <div className="tdesc">
            <Trans>
              Leverage the power of artificial intelligence to discover,
              analyse, and recommend sources of relevant to your needs.
            </Trans>
          </div>
        </ToolComp>
      </ToolsListInner>
    </ToolsList>
  );
};

const Tools: NextPage = () => {
  const announcementRef = useRef<any>("");
  const title = <Trans>Explore our Free Tools</Trans>;
  const desc = (
    <Trans>
      Seamlessly edit, split, merge, compress, and extract text from PDFs.
      Harness the power of AI to simplify your PDF interactions for free
    </Trans>
  );
  const tab = <Trans>Tools</Trans>;
  return (
    <div>
      <PageContainer>
        <NavbarExt />
        <ToolsHero title={title} desc={desc} tab={tab} isHome={true} />
        <ToolsSection />
        <Waitlist />
        <Footer />
      </PageContainer>
    </div>
  );
};

export default Tools;
