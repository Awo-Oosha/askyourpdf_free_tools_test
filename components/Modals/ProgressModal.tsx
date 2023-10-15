import React from "react";
import { Modal } from "antd";
import styled from "styled-components";
import Spinner from "../Spinner";

const ProgressModalStyles = styled(Modal)`
  .ant-modal-content {
    padding-block: 40px;
  }

  @media (min-width: 576px) {
    .ant-modal-content {
      padding-block: 60px;
    }
  }
`;

const ProgressContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    display: block;
    max-width: 60px;
  }

  h1 {
    margin: 0;
    text-align: center;
    color: #141718;
    font-size: 28px;
    font-family: var(--font-satoshi);
    font-style: normal;
    font-weight: 700;
    line-height: 48px;
    letter-spacing: -1.12px;
  }
`;

export default function ProgressModal({
  open,
  message,
}: {
  open: boolean;
  message?: string;
}) {
  return (
    <ProgressModalStyles
      open={open}
      footer={null}
      closeIcon={null}
      closable={false}
      maskStyle={{
        background: "rgba(0, 0, 0, 0.60)",
        backdropFilter: "blur(8px)",
      }}
      width={700}
    >
      <ProgressContent>
        <Spinner />
        {/* <Image src={Spinner} alt="" /> */}
        <h1>{message}</h1>
      </ProgressContent>
    </ProgressModalStyles>
  );
}
