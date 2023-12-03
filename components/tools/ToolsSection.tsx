import React from "react";
import { styled } from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { FreeToolsData } from "@/utils/free_tools";
import ToolCard from "./ToolCard";



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
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  gap: 16px;

  @media(min-width: 992px) {
    margin-left: 45px;
    margin-right: 45px;
    padding: 35px;
  }
`;



const ToolsSection = () => {
  return (
    <Wrapper>
      <ToolListContainer>
        {FreeToolsData.map((item, key) => (
          <ToolCard
            key={key}
            icon={item.icon}
            title={item.title}
            desc={item.desc}
            link={item.link}
          />
        ))}
      </ToolListContainer>
    </Wrapper>
  );
};

export default ToolsSection;
