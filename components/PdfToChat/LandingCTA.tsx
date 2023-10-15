import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

type props = {
  href?: any,
  disabled?: boolean,
  children: ReactNode,
}

const CTA = styled.button`
  border: none;
  border-radius: 12px;
  background: #EDB01A;
  box-shadow: 0px -1px 0px 0px rgba(47, 43, 67, 0.10) inset, 0px 1px 3px 0px rgba(47, 43, 67, 0.10);
  padding: 12px;
  width: 268px;
  color: #000;
  text-align: center;
  font-family: var(--font-satoshi);
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: -0.16px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};

  @media (min-width: 576px) {
    margin: 50px 0;
  }

  span {
    margin-right: 8px;
  }
`;

const CTAContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Badge = styled.span`
  border-radius: 12px;
  color: #000;
  text-align: center;
  font-family: var(--font-satoshi);
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: -0.16px;
  font-style: italic;
`

const LandingCTA = ({ href, disabled, children }: props ) => {
  return (
      <CTAContainer>
        <a href={href} style={{ textDecoration: 'none' }}>
          <CTA disabled={disabled}>
            <span>{children}</span>
            {disabled ? (
              <Badge>&#40;Coming Soon&#41;</Badge>
            ) : (
              " "
            )}
            <ArrowRight style={{width:"20px"}} />
          </CTA>
        </a>
      </CTAContainer>
  );
};

export default LandingCTA;
