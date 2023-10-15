import React from "react";
import { Container, StyleFlexCol } from "@/styles/styles";
import styled from "styled-components";
import { Trans } from "@lingui/macro";
import Link from "next/link";
import LandingCTA from "./LandingCTA";

const WaitlistSection = styled.section`
  padding: 80px 16px;
  background: #000000;
  a {
    text-decoration: none;
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
      max-width: 588px;
    }
  }
`;


const WaitlistButton = styled.button`
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
  cursor: pointer;
  width: 288px;
`;

export default function ApiBanner() {
  return (
    <WaitlistSection>
      <Container>
        <StyleFlexCol>
          <h1>
            <Trans>AskYourPDF Plugin for ChatGPT</Trans>
          </h1>
          <p>
            <Trans>
              A seamless integration that takes your conversations to the next level. With this powerful plugin, 
              ChatGPT gains the ability to access and provide insights from your documents hosted on AskYourPDF.
            </Trans>
          </p>
          <LandingCTA href={"https://docs.askyourpdf.com/askyourpdf-docs/how-to-install-and-use-askyourpdf-plugin-for-chatgpt"}><Trans>Learn More</Trans></LandingCTA>
        </StyleFlexCol>
      </Container>
    </WaitlistSection>
  );
}
