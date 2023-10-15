import React from "react";
import { CTA, Container, StyleFlexCol } from "../../styles/styles";
import styled from "styled-components";
import { motion, useAnimation, useInView } from "framer-motion";
import { Trans } from "@lingui/macro";

const WaitlistSection = styled.section`
  padding: 80px 16px;
  background: #000000;

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

const DownloadButton = styled(motion.a)`
  margin-top: 17px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 12px;
  background: #edb01a;
  /* Shadows/1 */
  box-shadow: 0px -1px 0px 0px rgba(47, 43, 67, 0.1) inset,
    0px 1px 3px 0px rgba(47, 43, 67, 0.1);

  text-decoration: none;
  color: #000;
  text-align: center;
  font-family: var(--font-satoshi);
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 150% */
  letter-spacing: -0.16px;

  @media (min-width: 576px) {
    margin-top: 24px;
  }
`;
import DownloadIcon from "../../img/DownloadIcon.svg";


export default function Download() {
  const redirectToTypeForm = () => {
    window.location.href =
      "https://askyourpdf.gitbook.io/askyourpdf-api-documentation";
  };
  return (
    <WaitlistSection>
      <Container>
        <StyleFlexCol>
          <h1>
            <Trans>Add Our Chrome Extension</Trans>
          </h1>
          <p>
            <Trans>
              Experience a new way to interact with your PDFs with our Chrome Extension 
            </Trans>
          </p>
          <DownloadButton
              href="https://chrome.google.com/webstore/detail/askyourpdf/gaieenaffioioljpcocdkpphlifbhaig"
              target="_blank"
              rel="noreferrer noopener"
            >
              <DownloadIcon />
              <Trans>
                Download Extension
              </Trans>
            </DownloadButton>
        </StyleFlexCol>
      </Container>
    </WaitlistSection>
  );
}
