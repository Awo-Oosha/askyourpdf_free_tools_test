import React, { useState, useRef, TextareaHTMLAttributes, useEffect } from "react";
import { Container } from "@/styles/styles";
import styled from "styled-components";
import HeroImage from "@/img/Hero.webp";
import UploadIcon from "@/img/Upload.svg?url";
import ArrowRightIcon from "@/img/ArrowRight.svg?url";
import { LandingFlexCol } from "@/styles/landing";
import { Trans } from "@lingui/macro";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useMedia } from "react-use";
import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import type {MenuProps} from 'antd';
import {Dropdown} from 'antd';

const HeroContainer = styled.section<{ $backgroundImage?: string }>`
  background-color: #141314;
  background-image: url(${(props) => props.$backgroundImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  padding-block: 150px;
  position: relative;
  overflow: hidden;
  z-index: 1;

  .heroImage {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
  }

  @media (min-width: 576px) {
    padding-block: 250px;
    background-color: #0a0a0a;
  }

  @media (min-width: 1200px) {
    .heroImage {
      animation: animatedHero 7s linear infinite alternate;
    }

    @keyframes animatedHero {
      0% {
        transform: translate(-50%, -50%) scale(0.8);
      }

      50% {
        transform: translate(-50%, -50%) scale(1);
      }

      100% {
        transform: translate(-50%, -50%) scale(0.8);
      }
    }
  }
`;

const HeroText = styled.div`
  h1 {
    margin: 0;
    color: #ffffff;
    font-family: var(--font-eudoxus);
    font-style: normal;
    font-weight: 700;
    font-size: 38px;
    line-height: 48px;
    max-width: 368px;
  }

  h1:nth-of-type(2) {
    margin-bottom: 24px;
  }

  p {
    margin: 0 auto;
    max-width: 588px;
    color: #ffffff;
    font-family: var(--font-satoshi);
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 28px;
  }

  @media (min-width: 390px) {
    h1 {
      font-size: 41px;
    }
  }

  @media (min-width: 576px) {
    text-align: center;

    h1 {
      font-size: 38px;
      line-height: 68px;
      max-width: unset;
    }
  }

  @media (min-width: 992px) {
    h1 {
      font-size: 50px;
    }
  }
`;

const HeroActions = styled.div`
  margin-top: 32px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border: 0;
    box-shadow: 0px 1px 3px rgba(47, 43, 67, 0.1),
      inset 0px -1px 0px rgba(47, 43, 67, 0.1);
    border-radius: 12px;
    padding: 16px 30px;
    background: #edb01a;

    font-family: var(--font-satoshi);
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 24px;
    cursor: pointer;
    color: #000000;
    @media screen and (max-width:900px){
      width:100%;
    }
  }

  button:nth-of-type(2) {
    background: #ffffff;
    border: 1px solid rgba(47, 43, 67, 0.1);
  }

  @media (min-width: 576px) {
    align-items: stretch;
    flex-direction: row;
  }
`;

const TextArea = styled.textarea`
padding:15px;
height:90px;
width:100%;
box-sizing:border-box;
border-radius: 10px;
border: 1.902px solid #E8ECEF;
background: #000;
color:white;
margin-top:20px;
@media screen and (max-width:900px){
  width:100%;
}
`;
const OptionsButtonBody = styled.div`
display:flex;
align:items:center;
justify-content:center;
gap:20px;
margin-top:20px;
box-sizing:border-box;
@media screen and (max-width:900px){
  width:100%;
  display:block;
}
`;
const OptionsButton = styled.div`
border-radius: 8px;
border: 2px solid #EDB01A;
box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
color: #EDB01A;
font-family: Satoshi;
font-size: 16px;
font-weight:400;
font-style: normal;
padding:10px;
width:200px;
display:flex;
box-sizing:border-box;
justify-content:space-between;
@media screen and (max-width:900px){
  width:100%;
  margin-bottom:13px;
}
`;
const TextFieldBody =styled.div`
width:100%;
`;
const Imagex = styled(Image)`
width:70px;
height:70px;
margin-bottom:10px;
@media screen and (max-width:900px){
  width:50px;
  height:50px;
}
`;
export default function Hero({image,title,description,fields,buttonText,buttonFunction,selectOptions}:{
  image:any,
  title:String,
  description:String,
  fields:any,
  buttonText:String,
  buttonFunction:any,
  selectOptions:any

}) {
  const ref = useRef(null);
  const isSmallScreen = useMedia('(min-width: 576px)', false);
  const [textData,setTextData] = useState([]);
  let tempChange:any = [];
  const [selectedItem, setSelectedItem] = useState([]);
  
  const handleTextAreaChange = (event:any, index:number) => {
    const newTextData:any = [...textData];
    newTextData[index] = event.target.value;
    setTextData(newTextData);
  };
 
  const OptionsList = ()=>{
 
    let btns:any = [];
    selectOptions.forEach((element:any,index:number)=> {
  
      const items: MenuProps['items'] = element.data;
      const onClick: MenuProps['onClick'] = ({key})=>{
        const ns:any = [...selectedItem];;
        ns[index]=key;
        setSelectedItem(ns);
      };

     btns.push(
      <Dropdown menu={{items, onClick}} key={element.name}>
     <OptionsButton>{selectedItem[index]===undefined?element.name:selectedItem[index]}<CaretDown style={{height:"20px"}} /></OptionsButton>
     </Dropdown>
     
     );    
    })

    
    return(
      <OptionsButtonBody>{btns}</OptionsButtonBody>
    )
  }
  return (
      <HeroContainer ref={ref}>
          <div className="heroImage">
              {isSmallScreen && (
                  <Image
                      src={HeroImage}
                      alt="Hero"
                      priority={true}
                      sizes="100vw"
                  />
              )}
          </div>
          <Container>
              <LandingFlexCol>
            <Imagex src={image} className="catImage" alt="" />
                  <HeroText>
                      <h1>
                         {title}
                      </h1>
                      <p>
                      {description}
                      </p>
                  </HeroText>
                  <TextFieldBody>
  {fields.map((element: any, index: number) => (
    <TextArea
      key={index}
      value={ textData[index]}
      placeholder={`${element.placeholder}`}
      onChange={(e) => handleTextAreaChange(e, index)}
      style={element.height !== undefined ? { height: element.height } : {}}
    />
  ))}
</TextFieldBody>
                  <OptionsList/>
                  <HeroActions>
                      <button
                          onClick={() => {
                              buttonFunction(textData,selectedItem);
                          }}
                      >
                         
                          {buttonText}
                      </button>
                  </HeroActions>
                 
              </LandingFlexCol>
          </Container>
        
      </HeroContainer>
  );
}
