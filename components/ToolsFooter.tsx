import React from "react";
import styled from "styled-components";
import ArrowRight from "../img/arrowRightLine.svg?url";
import Image from "next/image";
import Link from "next/link";
import { Trans, t } from "@lingui/macro";
const ToolsWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  a {
    text-decoration: none;
    @media (max-width: 768px) {
      width: 100%;
    }
  }
`;
const ToolsLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 84px;
  padding-bottom: 47px;
  flex-wrap: wrap;
  max-width: 1000px;
`;
const ToolsContent = styled.div`
  display: flex;
  align-items: center;
  border-radius: 36px;
  border: 1px solid rgba(47, 43, 67, 0.1);
  background: #fff;
  display: flex;
  height: 52px;
  padding: 25px 33px;
  align-items: center;
  margin-left: 19px;
  margin-bottom: 28px;

  @media (max-width: 768px) {
    border-radius: 0px;
    margin-left: 0px;
    margin-bottom: 14px;
    width: 100%;
  }
  p {
    color: #2f2b43;
    font-family: var(--font-satoshi);
    font-size: 18px;
    font-style: normal;
    padding-right: 19px;
    font-weight: 500;
    line-height: 32px;
    letter-spacing: -0.288px;
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }
`;
export const ComingSoonBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 10px 2px 10px;
  border-radius: 16px;
  background: #f5dfdf;
  color: #ff0000;
  font-family: var(--font-satoshi);
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
`;
export default function ToolsFooter() {
  const tools = [
    {
      name: t`Literature Review Tool`,
      link: "tools/literature-review-writer",
    },
    {
      name: t`PDF Splitter`,
      link: "",
    },
    {
      name: t`PDF Compressor`,
      link: "",
    },
    {
      name: t`PDF Merger`,
      link: "",
    },
    {
      name: t`OCR PDF Reader`,
      link: "",
    },
  ];
  return (
    <ToolsWrapper>
      <ToolsLayout>
        {tools.map((tool) => {
          return (
            <React.Fragment key={tool.name}>
              {tool.link ? (
                <Link href={tool.link}>
                  <ToolsContent>
                    <p>{tool.name}</p>
                    <Image src={ArrowRight} alt="menu" />
                  </ToolsContent>
                </Link>
              ) : (
                <ToolsContent>
                  <p>{tool.name}</p>
                  <ComingSoonBadge>
                    <Trans>Coming Soon</Trans>
                  </ComingSoonBadge>
                </ToolsContent>
              )}
            </React.Fragment>
          );
        })}
      </ToolsLayout>
    </ToolsWrapper>
  );
}
