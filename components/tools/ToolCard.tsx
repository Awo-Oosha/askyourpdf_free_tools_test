import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { useLingui } from "@lingui/react";
import { MessageDescriptor } from '@/types/localization';
import { UrlObject } from 'url';

interface tool_type {
  icon: any,
  title: MessageDescriptor,
  target: string,
  desc: MessageDescriptor,
  link: UrlObject | string
}
 

const ToolList = styled.div`
  padding: 32px 0;
  width: 100%;
  .container {
    position: relative;
    border-radius: 16px;
    background: #F9FAFB;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 8px;
    max-width: 100%;
    min-height: 200px;
    padding-left: 25px;
    padding-right: 25px;
    width: 100%;

    a {
      text-decoration: none;
      position: relative;
      border-radius: 16px;
      background: #F9FAFB;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      gap: 8px;
      max-width: 100%;
      min-height: 200px;
      padding-left: 25px;
      padding-right: 25px;
    }
  }

  @media (min-width: 992px) {
    max-width: 385px;
  }
`;

const ToolTitle = styled.div`
  color: #101828;
  font-family: var(--font-satoshi);
  font-size: 19.844px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px;
  padding-top: 16px;
`;

const ToolIconContainer = styled.div`
  position: absolute;
  width: 64px;
  height: 64px;
  top: -35px;
`;

const ToolDesc = styled.p`
  color: #646B82;
  font-family: var(--font-satoshi);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: -0.14px;
`;


const ToolCard = ({icon, target, title, desc, link} : tool_type) => {

  const { i18n } = useLingui();

  return (
    <ToolList>
      <div className='container'>
        <Link href={link} target={target} >
          <ToolIconContainer>
            <Image src={icon} alt={"icon"} width={54} height={54} />
          </ToolIconContainer>

          <ToolTitle>
            {i18n._(title)}
          </ToolTitle>

          <ToolDesc>
            {i18n._(desc)}
          </ToolDesc>
        </Link>
      </div>
    </ToolList>
  )
}

export default ToolCard;