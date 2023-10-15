import React, { useState } from "react";
import { Layout } from "antd";
import styled from "styled-components";
import { useAuth } from "@/providers/AuthProvider";
import PaymentModal from "./Modals/PaymentModal";
import { getUserRole } from "@/utils/utils";

const { Header } = Layout;
import { Trans } from "@lingui/macro";
import { useSubscription } from "@/providers/SubscriptionProvider";
import CloseSidebar from "@/img/x-circle-fill.svg";

const AppHeaderStyles = styled(Header)`
  display: none;
  align-items: center;
  background: #ffffff;
  justify-content: space-between;
  padding-inline: 26px;

  h1 {
    color: #161616;
    font-size: 14px;
    font-family: var(--font-franie);
    font-weight: 700;
    line-height: 24px;
    letter-spacing: -0.32px;
    margin: 0;
    text-transform: uppercase;
  }

  button {
    border-radius: 7.95px;
    background: #000;
    border: none;
    cursor: pointer;
    padding: 10.6px 15.9px;
    width: 106px;

    color: #edb01a;
    font-size: 14px;
    font-family: var(--font-satoshi);
    font-weight: 700;
    line-height: 15.9px;
    letter-spacing: -0.28px;
  }

  @media (min-width: 992px) {
    display: flex;
  }
`;

const HeaderLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const AccountBadge = styled.div`
  padding: 2px 8px;
  border-radius: 16px;
  background: #ecfdf3;

  color: #027a48;
  text-align: center;
  font-size: 12px;
  font-family: var(--font-inter);
  font-weight: 500;
  line-height: 18px;
`;
export const MenuButton = styled.div`
  display: flex;
  border-radius: 7.628px;
  padding: 8px;
  cursor: pointer;
  &:hover {
    background: #f2f4f7;
  }

  &.active {
    background: #f2f4f7;
  }
  @media (max-width: 992px) {
    display: none !important;
  }
`;
export default function AppHeader({ onClose }: any) {
  const { userDetails } = useAuth();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const { userSubscriptionInfo } = useSubscription();
  const userRole = getUserRole(userDetails);
  return (
    <AppHeaderStyles>
      <HeaderLogo>
        <h1>AskYourPDF</h1>
        <AccountBadge>
          {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
        </AccountBadge>
      </HeaderLogo>
      {userDetails?.email !== undefined && userRole === "free" && (
        <button
          onClick={() => {
            setShowPaymentModal(true);
          }}
        >
          <Trans>Upgrade</Trans>
        </button>
      )}
      {userDetails?.email !== undefined &&
        userRole !== "free" &&
        userSubscriptionInfo?.subscription_status === "past_due" && (
          <button
            onClick={() => {
              setShowPaymentModal(true);
            }}
          >
            <Trans>Renew</Trans>
          </button>
        )}
      <MenuButton onClick={onClose}>
        <CloseSidebar />
      </MenuButton>
      <PaymentModal open={showPaymentModal} setOpen={setShowPaymentModal} />
    </AppHeaderStyles>
  );
}
