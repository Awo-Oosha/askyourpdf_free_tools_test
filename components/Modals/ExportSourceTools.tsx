"use client";
import React, { useEffect, useState } from "react";
import { Modal, Row, Col, Input, Space } from "antd";
import styled from "styled-components";
import type { RadioChangeEvent } from "antd";
import { Radio } from "antd";
import DownloadIcon from "@/img/DownloadCloud.svg?url";
import Image from "next/image";
import { ToolsPDFExport } from "../ToolsPDFExport";
import { alerts } from "@/utils/alerts";
import { getCurrentTimestamp, referenceBibTeXData } from "@/utils/utils";
import ReactGA from "react-ga4";
import { t } from "@lingui/macro";
import { usePDF } from "@react-pdf/renderer";
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
import { Buffer } from "buffer";
import { IRunOptions } from "docx/build/file";
const CustomModal = styled(Modal)`
  .ant-modal-content {
    background: #fff;
    min-height: 288px;
    padding: 0 !important;
  }
  .ant-radio-wrapper {
    margin-right: 23px !important;
  }
  .ant-modal-body {
    border-radius: 8px;
    background: #fff;
    width: 100%;
    /* min-height: 288px; */
    padding: 0px 32px;
    @media (max-width: 768px) {
      padding: 0px 16px;
    }
  }
  .ant-radio-wrapper .ant-radio-checked .ant-radio-inner {
    border-color: #344054;
    background-color: #344054;
  }
  .ant-modal-header {
    display: flex;
    align-items: center;
    padding: 24px 0px 0px 32px;
    border-radius: 8px 8px 0px 0px;
    background: #fff;
    cursor: pointer;
    span {
      margin: 8px;
    }
    @media (max-width: 768px) {
      padding: 24px 16px 0px 16px;
    }
  }

  .ant-modal-close-x {
    background: #030303;
  }

  .ant-modal-title {
    color: #101828;
    flex-grow: 1;
    font-family: var(--font-satoshi);
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
  }

  @media (max-width: 576px) {
    .ant-modal-body {
      width: 100%;
    }
  }
  p {
    color: #101828;
    font-family: var(--font-satoshi);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    padding-bottom: 20px;
  }
`;
const ModalContent = styled.div`
  padding-bottom: 16px;
  h2 {
    color: #101828;
    font-family: var(--font-satoshi);
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    padding-bottom: 12px;
  }
  p {
    color: #344054;
    font-family: var(--font-satoshi);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    margin-bottom: 6px;
  }
  .body {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .desc {
      margin-bottom: 5px;
      color: #344054;
      font-family: var(--font-satoshi);
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
    }
    .left {
      margin-left: 20px;
    }
    h2 {
      color: #344054;
      font-family: var(--font-satoshi);
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 20px;
      padding: 8px 0px;
      width: 48%;
    }
  }
`;
const ExportFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 24px;
  padding-top: 40px;
`;
const SubmitButton = styled.button`
  border-radius: 12px;
  border: 1px solid #101828;
  background: #101828;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  display: flex;
  padding: 12px 20px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  color: #fff;
  font-family: var(--font-satoshi);
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
const CancelButton = styled.button`
  border-radius: 12px;
  border: 1px solid #d0d5dd;
  background: #ffffff;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  display: flex;
  padding: 12px 20px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  color: #344054;
  font-family: var(--font-satoshi);
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  cursor: pointer;
  margin-right: 14px;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
const ToolsRadio = styled(Radio)`
  display: flex;
  align-items: center;
  margin-right: 23px;
  p {
    color: #344054;
    font-family: var(--font-satoshi);
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    height: 0px;
    margin-top: 9px;
  }
`;
export default function ToolsExport({ open, setOpen, exportData }: any) {
  const handleSubmit = () => {
    if (value === "pdf") {
      exportPDF();
    } else {
      exportDocument(value);
    }
  };
  const [value, setValue] = useState("pdf");
  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };
  const [instance, updateInstance] = usePDF({
    document: ToolsPDFExport(
      exportData.map((bibTeXData: any) => {
        return bibTeXData.replace(/{|}/g, " ");
      }),
      "Source Tools"
    ),
  });
  useEffect(() => {
    updateInstance(
      ToolsPDFExport(
        exportData.map((bibTeXData: any) => {
          return bibTeXData.replace(/{|}/g, " ");
        }),
        "Source Tools"
      )
    );
  }, [exportData]);
  const exportPDF = () => {
    if (!instance.url) {
      alerts.error(t`An error occurred`, t`Failed to export PDF`);
      return;
    }
    const currentTimestamp = getCurrentTimestamp();
    let filename = `source_tool_${currentTimestamp}.pdf`;
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
  const exportDocument = async (extension: string) => {
    const currentTimestamp = getCurrentTimestamp();
    let filename = `source_tool_${currentTimestamp}`;
    const extensionType =
      extension === "docx"
        ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        : "application/msword";
    const sanitizedData = exportData.map((bibTeXData: string) =>
      bibTeXData.replace(/{|}/g, " ")
    );
    const titleParagraph = new Paragraph({
      text: "Source tools Generated From AskYourPDF",
      heading: HeadingLevel.TITLE,
      spacing: {
        after: 300, // Specify the spacing after the paragraph (in twips).
      },
    });
    const paragraphs = sanitizedData.map((text: string | IRunOptions) => {
      // Each sanitizedData item represents a new paragraph
      return new Paragraph({
        spacing: {
          after: 300, // Specify the spacing after the paragraph (in twips).
        },
        children: [new TextRun(text), new TextRun("\n\n")],
      });
    });
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [titleParagraph, ...paragraphs],
        },
      ],
    });

    const buffer = await Packer.toBuffer(doc);
    const docBuffer = Buffer.from(buffer);
    const blob = new Blob([docBuffer], { type: extensionType });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.${extension}`;
    a.click();
  };
  return (
    <CustomModal
      title="Export As"
      open={open}
      width={560}
      closable={false}
      footer={null}
      onCancel={() => setOpen(!open)}
    >
      <p>Pick your most preferred format</p>
      <ModalContent>
        <h2>Type</h2>
        <Radio.Group onChange={onChange} value={value}>
          <ToolsRadio value={"pdf"}>
            <p> PDF</p>
          </ToolsRadio>
          <ToolsRadio value={"docx"}>
            <p> DOCX</p>
          </ToolsRadio>
          <ToolsRadio value={"doc"}>
            <p> DOC </p>
          </ToolsRadio>
        </Radio.Group>
      </ModalContent>
      <ExportFooter>
        <CancelButton
          disabled={false}
          onClick={() => {
            setOpen(false);
          }}
        >
          Close
        </CancelButton>
        <SubmitButton
          disabled={false}
          onClick={() => {
            handleSubmit();
          }}
        >
          <Image src={DownloadIcon} alt="download" />
          Download ({exportData.length})
        </SubmitButton>
      </ExportFooter>
    </CustomModal>
  );
}
