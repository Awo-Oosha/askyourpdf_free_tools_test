import React from "react";
import { Alert } from "antd";
import styled from "styled-components";

type props = {
  type: "success" | "warning" | "info" | "error";
  message: React.ReactNode;
  action?: React.ReactNode;
  justify?: string;
  style?: any;
  className?: string;
};

const AlertWrapper = styled.div<{ $justify?: string }>`
  .ant-alert-success {
    border: 0px;
    color: #141414;
  }

  .ant-alert-info {
    background: #fff4d3;
    border: 0px;
    color: #141414;
  }
  .ant-alert-action {
    width: 100%;
  }
  .ant-alert-warning {
    background: #ffd4d4;
    border: 0px;
    color: #141414;
  }

  .ant-alert-error {
    background: #920c0c;
    border: 0px;
    color: #ffffff;
  }

  .ant-alert {
    border-radius: 0;
    padding-block: 12px;
    flex-direction: column;
    .ant-alert-content {
      display: flex;
      justify-content: ${(props) =>
        props.$justify ? props.$justify : "flex-start"};
      color: inherit;
      font-size: 15px;
      font-family: var(--font-satoshi);
      font-style: normal;
      font-weight: 500;
      line-height: 24px;
      letter-spacing: -0.28px;
    }
  }

  @media (min-width: 992px) {
    .ant-alert {
      .ant-alert-content {
        justify-content: ${(props) =>
          props.$justify ? props.$justify : "center"};
      }
    }
  }
`;

const CustomAlert = styled(Alert)`
  border-radius: 0;
`;

const AlertButtonStyles = styled.button<{
  $invertColor?: boolean;
  $mobileOnly?: boolean;
  $padding?: string;
}>`
  background: ${(props) => (props.$invertColor ? "#141414" : "none")};
  border: none;
  cursor: pointer;
  border-radius: 8px;
  border: 1px solid ${(props) => (props.$invertColor ? "#ffffff" : "#000")};
  padding: ${(props) => (props.$padding ? props.$padding : "8px 16px")};
  color: ${(props) => (props.$invertColor ? "#ffffff" : "#141414")};
  font-size: 14px;
  font-family: var(--font-satoshi);
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: -0.28px;
  display: flex;

  @media (min-width: 992px) {
    display: ${(props) => (props.$mobileOnly ? "none" : "block")};
  }
`;

export function AlertButton({
  children,
  invertColor,
  mobileOnly,
  padding,
  style,
  onClick,
}: {
  children?: React.ReactNode;
  invertColor?: boolean;
  mobileOnly?: boolean;
  padding?: string;
  style?: any;
  onClick?: () => void;
}) {
  return (
    <AlertButtonStyles
      $invertColor={invertColor}
      $mobileOnly={mobileOnly}
      $padding={padding}
      style={style}
      onClick={onClick}
    >
      {children}
    </AlertButtonStyles>
  );
}

export default function AppAlert({
  type,
  message,
  style,
  action,
  justify,
  className,
}: props) {
  return (
    <AlertWrapper className={className} $justify={justify}>
      <Alert message={message} style={style} type={type} action={action} />
    </AlertWrapper>
  );
}
