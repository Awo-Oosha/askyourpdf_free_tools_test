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
import { MinusCircle,PlusCircle } from "@phosphor-icons/react/dist/ssr";
import type {MenuProps} from 'antd';
import {Dropdown} from 'antd';
import exp from "constants";

const Body = styled.div`
width:100%;
padding:100px;
box-sizing:border-box;
@media screen and (max-width:900px){
    padding: 25px;
  }
`;
const Title = styled.div`
color: var(--primary-900, #2F2B43);
text-align: center;
font-family: var(--font-satoshi);;
font-size: 48px;
font-style: normal;
font-weight: 700;
letter-spacing: -0.96px;
text-align:center;
@media screen and (max-width:900px){
    font-size: 32px;
    text-align:left;
  }
`;
const SubTitle = styled.div`
color: var(--alpha-black-60, rgba(47, 43, 67, 0.60));
text-align: center;
font-family: var(--font-satoshi);;
font-size: 16px;
font-style: normal;
font-weight: 400;
letter-spacing: -0.192px;
@media screen and (max-width:900px){
    font-size: 15px;
    text-align:left;
  }
`;
const FAQBody = styled.div`
max-width:900px;
margin:auto;
width:100%;
display:flex;
justify-content:space-between;
margin-top:50px;
flex-wrap:wrap;
box-sizing:border-box;
@media screen and (max-width:900px){
    display:block;
  }
`;
const FAQItem = styled.label`
width:45%;
border-bottom:1px solid #E4E7EC;;
padding:15px 0;
input{
    display:none;
}

.question{
    display:flex;
    justify-content:space-between;
    align-items:center;
    width:100%;
    
    span{
     color: var(--gray-900, #101828);
    font-family: var(--font-satoshi);;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 28px; /* 175% */
    }
    div svg{
        color:grey;
    }
    div svg:first-child{
        display:none;
    }
    }

.answer{
display:none;
color: var(--gray-500, #667085);
font-family: var(--font-satoshi);;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 24px; /* 171.429% */
}

input:checked + div + div{
    display:block !important;
}
input:checked + div svg:first-child{
    display:block !important;
}
input:checked + div svg:last-child{
    display:none !important;
}
@media screen and (max-width:900px){
    display:block;
    width:100%;
  }
`;


const FAQ =({data}:{
    data:any
})=>{
    const FAQS = () => {
        let faqs:any = [];
        data.forEach((element:any,index:any) => {
            faqs.push(<FAQItem key={index} >
                <input type="checkbox" />
                <div className="question"><span>{element.question}</span> <div><MinusCircle style={{height:"20px"}}/><PlusCircle style={{height:"20px"}} /></div></div>
                <div className="answer">{element.answer}</div>
            </FAQItem>)
        });
        return(
        <FAQBody>
        {faqs}
        </FAQBody>)

    }
    return(
<Body>
    <Title>Frequently Asked Questions</Title>
    <SubTitle>Need help? Look through our FAQs for quick answers!</SubTitle>
    <FAQS/>
</Body>
    )
}

export default FAQ;