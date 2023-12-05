import React, {useState, useEffect} from 'react'
import styled, {keyframes} from 'styled-components';
import CopyIcon from "@/img/CopyIcon.svg?url";
import Export from "@/img/Export-r.svg?url";
import Image from 'next/image';
import { alerts } from '@/utils/alerts';
import { t, Trans } from "@lingui/macro";
import CopyToClipboard from "react-copy-to-clipboard";
import { covertToItalics, getCurrentTimestamp, removeMarkdown } from "@/utils/utils";
import { ToolsPDFExport } from "@/components/ToolsPDFExport";
import { usePDF } from "@react-pdf/renderer";
import Spinner from '@/components/Spinner';





const Container = styled.div`
  width: 100%;
  border-radius: 20px;
  border: 1px solid #E4E7EC;
  background: #FFF;

  @media(min-width: 992px) {
    width: 70%;
  }
`;

const Heading = styled.div`
    
    border-bottom: 1px solid #E4E7EC;
    padding: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;

  span {
    color: #000;
    font-family: var(--font-satoshi);;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
  }
`;

const GenerateActions = styled.div`
    display: flex;
    justify-content: space-between;

  .copyAndExport {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    button {
      background: none;
      border: 0;
    }

    .copy {
      cursor: pointer;
      margin-right: 10px;
    }
    .export {
      cursor: pointer;
      border-radius: 6px;
      border: 1px solid #616d7f;
      padding: 8px 14px;

      color: #616d7f;
      text-align: center;
      font-family: var(--font-satoshi);
      font-size: 12px;
      font-style: normal;
      font-weight: 400;

      img {
        vertical-align: middle;
      }
    }
  }
`;

const fadeInOut = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const LoadState = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 10px;

  p {
    color: #000;
    font-family: var(--font-satoshi);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    animation: ${fadeInOut} 2s ease-in-out infinite;
  }
`;



const GenerateContentBody = styled.div`
  padding: 30px 24px;
  
  div {
    color: #667085;
    font-family: var(--font-satoshi);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    pre {
      color: #667085;
      font-family: var(--font-inter);
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }

  @media (max-width: 992px) {
    min-height: 300px;
  }
`;


const GeneratorMainBar = ({ generateResult, pdfTitle, isLoading }: any) => {
  let title = pdfTitle;
  const [instance, updateInstance] = usePDF({
    document: ToolsPDFExport(
      covertToItalics(removeMarkdown(generateResult)),
      `${title}`
    ),
  });

  useEffect(() => {
    updateInstance(
      ToolsPDFExport(
        covertToItalics(removeMarkdown(generateResult)),
        `${title}`
      )
    );
  }, [generateResult, title, updateInstance]);

  const exportPDF = () => {
    if (!instance.url) {
      console.error("Failed to export PDF");
      alerts.error(t`PDF Export Failed`, t`Failed to export PDF. Please try again.`);
      return;
    }

    const currentTimestamp = getCurrentTimestamp();
    let filename = `ai_generator_${currentTimestamp}.pdf`;

    const link = document.createElement("a");
    link.href = instance.url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
  };


  return (
    <Container>
      <Heading>
        <span>Generate Rap</span>
        <GenerateActions>
          <div className="copyAndExport">
            <CopyToClipboard
              text={removeMarkdown(generateResult)}
              onCopy={() => {
                alerts.success(t`Copied`, t`Copied`);
              }}
            >
              <button className="copy">
                <Image src={CopyIcon} alt="" />
              </button>
            </CopyToClipboard>
            <button
              className="export"
              onClick={exportPDF}
              >
              PDF <Image src={Export} alt="" />
            </button>
          </div>
        </GenerateActions>
      </Heading>

      <GenerateContentBody>
        <div>
          {isLoading ? (
            <LoadState>
              <Spinner style={{ width: '50px', height: '50px' }} />
              <p><Trans>Generating Request...</Trans></p>
            </LoadState>
          ) : (
            <pre>{generateResult}</pre>
          )}
        </div>
      </GenerateContentBody>
    </Container>
  )
}

export default GeneratorMainBar;