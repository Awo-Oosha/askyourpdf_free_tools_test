import { Modal } from "antd";
import React from "react";
import styled from "styled-components";
import { Trans } from "@lingui/macro";
import { useRouter } from "next/router";
import {path} from "@/routes"

type props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  product: string;
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
        color: #000000;
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }
`;

export default function UnitExceededModal({ open, setOpen, product }: props) {

  const router = useRouter();
  return (
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
        setOpen(false);
      }}
    >
      <ModalContentStyles>
        <h1>
          <Trans>Units Exceeded</Trans>
        </h1>
        <p>
          <Trans>
            You have have used up your available {product} units. Please purchase more units.
          </Trans>
        </p>
        <div>
          <button
            onClick={() => {
              setOpen(false);
              router.push(path.settings);
            }}
          >
            <Trans>Buy Credits</Trans>
          </button>
          <button onClick={()=>{
            setOpen(false);
          }}>
            <Trans>Go back</Trans>
          </button>
        </div>
      </ModalContentStyles>
    </DeleteModal>
  );
}
