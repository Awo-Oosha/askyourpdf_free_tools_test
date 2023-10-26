"use client";
import React from "react";
import { useState, useMemo, useRef } from "react";
import { Collapse, Layout } from "antd";
import styled from "styled-components";
import DocumentUpload from "./LiteratureUpload";
import { Dropdown, Button } from "antd";
import { DownOutlined, CheckOutlined } from "@ant-design/icons";
import { Trans, t } from "@lingui/macro";
const DeveloperSidebarStyles = styled.div`
  margin-top: 0;
  width: 100%;
  border-radius: 16px;
  border: 1px solid rgba(47, 43, 67, 0.1);
  background: #f9f9fa;
  @media (min-width: 992px) {
    display: block;
    color: #fff;
    margin-top: 5px;
    height: fit-content;
    flex: 0 0 350px;
  }
`;

const SidebarContent = styled.div`
  min-height: 672px;
  @media (max-width: 576px) {
    min-height: auto;
  }
`;

const SidebarBody = styled.div`
  border-radius: 16px;
  padding: 11px;
`;

const ActionCon = styled.div`
  width: 100%;
  margin-top: 24px;
  .advanceParamsBody {
    flex-direction: column !important;
    align-items: flex-start !important;
  }
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
  }
`;

const LengthButton = styled(Button)`
  width: 100%;
  display: flex !important;
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
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;

  color: var(--gray-500, #667085);
  font-family: var(--font-satoshi);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;

  &:focus {
    border-color: #000;
    outline: none;
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
    padding: 12px 0px !important;
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
const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 0.5px solid #e4e7ec;
  padding: 15px 30px;
  .title {
    display: flex;
    align-items: center;
    cursor: pointer;
    p {
      color: #344054;
      font-family: var(--font-satoshi);
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
      padding-right: 8px;
    }
  }
`;
type Props = {
  docID: string;
  setDocID: any;
  isTyping: boolean;
  literatureYearTo: number | undefined;
  setLiteratureYearTo: any;
  literatureYearFrom: number | undefined;
  setLiteratureYearFrom: any;
};

export default function LiteratureSideBar({
                                            docID,
                                            setDocID,
                                            isTyping,
                                            literatureYearTo,
                                            setLiteratureYearTo,
                                            literatureYearFrom,
                                            setLiteratureYearFrom,
                                          }: Props) {
  const [prompt, setPrompt] = useState("");
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 40 }, (_, index) => currentYear - index);
  const formatFromItems = years.map((format) => ({
    key: format,
    label: (
        <MenuItem>
          {format}
          {literatureYearFrom === format && (
              <CheckOutlined style={{ fontWeight: "700", color: "#7F56D9" }} />
          )}
        </MenuItem>
    ),
  }));
  const formatToItems = years.map((format) => ({
    key: format,
    label: (
        <MenuItem>
          {format}
          {literatureYearTo === format && (
              <CheckOutlined style={{ fontWeight: "700", color: "#7F56D9" }} />
          )}
        </MenuItem>
    ),
    disabled: format < literatureYearFrom!,
  }));

  return (
      <DeveloperSidebarStyles
          style={{
            background: "#F8F8F8",
            overflow: "auto",
          }}
      >
        <SidebarContent>
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
                <Trans>Field of Study</Trans>
              </div>
              <div className="body">
                <TextArea
                    placeholder={t`Please enter instructions on how to review your text input OR document`}
                    value={prompt}
                    onChange={(e) => {
                      setPrompt(e.target.value);
                    }}
                />
              </div>
            </ActionCon>
            <ActionCon>
              <div className="title">
                <Trans>Date Range</Trans>
              </div>
              <div className="body">
                <Dropdown
                    menu={{
                      items: formatFromItems,
                      selectable: true,
                      onSelect: (info) => {
                        const value = parseInt(info.key) as number;
                        setLiteratureYearFrom(value);
                      },
                    }}
                    trigger={["click"]}
                    overlayClassName="summaryDropdown literatureDropdown"
                >
                  <LengthButton>
                    {literatureYearFrom ? literatureYearFrom : "From"}
                    <span>
                    <DownOutlined />
                  </span>
                  </LengthButton>
                </Dropdown>
                <Dropdown
                    menu={{
                      items: formatToItems,
                      selectable: true,
                      onSelect: (info) => {
                        const value = parseInt(info.key) as number;
                        setLiteratureYearTo(value);
                      },
                    }}
                    trigger={["click"]}
                    overlayClassName="summaryDropdown literatureDropdown"
                    className="left"
                >
                  <LengthButton>
                    {literatureYearTo ? literatureYearTo : "To"}
                    <span>
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
                              <Trans>Description</Trans>
                            </div>
                            <TextArea
                                placeholder={t`Please enter instructions on how to review your text input OR document`}
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
          </SidebarBody>
        </SidebarContent>
      </DeveloperSidebarStyles>
  );
}
