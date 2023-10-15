import React from "react";
import styled from "styled-components";
import { Slider } from "antd";
import { motion } from "framer-motion";
import { Trans } from "@lingui/macro";
import { DEV_PLAN_CONFIG, UserAPIPlan } from "@/config/config";
import { Plan, subscribeToPlan, Subscription } from "@/services/payment";
import Spinner from "../Spinner";
import { convertPlanString, getAPIRole } from "@/utils/utils";
import { useUserSubscription } from "@/hooks/useUserSubscription";

const PricingContainer = styled.section`
  width: 100%;
  background-color: #fff !important;
  position: relative;
  height: 550px;
  @media (max-width: 768px) {
    height: 900px;
  }
`;
const PricingBox = styled(motion.div)`
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 70%;
  top: -150px;
  border-radius: 24px;
  background: #fff;
  padding: 44px;
  @media (max-width: 768px) {
    position: static;
    padding: 44px 15px;
    width: auto;
  }
`;
const PricingTitle = styled.h2`
  color: #2f2b43;
  text-align: center;
  font-family: var(--font-eudoxus);
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 54px; /* 168.75% */
  letter-spacing: -0.64px;
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;
const PricingDesc = styled.p`
  text-align: center;
  color: rgba(47, 43, 67, 0.6);
  font-family: var(--font-satoshi);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
  letter-spacing: -0.16px;
`;
const PlanItemList = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 28px;
`;
const PlanBadge = styled.div<{ $color?: string; $background?: string }>`
  border-radius: 16px;
  padding: 2px 10px;
  background: ${(props) => (props.$background ? props.$background : "#F2F4F7")};
  color: ${(props) => (props.$color ? props.$color : "#344054")};
  text-align: center;
  font-family: var(--font-satoshi);
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
`;
const PlanItem = styled.div<{ $active?: boolean }>`
  display: grid;
  align-items: flex-start;
  gap: 4px;
  padding: 16px 16px 16px 24px;
  background: ${(props) => (props.$active ? "#f9fafb" : "ffffff")};
  border-radius: 12px;
  margin-bottom: 20px;
  border: ${(props) =>
    props.$active ? "2px solid #475467" : "1px solid #D6D9E0"};
  ${PlanBadge} {
    width: fit-content;
  }
  @media (min-width: 768px) {
    grid-template-columns: 1fr auto;
  }
  @media (max-width: 768px) {
    background: #ffffff;
  }
  a {
    text-decoration: none;
    width: 100%;
  }

  .mb {
    display: none;
  }
  @media (max-width: 768px) {
    .lg {
      display: none;
    }
    .mb {
      display: block;
    }
  }
`;

const PlanItemInfo = styled(motion.div)`
  .ant-slider {
    max-width: 96%;
    margin-top: 0;
    margin-bottom: 20px;
    @media (max-width: 768px) {
      max-width: 90%;
    }
    .ant-slider-rail {
      height: 8px;
      border-radius: 4px;
      background: #f3f3f3;
    }

    .ant-slider-track {
      height: 8px;
      border-radius: 4px;
      background: #027A48;
    }

    .ant-slider-handle {
      transform: translateX(-50%) translateY(-50%) !important;
      inset-inline-start: -1px;
      inset-block-start: -1px;

      &:focus,
      &:hover {
        &::after {
          inset-inline-start: unset;
          inset-block-start: unset;
        }
      }

      &::after {
        width: 26px;
        height: 26px;
        background: #027A48;
        box-shadow: unset;
      }
    }
  }

  h1 {
    color: #2c2c2c;
    font-family: var(--font-satoshi);
    font-size: 28px;
    font-style: normal;
    font-weight: 700;
    line-height: 60px;
  }
  span {
    font-weight: 400;
  }

  .plan__benefits {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 2px;
    p {
      color: #141718;
      font-family: var(--font-satoshi);
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: 20px;

      span {
        font-weight: 400;
      }
    }

    p#enterprise__plan__text {
      margin-top: 8px;
      color: #475467;
      font-weight: 500;
      line-height: 24px;
      letter-spacing: -0.28px;
    }
  }
`;

