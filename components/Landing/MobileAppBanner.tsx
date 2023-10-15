import React from "react";
import styled from "styled-components";
import Logo from "@/img/Logo.svg?url";
import Image from "next/image";
import { Trans } from "@lingui/macro";

const AppBanerContainer = styled.div`
  position: sticky;
  bottom: 0;
  background: #000000;
  display: flex;
  justify-content: space-between;
  padding: 24px 30px;
  z-index: 1000;

  .app__cta {
    background: #edb01a;
    border: 0;
    border-radius: 12px;
    padding: 8px 16px;
    font-family: var(--font-satoshi);
    font-weight: 700;
    font-family: 16px;
    cursor: pointer;
  }

  .close__btn {
    position: absolute;
    right: 10px;
    top: 2px;
    color: #ffffff;
    background: none;
    border: 0;
    font-size: 18px;
    cursor: pointer;
    font-family: var(--font-satoshi);
    font-weight: 500;
  }
`;

const AppDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  .app__name {
    color: #ffffff;

    font-family: var(--font-satoshi);
    letter-spacing: -0.32px;

    h1 {
      font-size: 16px;
    }
    p {
      font-size: 14px;
    }
  }
`;

const NEXT_SHOW_TIMESTAMP = 90 * 24 * 60 * 60 * 1000;

export default function MobileAppBanner({
  showBanner,
  setShowBanner,
}: {
  showBanner: boolean;
  setShowBanner: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handleCloseBanner = () => {
    setShowBanner(false);
  };

  const handleViewStore = () => {
    const currentTimestamp = Date.now();
    const expiryTime = currentTimestamp + NEXT_SHOW_TIMESTAMP;
    localStorage.setItem("banner_timestamp", expiryTime.toString());

    window.open("https://askyourpdf.app.link/adZHxneeACb", "_blank");
    setShowBanner(false);
  };

  return (
    <AppBanerContainer>
      <AppDetails>
        <Image src={Logo} width={30} height={30} alt="logo" />
        <div className="app__name">
          <h1>AskYourPDF</h1>
          <p>
            <Trans>Free</Trans>
          </p>
        </div>
      </AppDetails>
      <button className="app__cta" onClick={handleViewStore}>
        <Trans>View App</Trans>
      </button>
      <button className="close__btn" onClick={handleCloseBanner}>
        x
      </button>
    </AppBanerContainer>
  );
}
