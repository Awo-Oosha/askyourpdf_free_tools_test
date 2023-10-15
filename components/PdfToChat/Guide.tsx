import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import {
  LandingSection,
  LandingFlexCol,
  SectionHead,
} from "@/styles/landing";
import { Container, CTA } from "@/styles/styles";
import { motion, useAnimation, useInView } from "framer-motion";
import { Trans } from "@lingui/macro";
import { useRouter } from "next/router";
import ChatGuide from "@/img/guide/ChatGuide.svg?url";
import ChatGuide_2 from "@/img/guide/ChatGuide_2.svg?url";
import ChatGuide_3 from "@/img/guide/ChatGuide_3.svg?url";
import Image from "next/image";

const CardContainer = styled.div`
  display: flex:
  flex-direction: column;
  margin-top: 48px;
  width: 100%;
`;
const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: auto;
  margin-bottom: 30px;

  @media (min-width: 576px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 45px;

    &:nth-child(2) {
      flex-direction: row-reverse;
    }
  }
`;

const CardText = styled.div`

  .title {
    color: #2F2B43;
    font-family: var(--font-satoshi);
    font-size: 28px;
    font-style: normal;
    font-weight: 700;
    line-height: 32px;
    letter-spacing: -0.448px;
    margin-bottom: 16px;
  }
  .desc {
    color: rgba(47, 43, 67, 0.60);
    font-family: var(--font-satoshi);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: -0.16px;
    width: 100%;

    @media (min-width: 576px) {
      width: 488px;
    }
  }
`;

const CardImage = styled.div`
  border-radius: 32px;
  background: #F8F9FF;
  margin-top: 5px;

  @media (min-width: 576px ) {
    padding: 33px 31px;
    margin-top: 0;
  }
  .img {
    width: 100%;
    object-fit: contain;

    @media (min-width: 576px ) {
      width: 100% !important;
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
                Your Guide to Effortless PDF <span> Interaction </span>
              </Trans>
            </motion.h1>
            <motion.p variants={textVariant}>
              <Trans>
                Ready to harness the future of document interaction? 
                Let's dive into how you can make the most of AskYouPDF's incredible features.
              </Trans>
            </motion.p>
          </SectionHead>

          <CardContainer>
            <Card>
              <CardText>
                <div className="title">
                  <Trans>Upload</Trans>
                </div>
                <div className="desc">
                  <Trans>
                    Begin by effortlessly uploading your PDF documents to our platform.
                  </Trans>
                </div>
              </CardText>
              <CardImage>
                <Image src={ChatGuide} alt="ChatGuide" className="img" />
              </CardImage>
            </Card>

            <Card>
              <CardText>
                <div className="title">
                  <Trans>Ask</Trans>
                </div>
                <div className="desc">
                  <Trans>
                    Formulate your questions naturally, just as you would in a conversation.
                  </Trans>
                </div>
              </CardText>
              <CardImage>
                <Image src={ChatGuide_2} alt="ChatGuide" className="img" />
              </CardImage>
            </Card>

            <Card>
              <CardText>
                <div className="title">
                  <Trans>Receive Answers</Trans>
                </div>
                <div className="desc">
                  <Trans>
                    Witness AI-driven comprehension as AskYouPDF analyzes your PDF and provides instant, insightful answers.
                  </Trans>
                </div>
              </CardText>
              <CardImage>
                <Image src={ChatGuide_3} alt="ChatGuide" className="img" />
              </CardImage>
            </Card>
          </CardContainer>

        </LandingFlexCol>
      </Container>
    </LandingSection>
  );
}
