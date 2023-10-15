import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  LandingSection,
  LandingFlexCol,
  SectionHead,
} from "../../styles/landing";
import { Container } from "../../styles/styles";
import CheckIcon from "../../img/Check.svg?url";
import { motion, useAnimation, useInView } from "framer-motion";
import { convertToMB, getUserRole } from "../../utils/utils";
import {
  Plan as PlanEnum,
  Subscription,
  subscribeToPlan,
} from "../../services/payment";
import { useAuth } from "../../providers/AuthProvider";
import { useMutation } from "react-query";
import Spinner from "../Spinner";
import {
  AUTH_FRONTEND_URL,
  ENTERPRISE_EMAIL,
  UserPlan,
  WEB_PLAN_CONFIG,
  WEB_PLAN_PRICES,
} from "../../config/config";
import { alerts } from "../../utils/alerts";
import { Trans } from "@lingui/macro";
import Image from "next/image";

const TabContainer = styled(motion.div)`
  display: flex;
  gap: 4px;
  padding: 4px;
  margin-top: 24px;
  background: #f6f6f8;
  border-radius: 24px;
  align-self: center;

  @media (min-width: 576px) {
    margin-top: 32px;
  }
`;

const Tab = styled.div<{ $active?: boolean }>`
  background: ${(props) => (props.$active ? "#FFFFFF" : "transparent")};
  padding: 8px 16px;
  box-shadow: ${(props) =>
    props.$active
      ? "0px 1px 3px rgba(47, 43, 67, 0.1), inset 0px -1px 0px rgba(47, 43, 67, 0.1)"
      : "0"};
  border-radius: ${(props) => (props.$active ? "24px" : "0")};
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 8px;

  p {
    margin: 0;
    font-family: var(--font-satoshi);
    font-style: normal;
    font-weight: ${(props) => (props.$active ? "700" : "500")};
    font-size: 14px;
    line-height: 24px;
    text-align: center;
    letter-spacing: -0.01em;
    color: ${(props) => (props.$active ? "#2f2b43" : "#2F2B4399")};
  }
`;

const PlanContainer = styled(motion.div)`
  margin-top: 48px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;

  @media (min-width: 576px) {
    margin-top: 64px;
  }

  @media (min-width: 1536px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Plan = styled.div<{ $border?: string }>`
  background: #ffffff;
  border: 1px solid rgba(47, 43, 67, 0.1);
  border-radius: 24px;
  border: ${(props) => props.$border || "1px solid rgba(47, 43, 67, 0.1)"};