const PlanContactUsButton = styled.button`
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid #000;
  background: #000;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  width: 100%;
  color: #fff;
  font-family: var(--font-satoshi);
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  cursor: pointer;
  margin-top: 20px;
  @media (min-width: 768px) {
    margin-top: 0px;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
const PlanActionButton = styled.button`
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid #000;
  background: #000;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);

  color: #fff;
  font-family: var(--font-satoshi);
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  margin-top: 20px;
  @media (min-width: 768px) {
    margin-top: 0px;
  }
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default function Pricing() {
  const {
    sliderValue,
    ref,
    handleSliderChange,
    subscribeMutation,
    setDisabled,
    handleSubscribeToPlan,
    planToPayment,
    keys,
  } = useUserSubscription();
  return (
    <PricingContainer id="pricing">
      <PricingBox>
        <PricingTitle>
          <Trans>AskYourPDF API Pricing</Trans>
        </PricingTitle>
        <PricingDesc>
          <Trans>Select a preferred pricing plan to get started</Trans>
        </PricingDesc>
        <PlanItemList>
          <PlanItem>
            <PlanItemInfo>
              <PlanBadge>
                <Trans>Free Plan</Trans>
              </PlanBadge>
              <h1>
                <Trans>
                  ${DEV_PLAN_CONFIG[UserAPIPlan.API_FREE].price}
                  <span>/month</span>
                </Trans>
              </h1>
              <div className="plan__benefits">
                <p>
                  <Trans>
                    {DEV_PLAN_CONFIG[UserAPIPlan.API_FREE].messages} messages{" "}
                    <span>monthly</span>
                  </Trans>
                </p>
                <p>|</p>
                <p>
                  <Trans>
                    {DEV_PLAN_CONFIG[UserAPIPlan.API_FREE].pages} document pages{" "}
                    <span>monthly</span>
                  </Trans>
                </p>
              </div>
            </PlanItemInfo>
          </PlanItem>
          <PlanItem $active={true}>
            <PlanItemInfo>
              <Content>
                <PlanBadge $color="#027A48" $background="#ECFDF3">
                  <Trans>Pro Plan</Trans>
                </PlanBadge>
                <PlanActionButton
                  className="lg"
                  onClick={() =>
                    handleSubscribeToPlan(
                      planToPayment[
                        convertPlanString(
                          DEV_PLAN_CONFIG[keys[sliderValue]].name
                        )
                      ]!,
                      Subscription.MONTHLY
                    )
                  }
                  disabled={subscribeMutation.isLoading || setDisabled}
                >
                  <Trans>Upgrade Plan</Trans>
                  {subscribeMutation.isLoading && (
                    <Spinner
                      style={{
                        width: "24px",
                        height: "24px",
                        verticalAlign: "middle",
                      }}
                    />
                  )}
                </PlanActionButton>
              </Content>

              <h1>
                <Trans>
                  ${DEV_PLAN_CONFIG[keys[sliderValue]].price}
                  <span>/month</span>
                </Trans>
              </h1>
              <Slider
                step={1}
                onChange={handleSliderChange}
                value={sliderValue}
                min={1}
                max={5}
                tooltip={{ open: false }}
              />
              <div className="plan__benefits">
                <p>
                  <Trans>
                    {DEV_PLAN_CONFIG[keys[sliderValue]].messages} messages{" "}
                    <span>monthly</span>
                  </Trans>
                </p>
                <p>|</p>
                <p>
                  <Trans>
                    {DEV_PLAN_CONFIG[keys[sliderValue]].pages} document pages{" "}
                    <span>monthly</span>
                  </Trans>
                </p>
              </div>
            </PlanItemInfo>
            <PlanActionButton
              className="mb"
              onClick={() =>
                handleSubscribeToPlan(
                  planToPayment[
                    convertPlanString(DEV_PLAN_CONFIG[keys[sliderValue]].name)
                  ]!,
                  Subscription.MONTHLY
                )
              }
              disabled={subscribeMutation.isLoading || setDisabled}
            >
              <Trans>Upgrade Plan</Trans>
              {subscribeMutation.isLoading && (
                <Spinner
                  style={{
                    width: "24px",
                    height: "24px",
                    verticalAlign: "middle",
                  }}
                />
              )}
            </PlanActionButton>
          </PlanItem>
          <PlanItem>
            <PlanItemInfo>
              <PlanBadge $color="#027A48" $background="#ECFDF3">
                <Trans>Enterprise plan</Trans>
              </PlanBadge>
              <div className="plan__benefits">
                <p id="enterprise__plan__text">
                  <Trans>
                    Custom and flexible pricing for high volume processing
                  </Trans>
                </p>
              </div>
            </PlanItemInfo>

            <a href="mailto:enterprise@askyourpdf.com">
              <PlanContactUsButton>
                <Trans>Contact Us</Trans>
              </PlanContactUsButton>
            </a>
          </PlanItem>
        </PlanItemList>
      </PricingBox>
    </PricingContainer>
  );
}
