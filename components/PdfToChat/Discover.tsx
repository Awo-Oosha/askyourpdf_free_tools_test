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
import Bulb from "@/img/landingDiscoverComponent/Bulb.png";
import Effort from "@/img/landingDiscoverComponent/Effortless-Research.svg?url";
import Legal from "@/img/landingDiscoverComponent/Legal-Clarity.svg?url";
import Business from "@/img/landingDiscoverComponent/Business-Intelligence.png";
import Technical from "@/img/landingDiscoverComponent/Technical-Mastery.png";
import Personal from "@/img/landingDiscoverComponent/Personal-Knowledge.png";
import Image from "next/image";
import { MessageDescriptor } from "@/types/localization";
import {useLingui} from "@lingui/react";




const Details: {
  image: string;
  title: MessageDescriptor;
  desc: MessageDescriptor;
 }[] = [
  {
    image: Bulb,
    title: msg`Academic Excellence`,
    desc: msg`By using AskYouPDF to swiftly access information within textbooks, research papers, and study materials, students may acquire a competitive advantage.`,
  },
  {
    image: Effort,
    title: msg`Effortless Research`,
    desc: msg`AskYourPDF gives researchers and academics the ability to speed up their work by quickly extracting data and insights from large PDF documents.`,
  },
  {
    image: Legal,
    title: msg`Legal Clarity`,
    desc: msg`By streamlining case analysis and research, professionals can make legal documents more accessible and understandable using AskYourPDF.`,
  },
  {
    image: Business,
    title: msg`Business Intelligence`,
    desc: msg`Business analysts and professionals can extract valuable market insights and competitive intelligence from industry reports.`,
  },
  {
    image: Technical,
    title: msg`Technical Mastery`,
    desc: msg`With AskYourPDF technical specialists and engineers are able to quickly retrieve crucial knowledge from technical manuals and paperwork.`,
  },
  {
    image: Personal,
    title: msg`Personal Knowledge`,
    desc: msg`Enthusiasts and curious minds can use AskYouPDF to explore topics of interest within digital books and resources.`,
  }
]


const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  padding: 1rem;

  @media (min-width: 576px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 24px;
    margin-top: 40px;
    padding: 0;
  }
`;
const Card = styled.div`
  width: 100%;
  margin-bottom: 24px;
  border-radius: 32px;
  border: 1px solid rgba(47, 43, 67, 0.10);
  background: #FFF;
  padding: 1rem;
  .img {
    width: 38px;
    height: 38px;
  }
  .title {
    color: #2F2B43;
    font-family: var(--font-satoshi);
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 32px; 
    letter-spacing: -0.448px;
    margin-top: 24px;
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
  }
  @media (min-width: 576px) {
    padding: 45px;
    width: 288px;
    font-size: 28px;

    .img {
      width: 64px;
      height: 64px;
    }
  }
`;

// million-ignore
export default function Discover() {

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
                Unlock the Possibilities of <span> AskYourPDF </span>
              </Trans>
            </motion.h1>
            <motion.p variants={textVariant}>
              <Trans>
                Discover how AskYouPDF can be applied to various scenarios
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
                  <Trans>{i18n._(item.title)}</Trans>
                </div>
                <div className="desc">
                  <Trans>{i18n._(item.desc)}</Trans>
                </div>
              </Card>
            ))}
          </CardContainer>
          <LandingCTA href={"/conversations"} ><Trans>Start For Free</Trans></LandingCTA>
        </LandingFlexCol>
      </Container>
    </LandingSection>
  );
}