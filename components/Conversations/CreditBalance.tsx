import React, {useState} from 'react'
import styled from 'styled-components';
import Image from 'next/image';
import Coin from '@/img/coins.svg?url'
import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/router';
import {path} from "@/routes";
import { Trans } from '@lingui/macro';
import { CaretDoubleRight, CaretDoubleLeft } from '@phosphor-icons/react';

const Wrapper = styled.div`
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  background: #000;
  padding: 4px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  position: fixed;
  top: 15%;
  right: 0;
  min-width: 170px;
  transform: translateX(80%);
  transition: all 0.3s ease;

  &.active {
    flex-direction: row;
    transform: translateX(0);
  }

  @media (min-width: 1220px) {
    position: static;
    width: 100%;
    align-items: center;
    transform: none;
    justify-content: center;
    border-radius: 15px;

  }
`;

const BalanceWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 1220px) {
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
`
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Amount = styled.div`
  color: #FFF;
  text-align: center;
  font-family: var(--font-satoshi);
  font-size: 10.927px;
  font-style: normal;
  font-weight: 900;
  line-height: 16.39px;
  letter-spacing: -0.109px;
  padding: 5.463px 10.927px;

`;

const BuyMore = styled.div`
  padding: 5.463px 10.927px;
  border-radius: 15px;
  background: #FFF;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.08);
  color: #000;
  text-align: center;
  font-family: var(--font-satoshi);
  font-size: 10.927px;
  font-style: normal;
  font-weight: 700;
  line-height: 16.39px;
  letter-spacing: -0.109px;
  cursor: pointer;
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 10px;
  cursor: pointer;

  &.active {
    padding-right: 10px;
  }

  @media (min-width: 1220px) {
    display: none;
  }
`;

const CreditBalance = () => {
  const [coinAmount, setCoinAmount] = useState<number | null>(500);
  const {userAnalytics} = useAuth();
  const [clicked, setClicked] = useState<boolean>(false);

  const router = useRouter();
  

  const handleClick = () => {
    if (!clicked) {
      setClicked(true);
    } else {
      setClicked(false)
    }
  };

  return (
    <Wrapper className={clicked ? 'active' : ""}>
      <BalanceWrapper >
        <AmountContainer>
          <Amount> {userAnalytics ? userAnalytics.number_units : "-"} </Amount>
          <Image src={Coin} alt='' width={17} height={17} style={{margin : "0 5px"}}/>
        </AmountContainer>

        <BuyMore onClick={() => {
          router.push(`${path.settings}#credits`);
        }}>
          <Trans>Buy More Credit</Trans>
        </BuyMore>
      </BalanceWrapper>

      <Icon className={clicked ? 'active' : " "} onClick={handleClick}>
        {!clicked ? <CaretDoubleLeft color='#EDB01A' weight='bold' size={15} /> : <CaretDoubleRight color='#EDB01A' weight='bold' size={15} />}
      </Icon>
    </Wrapper>
  )
}

export default CreditBalance