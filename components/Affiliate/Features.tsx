import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { LandingSection, LandingFlexCol, SectionHead } from "@/styles/landing";
import { Container, CTA } from "@/styles/styles";
import SignImage from "@/img/featuresOne.svg?url";
import ShareIcon from "@/img/featuresTwo.svg?url";
import PaidIcon from "@/img/featuresThree.svg?url";
import { motion, useAnimation, useInView } from "framer-motion";
import { Trans } from "@lingui/macro";
import { useRouter } from "next/router";
import Image from "next/image";

const FeatureCards = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-top: 24px;
  margin-bottom: 62px;
  @media (min-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
    margin-bottom: 74px;
  }
`;

const Card = styled(motion.div)`
  padding: 24px;
  border: 1px solid rgba(47, 43, 67, 0.1);
  border-radius: 32px;

  img {
    max-width: 48px;
    height: auto;
  }

  h2 {
    margin-top: 24px;
    margin-bottom: 16px;
    font-family: var(--font-satoshi);
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 28px;

    letter-spacing: -0.016em;

    color: #2f2b43;
  }

  p {
    margin-top: 0;
    margin-bottom: 24px;
    font-family: var(--font-satoshi);
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: -0.01em;
    color: rgba(47, 43, 67, 0.6);
  }

  @media (min-width: 576px) {
    padding: 48px;

    img {
      max-width: unset;
    }

    h2 {
      font-size: 28px;
      line-height: 32px;
    }
  }
`;

// million-ignore
export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const control = useAnimation();

  const textVariant = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { when: "beforeChildren", staggerChildren: 0.3 },
    },
    hidden: { opacity: 0, y: 30 },
  };

  const featureVariant = {
    visible: { opacity: 1, x: 0, transition: { delay: 0.3, ease: "easeIn" } },
    hidden: { opacity: 0, x: -100 },
  };
  useEffect(() => {
    if (isInView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, isInView]);

  return (
    <LandingSection ref={ref}>
      <Container>
        <LandingFlexCol>
          <SectionHead
            variants={textVariant}
            initial="hidden"
            animate={control}
          >
            <motion.h1 variants={textVariant}>
              <Trans>How it Works</Trans>
            </motion.h1>
          </SectionHead>
          <FeatureCards
            variants={textVariant}
            initial="hidden"
            animate={control}
          >
            <Card variants={textVariant}>
              <Image src={SignImage} alt="" />
              <h2>
                <Trans>Sign Up for the Affiliate Program</Trans>
              </h2>
              <div className="card__body">
                <p>
                  <Trans>
                    It's easy to get started. Sign up for our Affiliate
                    Programme to receive your unique referral link.
                  </Trans>
                </p>
              </div>
            </Card>
            <Card variants={textVariant}>
              <Image src={ShareIcon} alt="" />
              <h2>
                <Trans>Share Your Referral Link with Your Audience</Trans>
              </h2>
              <div className="card__body">
                <p>
                  <Trans>
                    Once you've signed up, begin sharing your referral link with
                    your audience. Spread the word about AskYourPDF's strong
                    document tools,  whether on a blog, a social media, or a
                    professional network.
                  </Trans>
                </p>
              </div>
            </Card>
            <Card variants={textVariant}>
              <Image src={PaidIcon} alt="" />
              <h2>
                <Trans>Get Paid Commission</Trans>
              </h2>
              <div className="card__body">
                <p>
                  <Trans>
                    You'll get  30% commission on every paying client who signs
                    up through your referral link for the first 12 months. You
                    will be able to withdraw your money once you have earned a
                    minimum of $100 in commission. We want to make certain that
                    your contributions are properly recognized.
                  </Trans>
                </p>
              </div>
            </Card>
          </FeatureCards>
        </LandingFlexCol>
      </Container>
    </LandingSection>
  );
}