`;

const PlanHead = styled.div<{ $background?: string }>`
  box-sizing: border-box;
  min-height: 370px;
  padding: 24px;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;

  background: ${(props) => props.$background || "#F8F9FF"};
  border-bottom: 1px solid rgba(47, 43, 67, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 64px;

  a {
    text-decoration: none;
    width: 100%;
  }
`;

const PlanHeadContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  p {
    margin: 0;
    max-width: 336px;

    font-family: var(--font-satoshi);
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: -0.01em;

    color: rgba(0, 0, 0, 0.6);
  }

  .slashed__price {
    color: #2f2b43;
    font-family: var(--font-satoshi);
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: -0.2px;
    text-decoration: line-through;
  }
`;

const PlanFooter = styled.div`
  padding: 24px;

  p {
    margin: 0;
    margin-bottom: 16px;

    font-family: var(--font-satoshi);
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;

    letter-spacing: -0.01em;

    color: rgba(47, 43, 67, 0.6);
  }

  ul {
    margin: 0;
    padding-left: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  ul > li {
    display: flex;
    align-items: center;
    gap: 12px;

    font-family: var(--font-satoshi);
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: -0.01em;
    color: #2f2b43;
  }

  span {
    color: #ff0000;
  }
`;

const PriceInfo = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 6px;

  h2 {
    margin: 0;
    font-family: var(--font-inter);
    font-style: normal;
    font-weight: 600;
    font-size: 36px;
    line-height: 54px;

    letter-spacing: -0.02em;

    color: #2f2b43;
  }

  p {
    font-family: var(--font-inter);
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: -0.01em;
    color: rgba(47, 43, 67, 0.6);
  }
`;

const PlanType = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  p {
    font-family: var(--font-inter);
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: -0.01em;
    color: #2f2b43;
  }

  div {
    background: #2f2b43;
    border-radius: 20px;
    padding: 0px 8px;

    p {
      font-size: 14px;
      line-height: 20px;
      color: #ffffff;
    }
  }
`;
const YellowBadge = styled.div`
  background: #edb01a !important;
  border-radius: 20px;
  padding: 1px 16px !important;
  position: absolute;
  text-align: center;
  left: 0;
  right: 0;
  margin: auto;
  width: 60%;
  top: -35px;
  p {
    font-size: 13px !important;
    font-weight: 500;
    line-height: 20px;
    color: #000000 !important;
  }
`;
const Badge = styled.div`
  background: #2f2b43;
  border-radius: 20px;
  padding: 0px 8px;

  p {
    font-size: 14px;
    line-height: 20px;
    color: #ffffff;
  }
`;

const PlanCTA = styled.button<{ $background?: string; $color?: string }>`
  background: ${(props) => props.$background || "#ffffff"};
  color: ${(props) => props.$color || "#000000"};
  padding: 12px 16px 12px 16px;
  border: 1px solid rgba(47, 43, 67, 0.1);
  box-shadow: 0px 1px 3px rgba(47, 43, 67, 0.1),
    inset 0px -1px 0px rgba(47, 43, 67, 0.1);
  border-radius: 12px;

  font-family: var(--font-satoshi);
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 24px;

  text-align: center;
  letter-spacing: -0.01em;

  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
const PlanSectionContainer = styled(Container)`
  @media (min-width: 576px) {
    max-width: unset;
  }

  @media (min-width: 768px) {
    max-width: unset;
  }

  @media (min-width: 992px) {
    max-width: unset;
  }

  @media (min-width: 1200px) {
    max-width: unset;
  }
`;

// million-ignore
export default function Plans() {
  const [activePlan, setActivePlan] = useState<"month" | "year">("month");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const control = useAnimation();

  const textVariant = {
    visible: { opacity: 1, y: 0, transition: { delay: 0.3, ease: "easeIn" } },
    hidden: { opacity: 0, y: 30 },
  };

  const planVariant = {
    visible: { opacity: 1, x: 0, transition: { delay: 0.3, ease: "easeIn" } },
    hidden: { opacity: 0, x: -100 },
  };

  const { userToken, userDetails } = useAuth();

  const userRole = getUserRole(userDetails);

  useEffect(() => {
    if (isInView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, isInView]);

  const subscribeMutation = useMutation(subscribeToPlan, {
    onSuccess: (data) => {
      const subscriptionUrl = data.url;
      // window.LemonSqueezy.Url.Open(subscriptionUrl);
      window.location.href = subscriptionUrl;
    },
    onError: (error) => {
      alerts.error(
        "Subscription Failed",
        "Something went wrong. Please try again"
      );
    },
  });

  const handleSubscribeToPlan = async (
    plan: PlanEnum,
    subscription: Subscription
  ) => {
    if (userDetails?.email === undefined) {
      window.location.href = `${AUTH_FRONTEND_URL}`;
    }

    if (plan === PlanEnum.PREMIUM && userRole === UserPlan.PREMIUM) {
      return;
    }

    if (plan === PlanEnum.PRO && userRole === UserPlan.PRO) {
      return;
    }

    subscribeMutation.mutate({ subscription, plan, token: userToken });
  };
  return (
    <LandingSection ref={ref} id="Plans">
      <PlanSectionContainer>
        <LandingFlexCol>
          <SectionHead
            style={{ textAlign: "center" }}
            variants={textVariant}
            initial="hidden"
            animate={control}
          >
            <h1>
              <Trans>
                Plans for <span>everyone</span>
              </Trans>
            </h1>
            <p>
              <Trans>
                Experience the future of document interaction with AskYourPDF.
                Choose the plan that fits your needs and start engaging with
                your documents like never before:
              </Trans>
            </p>
          </SectionHead>
          <TabContainer
            variants={textVariant}
            initial="hidden"
            animate={control}
          >
            <Tab
              onClick={() => {
                setActivePlan("month");
              }}
              $active={activePlan === "month"}
            >
              <p>
                <Trans>Monthly</Trans>
              </p>
            </Tab>
            <Tab
              onClick={() => {
                setActivePlan("year");
              }}
              $active={activePlan === "year"}
            >
              <p>
                <Trans>Annual</Trans>{" "}
              </p>
              <Badge>
                <p>Up to 33% Off</p>
              </Badge>
            </Tab>
          </TabContainer>
          <PlanContainer
            variants={planVariant}
            initial="hidden"
            animate={control}
          >
            <Plan>
              <PlanHead>
                <PlanHeadContent>
                  <PlanType>
                    <p>Free</p>
                  </PlanType>
                  <PriceInfo>
                    <h2>${WEB_PLAN_PRICES[activePlan].free}</h2>
                    <p>/{activePlan}</p>
                  </PriceInfo>
                  <p>
                    <Trans>
                      Perfect for getting started! Experience the magic of
                      AI-enhanced documents at no cost. Includes 100 chats per
                      month.
                    </Trans>
                  </p>
                </PlanHeadContent>
                <PlanCTA
                  onClick={() => {
                    // navigate to conversations
                  }}
                  disabled={subscribeMutation.isLoading}
                >
                  <Trans>Get Started</Trans>
                </PlanCTA>
              </PlanHead>
              <PlanFooter>
                <p>
                  <Trans>Includes</Trans>:
                </p>
                <ul>
                  <li>
                    <Image src={CheckIcon} alt="" />
                    {WEB_PLAN_CONFIG[0].maxNumberPagesPerDoc}{" "}
                    <Trans>pages per document</Trans>(<Trans>max</Trans>{" "}
                    {convertToMB(WEB_PLAN_CONFIG[0].maxFileSizePerDoc).toFixed(
                      0
                    )}
                    MB)
                  </li>
                  <li>
                    <Image src={CheckIcon} alt="" />
                    <Trans>Max upload size</Trans>:{" "}
                    {convertToMB(WEB_PLAN_CONFIG[0].maxFileSizePerDoc).toFixed(
                      0
                    )}
                    MB
                  </li>
                  <li>
                    <Image src={CheckIcon} alt="" />
                    {WEB_PLAN_CONFIG[0].maxNumberQuestionsPerDay}{" "}
                    <Trans>questions per day</Trans>
                  </li>
                  <li>
                    <Image src={CheckIcon} alt="" />
                    {WEB_PLAN_CONFIG[0].maxNumberConversationsPerDay}{" "}
                    <Trans>conversations per day</Trans>
                  </li>
                  <li>
                    <Image src={CheckIcon} alt="" />
                    {WEB_PLAN_CONFIG[0].maxNumberDocsPerDay}{" "}
                    <Trans>document per day</Trans>
                  </li>
                </ul>
              </PlanFooter>
            </Plan>
            <Plan>
              <PlanHead $background="#F8F9FF">
                <PlanHeadContent>
                  <PlanType>
                    <p>Premium</p>
                    {/* <div>
                      <p>Most Popular</p>
                    </div> */}
                  </PlanType>
                  <PriceInfo>
                    <h2>${WEB_PLAN_PRICES[activePlan].premium}</h2>
                    <p>/{activePlan}</p>
                  </PriceInfo>
                  <p className="slashed__price">
                    {activePlan === "month" ? WEB_PLAN_PRICES[activePlan].slashedPremium :  WEB_PLAN_PRICES["year"].slashedPremium }
                  </p>
                  <p>
                    <Trans>
                      Elevate your document interaction with unlimited chats,
                      full conversation history, and priority support.
                    </Trans>
                  </p>
                </PlanHeadContent>
                <PlanCTA
                  onClick={() => {
                    handleSubscribeToPlan(
                      PlanEnum.PREMIUM,
                      activePlan === "month"
                        ? Subscription.MONTHLY
                        : Subscription.YEARLY
                    );
                  }}
                  disabled={
                    subscribeMutation.isLoading || userRole === UserPlan.PREMIUM
                  }
                >
                  <Trans>Get Started</Trans>{" "}
                  {subscribeMutation.isLoading && (
                    <Spinner style={{ width: "20px" }} />
                  )}
                </PlanCTA>
              </PlanHead>
              <PlanFooter>
                <p>
                  <Trans>Includes</Trans>:
                </p>
                <ul>
                  <li>
                    <Image src={CheckIcon} alt="" />
                    {WEB_PLAN_CONFIG[1].maxNumberPagesPerDoc}{" "}
                    <Trans>pages per document</Trans>(<Trans>max</Trans>{" "}
                    {convertToMB(WEB_PLAN_CONFIG[1].maxFileSizePerDoc).toFixed(
                      0
                    )}
                    MB){" "}
                  </li>
                  <li>
                    <Image src={CheckIcon} alt="" />
                    <Trans>Max upload size</Trans>:{" "}
                    {convertToMB(WEB_PLAN_CONFIG[1].maxFileSizePerDoc).toFixed(
                      0
                    )}
                    MB{" "}
                  </li>
                  <li>
                    <Image src={CheckIcon} alt="" />
                    {WEB_PLAN_CONFIG[1].maxNumberQuestionsPerDay}{" "}
                    <Trans>questions per day</Trans>
                  </li>
                  <li>
                    <Image src={CheckIcon} alt="" />
                    {WEB_PLAN_CONFIG[1].maxNumberConversationsPerDay}{" "}
                    <Trans>conversations per day</Trans>
                  </li>
                  <li>
                    <Image src={CheckIcon} alt="" />
                    {WEB_PLAN_CONFIG[1].maxNumberDocsPerDay}{" "}
                    <Trans>documents per day</Trans>
                  </li>
                  <li>
                    <Image src={CheckIcon} alt="" />
                    <Trans>Chrome Extension Access</Trans>
                  </li>
                </ul>
              </PlanFooter>
            </Plan>
            <Plan $border="3.5px solid #edb01a">
              <PlanHead $background="rgba(237, 176, 26, 0.20);">
                <PlanHeadContent>
                  <PlanType>
                    <p>Pro</p>
                    <YellowBadge>
                      <p>
                        <Trans>Most popular and Efficient</Trans>
                      </p>
                    </YellowBadge>
                  </PlanType>
                  <PriceInfo>
                    <h2>${WEB_PLAN_PRICES[activePlan].pro}</h2>
                    <p>/{activePlan}</p>
                  </PriceInfo>
                  <p className="slashed__price">
                    {activePlan === "month" ? WEB_PLAN_PRICES[activePlan].slashedPro :  WEB_PLAN_PRICES["year"].slashedPro }
                  </p>
                  <p>
                    <Trans>
                      Elevate your document interaction with unlimited chats,
                      full conversation history, and priority support.
                    </Trans>
                  </p>
                </PlanHeadContent>
                <PlanCTA
                  $background="#000000"
                  $color="#ffffff"
                  onClick={() => {
                    handleSubscribeToPlan(
                      PlanEnum.PRO,
                      activePlan === "month"
                        ? Subscription.MONTHLY
                        : Subscription.YEARLY
                    );
                  }}
                  disabled={
                    subscribeMutation.isLoading || userRole === UserPlan.PRO
                  }
                >
                  <Trans>Get Started</Trans>{" "}
                  {subscribeMutation.isLoading && (
                    <Spinner style={{ width: "20px" }} />
                  )}
                </PlanCTA>
              </PlanHead>
              <PlanFooter>
                <p>
                  <Trans>Includes</Trans>:
                </p>
                <ul>
                  <li>
                    <Image src={CheckIcon} alt="" />
                    {WEB_PLAN_CONFIG[2].maxNumberPagesPerDoc}{" "}
                    <Trans>pages per document</Trans>(<Trans>max</Trans>{" "}
                    {convertToMB(WEB_PLAN_CONFIG[2].maxFileSizePerDoc).toFixed(
                      0
                    )}
                    MB){" "}
                  </li>
                  <li>
                    <Image src={CheckIcon} alt="" />
                    <Trans>Max upload size</Trans>:{" "}
                    {convertToMB(WEB_PLAN_CONFIG[2].maxFileSizePerDoc).toFixed(
                      0
                    )}
                    MB{" "}
                  </li>
                  <li>
                    <Image src={CheckIcon} alt="" />
                    {WEB_PLAN_CONFIG[2].maxNumberQuestionsPerDay}{" "}
                    <Trans>questions per day</Trans>
                  </li>
                  <li>
                    <Image src={CheckIcon} alt="" />
                    {WEB_PLAN_CONFIG[2].maxNumberConversationsPerDay}{" "}
                    <Trans>conversations per day</Trans>
                  </li>
                  <li>
                    <Image src={CheckIcon} alt="" />
                    {WEB_PLAN_CONFIG[2].maxNumberDocsPerDay}{" "}
                    <Trans>documents per day</Trans>
                  </li>
                  <li>
                    <Image src={CheckIcon} alt="" />
                    <Trans>Chrome Extension Access</Trans>
                  </li>
                  <li>
                    <Image src={CheckIcon} alt="" />
                    <Trans>Unlimited ChatGPT Plugin Question</Trans>
                  </li>
                  <li>
                    <Image src={CheckIcon} alt="" />
                    <Trans>OCR Support</Trans>
                  </li>
                  <li>
                    <Image src={CheckIcon} alt="" />
                    <Trans>Longer Reply Length</Trans>
                  </li>
                  <li>
                    <Image src={CheckIcon} alt="" />
                    <Trans>Priority support</Trans>
                  </li>
                  <li>
                    <Image src={CheckIcon} alt="" />
                    <Trans>Priority access to new features</Trans>
                  </li>
                </ul>
              </PlanFooter>
            </Plan>
            <Plan>
              <PlanHead>
                <PlanHeadContent>
                  <PlanType>
                    <p>Enterprise</p>
                  </PlanType>
                  <PriceInfo>
                    <h2>{WEB_PLAN_PRICES[activePlan].enterprise}</h2>
                  </PriceInfo>
                  <p>
                    <Trans>
                      Go all out on features! Get everything in the Pro Plan,
                      plus priority document processing and access to new
                      features.
                    </Trans>
                  </p>
                </PlanHeadContent>
                <a href={ENTERPRISE_EMAIL}>
                  <PlanCTA
                    style={{ width: "100%" }}
                    disabled={
                      subscribeMutation.isLoading ||
                      userRole === UserPlan.ENTERPRISE
                    }
                  >
                    <Trans>Contact Us</Trans>
                  </PlanCTA>
                </a>
              </PlanHead>
              <PlanFooter>
                <p>
                  <Trans>Includes</Trans>:
                </p>
                <ul>
                  <li>
                    <Image src={CheckIcon} alt="" />
                    {/*{WEB_PLAN_CONFIG[3].maxNumberPagesPerDoc} */}
                    <Trans>Unlimited pages per document</Trans>
                    {/*(max{" "}*/}
                    {/*{convertToMB(WEB_PLAN_CONFIG[3].maxFileSizePerDoc).toFixed(*/}
                    {/*  0*/}
                    {/*)}*/}
                    {/*MB){" "}*/}
                  </li>
                  <li>
                    <Image src={CheckIcon} alt="" />
                    <Trans>Custom Max upload size</Trans>
                    {/*Max upload size:{" "}*/}
                    {/*{convertToMB(WEB_PLAN_CONFIG[3].maxFileSizePerDoc).toFixed(*/}
                    {/*  0*/}
                    {/*)}*/}
                    {/*MB{" "}*/}
                  </li>
                  <li>
                    <Image src={CheckIcon} alt="" />
                    {WEB_PLAN_CONFIG[3].maxNumberQuestionsPerDay}{" "}
                    <Trans>questions per day</Trans>
                  </li>
                  <li>
                    <Image src={CheckIcon} alt="" />
                    {WEB_PLAN_CONFIG[3].maxNumberConversationsPerDay}{" "}
                    <Trans>conversations</Trans>
                  </li>
                  <li>
                    <Image src={CheckIcon} alt="" />
                    <Trans>Unlimited documents per day</Trans>
                  </li>
                  <li>
                    <Image src={CheckIcon} alt="" />
                    <Trans>Customizable Link</Trans>
                  </li>
                  <li>
                    <Image src={CheckIcon} alt="" />
                    <Trans>Dedicated 24/7 Support</Trans>
                  </li>
                </ul>
              </PlanFooter>
            </Plan>
          </PlanContainer>
        </LandingFlexCol>
      </PlanSectionContainer>
    </LandingSection>
  );
}
