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
import ChatGuide from "@/img/guide/SummarizeChat.svg?url";
import ChatGuide_2 from "@/img/guide/SummarizeChat-1.svg?url";
import ChatGuide_3 from "@/img/guide/SummarizeChat-2.svg?url";
import Image from "next/image";
import LandingCTA from "./LandingCTA";

const SectionHeader = styled(SectionHead)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    width: 100%;
    
    @media (min-width: 576px) {
      width: 400px;
    }
  }
`

const CardContainer = styled.div`
  display: flex:
  flex-direction: column;
  margin-top: 48px;
  width: 100%;
`;
const Card = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;

  @media (min-width: 576px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
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
      width: 388px;
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
          <SectionHeader
            variants={textVariant}
            initial="hidden"
            animate={control}
          >
            <motion.h1 variants={textVariant}>
              <Trans>
                How to <span> Summarize</span> a
                PDF File with  AI
              </Trans>
            </motion.h1>
            <motion.p variants={textVariant}>
              <Trans>
                Ready to harness the future of document interaction? 
                Let's dive into how you can make the most of AskYouPDF's incredible features.
              </Trans>
            </motion.p>
          </SectionHeader>

          <CardContainer>
            <Card>
              <CardText>
                <div className="title">
                  <Trans>Upload</Trans>
                </div>
                <div className="desc">
                  <Trans>
                    To begin, upload the document to be summarised. 
                    This can be a PDF, text file, or any of the various 
                    document formats that are supported. <br />

                    After you've submitted the document, you'll have to wait a few moments
                    while AskYourPDF processes it. 
                    Our AI system will analyze the material in order to extract important information.                  
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
                  <Trans>Customise Your Summary</Trans>
                </div>
                <div className="desc">
                  <Trans>
                    After the document has been processed, you can customize the summary based on your preferences. <br />

                    Set settings such as the desired length of the summary to make it as brief or as informative as you want. 
                    Set text formatting choices to ensure that the summary follows your desired style.
                    You can include a prompt to instruct AskYourPDF on how to summarise the document. 
                    However, if you prefer not to provide a prompt, you can skip this step.
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
                  <Trans>Receive Your Summary</Trans>
                </div>
                <div className="desc">
                  <Trans>
                    Finally, click the 'Summarise' button, and within moments, 
                    AskYourPDF will provide you with a customized summary of your 
                    document based on your settings and, if provided, your prompt.
                  </Trans>
                </div>
              </CardText>
              <CardImage>
                <Image src={ChatGuide_3} alt="ChatGuide" className="img" />
              </CardImage>
            </Card>
          </CardContainer>

          <LandingCTA href={"/summarise"}><Trans>Start For Free</Trans></LandingCTA>
        </LandingFlexCol>
      </Container>
    </LandingSection>
  );
}
