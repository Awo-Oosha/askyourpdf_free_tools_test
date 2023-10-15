import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { SectionHead } from "../../styles/landing";
import { motion, useAnimation, useInView } from "framer-motion";
import Chatgpt from "../../img/Chatgpt1.svg?url";
import CodeSlashLine from "../../img/CodeSlashLine.svg?url";
import Chrome from "../../img/Chrome.svg?url";
import SmartphoneLine from "../../img/SmartphoneLine.svg?url";
import ComputerLine from "../../img/ComputerLine.svg?url";
import { Trans, t } from "@lingui/macro";
import Image from "next/image";
import Link from "next/link";

const Wrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  margin-top: 30px;
  background: rgb(248, 249, 255);
  border-radius: 32px;
  flex-direction: column;
  padding-inline: 24px;
  padding-top: 24px;
  padding-bottom: 40px;

  a {
    text-decoration: none;
  }
`;
const ProductsCards = styled(motion.div)`
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
  position: relative;
  margin-bottom: 10px;

  img {
    width: 40px;
    height: auto;
  }

  p {
    margin-top: 14px;
    margin-bottom: 16px;
    font-family: var(--font-satoshi);
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 28px;
    letter-spacing: -0.224px;
    text-align: center;
    color: #2f2b43;
  }

  @media (max-width: 576px) {
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    p {
      padding-left: 16px;
      font-size: 14px;
      margin-top: 10px;
    }
  }
`;
const ComingSoonBadge = styled.div<{
  $color?: string;
  $background?: string;
  $font?: string;
}>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  position: absolute;
  bottom: -15px;
  padding: 2px 10px 2px 10px;
  border-radius: 16px;
  background: ${(props) => (props.$background ? props.$background : "#f2f4f7")};
  color: ${(props) => (props.$color ? props.$color : "#344054")};
  font-family: var(--font-satoshi);
  font-size: ${(props) => (props.$font ? props.$font : "12px")};
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  @media (max-width: 576px) {
    bottom: -10px;
    left: 49px;
  }
`;
export default function Products() {
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

  const appImageVariant = {
    visible: { opacity: 1, transition: { delay: 0.3, ease: "easeIn" } },
    hidden: { opacity: 0 },
  };
  const productsList = [
    {
      name: t`Website`,
      key: "1",
      image: ComputerLine,
      comingSoon: false,
      link: "",
    },
    {
      name: t`Mobile App`,
      key: "2",
      image: SmartphoneLine,
      comingSoon: true,
      link: "https://play.google.com/store/apps/details?id=com.askyourpdf.asking&pli=1",
    },
    {
      name: t`ChatGPT Plugin`,
      key: "3",
      image: Chatgpt,
      comingSoon: false,
      link: "",
    },
    {
      name: t`Browser Extension`,
      key: "4",
      image: Chrome,
      comingSoon: true,
      link: "https://chrome.google.com/webstore/detail/askyourpdf/gaieenaffioioljpcocdkpphlifbhaig",
    },
    {
      name: t`API Service for Developers`,
      key: "5",
      image: CodeSlashLine,
      comingSoon: true,
      link: "/api-pricing",
    },
  ];
  return (
    <Wrapper ref={ref} id="products">
      <SectionHead
        style={{ textAlign: "center" }}
        variants={textVariant}
        initial="hidden"
        animate={control}
      >
        <h1>
          <Trans>
            Explore our <span>products</span>
          </Trans>
        </h1>
        <p>
          <Trans>Tools we’ve built to improve your document experience</Trans>
        </p>
      </SectionHead>
      <ProductsCards variants={textVariant} initial="hidden" animate={control}>
        {productsList.map((item) => {
          return (
            <div key={item.key}>
              {!item.link && (
                <Card variants={textVariant}>
                  <Image src={item.image} alt="" />
                  <p>{item.name}</p>
                  {item.comingSoon && (
                    <ComingSoonBadge $color="#FF0000" $background="#f5dfdf">
                      <Trans>New</Trans>
                    </ComingSoonBadge>
                  )}
                </Card>
              )}
              {item.link && (
                <Link href={item.link} rel="noreferrer noopener">
                  <Card variants={textVariant} key={item.key}>
                    <Image src={item.image} alt="" />
                    <p>{item.name}</p>
                    {item.comingSoon && (
                      <ComingSoonBadge
                        $color="#FF0000"
                        $font="12px"
                        $background="#f5dfdf"
                      >
                        <Trans>New</Trans>
                      </ComingSoonBadge>
                    )}
                  </Card>
                </Link>
              )}
            </div>
          );
        })}
      </ProductsCards>
    </Wrapper>
  );
}
