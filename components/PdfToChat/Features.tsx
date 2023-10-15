import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import {
  LandingSection,
  LandingFlexCol,
  SectionHead,
} from "@/styles/landing";
import { Container, CTA } from "@/styles/styles";
import FeatureBannerImage from "../../img/FeatureBannerImage.webp";
import ChatIcon from "../../img/ChatIcon.svg?url";
import ChevronRight from "../../img/ChevronRight.svg?url";
import BulbIcon from "../../img/Bulb.png";
import ClockIcon from "../../img/Clock.png";
import LearnIcon from "../../img/Learn.png";
import { motion, useAnimation, useInView } from "framer-motion";
import { Trans } from "@lingui/macro";
import { useRouter } from "next/router";
import LandingCTA from "./LandingCTA";
import Image from "next/image";

const FeatureBanner = styled(motion.div)`
  display: flex;
  align-items: center;
  margin-top: 30px;
  background: #f8f9ff;
  border-radius: 32px;
  flex-direction: column;
  padding-inline: 24px;
  padding-top: 24px;

  .banner__image {
    img {
      max-width: 100%;
      height: auto;
    }
    order: 1;
  }

  @media (min-width: 576px) {
    margin-top: 64px;
  }

  @media (min-width: 1200px) {
    padding-inline: 48px;
    padding-top: 48px;
    flex-direction: row;
    .banner__image {
      order: 0;
    }
  }
`;

const BannerText = styled.div`
  margin-bottom: 26px;
  .banner__head {
    margin-top: 24px;
    margin-bottom: 16px;
  }

  h2 {
    margin: 0;
    font-family: var(--font-eudoxus);
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 38px;
    letter-spacing: -0.016em;
    color: #2f2b43;
  }

  p {
    margin: 0;
    font-family: var(--font-satoshi);
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: -0.01em;
    color: rgba(47, 43, 67, 0.6);
  }

  p:nth-of-type(2) {
    margin-block: 24px;
  }

  @media (min-width: 576px) {
    h2 {
      font-size: 36px;
      line-height: 46px;
    }
  }
`;

const FeatureCards = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-top: 24px;

  @media (min-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
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

const CTAContainer = styled.div`
  width: 100%;
  text-align: center;
`

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

  const router = useRouter();

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
              <Trans>
                Supercharge Document <br /> <span>Interactions</span>
              </Trans>
            </motion.h1>
            <motion.p variants={textVariant}>
              <Trans>
                Ever wished your documents could talk? With AskYourPDF, they
                can! Powered by ChatGPT we breathe life into your documents,
                making them interactive and engaging. No more endless scrolling
                or skimming - just upload, ask and uncover insights directly
                from your document
              </Trans>
            </motion.p>
          </SectionHead>
          <FeatureBanner
            variants={featureVariant}
            initial="hidden"
            animate={control}
          >
            <div className="banner__image">
              <Image
                src={FeatureBannerImage}
                alt="feature banner"
                sizes="(min-width: 1200px) 50vw, 100vw"
              />
            </div>
            <BannerText>
              <Image src={ChatIcon} alt="" />
              <div className="banner__head">
                <h2>
                  <Trans>Converse, Learn, Track</Trans> -
                </h2>
                <h2>
                  <Trans>All on Your Terms</Trans>
                </h2>
              </div>
              <div className="banner__body">
                <p>
                  <Trans>
                    Discover a brand new way to interact with your documents on
                    AskYourPDF.
                  </Trans>
                </p>
                <p>
                  <Trans>
                    Here, you give voice to your documents, turning them into
                    engaging chat partners. What's more? You can effortlessly
                    track and revisit all your conversations. Take control, ask
                    questions, get answers, and never lose track of your
                    learning. Ready to make your documents work for you?
                  </Trans>
                </p>
                <CTA
                  onClick={() => {
                    router.push("/conversations");
                  }}
                  style={{ background: "#000000" }}
                >
                  <Trans>Get Started</Trans> <Image src={ChevronRight} alt="" />
                </CTA>
              </div>
            </BannerText>
          </FeatureBanner>

          <SectionHead
            variants={textVariant}
            initial="hidden"
            animate={control}
            style={{marginTop: "54px", marginBottom: "44px"}}
          >
            <motion.h1 variants={textVariant}>
              <Trans>
                Why Choose <span>Us</span>
              </Trans>
            </motion.h1>
            <motion.p variants={textVariant}>
              <Trans>
                We're committed to enhancing your PDF interaction experience and providing 
                you with powerful tools that simplify the way you work with documents.
              </Trans>
            </motion.p>
          </SectionHead>
          <FeatureCards
            variants={textVariant}
            initial="hidden"
            animate={control}
          >
            <Card variants={textVariant}>
              <Image src={BulbIcon} alt="" />
              <h2>
                <Trans>Insightful Conversations</Trans>
              </h2>
              <div className="card__body">
                <p>
                  <Trans>
                    Unleash the chat power in your documents! Turn them into
                    friendly Chatbot's,ready to share knowledge and insights.
                  </Trans>
                </p>
                <p>
                  <Trans>
                    Just upload and voila, your documents aren't just smart,
                    they're your new best friends. Dive in, engage, and enjoy
                    your most interactive reading experience yet!
                  </Trans>
                </p>
              </div>
            </Card>
            <Card variants={textVariant}>
              <Image src={ClockIcon} alt="" />
              <h2>
                <Trans>Save Time</Trans>
              </h2>
              <div className="card__body">
                <p>
                  <Trans>
                    AskYourPDF brings the magic of AI to your fingertips! Dive
                    into smart navigation, no more endless scrolling or page
                    skimming.
                  </Trans>
                </p>
                <p>
                  <Trans>
                    Your documents transform into interactive buddies, ready to
                    help you understand and engage in an instant!
                  </Trans>
                </p>
              </div>
            </Card>
            <Card variants={textVariant}>
              <Image src={LearnIcon} alt="" />
              <h2>
                <Trans>Learn Playfully</Trans>
              </h2>
              <div className="card__body">
                <p>
                  <Trans>
                    Our AI-powered chat system not only provides you with
                    accurate information but also fosters an enjoyable learning
                    environment that keeps you coming back for more.
                  </Trans>
                </p>
              </div>
            </Card>
          </FeatureCards>

          <LandingCTA href={"/conversations"} ><Trans>Start For Free</Trans></LandingCTA>
        </LandingFlexCol>
      </Container>
    </LandingSection>
  );
}
