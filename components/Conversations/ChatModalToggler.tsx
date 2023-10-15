import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import Sparkle from "@/img/Sparkle.svg?url";
import SparkleGold from "@/img/SparkleGold.svg?url";
import Flash from "@/img/Flash.svg?url";
import FlashGold from "@/img/FlashGold.svg?url";
import { ModelName } from "@/types/conversations";
import { useConversations } from "@/providers/ConversationsProvider";
import { ArrowDown } from "@phosphor-icons/react";
import { modelDisplayNames } from "@/config/config";
import { chat_models } from "@/config/config";

const Wrapper = styled.div`
  display: none;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  background: #f6f6f8;
  padding: 5px 5px;

  @media (min-width: 992px) {
    display: flex;
  }
`;

const Model = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 10.927px;
  gap: 5px;
  background: #f6f6f8;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 90px;

  &.active {
    box-shadow: 0px 0px 4px rgba(1, 0.6, 0, 0.5); // Modified box-shadow
    border-radius: 15px;
    margin: 0 2px;

    div {
      color: #000;
    }
  }
`;

const Text = styled.div`
  color: #8a91a8;
  text-align: center;
  font-family: var(--font-satoshi);
  font-size: 10.927px;
  font-style: normal;
  font-weight: 700;
  line-height: 16.39px;
  letter-spacing: -0.109px;
`;

const MobileWrapper = styled.div`
  @media (min-width: 992px) {
    display: none;
  }
`;
const ModelDisplay = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  background: #000;
  height: 35px;
  border-radius: 8.523px;
  padding: 5.682px 11.364px;
  position: relative;

  div {
    color: #FFF;
    text-align: center;
    font-family: var(--font-satoshi);
    font-size: 11.364px;
    font-style: normal;
    font-weight: 700;
    line-height: 17.046px; /* 150%
  }
`;

const MobileModelWrapper = styled.div`
  position: absolute;
  top: 55px;
  min-width: 117px;
  border-radius: 8px;
  border: 1px solid var(--gray-200, #E4E7EC);
  background: #FFF;
  padding: 15px 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  display: none;

  &.active {
    display: block;
  }
`;

const MobileModel = styled(Model)`
  background: #fff;
  gap: 10px;
  align-items: center;
  padding-bottom: 10px;

 &.active {
    box-shadow: none;
    border-radius: 0;
    border-bottom: 1px solid #F2F4F7;

    div {
      color: #000;
    }
  }

  div {
    color: #000;
    font-family: var(--font-satoshi);
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.32px;
  }
`

const ChatModalToggler = () => {
  const { activeModel, setActiveModel } = useConversations();

  const handleChatModalSelect = (modelName: ModelName) => {
    setActiveModel(modelName);
  };

  const [clicked, setClicked] = useState<boolean>(false)

  const handleClick = () => {
    if(clicked !== false) {
      setClicked(false)
    } else {
      setClicked(true)
    }
  }

  return (
    <>
      <Wrapper>
       {chat_models.map(model => (
        <Model 
        key={model.name}
        onClick={() => handleChatModalSelect(model.name)}
        className={activeModel === model.name ? "active" : ""}
        >
          <Image
            src={activeModel === model.name ? model.activeImage : model.image}
            alt=""
            width={17}
            height={17}
          />
          <Text>{model.text}</Text>
        </Model>
       ))}
      </Wrapper>

      <MobileWrapper>
        <ModelDisplay onClick={handleClick}>
          <Image
            src={activeModel === ModelName.GPT3 || ModelName.CLAUDE1 ? SparkleGold : FlashGold}
            alt=""
            width={20}
            height={20}
          />

          <div>
            {modelDisplayNames[activeModel as ModelName] || ""}
          </div>

          <ArrowDown size={15} weight='bold' color="#fff"/>
        </ModelDisplay>

        <MobileModelWrapper className={clicked ? 'active' : ''}>
          {chat_models.map(model => (
            <MobileModel
              key={model.name}
              onClick={() => handleChatModalSelect(model.name)}
              className={activeModel === model.name ? "active" : ""}
            >
              <Image
                src={activeModel === model.name ? model.activeImage : model.image}
                alt=""
                width={17}
                height={17}
              />
              <Text>{model.text}</Text>
            </MobileModel>
          ))}
        </MobileModelWrapper>

      </MobileWrapper>
    </>
  );
};

export default ChatModalToggler;
