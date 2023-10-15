import { Modal } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import Spinner from "../Spinner";
import { Trans, t } from "@lingui/macro";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useAuth } from "@/providers/AuthProvider";

type props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleLink: (token: string, deviceID: string) => void;
  isLoading: boolean;
  deviceID: string;
  setDeviceID: React.Dispatch<React.SetStateAction<string>>;
};

export const DeleteModal = styled(Modal)`
  .ant-modal-content {
    padding-top: 55px;
    padding-bottom: 30px;
    padding-inline: 20px;
  }
`;

export const ModalContentStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  h1 {
    margin: 0;
    margin-bottom: 5px;
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

  div {
    display: flex;
    flex-direction: column;
    gap: 8px;

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      background: #000000;
      border: none;
      border-radius: 12px;
      padding: 16px 24px;
      cursor: pointer;

      color: #fefefe;
      font-family: var(--font-satoshi);
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: 24px; /* 150% */
      letter-spacing: -0.32px;
      &:disabled {
        opacity: 0.5;
      }
      @media (min-width: 992px) {
        width: 346px;
      }
    }
  }
`;

const UserIdContainer = styled.div`
  margin: 52px 0;
`;
const MobileUserID = styled.input`
  border-radius: 12px;
  background: #f3f5f7;
  border: none;
  padding: 16px;
  outline: none;
`;

const CloseIcon = styled.div`
  position: absolute;
  top: -30px;
  right: 0;
  cursor: pointer;
`;


function ModalContent({
  setOpen,
  handleLink,
  isLoading,
  deviceID,
  setDeviceID
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleLink: (token: string, deviceID: string) => void;
  isLoading: boolean;
  deviceID: string;
  setDeviceID: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { userToken } = useAuth();

  return (
    <ModalContentStyles>
      {!isLoading ? (
        <CloseIcon
          onClick={() => {
            setOpen(false);
            setDeviceID("");
          }}
        >
          <CloseCircleOutlined style={{ fontSize: "30px" }} />
        </CloseIcon>
      ) : (
        <CloseIcon>
          <CloseCircleOutlined style={{ fontSize: "30px" }} />
        </CloseIcon>
      )}
      <h1>
        <Trans>Link Account</Trans>
      </h1>
      <p>
        <Trans>
          Enter your mobile account ID to link your mobile account to your web
          account
        </Trans>
      </p>
      <UserIdContainer>
        <MobileUserID
          type="text"
          placeholder={t`Enter Mobile User ID`}
          value={deviceID}
          onChange={(e) => {
            setDeviceID(e.target.value);
          }}
          required
        />
      </UserIdContainer>
      <div>
        <button
          onClick={() => {
            handleLink(userToken, deviceID);
          }}
          disabled={isLoading || deviceID.length <= 0}
        >
          <Trans>Link Account</Trans>
          {isLoading && <Spinner style={{ width: "25px", height: "auto" }} />}
        </button>
      </div>
    </ModalContentStyles>
  );
}
export default function LinkAccountModal({
  open,
  setOpen,
  handleLink,
  isLoading,
  deviceID,
  setDeviceID
}: props) {
  return (
    <DeleteModal
      open={open}
      maskStyle={{
        background: "rgba(0, 0, 0, 0.60)",
        backdropFilter: "blur(8px)",
      }}
      footer={null}
      width={702}
      closable={false}
      onCancel={() => {
        if (isLoading) {
          return;
        }
        setOpen(false);
      }}
    >
      <ModalContent
        setOpen={setOpen}
        handleLink={handleLink}
        isLoading={isLoading}
        deviceID={deviceID}
        setDeviceID={setDeviceID}
      />
    </DeleteModal>
  );
}
