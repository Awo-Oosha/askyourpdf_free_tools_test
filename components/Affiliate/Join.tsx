import React from "react";
import { Container, StyleFlexCol } from "@/styles/styles";
import styled from "styled-components";
import { Trans } from "@lingui/macro";
import Link from "next/link";
import ArrowIcon from "../../img/arrowRightButton.svg?url";
import Image from "next/image";

const JoinSection = styled.section`
  padding: 80px 16px;
  background: #000000;
  a {
    text-decoration: none;
    @media (max-width: 576px) {
      width: 100%;
    }
  }
  h1 {
    margin: 0;
    margin-bottom: 16px;
    font-family: var(--font-eudoxus);
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
    line-height: 42px;
    text-align: center;
    letter-spacing: -0.018em;
    color: #ffffff;
  }

  p {
    margin: 0;
    font-family: var(--font-inter);
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
    letter-spacing: -0.01em;
    color: #d0d5dd;
  }

  @media (min-width: 576px) {
    padding: 128px 120px;

    // h1 {
    //   font-size: 48px;
    //   line-height: 54px;
    // }

    p {
      line-height: 26px;
      max-width: 540px;
    }
  }
`;

const JoinButton = styled.button`
  background: #edb01a;
  margin-top: 40px;
  color: #000000;
  padding: 12px 16px 12px 16px;
  border-radius: 12px;
  font-family: var(--font-satoshi);
  border: none;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  letter-spacing: -0.01em;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 268px;
  img {
    padding-left: 8px;
  }
  @media (max-width: 576px) {
    width: 100%;
  }
`;

export default function Join() {
  return (
    <JoinSection>
      <Container>
        <StyleFlexCol>
          <h1>
            <Trans>Join us Today</Trans>
          </h1>
          <p>
            <Trans>
              Join our Affiliate Programme today and start earning for your
              referrals while sharing the benefits of AskYourPDF. As an
              AskYourPDF Affiliate, you can help your audience realize the full
              potential of their documents.
            </Trans>
          </p>
          <Link href="https://askyourpdf.getrewardful.com/" target="_blank">
            <JoinButton>
              <Trans>Sign Up Now</Trans> <Image src={ArrowIcon} alt="" />
            </JoinButton>
          </Link>
        </StyleFlexCol>
      </Container>
    </JoinSection>
  );
}
