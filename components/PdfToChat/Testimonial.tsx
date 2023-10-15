import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { SectionHead } from "../../styles/landing";
import { motion, useAnimation, useInView } from "framer-motion";
import Star from "../../img/Stars.svg?url";
import { Trans, t } from "@lingui/macro";
import Marquee from "react-fast-marquee";
import { TestimonialData } from "../../utils/testimonial";
import Image from "next/image";
const Wrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  margin-top: 30px;
  background: #fff;
  border-radius: 32px;
  flex-direction: column;
  padding-inline: 24px;
  padding-top: 24px;
  padding-bottom: 40px;

  a {
    text-decoration: none;
  }
`;
const TestimonialCards = styled(Marquee)`
  display: grid;
  grid-template-columns: 1fr;
  gap: 44px;
  margin-top: 44px;
  @media (min-width: 992px) {
    grid-template-columns: repeat(5, 1fr);
  }
  @media (max-width: 576px) {
    width: 100%;
    gap: 24px;
  }
`;
const Card = styled(motion.div)`
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 10px;
  padding: 45px 25px;
  border-radius: 24px;
  border: 1px solid rgba(47, 43, 67, 0.1);
  background: #fff;
  margin-right: 48px;
  width: 250px;
  .content {
    padding: 25px 0px;
    height: 96px;
    p {
      color: #2f2b43;
      text-align: center;
      font-family: var(--font-satoshi);
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 32px; /* 133.333% */
      letter-spacing: -0.384px;
      p {
        padding-left: 16px;
        font-size: 14px;
      }
    }
  }
  .bottom-content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    h2 {
      color: #2f2b43;
      text-align: center;
      font-family: var(--font-inter);
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 24px;
      letter-spacing: -0.16px;
      padding-top: 16px;
    }
    p {
      color: rgba(47, 43, 67, 0.6);
      text-align: center;
      font-family: var(--font-inter);
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
      letter-spacing: -0.14px;
      padding-top: 6px;
    }
    img {
      width: 48px;
      height: 48px;
      border-radius: 24px;
    }
  }
`;

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const control = useAnimation();

  useEffect(() => {
    if (isInView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, isInView]);

  const textVariant = {
    visible: { opacity: 1, y: 0, transition: { delay: 0.3, ease: "easeIn" } },
    hidden: { opacity: 0, y: 30 },
  };

  const truncateSentence = (sentence: string) => {
    let max_length = 90;
    if (sentence.length > max_length) {
      return sentence.slice(0, max_length) + "...";
    } else {
      return sentence;
    }
  };
  return (
    <Wrapper ref={ref} id="testimonial">
      <SectionHead
        style={{ textAlign: "center" }}
        variants={textVariant}
        initial="hidden"
        animate={control}
      >
        <h1>
          <Trans>
            What people say <span>about us</span>
          </Trans>
        </h1>
      </SectionHead>
      <TestimonialCards speed={30}>
        {TestimonialData.map((item: any) => {
          return (
            <Card variants={textVariant} key={item.Position}>
              <div className="star">
                <Image src={Star} alt="avatar-icon" />
              </div>
              <div className="content">
                <p>{truncateSentence(item.review)}</p>
              </div>
              <div className="bottom-content">
                <Image src={item.image} alt="avatar-icon" />
                <h2>{item.name}</h2>
                <p>{item.title}</p>
              </div>
            </Card>
          );
        })}
      </TestimonialCards>
    </Wrapper>
  );
}
