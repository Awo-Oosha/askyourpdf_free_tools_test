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

const WaitlistForm = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  gap: 8px;
  width: 100%;
  margin-top: 24px;

  button {
    width: 100%;

    span:nth-of-type(2) {
      display: none;
    }
  }

  input {
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    border-radius: 12px;
    padding: 0 16px;
    outline: none;
    background: #ffffff;
    border: 1px solid rgba(47, 43, 67, 0.1);
    box-shadow: 0px 1px 3px rgba(47, 43, 67, 0.1),
      inset 0px -1px 0px rgba(47, 43, 67, 0.1);

    font-family: var(--font-satoshi);
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: -0.01em;
  }

  @media (min-width: 675px) {
    grid-template-columns: 1fr auto;
    max-width: 500px;
    margin-top: 56px;

    button {
      width: unset;
      height: 50px;

      span:nth-of-type(1) {
        display: none;
      }

      span:nth-of-type(2) {
        display: block;
      }
    }

    input {
      width: unset;
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

export default function ToolsWaitlist() {
  const redirectToTypeForm = () => {
    window.location.href =
      "https://askyourpdf.gitbook.io/askyourpdf-api-documentation";
  };
  return (
    <WaitlistSection>
      <Container>
        <StyleFlexCol>
          <h1>
            <Trans>Our Knowledge Base is Now Live</Trans>
          </h1>
          <p>
            <Trans>
            You can now chat with multiple documents at once using our knowledge base
            </Trans>
          </p>
          <Link href="/knowledge-base">
            <WaitlistButton>
              <Trans>Try it Now</Trans>
            </WaitlistButton>
          </Link>
        </StyleFlexCol>
      </Container>
    </WaitlistSection>
  );
}
