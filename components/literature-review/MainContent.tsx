import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { Content } from "antd/lib/layout/layout";
import LiteratureMainBar from "@/components/literature-review/LiteratureMainBar";
import LiteratureSideBar from "@/components/literature-review/LiteratureSideBar";
import styled from "styled-components";
import { literatureReviewText } from "@/services/literature";
import ArrowLeft from "@/img/arrowLeft.svg?url";
import {
  covertToItalics,
  getCurrentTimestamp,
  removeMarkdown,
  timeoutPromise,
} from "@/utils/utils";
import { alerts } from "@/utils/alerts";
import { t, Trans } from "@lingui/macro";
import { usePDF } from "@react-pdf/renderer";
import { ToolsPDFExport } from "@/components/ToolsPDFExport";
import { useDocuments } from "@/providers/DocumentsProvider";
import ReactGA from "react-ga4";
import { GetStaticProps } from "next";
import { loadCatalog } from "@/utils/i18n";
import Image from "next/image";
import Navbar from "@/components/tools/ToolBarExt";
import Footer from "@/components/Footer";
import { useMedia } from "react-use";
import HeroImage from "@/img/Mask.svg?url";
import {PAGE_DESCRIPTION, PAGE_TITLE, path} from "@/routes";
import {MAIN_APP_URL} from "@/config/config";
import Link from "next/link";
import dynamic from "next/dynamic";

const BottomNavigation = dynamic(() => import('@/components/tools/ToolCommon'), {
  ssr: false,
}); 

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
const LiteratureHeader = styled(Layout)`
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

const LiteratureLayout = styled(Layout)`
  border-radius: 18px;
  border: 1px solid rgba(47, 43, 67, 0.1);
  background: #fff;
  padding: 62px 30px;
  margin: 0px 45px;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 0px;
    margin: 0px 20px;
    background-color: transparent;
    border: none;
  }
  .ant-layout-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  @media (min-width: 992px) {
    .ant-layout-content {
      display: flex;
      justify-content: center;
      flex-direction: row;
    }
  }
`;
export const getStaticProps: GetStaticProps = async (ctx) => {
  const translation = await loadCatalog(ctx.locale!);
  return {
    props: {
      translation,
      description: PAGE_DESCRIPTION[path.literatureReview],
      canonicalUrl: `${MAIN_APP_URL}${path.literatureReview}`,
      title : PAGE_TITLE[path.literatureReview]
    },
  };
};
const ResultContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 32px;
`;
const NavContainer = styled.div`
  display: block;
`;
const ResultBox = styled.div`
  border-radius: 36px;
  border: 1px solid rgba(47, 43, 67, 0.1);
  background: #fff;
  display: flex;
  padding: 10px 41px 10px 42px;
  justify-content: center;
  align-items: center;
  width: max-content;
  p {
    color: #2f2b43;
    font-family: var(--font-satoshi);
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 32px;
    letter-spacing: -0.288px;
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }
`;
const timeoutError = Symbol();

