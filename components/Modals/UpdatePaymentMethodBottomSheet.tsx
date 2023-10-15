import React from "react";
import styled from "styled-components";
import { Drawer } from "antd";
import { XCircle } from "@phosphor-icons/react/dist/ssr";
import { Input } from "antd";
import PaymentMethodFormIcon from "../../img/PaymentMethodFormIcon.svg?url";
import Image from "next/image";
import { Trans, t } from "@lingui/macro";


type modalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const PaymentMethodDrawer = styled(Drawer)`
  border-radius: 8px 8px 0px 0px;
  .ant-drawer-body {
    padding: 0;
  }
`;

const ModalHeader = styled.div`
  border-radius: 8px 8px 0px 0px;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  border-bottom: 1px solid #e4e7ec;

  h1 {
    color: #000000;
    font-family: var(--font-satoshi);
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;

    svg {
      display: block;
    }
  }
`;

const ModalBody = styled.div<{ $background?: string }>`
  background: ${(props) => (props.$background ? props.$background : "#ffffff")};
  border-radius: 0px 0px 8px 8px;
`;

const FormContent = styled.form`
  padding-block: 16px;
  padding-inline: 24px;
`;

const InputContainer = styled.div`
  margin-bottom: 20px;
  p {
    font-family: var(--font-satoshi);
    color: #141718;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: -0.14px;
    margin-bottom: 6px;
  }

  input {
    font-family: var(--font-satoshi);
    border-radius: 8px;
    border: 1px solid #d0d5dd;
    box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
    padding: 10px 14px;

    &:hover {
      border: 1px solid #d0d5dd;
    }

    &:focus {
      border-color: #d0d5dd;
    }
  }

  .ant-input-affix-wrapper {
    border-color: #d0d5dd;
    padding: 10px 14px 10px 10px;
    .ant-input-prefix {
      margin-inline-end: 8px;
    }

    &:hover {
      border: 1px solid #d0d5dd;
    }

    &:focus {
      border-color: #d0d5dd;
    }
    input {
      box-shadow: unset;
      &:hover {
        border: none;
      }
    }
  }
`;

const RowInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;

  ${InputContainer} {
    width: 100%;
  }
`;

const ModalButton = styled.button`
  width: 100%;
  border-radius: 8px;
  margin-top: 20px;
  border: 1px solid #000;
  background: #000;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  padding: 8px 14px;

  color: #fff;
  font-family: var(--font-satoshi);
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;

  cursor: pointer;
`;

export default function UpdatePaymentMethodBottomSheet({
  open,
  setOpen,
}: modalProps) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <PaymentMethodDrawer
      open={open}
      closable={false}
      destroyOnClose
      placement="bottom"
      height={"85dvh"}
    >
      <ModalHeader>
        <h1>
          <Trans>Update Payment Method</Trans>
        </h1>
        <button onClick={handleClose}>
          <XCircle size={34} color="#000000" />
        </button>
      </ModalHeader>
      <ModalBody>
        <FormContent
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <InputContainer>
            <p>
              <Trans>Card Number</Trans>
            </p>
            <Input prefix={<Image src={PaymentMethodFormIcon} alt="" />} />
          </InputContainer>
          <RowInputContainer>
            <InputContainer style={{ marginBottom: 0 }}>
              <p>
                <Trans>Expiry Date</Trans>
              </p>
              <Input placeholder="MM/YY" />
            </InputContainer>
            <InputContainer style={{ marginBottom: 0 }}>
              <p>
                <Trans>CVV</Trans>
              </p>
              <Input placeholder="***" />
            </InputContainer>
          </RowInputContainer>
          <ModalButton>
            <Trans>Save Details</Trans>
          </ModalButton>
        </FormContent>
      </ModalBody>
    </PaymentMethodDrawer>
  );
}
