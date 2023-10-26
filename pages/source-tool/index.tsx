import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Layout } from "antd";
import { Content } from "antd/lib/layout/layout";
import styled from "styled-components";
import ArrowLeft from "@/img/arrowLeft.svg?url";
import { alerts } from "@/utils/alerts";
import { t, Trans } from "@lingui/macro";
import { GetStaticPaths, GetStaticProps } from "next";
import { loadCatalog } from "@/utils/i18n";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useMedia } from "react-use";
import HeroImage from "@/img/Mask.svg?url";
import { PAGE_DESCRIPTION, PAGE_TITLE, path } from "@/routes";
import { MAIN_APP_URL } from "@/config/config";
import { SourceContent } from "@/components/source-tools/source-content";
import { SourceResult } from "@/components/source-tools/source-result";
import { useMutation } from "react-query";
import { Filter, getSourceInformation, getSources } from "@/services/tools";
import { useRouter } from "next/router";
import ProgressModal from "@/components/Modals/ProgressModal";
import { BottomNavigation } from "@/components/tools/ToolCommon";
import Link from "next/link";

const MyLayout = styled(Layout)`
  background: #f6f6f8 !important;
  .heroImage {
    position: absolute;
    top: 0%;
    left: 50%;
    overflow: hidden;
    opacity: 0.3;
    transform: translate(-50%, -0%);
    z-index: -1;
    background-blend-mode: multiply;
  }
`;
const SourceHeader = styled(Layout)`
  background: #f6f6f8 !important;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 161px;
  padding-bottom: 45px;
  padding-left: 100px;
  padding-right: 100px;
  position: relative;
  overflow: hidden;
  z-index: 1;
  @media (max-width: 768px) {
    padding-left: 30px;
    padding-right: 30px;
  }
  h1 {
    color: #17121f;
    text-align: center;
    font-family: var(--font-satoshi);
    font-size: 64px;
    font-style: normal;
    font-weight: 400;
    line-height: 64px;
    letter-spacing: -2.56px;
    padding-top: 11px;
    padding-bottom: 24px;
    @media (max-width: 768px) {
      font-size: 30.8px;
      line-height: 33.8px;
    }
  }
  p {
    color: #17121f;
    text-align: center;
    font-family: var(--font-satoshi);
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 29px;
    letter-spacing: -0.14px;
    white-space: normal;
    max-width: 729px;
    @media (max-width: 768px) {
      font-size: 16px;
      line-height: 22px;
    }
  }
`;
const SourceLayout = styled(Layout)`
  border-radius: 18px;
  border: 1px solid rgba(47, 43, 67, 0.1);
  background: #fff;
  padding: 62px 30px;
  margin: 0px 45px;
  z-index: 20;

  @media (max-width: 768px) {
    padding: 0px;
    margin: 0px 16px;
    background-color: transparent;
    border: none;
  }
  .ant-layout-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media (min-width: 992px) {
    .ant-layout-content {
      display: flex;
      justify-content: center;
      flex-direction: row;
    }
  }
`;

const BackToTools = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  padding: 8px 16px;
  width: 166px;
  border-radius: 24px;
  background: #fff;
  backdrop-filter: blur(18px);
  cursor: pointer;
  @media (max-width: 768px) {
    width: 150px;
  }
  p {
    color: #edb01a;
    font-family: var(--font-inter);
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: -0.16px;
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }
`;

export const getStaticProps: GetStaticProps = async (ctx) => {
  const translation = await loadCatalog(ctx.locale!);
  return {
    props: {
      translation,
      description: PAGE_DESCRIPTION[path.sourceTool],
      canonicalUrl: `${MAIN_APP_URL}${path.sourceTool}`,
      title: PAGE_TITLE[path.sourceTool],
    },
  };
};

const timeoutError = Symbol();
const SourceTools = () => {
  const router = useRouter();
  const { sourceId } = router.query as { sourceId: string };
  const [sourceInput, setSourceInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sourceText, setSourceText] = useState("");
  const [configuration, setConfiguration] = useState<Filter>();
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [sources, setSources] = useState([]);
  const [citedText, setCitedText] = useState("");
  function handleSourceText(sourceText: string, configuration: Filter) {
    if (sourceText.length < 1) {
      alerts.error(t`Warning`, "Please enter Source text", 2000);
      return;
    }
    setShowProgressModal(true);
    getTextSources.mutate({
      text: sourceText,
      filter: configuration,
    });
  }
  useEffect(() => {
    if (sourceId) {
      getSourcesInfo.mutate(sourceId);
    }
  }, [router.asPath, sourceId]);
  const getTextSources = useMutation(getSources, {
    onSuccess: (data: any) => {
      setCitedText(data.cited_text);
      router.push({
        pathname: router.pathname,
        query: { sourceId: data.source_id },
      });
    },
    onError: (error) => {
      setShowProgressModal(false);
      alerts.error(t`Error`, t`An error occurred. Please try again`);
    },
  });
  const getSourcesInfo = useMutation(getSourceInformation, {
    onSuccess: (data: any) => {
      setSources(data.sources);
      setShowProgressModal(false);
    },
    onError: (error) => {
      setShowProgressModal(false);
      alerts.error(t`Error`, t`An error occurred. Please try again`);
    },
  });
  const isSmallScreen = useMedia("(min-width: 576px)", false);
  const startNewSearch = () => {
    router.push(router.pathname, undefined, { shallow: true });
    setSourceInput("");
    setSourceText("");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <MyLayout>
      <Navbar whiteBg={true} />
      <SourceHeader>
        <div className="heroImage">
          {isSmallScreen && (
            <Image src={HeroImage} alt="Hero" priority={true} sizes="100vw" />
          )}
        </div>
        <BackToTools href="/">
          <Image src={ArrowLeft} alt="" />
          <p>
            <Trans>Back to tools</Trans>
          </p>
        </BackToTools>
        <h1>
          <Trans>Source Tool</Trans>
        </h1>
        <p>
          <Trans>
            Simplify your search, guaranteeing precision and trustworthiness
            with each query.
          </Trans>
        </p>
      </SourceHeader>
      <SourceLayout>
        <Content>
          {!sourceId && (
            <SourceContent
              sourceInput={sourceInput}
              setSourceInput={setSourceInput}
              isTyping={isTyping}
              handleSourceText={handleSourceText}
              configuration={configuration}
              setConfiguration={setConfiguration}
            />
          )}
          {sourceId && (
            <SourceResult
              sources={sources}
              startNewSearch={startNewSearch}
              citedText={citedText}
            />
          )}
        </Content>
      </SourceLayout>
      <BottomNavigation />
      <Footer />
      <ProgressModal
        message={t`Hang on! We’re looking for sources`}
        open={showProgressModal}
        type="tool"
      />
    </MyLayout>
  );
};

export default SourceTools;