const Literature = () => {
  const textAbortController = new AbortController();
  const textSignal = textAbortController.signal;

  const [literatureInput, setLiteratureInput] = useState("");
  const [literatureText, setLiteratureText] = useState("");
  const [docID, setDocID] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [literatureYearFrom, setLiteratureYearFrom] = useState<
    number | undefined
  >();
  const [literatureYearTo, setLiteratureYearTo] = useState<
    number | undefined
  >();

  const [instance, updateInstance] = usePDF({
    document: ToolsPDFExport(
      covertToItalics(removeMarkdown(literatureText)),
      "Literature Review"
    ),
  });

  const { documents } = useDocuments();

  useEffect(() => {
    updateInstance(
      ToolsPDFExport(
        covertToItalics(removeMarkdown(literatureText)),
        "Literature Review"
      )
    );
  }, [literatureText]);

  function handleLiteratureText(
    literature_text: string,
    fromYear?: number,
    toYear?: number
  ) {
    if (literature_text.length < 1) {
      alerts.error(
        t`Warning`,
        "Please enter Research Topic you want to review",
        2000
      );
      return;
    }
    setLiteratureText("");
    setIsTyping(true);

    try {
      timeoutPromise(
        literatureReviewText(
          literature_text,
          textSignal,
          literatureYearFrom,
          literatureYearTo
        ),
        60000,
        timeoutError
      )
        .then((response) => {
          const reader = response.body?.getReader();
          const decoder = new TextDecoder("utf-8");

          let message: string = "";

          function processText({ done, value }: any) {
            if (done) {
              setIsTyping(false);
              return;
            }

            const chunk = decoder.decode(value);
            message += chunk;
            setLiteratureText(message);

            reader?.read().then(processText);
          }

          reader
            ?.read()
            .then(processText)
            .catch((err: any) => {
              let errorMessage = "Request timed out. Please try again";
              textAbortController.abort();
              alerts.error(t`Review Failed`, errorMessage, 8000);
              setIsTyping(false);
            });
        })
        .catch((err: any) => {
          let errorMessage = t`Failed to review text. Please try again`;
          if (err === timeoutError) {
            textAbortController.abort();
            errorMessage = t`Request timed out. Please try again`;
          }
          alerts.error(t`Review Failed`, errorMessage, 8000);
          setIsTyping(false);
        });
    } catch (err) {
      setIsTyping(false);
    }
  }

  const exportPDF = () => {
    if (!instance.url) {
      alerts.error(t`An error occurred`, t`Failed to export PDF`);
      return;
    }

    const currentTimestamp = getCurrentTimestamp();
    let filename = `literature_review_${currentTimestamp}.pdf`;

    if (docID && documents) {
      const documentsList = documents?.pages?.flatMap(
        (document: any) => document?.documents
      );
      const currentDocument = documentsList.find(
        (document: any) => document.doc_id === docID
      );

      if (currentDocument) {
        filename = `${currentDocument.name.replace(
          /\s+/g,
          "_"
        )}_literature_${currentTimestamp}.pdf`;
      }
    }

    const link = document.createElement("a");
    link.href = instance.url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    ReactGA.event({
      category: "Button",
      action: "Click",
      label: "PDF Exported",
    });
    link.click();
  };

  useEffect(() => {
    setDocID("");
  }, [literatureInput]);
  const isSmallScreen = useMedia("(min-width: 576px)", false);
  return (
    <MyLayout>
      <Navbar />
      <LiteratureHeader>
        <div className="heroImage">
          {isSmallScreen && (
            <Image src={HeroImage} alt="Hero" priority={true} sizes="100vw" />
          )}
        </div>
        <BackToTools href="./">
          <Image src={ArrowLeft} alt="" />
          <p>
            <Trans>Back to tools</Trans>
          </p>
        </BackToTools>
        <h1>
          <Trans>AI Literature Review Writer Tool</Trans>
        </h1>
        <p>
          <Trans>
            Save Time and Effort with an AI-Powered Literature Review Writer.
            Streamline research, generate structured summaries, and create
            cohesive and comprehensive reviews that elevate your academic work. Powered by AI.
          </Trans>
        </p>
      </LiteratureHeader>
      <LiteratureLayout>
        {literatureText.length > 0 && (
          <ResultContainer>
            <ResultBox>
              <p>
                <Trans>Results for</Trans> "{literatureInput}"
              </p>
            </ResultBox>
          </ResultContainer>
        )}
        <Content>
          <LiteratureMainBar
            literatureText={literatureText}
            literatureInput={literatureInput}
            setLiteratureInput={setLiteratureInput}
            isTyping={isTyping}
            exportPDF={exportPDF}
            handleLiteratureText={handleLiteratureText}
          />
          <LiteratureSideBar
            isTyping={isTyping}
            docID={docID}
            setDocID={setDocID}
            literatureYearTo={literatureYearTo}
            setLiteratureYearTo={setLiteratureYearTo}
            literatureYearFrom={literatureYearFrom}
            setLiteratureYearFrom={setLiteratureYearFrom}
          />
        </Content>
      </LiteratureLayout>
      <BottomNavigation/>
      <Footer />
    </MyLayout>
  );
};

export default Literature;

