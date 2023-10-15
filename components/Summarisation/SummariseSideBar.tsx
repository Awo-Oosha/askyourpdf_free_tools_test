"use client";
import React from "react";
import { useState, useMemo, useRef } from "react";
import { Collapse, Layout } from "antd";
import styled from "styled-components";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import DocumentUpload from "./SummariseUpload"; // You may need to adjust the import path
import { Dropdown, Button, Menu } from "antd";
import { DownOutlined, UpOutlined, CheckOutlined } from "@ant-design/icons";
import Check from "@/img/Check.png";
import {
  SummarizationFormat,
  SummarizationLength,
} from "@/services/conversations";
import { toSentenceCase } from "@/utils/utils";
import { Trans, t } from "@lingui/macro";
const { Sider } = Layout;


const DeveloperSidebarStyles = styled.div`
  margin-top: 0;
  width: 100%;
  @media (min-width: 992px) {
    display: block;
    color: #fff;
    height: fit-content;
    flex: 0 0 350px;
  }
`;

const SidebarContent = styled.div``;

const SidebarContentHeader = styled.div`
  padding: 15px 30px;
  border-radius: 12px;
  border: 1px solid #a1a1a1;
  font-family: var(--font-satoshi);
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: -0.16px;
  color: #ffff;
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  display: none;

  span {
    margin-right: 15px;
  }

  @media (min-width: 992px) {
    display: flex;
  }
`;

const SidebarBody = styled.div`
  border-radius: 16px;
  background: #fff;
  padding: 11px;

  @media (min-width: 992px) {
    margin-top: 20px;
  }
`;

const ActionCon = styled.div`
  width: 100%;
  margin-top: 24px;

  .title {
    color: #344054;
    font-family: var(--font-satoshi);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    color: #000;
    margin-bottom: 6px;
  }
  .body {
    .desc {
      margin-bottom: 5px;
      color: #344054;
      font-family: var(--font-satoshi);
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
    }
  }

  // .advanceParamsBody {
  //   visibility: hidden;
  // }
`;

