import React, { Fragment } from "react";
import styled from "styled-components";
import { Input, Modal } from "antd";
import CloseIcon from "../../img/ModalCloseIcon.svg";
import CopyIcon from "../../img/CopyIcon.svg";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { getShareLinks } from "../../utils/utils";
import { alerts } from "../../utils/alerts";
import { Trans, t } from "@lingui/macro";
import Image from "next/image";

type props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  url: string;
  documentName: string;
};

const Share = styled(Modal)`
  h1 {
    margin: 0;
    margin-bottom: 16px;
    color: #141718;
    font-size: 28px;
    font-family: var(--font-satoshi);
    font-style: normal;
    font-weight: 700;
    line-height: 31px;
    letter-spacing: -1.12px;
  }

  .ant-modal-content {
    padding-top: 38px;
    padding-bottom: 30px;
  }

  @media (min-width: 576px) {
    h1 {
      font-size: 40px;
      font-family: var(--font-satoshi);
      line-height: 48px;
      letter-spacing: -1.6px;
    }

    .ant-modal-content {
      padding-top: 54px;
      padding-bottom: 46px;
    }
  }
`;

const ShareURLField = styled(Input)`
  margin-bottom: 11px;

  .ant-input-group {
    font-family: var(--font-satoshi);
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
  }

  .ant-input-group-addon {
    background: #ffffff;
    color: #667085;
    border-radius: 8px;
    padding: 10px 12px 10px 14px;
    border: 1px solid #d0d5dd;
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  }

  .ant-input-affix-wrapper {
    border-radius: 8px;
    padding: 10px 14px;
    border: 1px solid #d0d5dd;
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);

    .ant-input {
      color: #667085;
      font-size: 16px;
      font-family: var(--font-satoshi);
      font-style: normal;
      font-weight: 400;
      line-height: 24px;
    }
  }

  .ant-input-affix-wrapper-disabled {
    background: unset;
    cursor: unset;
    color: unset;

    .ant-input-disabled {
      box-shadow: unset;
      cursor: default;
    }
  }
`;

const ShareNotice = styled.div`
  margin-bottom: 22px;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #c8cce5;
  background: #fcfaff;

  p {
    margin: 0;
    color: #4e5ba6;
    font-size: 14px;
    font-family: var(--font-satoshi);
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  align-items: center;
  p {
    margin: 0;
    color: #141414;
    font-size: 14px;
    font-family: var(--font-satoshi);
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: -0.28px;
  }

  div {
    margin-left: 16px;
    display: flex;
    gap: 16px;

    img {
      display: block;
      height: 31px;
    }
  }
`;

const CopyButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  svg {
    display: block;
  }
`;

export default function ShareModal({
  open,
  setOpen,
  url,
  documentName,
}: props) {
  const shareOptions = getShareLinks(documentName, url);
  return (
    <Fragment>
      <Share
        open={open}
        onOk={() => {
          setOpen(false);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        maskStyle={{
          background: "rgba(0, 0, 0, 0.60)",
          backdropFilter: "blur(8px)",
        }}
        width={702}
        footer={null}
        closeIcon={<CloseIcon />}
      >
        <h1>
          <Trans>Share this conversation</Trans>
        </h1>
        <ShareURLField
          addonBefore="https://"
          disabled
          suffix={
            <CopyToClipboard
              text={url}
              onCopy={() => {
                alerts.success(t`Copied`, t`Link copied`);
              }}
            >
              <CopyButton>
                <CopyIcon />
              </CopyButton>
            </CopyToClipboard>
          }
          value={url.replace(/^(https?:\/\/)/, "")}
        />
        <ShareNotice>
          <p>
            <Trans>
              Anyone with this link can start a new conversation with this
              document. Chats are not shared.
            </Trans>
          </p>
        </ShareNotice>
        <SocialIcons>
          <p>
            <Trans>Share Via:</Trans>{" "}
          </p>
          <div>
            {shareOptions.map((shareOption, index) => (
              <a
                href={shareOption.link}
                target="_blank"
                rel="noreferrer noopener"
                key={index}
              >
                <Image src={shareOption.icon} alt="" width={34} height={34} />
              </a>
            ))}
          </div>
        </SocialIcons>
      </Share>
    </Fragment>
  );
}
