"use client";
import React, { useState } from "react";
import { Modal, Row, Col, Input, Space } from "antd";
import styled from "styled-components";
import { Trans, t } from "@lingui/macro";
import { Dropdown, Button, Checkbox } from "antd";
import { DownOutlined, CheckOutlined } from "@ant-design/icons";
import CalendarIcon from "@/img/CalendarDate.svg?url";
import Image from "next/image";
import TagsInput from "../keywordInput";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
const CustomModal = styled(Modal)`
  .ant-modal-content {
    background: #fff;
    min-height: 393px;
    padding: 0 !important;
  }
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #344054 !important;
    border-color: #344054 !important;
    outline: none !important;
  }
  .ant-checkbox-wrapper + .ant-checkbox-wrapper {
    @media (max-width: 768px) {
      margin-left: 0px;
    }
  }

  .ant-modal-body {
    border-radius: 8px;
    background: #fff;
    width: 100%;
    min-height: 301px;
    padding: 0px 32px;
    @media (max-width: 768px) {
      padding: 0px 16px;
    }
  }

  .ant-modal-header {
    display: flex;
    align-items: center;
    padding: 24px 0px 20px 32px;
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
`;
const TabGroup = styled.div`
  display: inline-flex;
`;
const Tab = styled.button<{ $active: boolean }>`
  padding: 10px 16px;
  border: 0.5px solid transparent;
  color: ${(props) => (props.$active ? "#ffffff" : "#344054")};
  background: ${(props) => (props.$active ? "#000000" : "#ffffff")};
  cursor: pointer;

  font-family: var(--font-satoshi);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;

  &:first-child {
    border-start-start-radius: 8px;
    border-end-start-radius: 8px;
    border-color: ${(props) => (props.$active ? "transparent" : "#d0d5dd")};
  }

  &:last-child {
    border-start-end-radius: 8px;
    border-end-end-radius: 8px;
    border-color: ${(props) => (props.$active ? "transparent" : "#d0d5dd")};
  }
`;

const TabSection = styled.div`
  margin-top: 8px;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: flex-start;

  @media (min-width: 992px) {
    flex-direction: row;
    align-items: center;
    gap: unset;
    justify-content: space-between;
  }
`;
const YearButton = styled(Button)`
  width: 100%;
  display: flex !important;
  flex-direction: row;
  align-items: center;
  color: #667085;
  font-family: var(--font-satoshi);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  padding-inline: 14px;
  padding-block: 10px;
  border-radius: 8px;
  border: 1px solid #e4e7ec;
  span {
    margin-right: 8px;
  }

  &:hover {
    color: #101828 !important;
    border: 1px solid #e4e7ec !important;
  }
`;
const MenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ModalContent = styled.div`
  padding-bottom: 16px;
  h2 {
    color: #101828;
    font-family: var(--font-satoshi);
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
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
const MessageInput = styled(Input)`
  padding: 10px 14px 10px 11px;
  color: #000000;
  font-size: 16px !important;
  font-family: var(--font-satoshi);
  font-style: normal;
  font-weight: 500;
  line-height: normal !important;
  letter-spacing: -0.32px;
  border-radius: 8px;
  border: 1px solid #d0d5dd;
  background: #fff;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  height: 40px;
  &::placeholder {
    font-size: 14px;
    color: #8a91a8;
  }
`;
const StyledCheckbox = styled(Checkbox)`
  .ant-checkbox + span {
    color: #344054;
    text-align: center;
    font-family: var(--font-satoshi);
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    padding-top: 5px;
  }
