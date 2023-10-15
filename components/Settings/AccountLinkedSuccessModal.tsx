import { Modal } from "antd";
import React from "react";
import styled from "styled-components";
import { Trans } from "@lingui/macro";
import { CloseCircleOutlined } from "@ant-design/icons";

type props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DeleteModal = styled(Modal)`
  .ant-modal-content {
    padding: 70px 40px;
  }
`;

export const ModalContentStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  h1 {
    margin: 0;
    margin-bottom: 20px;
    color: #000;
    font-family: var(--font-satoshi);
    font-size: 40px;
    font-style: normal;
    font-weight: 700;
    line-height: 48px;
  }

  p {
    color: #475467;
    font-family: var(--font-satoshi);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
  }
`;

const CloseIcon = styled.div`
  position: absolute;
  top: -40px;
  right: 0;
  cursor: pointer;
`;

function ModalContent({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <ModalContentStyles>
      <CloseIcon
        onClick={() => {
          setOpen(false);
        }}
      >
        <CloseCircleOutlined style={{ fontSize: "30px" }} />
      </CloseIcon>
      <h1>
        <Trans>Accounts Linked Successfully</Trans>
      </h1>
      <p>
        <Trans>
          Your mobile and web accounts are now linked, giving you access to your
          subscription benefits on both platforms. Enjoy the unified AskYourPDF
          experience across all your devices.
        </Trans>
      </p>
    </ModalContentStyles>
  );
}
export default function LinkSuccesfulModal({ open, setOpen }: props) {
  return (
    <DeleteModal
      open={open}
      maskStyle={{
        background: "rgba(0, 0, 0, 0.60)",
        backdropFilter: "blur(8px)",
      }}
      footer={null}
      width={660}
      closable={false}
      onCancel={() => {
        setOpen(false);
      }}
    >
      <ModalContent setOpen={setOpen} />
    </DeleteModal>
  );
}
