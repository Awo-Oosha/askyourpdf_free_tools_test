import React from "react";
import styled from "styled-components";
import { Drawer, Grid, Modal } from "antd";
import AccountUpgradedSuccess from "../../img/AccountUpgradedSuccess.gif";
import { Trans, t } from "@lingui/macro";
import Image from "next/image";
import { useRouter } from "next/router";
import { successMessages } from "@/config/config";
import { useLingui } from "@lingui/react";

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

const StatusDrawerStyles = styled(Drawer)`
  border-radius: 20px 20px 0px 0px;

  .ant-drawer-body {
    display: flex;
    align-items: center;
    padding-inline: 0;
  }

  ${ModalContent} {
    width: 100%;
    img {
      padding-left: 15px;
    }
    div {
      padding-inline: 28px;

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

const { useBreakpoint } = Grid;

export default function PaymentSuccessModal({ open, setOpen }: any) {
  const { i18n } = useLingui()
  const router = useRouter();
  const type = router.query.type as string | undefined;
  const handleCloseModal = () => {
    if (type === "api") {
      router.push("/apikeys");
    }
    setOpen(false);
  };
  const successType = successMessages[type as keyof typeof successMessages] || successMessages.web
  const screens = useBreakpoint();

  return screens.lg ? (
    <StatusModalStyles
      open={open}
      width={430}
      closable={false}
      footer={null}
      maskClosable={false}
      keyboard={false}
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
            {i18n._(successType.title)}
          </h1>
          <p>
            {i18n._(successType.body)}
          </p>
          <StatusButton
            onClick={handleCloseModal}
            $upgraded={true}
            disabled={false}
          >
            {t`Let's Go`}
          </StatusButton>
        </div>
      </ModalContent>
    </StatusModalStyles>
  ) : (
    <StatusDrawerStyles
      open={open}
      closable={false}
      maskClosable={false}
      keyboard={false}
      height={"95dvh"}
      maskStyle={{
        background: "rgba(0, 0, 0, 0.60)",
        backdropFilter: "blur(8px)",
      }}
      placement="bottom"
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
            {i18n._(successType.title)}
          </h1>
          <p>
            {i18n._(successType.body)}
          </p>
          <StatusButton onClick={handleCloseModal} $upgraded={true}>
            {t`Let's Go`}
          </StatusButton>
        </div>
      </ModalContent>
    </StatusDrawerStyles>
  );
}