`;
const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 23px;
  @media (max-width: 576px) {
    align-items: flex-start;
    gap: 12px;
    flex-direction: column;
  }
`;
const ConfigFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 24px;
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
export default function ToolsConfiguration({
  configuration,
  setConfiguration,
  open,
  setOpen,
}: any) {
  const [selectedTab, setSelectedTab] = useState("BIB");

  const formats = [
    {
      key: "BIB",
      value: "BIB",
    },
    {
      key: "MLA",
      value: "MLA",
    },
    {
      key: "Harvard",
      value: "HARVARD",
    },
    {
      key: "IEEE",
      value: "IEEE",
    },
    {
      key: "APA",
      value: "APA",
    },
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 40 }, (_, index) => currentYear - index);
  const [sourceYearFrom, setSourceYearFrom] = useState<number | undefined>();
  const [sourceYearTo, setSourceYearTo] = useState<number | undefined>();
  const [citation, setCitation] = useState<number | string>(0);
  const formatFromItems = years.map((format) => ({
    key: format,
    label: (
      <MenuItem>
        {format}
        {sourceYearFrom === format && (
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
        {sourceYearTo === format && (
          <CheckOutlined style={{ fontWeight: "700", color: "#7F56D9" }} />
        )}
      </MenuItem>
    ),
    disabled: format < sourceYearFrom!,
  }));
  const [includeKeywords, setIncludeKeywords] = useState<string[]>([]);
  const [excludeKeywords, setExcludeKeywords] = useState<string[]>([]);
  const [researchChecked, setResearchChecked] = useState(false);
  const [reviewChecked, setReviewChecked] = useState(false);
  const [pdfChecked, setPdfChecked] = useState(false);

  const handleResearchChange = (e: CheckboxChangeEvent) => {
    setResearchChecked(e.target.checked);
  };

  const handleReviewChange = (e: CheckboxChangeEvent) => {
    setReviewChecked(e.target.checked);
  };

  const handlePdfChange = (e: CheckboxChangeEvent) => {
    setPdfChecked(e.target.checked);
  };
  const handleIncludeKeywordsChange = (tags: string[]) => {
    setIncludeKeywords(tags);
  };
  const handleSubmit = () => {
    let configuration = {
      citation_format: selectedTab,
      year_from: sourceYearFrom ? sourceYearFrom : 2010,
      year_to: sourceYearTo ? sourceYearTo : 2023,
      min_citations: citation,
      include_keywords: includeKeywords,
      exclude_keywords: excludeKeywords,
    };
    setConfiguration(configuration);
    setOpen(false);
  };
  const handleExcludeKeywordsChange = (tags: string[]) => {
    setExcludeKeywords(tags);
  };

  return (
    <CustomModal
      title="Configure Search"
      open={open}
      width={636}
      closable={false}
      footer={null}
      onCancel={() => setOpen(!open)}
    >
      <ModalContent>
        <h2>Reference format</h2>
        <TabSection>
          <TabGroup>
            {formats.map((item) => {
              return (
                <Tab
                  $active={selectedTab === item.value}
                  key={item.key}
                  onClick={() => {
                    setSelectedTab(item.value);
                  }}
                >
                  <Trans>{item.key}</Trans>
                </Tab>
              );
            })}
          </TabGroup>
        </TabSection>
      </ModalContent>
      <ModalContent>
        <h2>Publications</h2>
        <div className="body">
          <h2>From</h2>
          <h2>To</h2>
        </div>
        <div className="body">
          <Dropdown
            menu={{
              items: formatFromItems,
              selectable: true,
              onSelect: (info) => {
                const value = parseInt(info.key) as number;
                setSourceYearFrom(value);
              },
            }}
            trigger={["click"]}
            overlayClassName="summaryDropdown literatureDropdown"
          >
            <YearButton>
              <span>
                <Image src={CalendarIcon} alt="Calendar" />
              </span>
              {sourceYearFrom ? sourceYearFrom : "From"}
            </YearButton>
          </Dropdown>
          <Dropdown
            menu={{
              items: formatToItems,
              selectable: true,
              onSelect: (info) => {
                const value = parseInt(info.key) as number;
                setSourceYearTo(value);
              },
            }}
            trigger={["click"]}
            overlayClassName="summaryDropdown literatureDropdown"
            className="left"
          >
            <YearButton>
              <span>
                <Image src={CalendarIcon} alt="Calendar" />
              </span>
              {sourceYearTo ? sourceYearTo : "To"}
            </YearButton>
          </Dropdown>
        </div>
      </ModalContent>
      <ModalContent>
        <h2>Citations</h2>
        <p>Minimum Citations</p>
        <MessageInput
          placeholder="10"
          value={citation}
          type="number"
          onChange={(e) => {
            setCitation(e.target.value);
          }}
        />
      </ModalContent>
      <ModalContent>
        <h2>Include Keywords</h2>
        <TagsInput onTagsChange={handleIncludeKeywordsChange} />
      </ModalContent>
      <ModalContent>
        <h2>Exclude Keywords</h2>
        <TagsInput onTagsChange={handleExcludeKeywordsChange} />
      </ModalContent>
      <ModalContent>
        <CheckBoxWrapper>
          <StyledCheckbox
            checked={researchChecked}
            onChange={handleResearchChange}
          >
            Research article
          </StyledCheckbox>
          <StyledCheckbox checked={reviewChecked} onChange={handleReviewChange}>
            Review article
          </StyledCheckbox>
          <StyledCheckbox checked={pdfChecked} onChange={handlePdfChange}>
            Include PDF’s
          </StyledCheckbox>
        </CheckBoxWrapper>
      </ModalContent>
      <ConfigFooter>
        <CancelButton
          disabled={false}
          onClick={() => {
            setOpen(false);
          }}
        >
          Cancel
        </CancelButton>
        <SubmitButton
          disabled={false}
          onClick={() => {
            handleSubmit();
          }}
        >
          Save
        </SubmitButton>
      </ConfigFooter>
    </CustomModal>
  );
}
