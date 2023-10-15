import React from "react";
import { Container, StyleFlexCol } from "@/styles/styles";
import styled from "styled-components";
import { Trans } from "@lingui/macro";
import Link from "next/link";

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
    line-height: 52px;
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

export default function KnowledgeBaseServiceBanner() {
  const redirectToTypeForm = () => {
    window.location.href =
      "https://askyourpdf.gitbook.io/askyourpdf-api-documentation";
  };
  return (
    <WaitlistSection>
      <Container>
        <StyleFlexCol>
          <h1>
            <Trans>Knowledge Base Service</Trans>
          </h1>
          <p>
            <Trans>
              The AskYourPDF Knowledge Base service provides a platform for users 
              to upload documents into one folder 📂 (knowledge base) from 
              which they can ask questions and get answers based on those documents.
            </Trans>
          </p>
          <Link href={"/knowledge-base"}>
            <WaitlistButton>
              <Trans>Try it Now</Trans>
            </WaitlistButton>
          </Link>
        </StyleFlexCol>
      </Container>
    </WaitlistSection>
  );
}
