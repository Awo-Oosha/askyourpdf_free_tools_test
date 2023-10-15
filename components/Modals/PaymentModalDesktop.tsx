import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Modal } from "antd";
import CloseIcon from "../../img/ModalCloseIcon.svg";
import AccountUpgradedSuccess from "../../img/AccountUpgradedSuccess.gif";
import UpgradeSpinner from "../../img/UpgradeSpinner.svg";
import PaymentModalContent from "./PaymentModalContent";
import { Trans, t } from "@lingui/macro";
import Image from "next/image";
import { useRouter } from "next/router";

const PaymentModalStyles = styled(Modal)`
  .ant-modal-content {
    @media (min-width: 992px) {
      margin-left: 72px;
    }
  }
`;

const ModalContent = styled.div`
  h1,
  p {
    margin: 0;
  }

  h1 {
    margin-bottom: 8px;
    color: #141718;
    font-family: var(--font-satoshi);
    font-size: 40px;
    font-style: normal;
    font-weight: 700;
    line-height: 48px;
    letter-spacing: -1.6px;
  }

  p {
    color: #141414;
    font-family: var(--font-satoshi);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: -0.28px;
  }
`;

const StatusModalStyles = styled(Modal)`
  .ant-modal-content {
    padding-inline: 0;
    padding-bottom: 60px;
  }

  ${ModalContent} {
    img {
      padding-left: 35px;
    }
    div {
      padding-inline: 60px;

      h1 {
        margin-bottom: 11px;
      }

      p {
        margin-bottom: 22px;
      }
    }
  }
`;

const StatusButton = styled.button<{ $upgraded: boolean }>`
  display: flex;
  justify-content: center;

  padding: 16px 24px;
  width: 100%;
  border: none;
  background: ${(props) => (props.$upgraded ? "#ffb300" : "#3a3a3a")};
  border-radius: 12px;

  color: #000000;
  font-family: var(--font-satoshi);
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: -0.28px;

  cursor: pointer;

  svg {
    display: block;
  }

  &:disabled {
    cursor: default;
  }
`;
export default function PaymentModalDesktop({
  open,
  setOpen,
  currentStep,
  setCurrentStep,
  chosenPlan,
  setChosenPlan,
  chosenSubscription,
  setChosenSubscription,
  handleSubscribeToPlan,
  isSubscribing,
  purchaseComplete,
  setPurchaseComplete,
}: any) {
  const router = useRouter();
  const { type } = router.query;
  const handleCloseModal = () => {
    if (type === "api") {
      router.push("/apikeys");
    }
    setOpen(false);
    setCurrentStep(1);
    setPurchaseComplete(false);
  };

  return purchaseComplete ? (
    <StatusModalStyles
      open={open}
      width={430}
      closable={false}
      footer={null}
      maskClosable={!isSubscribing}
      keyboard={!isSubscribing}
      onCancel={handleCloseModal}
      maskStyle={{
        background: "rgba(0, 0, 0, 0.60)",
        backdropFilter: "blur(8px)",
      }}
      destroyOnClose
    >
      <ModalContent>
        <Image
          style={{
            maxWidth: "100%",
            display: "block",
            width: "100px",
            height: "auto",
          }}
          src={AccountUpgradedSuccess}
          alt=""
        />
        <div>
          <h1>
            <Trans>Account Upgraded</Trans>
          </h1>
          <p>
            <Trans>
              Communicating with documents has never felt this easy using
              ChatGPT
            </Trans>
            .
          </p>
          <StatusButton
            onClick={handleCloseModal}
            $upgraded={purchaseComplete}
            disabled={!purchaseComplete}
          >
            {t`Let's Go`}
          </StatusButton>
        </div>
      </ModalContent>
    </StatusModalStyles>
  ) : (
    <PaymentModalStyles
      open={open}
      width={1077}
      footer={null}
      closable={!isSubscribing}
      closeIcon={<CloseIcon />}
      onCancel={handleCloseModal}
      maskStyle={{
        background: "rgba(0, 0, 0, 0.60)",
        backdropFilter: "blur(8px)",
      }}
      destroyOnClose
    >
      <PaymentModalContent
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        chosenPlan={chosenPlan}
        setChosenPlan={setChosenPlan}
        chosenSubscription={chosenSubscription}
        setChosenSubscription={setChosenSubscription}
        handleCloseModal={handleCloseModal}
        handleSubscribeToPlan={handleSubscribeToPlan}
        isSubscribing={isSubscribing}
      />
    </PaymentModalStyles>
  );
}
