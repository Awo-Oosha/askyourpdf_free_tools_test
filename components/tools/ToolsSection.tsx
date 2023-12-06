import React from "react";
import { styled } from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { FreeToolsData } from "@/utils/free_tools";
import ToolCard from "./ToolCard";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

const Wrapper = styled.div`
  width: 100%;
  background: #F9F9FA;
`;

const ToolListContainer = styled.section`
  border-radius: 18px;
  border: 1px solid rgba(47, 43, 67, 0.10);
  background: #ffffff;
  margin-left: 10px;
  margin-right: 10px;
  padding: 15px;
  display: block;
  
  div {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    gap: 16px;
  }

  @media(min-width: 992px) {
    margin-left: 45px;
    margin-right: 45px;
    padding: 35px;
  }
`;

const ButtomCard = styled.div`
  width: 100%;
  margin-top: 19px;
  
  div {
    border: 2px solid red;
    border-radius: 36px;
    border: 1px solid rgba(47, 43, 67, 0.10);
    padding: 15px 25px;
    display: flex;
    flex-direction: row;
    align-items: center;
    transition: all 0.3s ease;
    
    &:hover {
      gap: 19px;
    }
    
    a {
      color: #000000;
      font-family: var(--font-satoshi);
      font-size: 18px;
      font-style: normal;
      font-weight: 500;
      line-height: 32px;
      letter-spacing: -0.288px;
      text-decoration: none;
    }
  }
  
  @media (min-width: 992px) {
    width: 70vw;
  }
`;


const ToolsSection = () => {
  return (
    <Wrapper>
      <ToolListContainer>
        <div>
          {FreeToolsData.map((item, key) => (
            <ToolCard
              key={key}
              icon={item.icon}
              title={item.title}
              desc={item.desc}
              link={item.link}
            />
          ))}
        </div>


        {/* <div>
          <ButtomCard>
            {FreeToolsData.filter(item => !item.title.message?.startsWith("AI")).map((item, key) => (
              <div key={key}>
                <Link href={item.link}>{item.title.message}</Link>
                <ArrowRight size={18}/>
              </div>
            ))}
          </ButtomCard>
        </div> */}
      </ToolListContainer>
    </Wrapper>
  );
};

export default ToolsSection;
