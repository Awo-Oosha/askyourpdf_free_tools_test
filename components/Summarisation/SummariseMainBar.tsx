import { useState } from "react";
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
import { calculateAnalytics, removeMarkdown } from "@/utils/utils";
import {
  SummarizationFormat,
  SummarizationLength,
} from "@/services/conversations";
import { Input } from "antd";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { useMedia } from "react-use";
import { useAuth } from "@/providers/AuthProvider";
import { CaretDoubleRight, CaretDoubleLeft } from '@phosphor-icons/react';
import { useRouter } from "next/router";
import { path } from "@/routes";
import Coin from '@/img/Coins.png';
import CreditBalance from "../Conversations/CreditBalance";


const { TextArea } = Input;

const SummariseContainer = styled.div`
  @media (min-width: 992px) {
    margin-right: 21px;
    height: 100%;
  }

  width: 100%;
  margin-top: 5px;
  font-family: var(--font-satoshi);
  position: relative;
  margin-bottom: 20px;

  display: flex;
  flex-direction: column;
`;

const SummarisationHeader = styled.div`
  padding: 15px 15px;
  border-radius: 12px;
  border: 1px solid #a1a1a1;
  width: 100%;
  color: #292928;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  font-family: var(--font-satoshi);
  line-height: normal;
  letter-spacing: -0.32px;

  span {
    font-weight: 700;
  }
`;

const SummarisationContent = styled.div`
  border-radius: 16px;
  background: #fff;
  margin-top: 20px;

  flex-grow: 1;
  display: flex;
  flex-direction: column;

  min-height: 400px;
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

  .summary__placeholder {
    color: #667085;
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
  }
`;

const ChatFooter = styled(Footer)`
  padding-inline: 1rem;
  background-color: #fff;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  margin-top: auto;

  @media (min-width: 576px) {
    padding-inline: 24px;
  }

  @media (min-width: 992px) {
    position: sticky;
    bottom: 0;
  }
`;

const MessageForm = styled.form`
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #98a2b3;
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

  button {
    border: none;
    background: none;
    cursor: pointer;

    img {
      display: block;
    }
  }

  .ant-input {
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

const MessageInput = styled(TextArea)`
  border: 0;
  border-radius: 12px;

  padding-inline: 11px;
  border-radius: 25px !important;
  color: #000000;
  font-size: 16px !important;
  font-family: var(--font-satoshi);
  font-style: normal;
  font-weight: 500;
  line-height: normal !important;
  letter-spacing: -0.32px;
  padding-block: 10px;

  &::placeholder {
    font-size: 14px;
    color: #8a91a8;
  }

  &:hover {
    border-color: #e8ecef !important;
    border-inline-end-width: 2px !important;
  }
`;

const ExploreBanner = styled.div`
  margin-top: 20px;
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

  span {
    margin-right: 15px;
  }

  @media (min-width: 992px) {
    display: none;
  }
`;
const Wrapper = styled.div`
  width: fit-content;
  margin-bottom: 10px;
`;

const ConversationMarkdown = dynamic(
  () => import("@/components/ConversationMarkdown"),
  {
    loading: () => (
      <SpinnerContainer style={{ gap: "8px" }}>
        <p>
          <Trans>Your summary is being generated</Trans>
        </p>
        <Spinner style={{ width: "42px" }} />
      </SpinnerContainer>
    ),
  }
);

const TEXT_MAX_LENGTH = 10000;

type props = {
  summaryText: string;
  summaryInput: string;
  setSummaryInput: any;
  isTyping: boolean;
  exportPDF: () => void;
  handleSummariseText: (
    summary_text: string,
    length: SummarizationLength,
    format: SummarizationFormat
  ) => void;
  summaryLength: SummarizationLength;
  summaryFormat: SummarizationFormat;
  setUnitsExceeded: React.Dispatch<React.SetStateAction<boolean>>;
};

const SummariseMainBar = ({
  summaryText,
  summaryInput,
  setSummaryInput,
  isTyping,
  exportPDF,
  handleSummariseText,
  summaryLength,
  summaryFormat,
  setUnitsExceeded
}: props) => {
  const { userAnalytics } = useAuth();
  const [clicked, setClicked] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (summaryInput.length === 0) {
      return;
    }

    if (userAnalytics && userAnalytics.number_units) {
      const summaryUsage = calculateAnalytics(
        userAnalytics.number_units
      );
      if (Number(summaryUsage) >= 100) {
        setUnitsExceeded(true);
        return;
      }
    }

    handleSummariseText(summaryInput, summaryLength, summaryFormat);
  };

  const isLargeScreen = useMedia("(min-width: 992px)", true);

  const handleClick = () => {
    if (clicked !== true) {
      setClicked(true);
    } else {
      setClicked(false)
    }
  };

  const handleBuyButton = () => {
    router.push(`${path.settings}#credits`)
  };
  return (
    <SummariseContainer>
      <Wrapper>
        <CreditBalance />
      </Wrapper>
      <SummarisationHeader>
        <span>
          {" "}
          <Trans>Summarise Documents</Trans>{" "}
        </span>{" "}
        -{" "}
        <Trans>
          Extract key insights and create concise summaries using our AI
          Document Summarisation Tool. (200 pages max)
        </Trans>
      </SummarisationHeader>
      <ExploreBanner>
        <span>
          <Trans>Explore Other Tools</Trans>
        </span>{" "}
        <ArrowRight style={{width:"20px"}} />
      </ExploreBanner>
      <SummarisationContent>
        <ContentHeader>
          <div className="title">
            <Trans>Summary</Trans>
          </div>
          {summaryText.length > 0 && (
            <div className="copyAndExport">
              <CopyToClipboard
                text={removeMarkdown(summaryText)}
                onCopy={() => {
                  alerts.success(t`Copied`, t`Summary copied`);
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
            {summaryText ? (
              <ConversationMarkdown answer={summaryText} />
            ) : isTyping ? (
              <SpinnerContainer style={{ gap: "8px" }}>
                <p>
                  <Trans>Your summary is being generated</Trans>
                </p>
                <Spinner style={{ width: "42px" }} />
              </SpinnerContainer>
            ) : (
              <p className="summary__placeholder">
                <Trans>Summary will be displayed here</Trans>
              </p>
            )}
          </Text>
        </div>
        <ChatFooter>
          <MessageInputContainer>
            <MessageForm onSubmit={handleSubmit}>
              <MessageInput
                placeholder={
                  isLargeScreen
                    ? t`Input some text here OR upload a document in the right pane to summarise`
                    : t`Input some text here OR upload a document in the pane below to summarise`
                }
                autoSize={{ minRows: 1, maxRows: isLargeScreen ? 6 : 3 }}
                maxLength={TEXT_MAX_LENGTH}
                value={summaryInput}
                onChange={(e) => {
                  setSummaryInput(e.target.value);
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
            <p className="input__count">{`${summaryInput.length} / ${TEXT_MAX_LENGTH}`}</p>
          </MessageInputContainer>
        </ChatFooter>
      </SummarisationContent>
    </SummariseContainer>
  );
};

export default SummariseMainBar;
