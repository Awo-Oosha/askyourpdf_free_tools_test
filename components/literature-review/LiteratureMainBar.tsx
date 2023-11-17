import styled from "styled-components";
import Send from "@/img/send.svg?url";
import Image from "next/image";
import { Trans, t } from "@lingui/macro";
import { Footer } from "antd/lib/layout/layout";
import CopyIcon from "@/img/CopyIcon.svg?url";
import Export from "@/img/Export-r.svg?url";
import dynamic from "next/dynamic";
import Spinner from "../Spinner";
import CopyToClipboard from "react-copy-to-clipboard";
import { alerts } from "@/utils/alerts";
import { removeMarkdown } from "@/utils/utils";
import { Input } from "antd";
import UploadIcon from "@/img/uploadCloud.svg?url";
import ConfigIcon from "@/img/SettingsConfig.svg?url";
import { useMedia } from "react-use";
import TextArea from "antd/es/input/TextArea";
import { ChangeEvent, useState } from "react";
import ToolsExport from "../Modals/ExportSourceTools";

const LiteratureContainer = styled.div`
width: 70%;
@media (max-width: 768px) {
  width: 100%;
}
input[type="file"] {
  display: none;
}
.restart{
  font-family:Satoshi;
  margin-top:15px;
  button{
    margin-top:5px;
  }
}
`;

const LiteratureReviewContent = styled.div`
  border-radius: 16px;
  background: #f9f9fa;
  margin-top: 20px;

  flex-grow: 1;
  display: flex;
  flex-direction: column;

  min-height: 652px;
  @media (max-width: 576px) {
    min-height: 400px;
  }
  .title {
    color: #141414;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 171.429% */
    letter-spacing: -0.14px;
  }

  .body {
    padding: 15px 30px;
    width: 100%;
    height: 100%;
  }
`;

const Text = styled.div`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  strong {
    font-weight: 600;
  }

  height: 100%;
  color: #000000;
  font-size: 16px;
  font-style: normal;
  letter-spacing: -0.32px;
  line-height: 2;
  .review__placeholder {
    color: #667085;
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
  }
`;

const ChatFooter = styled.div`
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
    height: 150px !important;
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

const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 0px;

  .copyAndExport {
    width:100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .resTitle{
      font-family: Satoshi;
font-size: 18px;
font-style: normal;
font-weight: 700;
      width:calc(100% - 150px);
    }
    button {
      background: none;
      border: 0;
    }

    .copy {
      cursor: pointer;
      margin-right: 10px;
      border-radius: 6px;
      border: 1px solid #616d7f;
      padding: 5px 14px;
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

const SpinnerContainer = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
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

const ConversationMarkdown = dynamic(
    () => import("@/components/ConversationMarkdown"),
    {
      loading: () => (
          <SpinnerContainer>
            <Spinner style={{ width: "64px" }} />
          </SpinnerContainer>
      ),
    }
);
const TEXT_MAX_LENGTH = 10000;
type props = {
  literatureText: string;
  literatureInput: string;
  setLiteratureInput: any;
  isTyping: boolean;
  setShowConfigurationModal:any
  exportPDF: () => void;
  handleLiteratureText: (
      literature_text: string,
      fromYear?: number,
      toYear?: number
  ) => void;
};

const LiteratureMainBar = ({
                             literatureText,
                             literatureInput,
                             setLiteratureInput,
                             isTyping,
                             setShowConfigurationModal,
                             exportPDF,
                             handleLiteratureText,
                           }: props) => {
  const [isProcessing,setProcessing] =  useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    handleLiteratureText(literatureInput);
    setProcessing(true);
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setLiteratureInput(content.substring(0, TEXT_MAX_LENGTH));
      };

      reader.readAsText(file);
    }
  };
  return (
      <LiteratureContainer>
       {isProcessing===false?(<> <SourceUploadButton htmlFor="file-upload">
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
        <ChatFooter>
            <MessageInputContainer>
              <MessageForm onSubmit={handleSubmit}>
              <p>
              <Trans>Description</Trans>
            </p>
                <MessageInput
                    placeholder="Enter research topic here"
                    value={literatureInput}
                    onChange={(e) => {
                      setLiteratureInput(e.target.value);
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
                <Trans>Maximum of 10000 characters</Trans>
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
                  <Trans>Advanced settings</Trans>
                </p>
              </ConfigurationButton>
              <SourceSubmitButton
                type="submit"
                disabled={isTyping || literatureInput.length === 0}
              >
                <Trans>Review my work</Trans>
              </SourceSubmitButton>
            </ConfigurationSection>
              </MessageForm>
            </MessageInputContainer>
          </ChatFooter></>):(
            
            <>
            <ContentHeader>
            {literatureText.length < 1 && (
                <div className="title">
                  <Trans>Output</Trans>
                </div>
            )}
            {literatureText.length > 0 && (
              
                <div className="copyAndExport">
                  <div className="resTitle">Content</div>
                  <CopyToClipboard
                      text={removeMarkdown(literatureText)}
                      onCopy={() => {
                        alerts.success(t`Copied`, t`Literature Review copied`);
                      }}
                  >
                    <button className="copy">
                      <Image src={CopyIcon} alt="" />
                    </button>
                  </CopyToClipboard>
                  <button
                      className="export"
                      onClick={() => {
                        exportPDF();
                      }}
                  >
                    PDF <Image src={Export} alt="" />
                  </button>
                </div>
            )}
          </ContentHeader>
            <LiteratureReviewContent>
        
          <div className="body">
            <Text>
              {literatureText ? (
                  <ConversationMarkdown answer={literatureText} />
              ) : isTyping ? (
                  <SpinnerContainer style={{ gap: "8px" }}>
                    <p>
                      <Trans>Your Review is being generated</Trans>
                    </p>
                    <Spinner style={{ width: "42px" }} />
                  </SpinnerContainer>
              ) : (
                  <p className="review__placeholder">
                    <Trans>Review will be displayed here</Trans>
                  </p>
              )}
            </Text>
            
          </div>
      
      
        </LiteratureReviewContent>
        <div className="restart">
        <h4>
        <Trans>Start another review</Trans>
      </h4>
      <SourceSubmitButton
        disabled={false}
        onClick={() => {
          setProcessing(false)
        }}
      >
        <Trans>Begin new review</Trans>
      </SourceSubmitButton>
      </div>
        </>
        )}
       
      </LiteratureContainer>
      
  );
};

export default LiteratureMainBar;
