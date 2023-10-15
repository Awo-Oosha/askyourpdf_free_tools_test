import React from "react";
import styled from "styled-components";
import Logo from "@/img/Logo.svg";
import DiscordIcon from "@/img/footer_socials/Discord.svg?url";
import TwitterIcon from "@/img/footer_socials/Twitter.svg?url";
import InstagramIcon from "@/img/footer_socials/Instagram.svg?url";
import LinkedIcon from "@/img/footer_socials/LinkedIn.svg?url";
import TiktokIcon from "@/img/footer_socials/TikTok.svg?url";
import { path } from "../routes";
import { Trans } from "@lingui/macro";
import Link from "next/link";
import Image from "next/image";

const CopyrightSection = styled.div`
  background: #f6f6f8;

  text-align: center;
  font-family: var(--font-satoshi);
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: -0.01em;
  color: #667085;
`;

const FooterContainer = styled.footer`
  height: 100%;
  background-color: #f3f3f4;
  padding: 32px;

  @media (min-width: 1000px) {
    padding: 64px;
  }
`;

const FooterInnerContainer = styled.div`
  padding-bottom: 30px;
  display: flex;
  flex-direction: column;

  @media (min-width: 1000px) {
    height: 328px;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const LogoContainer = styled.div`
  width: 100%;
  height: 32px;
  text-align: center;

  path {
    fill: #edb01a;
  }

  @media (min-width: 1000px) {
    width: 32px;
  }
`;

const FooterDesc = styled.div`
  color: #4f4f4f;
  font-family: var(--font-satoshi);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px; /* 157.143% */
  letter-spacing: -0.196px;
  margin-top: 28px;

  @media (min-width: 1000px) {
    margin-bottom: 58px;
    width: 318px;
  }
`;

const Box = styled.div``;

const QuickLinksBox = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 1000px) {
    flex-direction: row;
  }
`;

const QuickLinks = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;

  .title {
    color: #8d8698;
    font-family: var(--font-satoshi);
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px;
    letter-spacing: -0.15px;
    margin-bottom: 32px;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;

    li {
      margin-bottom: 16px;

      a {
        text-decoration: none;
        color: #17121f;
        font-family: var(--font-satoshi);
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 18px;
        letter-spacing: -0.15px;
      }
    }
  }

  @media (min-width: 1000px) {
    width: 182px;
    margin-right: 24px;
    align-items: flex-start;
    margin-top: 0;

    ul {
      align-items: flex-start;
    }
  }
`;

const Socials = styled.div`
  gap: 16px;
  margin: 40px 0;
  justify-content: center;

  img {
    display: none;
  }

  @media (min-width: 1000px) {
    margin-top: 90px;
    justify-content: flex-start;
    display: flex;

    img {
      display: block;
    }
  }
`;

const MobileSocials = styled.div`
  div {
    display: flex;
    flex-direction: row;
    gap: 16px;
    margin: 40px 0;

    img {
      display: block;
    }
  }

  @media (min-width: 1000px) {
    display: none;
  }
