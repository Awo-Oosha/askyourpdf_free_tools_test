import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { buyCredits as apiBuyCredits } from "@/services/payment"; // Replace 'your-api-file' with the actual path to your API file
import { useAuth } from "@/providers/AuthProvider";
import { CREDITS } from "@/config/config";
import { alerts } from "@/utils/alerts";
import { getUserRole } from "@/utils/utils";
import { Trans, t } from "@lingui/macro";
import Spinner from "./Spinner";

interface Credits {
  [key: number]: { quantity: number; price: number };
}

type props = {
  title: string;
  products: string;
};

const SLIDER_MIN = 1;
const SLIDER_MAX = 10;

const BuyCredits = ({ title, products }: props) => {
  const [selectedQuantity, setSelectedQuantity] = useState<number>(5);
  const [isBuying, setIsBuying] = useState(false);
  const { userToken, userDetails } = useAuth();


  const selectedProduct = CREDITS;

  const price =
    (selectedProduct as Credits)[selectedQuantity]?.price || 0;
  const userRole = getUserRole(userDetails);

  const sliderRef = useRef<HTMLInputElement>(null);

  const handleBuyCredit = async () => {
    if (userRole === "free") {
      alerts.error(
        t`Credit Purchase Unavailable for Free Users`,
        t`Sorry, you can't buy credits as a free user. Upgrade your account to access this feature`
      );
      return;
    }

    try {
      setIsBuying(true);
      const response = await apiBuyCredits({
        product: products,
        quantity: (selectedProduct as Credits)[
          selectedQuantity
        ].quantity,
        token: userToken,
      });

      window.location.href = response.url;
    } catch (error) {
      console.error("Error purchasing credits:", error);
      alerts.error(
        "Error purchasing credits",
        "Something went wrong. Please try again"
      );
    } finally {
      setIsBuying(false);
    }
  };

  useEffect(() => {
    handleSliderTrack(selectedQuantity)
  }, []);

  const handleSliderTrack = (newValue: number) => {
    const progress = ((newValue - SLIDER_MIN) / (SLIDER_MAX - SLIDER_MIN)) * 100;

    if (sliderRef.current) {
      sliderRef.current.style.background = `linear-gradient(90deg, #404040 ${progress}%, #F3F3F3 ${progress}%)`;
    }
  };

  const handleSliderChange = (event: any) => {
    const newValue = parseInt(event.target.value);
    handleSliderTrack(newValue);
    setSelectedQuantity(newValue);
  };

  return (
    <CreditWrapper>
      <div className="titleBadge">{title}</div>
      <div className="price">${price.toFixed(2)}</div>
      <div>
        <Range
          type="range"
          value={selectedQuantity}
          min={SLIDER_MIN}
          max={SLIDER_MAX}
          step={1}
          onChange={handleSliderChange}
          ref={sliderRef}
        />
      </div>
      <div className="details">
        ${price.toFixed(2)} /{" "}
        {
          (selectedProduct as Credits)[selectedQuantity]
            .quantity
        }{" "}
        <span><Trans>credit</Trans></span>
      </div>
      {userToken && userDetails?.email && (
        <button type="submit" onClick={handleBuyCredit} disabled={isBuying}>
          <Trans>Buy Credit</Trans>
          {isBuying && <Spinner style={{ width: "24px" }} />}
        </button>
      )}
    </CreditWrapper>
  );
};

export default BuyCredits;

const CreditWrapper = styled.div`
  padding: 16px 24px;
  border-radius: 12px;
  border: 1px solid #d6d9e0 !important;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;

  .titleBadge {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ecfdf3;
    padding-bottom: 0;
    color: #027a48;
    text-align: center;
    font-family: var(--font-satoshi);
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px;
    padding: 5px 10px;
    border-radius: 15px;
    min-width: 107px;
    max-width: 162px;
  }

  .price {
    padding-bottom: 0;
    color: #2c2c2c;
    font-family: var(--font-satoshi);
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px;
  }

  .details {
    color: #141718;
    font-family: var(--font-satoshi);
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px;
    flex-direction: row;
    padding-bottom: 0;
    margin: 0;

    span {
      font-weight: 400;
    }
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    background: #000;
    border: none;
    color: #fff;
    font-family: var(--font-satoshi);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    padding: 8px 14px;
    border-radius: 8px;
    width: 100%;
    cursor: pointer;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  @media (min-width: 992px) {
    button {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 140px;
    }
  }

  @media (min-width: 1600) {
    top: 20px;
    right: 40px;
  }
`;

const Range = styled.input`
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
  accent-color: #404040 !important;
  height: 8px;
  background: #F3F3F3;
  border-radius: 8px;
  -webkit-transition: .2s;
  transition: opacity .2s;

  &::-webkit-slider-thumb{
    -webkit-appearance: none;
    appearance: none;
    width: 26.104px;
    height: 26px;
    background: #404040;
    filter: drop-shadow(0px 3.25px 3.25px rgba(0, 0, 0, 0.25));
    border-radius: 15px;

  &::-webkit-slider-runnable-track {
    background: #404040;
    border-radius: 8px;
  }
`;
