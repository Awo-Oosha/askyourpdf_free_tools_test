import React, { useState } from "react";
import styled from "styled-components";
import { Trans, t } from "@lingui/macro";
import LinkAccountModal from "./LinkAccountModal";
import LinkSuccesfulModal from "./AccountLinkedSuccessModal";
import { useMutation, useQueryClient } from "react-query";
import { linkMobileAccount } from "@/services/authService";
import { alerts } from "@/utils/alerts";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  border: none;
  gap: 20px;

  @media (min-width: 1200px) {
    flex-direction: row !important;
    justify-content: space-between;
    margin-right: 30px;
  }
`;

const Title = styled.p`
  color: #101828 !important;
  font-family: var(--font-satoshi) !important;
  font-size: 18px !important;
  font-style: normal;
  font-weight: 700 !important;
  line-height: 28px !important;
  width: 100% !important;
`;

const Desc = styled.p`
  width: 100%;
  color: #475467;
  font-family: var(--font-satoshi) !important;
  font-size: 14px !important;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;

  @media (min-width: 992px) {
    width: 763px !important;
  }
`;

const Container = styled.p``;

const ButtonCall = styled.button`
  display: flex;
  padding: 8px 14px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
  border: 1px solid #000;
  background: #000;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  color: #fff;
  font-family: var(--font-satoshi);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  cursor: pointer;
`;
const LinkAccount = () => {
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [deviceID, setDeviceID] = useState("");

  const queryClient = useQueryClient();

  const linkAccountMutation = useMutation(linkMobileAccount, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("fetchCurrentUser");
      await queryClient.invalidateQueries("userAnalytics");
      
      setLinkModalOpen(false);
      setSuccessModalOpen(true);
      setDeviceID("");
    },
    onError: (error: any) => {
      const errMessage = t`An error occurred while linking your mobile device. Please try again`;
      alerts.error(
        t`Failed to link mobile account`,
        error?.message || errMessage
      );
    },
  });

  const handleLinkAccount = (token: string, deviceID: string) => {
    if (deviceID.length < 1)
      return alerts.error(t`Invalid Entry`, t`Please enter a valid device ID`);
    linkAccountMutation.mutate({ token, deviceID });
  };

  return (
    <Wrapper>
      <Container>
        <Title>
          <Trans>Link Your Mobile Account</Trans>
        </Title>
        <Desc>
          <Trans>
            Easily access your subscription benefits on both mobile and web by
            linking your accounts. Click the link account button to unify your
            experience and enjoy AskYourPDF across all platforms.
          </Trans>
        </Desc>
      </Container>
      <Container>
        <ButtonCall
          onClick={() => {
            setLinkModalOpen(true);
          }}
        >
          <Trans>Link Account</Trans>
        </ButtonCall>
      </Container>

      <LinkAccountModal
        open={linkModalOpen}
        setOpen={setLinkModalOpen}
        handleLink={handleLinkAccount}
        isLoading={linkAccountMutation.isLoading}
        deviceID={deviceID}
        setDeviceID={setDeviceID}
      />
      <LinkSuccesfulModal
        open={successModalOpen}
        setOpen={setSuccessModalOpen}
      />
    </Wrapper>
  );
};

export default LinkAccount;