`;

const CopyRightContainer = styled.div`
  width: 100%;
  border-top: 0.5px solid #17121f;
  height: 36px;
  padding: 17px 0.54px 0px 0px;
  display: flex;
  flex-direction: column;

  @media (min-width: 1000px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <FooterContainer>
      <FooterInnerContainer>
        <Box>
          <LogoContainer>
            <Logo />
          </LogoContainer>

          <FooterDesc>
            <Trans>
              Say hello to documents that respond to you! With AskYourPDF, your
              reading isn't just simple, it's fun!
            </Trans>
          </FooterDesc>

          <Socials>
            <a
              href="https://www.linkedin.com/company/askyourpdf"
              target="_blank"
              rel="noreferrer noopener"
            >
              <Image src={LinkedIcon} alt="" />
            </a>

            <a
              href="https://twitter.com/askyourpdf"
              target="_blank"
              rel="noreferrer noopener"
            >
              <Image src={TwitterIcon} alt="" />
            </a>

            <a
              href="https://discord.gg/bt6SCGEtu9"
              target="_blank"
              rel="noreferrer noopener"
            >
              <Image src={DiscordIcon} alt="" />
            </a>

            <a
              href="https://www.instagram.com/askyourpdf_"
              target="_blank"
              rel="noreferrer noopener"
            >
              <Image src={InstagramIcon} alt="" />
            </a>

            <a
              href="https://www.tiktok.com/@askyourpdf"
              target="_blank"
              rel="noreferrer noopener"
            >
              <Image src={TiktokIcon} alt="" />
            </a>
          </Socials>
        </Box>

        <QuickLinksBox>
          <QuickLinks>
            <div className="title">
              <Trans>Products</Trans>
            </div>
            <ul>
              <li>
                <Link href={path.apiPricing}>
                  <Trans>API</Trans>
                </Link>
              </li>
              <li>
                <Link
                  href={
                    "https://chrome.google.com/webstore/detail/askyourpdf/gaieenaffioioljpcocdkpphlifbhaig"
                  }
                >
                  <Trans>Chrome Extension</Trans>
                </Link>
              </li>
              <li>
                <Link
                  href={
                    "https://play.google.com/store/apps/details?id=com.askyourpdf.asking&pli=1"
                  }
                >
                  <Trans>Android App</Trans>
                </Link>
              </li>
              <li>
                <Link href={""}>
                  <Trans>iOS App</Trans>
                </Link>
              </li>
              <li>
                <Link href={"/chat"}>
                  <Trans>Chat</Trans>
                </Link>
              </li>
              <li>
                <Link href={"/file-upload"}>
                  <Trans>File Upload</Trans>
                </Link>
              </li>
              <li>
                <Link href={"/pdf-to-chat"}>
                  <Trans>PDF To Chat</Trans>
                </Link>
              </li>
              <li>
                <Link href={"tools/literature-review-writer"}>
                  <Trans>AI Literature Review Writer</Trans>
                </Link>
              </li>
            </ul>
          </QuickLinks>

          <QuickLinks>
            <div className="title">
              <Trans>Developers</Trans>
            </div>
            <ul>
              <li>
                <Link href={"https://docs.askyourpdf.com/askyourpdf-docs"}>
                  <Trans>Developer Docs</Trans>
                </Link>
              </li>
              <li>
                <Link href={"/conversations"}>
                  <Trans>Getting Started</Trans>
                </Link>
              </li>
            </ul>
          </QuickLinks>

          <QuickLinks>
            <div className="title">
              <Trans>Company</Trans>
            </div>
            <ul>
              <li>
                <Link href={path.TermsAndCondition}>
                  <Trans>Terms & Conditions</Trans>
                </Link>
              </li>
              <li>
                <Link href={path.PrivacyPolicy}>
                  <Trans>Privacy Policy</Trans>
                </Link>
              </li>
              <li>
                <Link href={path.FAQs}>
                  <Trans>FAQs</Trans>
                </Link>
              </li>
              <li>
                <Link href={"mailto:support@askyourpdf.com"}>
                  <Trans>Contact Us</Trans>
                </Link>
              </li>
              <li>
                <Link href={"https://askyourpdf.com/blog"}>
                  <Trans>Blog</Trans>
                </Link>
              </li>
              <li>
                <Link href={"https://askyourpdf.com/affiliate-program"}>
                  <Trans>Affiliate Program</Trans>
                </Link>
              </li>
            </ul>
          </QuickLinks>
        </QuickLinksBox>

        <MobileSocials>
          <Socials>
            <a
              href="https://www.linkedin.com/company/askyourpdf"
              target="_blank"
              rel="noreferrer noopener"
            >
              <Image src={LinkedIcon} alt="" />
            </a>

            <a
              href="https://twitter.com/askyourpdf"
              target="_blank"
              rel="noreferrer noopener"
            >
              <Image src={TwitterIcon} alt="" />
            </a>

            <a
              href="https://discord.gg/bt6SCGEtu9"
              target="_blank"
              rel="noreferrer noopener"
            >
              <Image src={DiscordIcon} alt="" />
            </a>

            <a
              href="https://www.instagram.com/askyourpdf_"
              target="_blank"
              rel="noreferrer noopener"
            >
              <Image src={InstagramIcon} alt="" />
            </a>

            <a
              href="https://www.tiktok.com/@askyourpdf"
              target="_blank"
              rel="noreferrer noopener"
            >
              <Image src={TiktokIcon} alt="" />
            </a>
          </Socials>
        </MobileSocials>
      </FooterInnerContainer>

      <CopyRightContainer>
        <CopyrightSection>
          <Trans>BlockTechnology OÜ. All rights reserved. &copy;{year}</Trans>
        </CopyrightSection>
        <CopyrightSection>
          <a
            href="mailto:support@askyourpdf.com"
            target="_blank"
            rel="noreferrer noopener"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            support@askyourpdf.com
          </a>
        </CopyrightSection>
      </CopyRightContainer>
    </FooterContainer>
  );
}