const LengthButton = styled(Button)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  color: #101828;
  font-family: var(--font-satoshi);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;

  padding-inline: 14px;
  padding-block: 10px;

  border-radius: 8px;
  border: 1px solid #e4e7ec;

  &:hover {
    color: #101828 !important;
    border: 1px solid #e4e7ec !important;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 70px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;

  color: var(--gray-500, #667085);
  font-family: var(--font-satoshi);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;

  &:focus {
    border-color: #000;
    outline: none;
  }
`;

const SummariseButton = styled.button`
  margin-top: 4rem;
  border-radius: 12px;
  background: #000;
  display: flex;
  width: 100%;
  padding: 16px 24px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  color: var(--neutral-01100, #fefefe);
  font-family: var(--font-satoshi);
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 150% */
  letter-spacing: -0.32px;
  border: none;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const MenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AdvancedParameters = styled(Collapse)`
  .ant-collapse-item .ant-collapse-header {
    padding-inline: 0;
    .ant-collapse-header-text {
      flex: unset;
      margin-inline-end: unset;
      color: #344054;
      font-family: var(--font-satoshi);
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
    }

    .ant-collapse-expand-icon {
      padding-inline-start: 8px !important;
    }
  }

  .ant-collapse-item .ant-collapse-content {
    .ant-collapse-content-box {
      padding-inline: 0;
      padding-block: 0;
      padding-bottom: 12px;
    }
  }
`;

type Props = {
  docID: string;
  setDocID: any;
  handleSummariseDocument: (
    doc_id: string,
    prompt: string,
    length: SummarizationLength,
    format: SummarizationFormat
  ) => void;
  isTyping: boolean;
  summaryFormat: SummarizationFormat;
  setSummaryFormat: any;
  summaryLength: SummarizationLength;
  setSummaryLength: any;
};

const lengthOptions = [
  SummarizationLength.AUTO,
  SummarizationLength.SHORT,
  SummarizationLength.LONG,
];

const formatOptions = [
  SummarizationFormat.AUTO,
  SummarizationFormat.PARAGRAPH,
  SummarizationFormat.BULLET,
  SummarizationFormat.PAPER,
];

export default function SummariseSideBar({
  docID,
  setDocID,
  handleSummariseDocument,
  isTyping,
  summaryLength,
  setSummaryLength,
  summaryFormat,
  setSummaryFormat,
}: Props) {
  const [prompt, setPrompt] = useState("");

  const formatItems = formatOptions.map((format) => ({
    key: format,
    label: (
      <MenuItem>
        {toSentenceCase(format)}
        {summaryFormat === format && (
          <CheckOutlined style={{ fontWeight: "700", color: "#7F56D9" }} />
        )}
      </MenuItem>
    ),
  }));

  const lengthItems = lengthOptions.map((length) => ({
    key: length,
    label: (
      <MenuItem>
        {toSentenceCase(length)}
        {summaryLength === length && (
          <CheckOutlined style={{ fontWeight: "700", color: "#7F56D9" }} />
        )}
      </MenuItem>
    ),
  }));

  return (
    <DeveloperSidebarStyles
      style={{
        background: "#F8F8F8",
        overflow: "auto",
      }}
    >
      <SidebarContent>
        <SidebarContentHeader>
          <span><Trans>Explore Other Tools</Trans></span> <ArrowRight style={{width:"20px"}} />
        </SidebarContentHeader>
        <SidebarBody>

          <DocumentUpload
            onUpload={(id) => {
              setDocID(id);
            }}
            onRemoved={() => {
              setDocID("");
            }}
            docID={docID}
          />
          <ActionCon>
            <div className="title">
              <Trans>Length</Trans>
            </div>
            <div className="body">
              <Dropdown
                menu={{
                  items: lengthItems,
                  selectable: true,
                  defaultSelectedKeys: [SummarizationLength.AUTO],
                  onSelect: (info) => {
                    const value = info.key as SummarizationLength;
                    setSummaryLength(value);
                  },
                }}
                trigger={["click"]}
                overlayClassName="summaryDropdown"
              >
                <LengthButton>
                  {toSentenceCase(summaryLength)}
                  <span>
                    {" "}
                    <DownOutlined />{" "}
                  </span>
                </LengthButton>
              </Dropdown>
            </div>
          </ActionCon>

          <ActionCon>
            <div className="title">
              <Trans>Format</Trans>
            </div>
            <div className="body">
              <Dropdown
                menu={{
                  items: formatItems,
                  selectable: true,
                  defaultSelectedKeys: [SummarizationFormat.AUTO],
                  onSelect: (info) => {
                    const value = info.key as SummarizationFormat;
                    setSummaryFormat(value);
                  },
                }}
                trigger={["click"]}
                overlayClassName="summaryDropdown"
              >
                <LengthButton>
                  {toSentenceCase(summaryFormat)}
                  <span>
                    {" "}
                    <DownOutlined />{" "}
                  </span>
                </LengthButton>
              </Dropdown>
            </div>
          </ActionCon>

          <ActionCon style={{ marginTop: "34px" }}>
            <AdvancedParameters
              ghost
              expandIconPosition="end"
              items={[
                {
                  key: 1,
                  label: t`Advanced Parameters`,
                  children: (
                    <div className="body advanceParamsBody">
                      <div className="desc">
                        <Trans>Prompt</Trans>
                      </div>
                      <TextArea
                        placeholder={t`Please enter instructions on how to summarise your text input OR document`}
                        value={prompt}
                        onChange={(e) => {
                          setPrompt(e.target.value);
                        }}
                      />
                    </div>
                  ),
                },
              ]}
            />
          </ActionCon>

          <SummariseButton
            onClick={() => {
              handleSummariseDocument(
                docID,
                prompt,
                summaryLength,
                summaryFormat
              );
            }}
            disabled={isTyping || docID.length === 0}
          >
            Summarise
          </SummariseButton>
        </SidebarBody>
      </SidebarContent>
    </DeveloperSidebarStyles>
  );
}

