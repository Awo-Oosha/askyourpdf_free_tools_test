import { Drawer, Grid, Modal } from "antd";
import React from "react";
import styled from "styled-components";
import Spinner from "../Spinner";
import { Trans } from "@lingui/macro";

type props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: () => void;
  isDeleting: boolean;
};

export const DeleteModal = styled(Modal)`
  .ant-modal-content {
    padding-top: 55px;
    padding-bottom: 30px;
    padding-inline: 20px;
  }
`;

export const ModalContentStyles = styled.div`
  text-align: center;
  h1 {
    margin: 0;
    margin-bottom: 23px;
    color: #000;
    font-family: var(--font-satoshi);
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px;
  }

  p {
    margin: 0;
    margin-bottom: 28px;
    color: #000;
    text-align: center;
    font-family: var(--font-satoshi);
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.32px;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 8px;

    button {
      background: #000000;
      border: none;
      border-radius: 12px;
      padding: 16px 24px;
      cursor: pointer;

      color: #fefefe;
      text-align: center;
      font-family: var(--font-satoshi);
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: 24px;
      letter-spacing: -0.32px;

      &:nth-of-type(2) {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        background: none;
        color: #c82035;
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }
`;

const BottomSheet = styled(Drawer)`
  border-radius: 20px 20px 0px 0px;

  .ant-drawer-body {
    padding-top: 60px;
  }
`;

const { useBreakpoint } = Grid;

function ModalContent({
  setOpen,
  handleDelete,
  isDeleting,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: () => void;
  isDeleting: boolean;
}) {
  return (
    <ModalContentStyles>
      <h1>
        <Trans>Delete Conversation</Trans>
      </h1>
      <p>
        <Trans>Are you sure you want to delete this conversation?</Trans>
      </p>
      <div>
        <button
          onClick={() => {
            setOpen(false);
          }}
          disabled={isDeleting}
        >
          <Trans>Go Back</Trans>
        </button>
        <button onClick={handleDelete} disabled={isDeleting}>
          <Trans>Delete</Trans>
          {isDeleting && <Spinner style={{ width: "32px", height: "auto" }} />}
        </button>
      </div>
    </ModalContentStyles>
  );
}

export default function ConversationDeleteModal({
  open,
  setOpen,
  handleDelete,
  isDeleting,
}: props) {
  const screens = useBreakpoint();
  return screens.lg ? (
    <DeleteModal
      open={open}
      maskStyle={{
        background: "rgba(0, 0, 0, 0.60)",
        backdropFilter: "blur(8px)",
      }}
      footer={null}
      width={350}
      closable={false}
      onCancel={() => {
        if (isDeleting) {
          return;
        }
        setOpen(false);
      }}
    >
      <ModalContent
        setOpen={setOpen}
        handleDelete={handleDelete}
        isDeleting={isDeleting}
      />
    </DeleteModal>
  ) : (
    <BottomSheet
      open={open}
      placement="bottom"
      maskClosable={true}
      closable={false}
      onClose={() => {
        if (isDeleting) {
          return;
        }
        setOpen(false);
      }}
    >
      <ModalContent
        setOpen={setOpen}
        handleDelete={handleDelete}
        isDeleting={isDeleting}
      />
    </BottomSheet>
  );
}
