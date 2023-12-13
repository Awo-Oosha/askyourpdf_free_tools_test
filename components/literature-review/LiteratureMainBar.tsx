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
import { useMedia } from "react-use";

const LiteratureContainer = styled.div`
  @media (min-width: 992px) {
    margin-right: 21px;
    height: 100%;
  }
  width: 100%;
  font-family: var(--font-satoshi);
  position: relative;
  margin-bottom: 11px;
  border-radius: 16px;
  border: 1px solid rgba(47, 43, 67, 0.1);
  background: #f9f9fa;
  display: flex;
  flex-direction: column;
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

const ChatFooter = styled(Footer)`
  padding-inline: 1rem;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;

  @media (min-width: 576px) {
    padding-inline: 24px;
  }
  position: sticky;
  bottom: 0;
  margin-top: auto;
`;

const MessageForm = styled.form`
  display: flex;
  align-items: center;
  position: relative;
  /* gap: 8px; */
  /* border: 1px solid #98a2b3; */
  /* border-radius: 12px; */
  /* padding-inline: 14px;
  padding-left: 0; */

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

  button {
    position: absolute;
    right: 14px;
    border: none;
    background: none;
    cursor: pointer;

    img {
      display: block;
    }
  }

  .ant-input {
    border-radius: 8px !important;
    border: 1px solid #e4e7ec !important;
    background: #fff !important;
    color: #667085 !important;
    font-family: var(--font-satoshi) !important;
    font-size: 14px !important;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
  }
  .ant-input-affix-wrapper {
    border-color: transparent !important;
    border-inline-end-width: 2px !important;
    box-shadow: none;

    &:hover {
      border-color: transparent !important;
      border-inline-end-width: 2px !important;
    }
  }
`;

const MessageInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  ${MessageForm} {
    width: 100%;
  }

  .input__count {
    align-self: flex-end;
    margin-right: 4px;
    color: #667085;
    font-size: 14px;
    font-weight: 400;
    font-family: var(--font-satoshi);
  }
  textarea.ant-input {
    border: none !important;
  }
`;

const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 0.5px solid #e4e7ec;
  padding: 15px 30px;

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

const SpinnerContainer = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const MessageInput = styled(Input)`
  border: none;
  border-radius: 12px;
  padding: 10px 14px 10px 11px;
  color: #000000;
  font-size: 16px !important;
  font-family: var(--font-satoshi);
  font-style: normal;
  font-weight: 500;
  line-height: normal !important;
  letter-spacing: -0.32px;
  height: 44px;
  &::placeholder {
    font-size: 14px;
    color: #8a91a8;
  }

  /* 
  &:hover {
    border-color: #e8ecef !important;
    border-inline-end-width: 2px !important;
  } */
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

type props = {
    literatureText: string;
    literatureInput: string;
    setLiteratureInput: any;
    isTyping: boolean;
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
                               exportPDF,
                               handleLiteratureText,
                           }: props) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        handleLiteratureText(literatureInput);
    };
    return (
        <LiteratureContainer>
            <LiteratureReviewContent>
                <ContentHeader>
                    {literatureText.length < 1 && (
                        <div className="title">
                            <Trans>Output</Trans>
                        </div>
                    )}
                    {literatureText.length > 0 && (
                        <div className="copyAndExport">
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
                <ChatFooter>
                    <MessageInputContainer>
                        <MessageForm onSubmit={handleSubmit}>
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
                            <button type="submit">
                                <Image src={Send} alt="" />
                            </button>
                        </MessageForm>
                    </MessageInputContainer>
                </ChatFooter>
            </LiteratureReviewContent>
        </LiteratureContainer>
    );
};

export default LiteratureMainBar;