import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import {
  LandingSection,
  LandingFlexCol,
  SectionHead,
} from "@/styles/landing";
import { Container} from "@/styles/styles";
import { motion, useAnimation, useInView } from "framer-motion";
import { Trans, t, msg } from "@lingui/macro";
import LandingCTA from "./LandingCTA";
import compress from "@/img/MoreTools/compress_pdf.png";
import OCR from "@/img/MoreTools/ocr.png";
import merge from "@/img/MoreTools/merge_pdf.png";
import split from "@/img/MoreTools/split_pdf.png";
import Image from "next/image";
import { MessageDescriptor } from "@/types/localization";
import {useLingui} from "@lingui/react";


const Details: {
  title: MessageDescriptor;
  image: any;
 }[] = [
  {
    image: OCR,
    title: msg`OCR Tool`,
  },
  {
    image: split,
    title: msg`Split PDF Tool`,
  },
  {
    image: merge,
    title: msg`Merge PDF Tool`,
  },
  {
    image: compress,
    title: msg`Compress PDF Tool`,
  }
]


const CardContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 576px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;
const Card = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  @media (min-width: 576px) {
    flex-direction: column;
    align-items: center;
  }
  .img {
    width: 48px;
    height: 48px;
    margin-top: 29px;

    @media (min-width: 576px) {
      width: 54px;
      height: 54px;
      margin-top: 44px;
    }
  }
  .title {
    color: #2F2B43;
    font-family: var(--font-satoshi);
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: -0.224px;
    margin-top: 20px;
    margin-bottom: 16px;
    margin-left: 24px;
  }
  @media (min-width: 576px) {
    width: 288px;
    font-size: 28px;
    
    .title {
      margin-left: 0;
    }
  }
`;


// million-ignore
export default function MoreTools() {
  
  const {i18n} = useLingui();
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
    <LandingSection ref={ref} id="Tools" style={{background: "#F8F9FF",}}>
      <Container>
        <LandingFlexCol style={{paddingTop: "65px"}}
>
          <SectionHead
            variants={textVariant}
            initial="hidden"
            animate={control}
          >
            <motion.h1 variants={textVariant}>
              <Trans>
                Discover More <span> Tools </span>
              </Trans>
            </motion.h1>
            <motion.p variants={textVariant}>
              <Trans>
                Expanding Possibilities with Additional Resources
              </Trans>
            </motion.p>
          </SectionHead>

          <CardContainer>
            {Details.map((item, key) => (
              <Card key={key}>
                <div>
                  <Image src={item.image} alt={i18n._(item.title)} className="img"/>
                </div>
                <div className="title">
                  {i18n._(item.title)}
                </div>
              </Card>
            ))}
          </CardContainer>
          <LandingCTA disabled><Trans>Explore Tools</Trans></LandingCTA>
        </LandingFlexCol>
      </Container>
    </LandingSection>
  );
}
