import React, { ChangeEvent, useRef, useState } from "react";
import styled from "styled-components";
import UploadIcon from "@/img/uploadCloud.svg?url";
import ConfigIcon from "@/img/SettingsConfig.svg?url";
import Image from "next/image";
import { Input } from "antd";
import { useMedia } from "react-use";
import ToolsConfiguration from "../../Modals/SourceToolsConfiguration";
import { Trans } from "@lingui/macro";
const { TextArea } = Input;
const SourceContainer = styled.div`
  width: 70%;
  @media (max-width: 768px) {
    width: 100%;
  }
  input[type="file"] {
    display: none;
  }
`;
const SourceUploadButton = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 1px solid #f7db96;
  background: #fdf7e8;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  padding: 10px 18px;
  width: max-content;
  cursor: pointer;
  p {
    color: #a87d12;
    font-family: var(--font-satoshi);
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    padding-left: 8px;
  }
`;
const SourceDescription = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 16px 0px;
  p {
    color: #344054;
    font-family: var(--font-satoshi);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
  }
  span {
    color: #475467;
    font-family: var(--font-satoshi);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
  }
`;
const MessageForm = styled.form`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 8px;
  border-radius: 12px;
  padding-inline: 14px;
  padding-left: 0;
  .inputClass {
    width: 100%;
    border: none;
    outline: none;
    padding: 10px 14px;
    color: var(--gray-500, #667085);
    font-family: var(--font-satoshi);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
  }
`;
const MessageInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;

  ${MessageForm} {
    width: 100%;
  }
  textarea.ant-input {
    height: 905px !important;
    padding: 12px 14px !important;
    border-radius: 8px !important;
  }
  .input__count {
    align-self: flex-end;
    margin-right: 4px;
    color: #667085;
    font-size: 14px;
    font-weight: 400;
    font-family: var(--font-satoshi);
  }
`;

const MessageInput = styled(TextArea)`
  padding-inline: 11px;
  color: #000000;
  font-size: 16px !important;
  font-family: var(--font-satoshi);
  font-style: normal;
  font-weight: 500;
  line-height: normal !important;
  letter-spacing: -0.32px;
  padding-block: 10px;
  border-radius: 8px;
  border: 1px solid #d0d5dd;
  background: #fff;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);

  &::placeholder {
    font-size: 16px;
    color: #667085;
  }
`;
const ConfigurationSection = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
`;
export const SourceSubmitButton = styled.button`
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
const ConfigurationButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  p {
    color: #a87d12;
    font-family: var(--font-satoshi);
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    padding-left: 8px;
  }
`;

const TEXT_MAX_LENGTH = 300;
type props = {
  sourceInput: string;
  setSourceInput: any;
  isTyping: boolean;
  handleSourceText: (source_text: string, configuration: any) => void;
  configuration: any;
  setConfiguration: any;
};

export const SourceContent = ({
  sourceInput,
  setSourceInput,
  isTyping,
  handleSourceText,
  configuration,
  setConfiguration,
}: props) => {
  const [showConfigurationModal, setShowConfigurationModal] = useState(false);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (sourceInput.length === 0) {
      return;
    }
    handleSourceText(sourceInput, configuration);
  };
  const isLargeScreen = useMedia("(min-width: 992px)", true);
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setSourceInput(content.substring(0, TEXT_MAX_LENGTH));
      };

      reader.readAsText(file);
    }
  };
  return (
    <SourceContainer>
      <SourceUploadButton htmlFor="file-upload">
        <Image src={UploadIcon} alt="Upload" />
        <p>
          <Trans>Upload text file</Trans>
        </p>
      </SourceUploadButton>
      <input
        id="file-upload"
        accept=".txt"
        onChange={handleFileUpload}
        type="file"
      />
      <SourceDescription>
        <MessageInputContainer>
          <MessageForm onSubmit={handleSubmit}>
            <p>
              <Trans>Description</Trans>
            </p>
            <MessageInput
              placeholder={"Write or paste your essay or title here."}
              autoSize={{ minRows: 1, maxRows: isLargeScreen ? 6 : 3 }}
              maxLength={TEXT_MAX_LENGTH}
              value={sourceInput}
              onChange={(e) => {
                setSourceInput(e.target.value);
              }}
              onKeyDown={(e) => {
                if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <div className="buttom-button">
              <span>
                <Trans>Maximum of 300 characters</Trans>
              </span>
            </div>
            <ConfigurationSection>
              <ConfigurationButton
                onClick={() => {
                  setShowConfigurationModal(true);
                }}
              >
                <Image src={ConfigIcon} alt="" />
                <p>
                  <Trans>Configure search</Trans>
                </p>
              </ConfigurationButton>
              <SourceSubmitButton
                type="submit"
                disabled={isTyping || sourceInput.length === 0}
              >
                <Trans>Find sources</Trans>
              </SourceSubmitButton>
            </ConfigurationSection>
          </MessageForm>
          <ToolsConfiguration
            open={showConfigurationModal}
            setOpen={setShowConfigurationModal}
            configuration={configuration}
            setConfiguration={setConfiguration}
          />
        </MessageInputContainer>
      </SourceDescription>
    </SourceContainer>
  );
};
