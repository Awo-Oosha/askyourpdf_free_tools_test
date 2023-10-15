import React, { useRef } from "react";
import styled from "styled-components";
import { Grid } from "antd";
import CloseIcon from "../../img/ModalCloseIcon.svg";
import UploadBenefit from "../../img/BenefitUploads.svg";
import ConversationBenefit from "../../img/BenefitConversations.svg";
import AccessBenefit from "../../img/BenefitAccess.svg";
import useIsInView from "../../hooks/useIsInView";
import { Plan, Subscription } from "../../services/payment";
import Spinner from "../Spinner";
import { Trans, msg, t } from "@lingui/macro";
import Link from "next/link";
import { useLingui } from "@lingui/react";
import { pricing } from "@/config/config";

const ContentTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 35px;

  button {
    background: none;
    border: none;
    cursor: pointer;

    svg {
      display: block;
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

const PlanBenefits = styled.div`
  margin-block: 16px;
  display: none;
  div {
    display: flex;
    gap: 10px;
    align-items: center;
    padding-block: 16px;

    p {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ModalButton = styled.button<{ $alt?: boolean }>`
  padding: 16px 24px;
  text-align: center;
  border-radius: 12px;
  border: ${(props) =>
    props.$alt ? "solid 1px #000000" : "solid 1px rgba(0,0,0,0)"};
  cursor: pointer;

  background: ${(props) => (props.$alt ? "#FFFFFF" : "#000000")};
  color: ${(props) => (props.$alt ? "#000000" : "#fefefe")};
  font-family: var(--font-satoshi);
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: -0.32px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PlanCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  overflow-x: scroll;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const PlanCardGroup = styled.div<{ $alt?: boolean }>`
  min-width: 300px;
  button {
    margin-top: 12px;
    width: 100%;
    padding: 16px 24px;
    text-align: center;
    border-radius: 12px;
    border: ${(props) =>
      props.$alt ? "solid 1px #000000" : "solid 1px rgba(0,0,0,0)"};
    cursor: pointer;

    background: ${(props) => (props.$alt ? "#FFFFFF" : "#000000")};
    color: ${(props) => (props.$alt ? "#000000" : "#fefefe")};
    font-family: var(--font-satoshi);
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: -0.32px;
  }
`;

const PlanCard = styled.div<{ $alt?: boolean; $background?: string }>`
  padding: 18px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: ${(props) =>
    props.$background
      ? props.$background
      : "url('/StarCoin.png'), linear-gradient(180deg, #000 0%, #1e1d1c 100%)"};

  background-repeat: no-repeat;
  background-position: bottom right;

  ul {
    margin-top: 17px;
    padding-left: 12px;
    li {
      color: ${(props) => (props.$alt ? "#000000" : "#FFFFFF")};
      font-family: var(--font-satoshi);
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 24px;
      letter-spacing: -0.28px;
    }
  }
`;

const Badge = styled.div<{ $alt?: boolean }>`
  width: fit-content;
  padding: 6px 12px;
  border-radius: 28px;
  background: ${(props) => (props.$alt ? "#000000" : "#ffcd64")};

  color: ${(props) => (props.$alt ? "#FFFFFF" : "#0e0e0e")};
  font-family: var(--font-satoshi);
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
`;

const PlanSwitcherContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 8px;

  @media (min-width: 690px) {
    display: none;
  }
`;

const PlanSwitcher = styled.button<{ $active: boolean }>`
  background: ${(props) => (props.$active ? "#000000" : "#E6E6E6")};
  border-radius: 8px;
  border: none;
  height: 6px;
  width: 50px;
  cursor: pointer;

  transition: background ease-in 0.5s;
`;

const StepTwoStyles = styled.div`
  margin-top: 20px;
`;

const Prices = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 14px;
`;

const PriceSelector = styled.button<{ $active?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-block: 16px;
  padding-left: 20px;
  padding-right: 40px;
  background: none;
  border: ${(props) =>
    props.$active ? "2px solid #111211" : "1px solid rgba(0, 0, 0, 0.10)"};
  border-radius: 10px;
  cursor: pointer;

  color: #1a1a1a;
  font-family: var(--font-satoshi);
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 42px;

  div {
    color: ${(props) => (props.$active ? "#ffffff" : "#000000")};
    background: ${(props) => (props.$active ? "#1E1E1E" : "#EEE")};
    padding: 6px 12px;
    border-radius: 8px;

    font-size: 14px;
    line-height: 24px;
  }
`;

const StepTwoButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 24px;
`;
const PricingContainer = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  p {
    color: #2f2b43;
    font-family: var(--font-satoshi);
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    font-size: 20px;
    letter-spacing: -0.2px;
  }
  .slashed__price {
    font-size: 14px;
    font-weight: 500;
    letter-spacing: -0.2px;
    padding-top: 5px;
    text-decoration: line-through;
  }
`;
const CustomLink = styled.a`
  color: #000000 !important;
  text-decoration: none;
`;

const benefits = [
  {
    id: "1",
    icon: <UploadBenefit />,
    text: msg`Upload larger documents`,
  },
  {
    id: "2",
    icon: <ConversationBenefit />,
    text: msg`Chat longer with your documents`,
  },
  {
    id: "3",
    icon: <AccessBenefit />,
    text: msg`Extensive Access`,
  },
];

function ModalStepOne({
  setCurrentStep,
  setChosenPlan,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  setChosenPlan: any;
}) {
  const planContainerRef: any = useRef(null);
  const premiumPlanRef: any = useRef(null);
  const proPlanRef: any = useRef(null);
  const enterprisePlanRef: any = useRef(null);

  const isPremiumVisible = useIsInView(planContainerRef, premiumPlanRef);
  const isProVisible = useIsInView(planContainerRef, proPlanRef);
  const isEnterpriseVisible = useIsInView(planContainerRef, enterprisePlanRef);

  return (
    <>
      <PlanCardContainer ref={planContainerRef}>
        <PlanCardGroup ref={premiumPlanRef}>
          <PlanCard>
            <Badge>Premium</Badge>
            <ul>
              <li>
                2500 <Trans>pages/Document</Trans>
              </li>
              <li>
                30 <Trans>MB/Document</Trans>
              </li>
              <li>
                50 <Trans>Documents Upload/day</Trans>
              </li>
              <li>
                50 <Trans>Conversation Per Day</Trans>
              </li>
              <li>
                1200 <Trans>questions/day</Trans>
              </li>
              <li>
                <Trans>Chrome Extension Access</Trans>
              </li>
              <li>
                <Trans>OCR Support</Trans>
              </li>
              <li>
                <Trans>Knowledge Base Access</Trans>
              </li>
              <li>
                <Trans>Summarization Access</Trans>
              </li>
            </ul>
          </PlanCard>
          <button
            onClick={() => {
              setCurrentStep(2);
              setChosenPlan(Plan.PREMIUM);
            }}
          >
            <Trans>Subscribe To</Trans> Premium
          </button>
        </PlanCardGroup>
        <PlanCardGroup ref={proPlanRef}>
          <PlanCard $background="url('/StarCoin.png'), #19269C">
            <Badge>Pro</Badge>
            <ul>
              <li>
                6000 <Trans>pages/Document</Trans>
              </li>
              <li>
                90 <Trans>MB/Document</Trans>
              </li>
              <li>
                150 <Trans>Documents Upload/day</Trans>
              </li>
              <li>
                <Trans>Unlimited Conversation Per Day</Trans>
              </li>
              <li>
                <Trans>Unlimited questions/day</Trans>
              </li>
              <li>
                <Trans>Chrome Extension Access</Trans>
              </li>
              <li>
                <Trans>Knowledge Base Access</Trans>
              </li>
              <li>
                <Trans>Summarization Access</Trans>
              </li>
              <li>
                <Trans>Unlimited ChatGPT Plugin Question</Trans>
              </li>
              <li>
                <Trans>API Access</Trans>
              </li>
              <li>
                <Trans>OCR Support</Trans>
              </li>
              <li>
                <Trans>Longer Reply Length</Trans>
              </li>
              <li>
                <Trans>Priority support</Trans>
              </li>
              <li>
                <Trans>Priority access to new features</Trans>
              </li>
            </ul>
          </PlanCard>
          <button
            onClick={() => {
              setCurrentStep(2);
              setChosenPlan(Plan.PRO);
            }}
          >
            <Trans>Subscribe To</Trans> Pro
          </button>
        </PlanCardGroup>
        <PlanCardGroup $alt={true} ref={enterprisePlanRef}>
          <PlanCard $alt={true} $background="url('/StarCoin.png'), #EAEAEA">
            <Badge $alt={true}>Enterprise</Badge>
            <ul>
              <li>
                <Trans>Unlimited pages</Trans> (<Trans>max</Trans> 100mb)
              </li>
              <li>
                <Trans>Unlimited doc uploads a day</Trans>
              </li>
              <li>
                <Trans>Unlimited questions / day</Trans>
              </li>
              <li>
                <Trans>Share Customizable link</Trans>
              </li>
              <li>
                <Trans>Dedicated Support</Trans>
              </li>
            </ul>
          </PlanCard>
          <button>
            <CustomLink href="mailto:enterprise@askyourpdf.com">
              <Trans>Contact Us For Enterprise Plan</Trans>
            </CustomLink>
          </button>
        </PlanCardGroup>
      </PlanCardContainer>
      <PlanSwitcherContainer>
        <PlanSwitcher
          $active={isPremiumVisible}
          onClick={() => {
            premiumPlanRef.current?.scrollIntoView({ behavior: "smooth" });
          }}
        ></PlanSwitcher>
        <PlanSwitcher
          $active={isProVisible}
          onClick={() => {
            proPlanRef.current?.scrollIntoView({ behavior: "smooth" });
          }}
        ></PlanSwitcher>
        <PlanSwitcher
          $active={isEnterpriseVisible}
          onClick={() => {
            enterprisePlanRef.current?.scrollIntoView({ behavior: "smooth" });
          }}
        ></PlanSwitcher>
      </PlanSwitcherContainer>
    </>
  );
}

function ModalStepTwo({
  setCurrentStep,
  chosenSubscription,
  setChosenSubscription,
  handleSubscribeToPlan,
  isSubscribing,
  chosenPlan,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  chosenSubscription: any;
  chosenPlan: any;
  setChosenSubscription: any;
  handleSubscribeToPlan: any;
  isSubscribing: any;
}) {
  return (
    <StepTwoStyles>
      <Badge>
        {chosenPlan &&
          chosenPlan.charAt(0).toUpperCase() +
            chosenPlan.slice(1).toLowerCase()}
      </Badge>
      <Prices>
        <PriceSelector
          $active={chosenSubscription === Subscription.MONTHLY}
          onClick={() => {
            if (isSubscribing) {
              return;
            }
            setChosenSubscription(Subscription.MONTHLY);
          }}
        >
          <div>
            <Trans>Monthly</Trans>
          </div>
          <PricingContainer>
            <p>${pricing[chosenPlan][Subscription.MONTHLY]}</p>
            <p className="slashed__price">
              ${pricing[chosenPlan]["slashedMonthly"]}
            </p>
          </PricingContainer>
        </PriceSelector>
        <PriceSelector
          $active={chosenSubscription === Subscription.YEARLY}
          onClick={() => {
            if (isSubscribing) {
              return;
            }
            setChosenSubscription(Subscription.YEARLY);
          }}
        >
          <div>
            <Trans>Yearly</Trans>
          </div>
          <PricingContainer>
            <p>${pricing[chosenPlan][Subscription.YEARLY]}</p>
            <p className="slashed__price">
              ${pricing[chosenPlan]["slashedYearly"]}
            </p>
          </PricingContainer>
        </PriceSelector>
      </Prices>
      <StepTwoButtonContainer>
        <ModalButton
          onClick={() => {
            if (isSubscribing) {
              return;
            }
            handleSubscribeToPlan();
          }}
          disabled={isSubscribing}
        >
          <Trans>Subscribe for</Trans> $
          {pricing[chosenPlan][chosenSubscription]}
          {chosenSubscription === Subscription.MONTHLY
            ? `/month`
            : `/year`}{" "}
          {isSubscribing && (
            <Spinner
              style={{ width: "24px", verticalAlign: "middle", height: "auto" }}
            />
          )}
        </ModalButton>
        <ModalButton
          onClick={() => {
            if (isSubscribing) {
              return;
            }
            setCurrentStep(1);
          }}
          $alt={true}
          disabled={isSubscribing}
        >
          <Trans>Go back</Trans>
        </ModalButton>
      </StepTwoButtonContainer>
    </StepTwoStyles>
  );
}

const { useBreakpoint } = Grid;

export default function PaymentModalContent({
  currentStep,
  setCurrentStep,
  chosenPlan,
  setChosenPlan,
  chosenSubscription,
  setChosenSubscription,
  handleCloseModal,
  handleSubscribeToPlan,
  isSubscribing,
}: any) {
  const { i18n } = useLingui();
  const screens = useBreakpoint();
  return (
    <ModalContent>
      {screens.lg ? (
        <>
          <h1>
            <Trans>Upgrade your content</Trans>
          </h1>
          <p>
            <Trans>
              Upgrade now for increased upload limits and enhanced ChatGPT
              conversations
            </Trans>
            .
          </p>
        </>
      ) : (
        <ContentTitle>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h1>
              <Trans>Upgrade your content</Trans>
            </h1>
            <p>
              <Trans>
                Upgrade now for increased upload limits and enhanced ChatGPT
                conversations
              </Trans>
              .
            </p>
          </div>
          <button onClick={handleCloseModal}>
            <CloseIcon />
          </button>
        </ContentTitle>
      )}

      <PlanBenefits>
        {benefits.map((benefit) => (
          <div key={benefit.id}>
            {benefit.icon}
            <p>{i18n._(benefit.text)}</p>
          </div>
        ))}
      </PlanBenefits>
      {currentStep === 1 && (
        <ModalStepOne
          setCurrentStep={setCurrentStep}
          setChosenPlan={setChosenPlan}
        />
      )}
      {currentStep === 2 && (
        <ModalStepTwo
          chosenPlan={chosenPlan}
          setCurrentStep={setCurrentStep}
          chosenSubscription={chosenSubscription}
          setChosenSubscription={setChosenSubscription}
          handleSubscribeToPlan={handleSubscribeToPlan}
          isSubscribing={isSubscribing}
        />
      )}
    </ModalContent>
  );
}
