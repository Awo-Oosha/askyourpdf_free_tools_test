import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {alerts} from "@/utils/alerts";
import {t, Trans} from "@lingui/macro";
import {GetStaticPaths, GetStaticProps} from "next";
import {loadCatalog} from "@/utils/i18n";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import AppSidebar from "@/components/AppSidebar";
import MobileHeader from "@/components/MobileHeader";
import type {MenuProps} from 'antd';
import {Dropdown} from 'antd';
import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import CopyIcon from "@/img/CopyIcon.svg?url";
import Export from "@/img/Export-r.svg?url";
import CopyToClipboard from "react-copy-to-clipboard";
import { covertToItalics, getCurrentTimestamp, removeMarkdown } from "@/utils/utils";
import Spinner from "./Spinner";
import { usePDF } from "@react-pdf/renderer";
import { ToolsPDFExport } from "./ToolsPDFExport";
import ReactGA from "react-ga4";

const Body = styled.div`
width:100%;
min-height:100%;
padding:50px;
box-sizing:border-box;
@media screen and (max-width:900px){
    padding-left:0px;
    padding:20px;
}
`;
const Title = styled.div`
color: var(--gray-900, #101828);
font-family: var(--font-satoshi);;
font-size: 40px;
font-style: normal;
font-weight: 700;
margin-bottom:6px;
@media screen and (max-width:900px){
    font-size: 32px;
}
`;

const SubTitle = styled.div`
color: #000;
font-family: var(--font-satoshi);;
font-size: 13px;
font-style: normal;
font-weight: 400;
line-height: 20px; /* 153.846% */
color: var(--gray-900, #101828);
border-radius: 8px;
border: 1px solid #D0D5DD;
padding: 8px 16px;
align-items: flex-start;
gap: 12px;
`;
const TextArea = styled.textarea`
padding:15px;
height:90px;
width:100%;
box-sizing:border-box;
border-radius: 10px;
border: 1.902px solid #E8ECEF;
background: var(--theme-dark-icons-primary, #FFF);
color:black;
margin-top:20px;
@media screen and (max-width:900px){
  width:100%;
}
`;
const OptionsButtonBody = styled.div`
display:block;
margin-top:20px;
box-sizing:border-box;
width:100%;
@media screen and (max-width:900px){
  width:100%;
  display:block;
}
`;
const OptionsButton = styled.div`
border-radius: 8px;
border: 2px solid #D0D5DD;
box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
color: black;
font-family: var(--font-satoshi);;
font-size: 16px;
font-weight:400;
font-style: normal;
padding:10px;
width:100%;
display:flex;
box-sizing:border-box;
justify-content:space-between;
margin-bottom:20px;
@media screen and (max-width:900px){
  width:100%;
  margin-bottom:13px;
}
`;
const TextFieldBody =styled.div`
width:100%;
`;
const Divider = styled.div`
width:100%;
display:flex;
margin-top:20px;
justify-content:space-between;
box-sizing:border-box;
@media screen and (max-width:900px){
    display:block;
}
`;
const DividerFirst = styled.div`
width:30%;
border-radius: 20px;
border: 1px solid var(--gray-200, #E4E7EC);
background: var(--theme-dark-icons-primary, #FFF);
box-sizing:border-box;
padding:20px;
@media screen and (max-width:900px){
    width:100%;
}
`;
const DividerLast = styled.div`
width:calc(70% - 50px);
border-radius: 20px;
box-sizing:border-box;
border: 1px solid var(--gray-200, #E4E7EC);
background: var(--theme-dark-icons-primary, #FFF);
@media screen and (max-width:900px){
    width:100%;
    margin-top:15px;
}
`;
const GenTitle = styled.div`
color: #000;
font-family: var(--font-satoshi);;
font-size: 14px;
font-style: normal;
font-weight: 400;
border-bottom:1px solid #E4E7EC;
padding:14px;
display:flex;
justify-content:space-between;
align-items:center;

`;
const LabelTitle = styled.div`
color: #000;
font-family: var(--font-satoshi);;
font-size: 16px;
font-style: normal;
font-weight: 400;
margin-bottom:4px;
`;
const GenButton = styled.button`
border-radius: 8px;
background: #000;
display: flex;
width: 336px;
height: 56px;
padding: 10px 16px;
justify-content: center;
align-items: center;
gap: 11px;
flex-shrink: 0;
border:0;
color:white;
font-family:var(--font-satoshi);;
width:100%;
font-style: normal;
font-weight: 700;
`;
const MarkDownView = styled.div`
width:100%;
padding:14px;
font-family:var(--font-satoshi);;
box-sizing:border-box;
white-space: pre-wrap;

`;
const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;

  .copyAndExport {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    button {
      background: none;
      border: 0;
    }

    .copy {
      cursor: pointer;
      margin-right: 10px;
    }
    .export {
      cursor: pointer;
      border-radius: 6px;
      border: 1px solid #616d7f;
      padding: 8px 14px;

      color: #616d7f;
      text-align: center;
      font-family: var(--font-satoshi);
      font-size: 12px;
      font-style: normal;
      font-weight: 400;

      img {
        vertical-align: middle;
      }
    }
  }
`;
const SpinContainer =  styled.div`
width:100%;
padding:30px;
display:flex;
justify-content:center;
box-sizing:border-box;

`;
const Generator = ({title,description,fields,buttonText,buttonFunction,selectOptions,generationTitle,content,isLoading}:{
    title:String,
    description:String,
    fields:any,
    buttonText:String,
    buttonFunction:any,
    selectOptions:any,
    generationTitle:any,
    content:any,
    isLoading:boolean
  
  })=>{

    const [instance, updateInstance] = usePDF({
      document: ToolsPDFExport(
        covertToItalics(removeMarkdown(content)),
        `${title}`
      ),
    });
    useEffect(() => {
      updateInstance(
        ToolsPDFExport(
          covertToItalics(removeMarkdown(content)),
          `${title}`
        )
      );
    }, [content,title,updateInstance]);
    const exportPDF = () => {
      if (!instance.url) {
        alerts.error(t`An error occurred`, t`Failed to export PDF`);
        return;
      }
  
      const currentTimestamp = getCurrentTimestamp();
      let filename = `ai_generator_${currentTimestamp}.pdf`;
      
      const link = document.createElement("a");
      link.href = instance.url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      ReactGA.event({
        category: "Button",
        action: "Click",
        label: "PDF Exported",
      });
      link.click();
    };
    const [textData,setTextData] = useState([]);
    const [selectedItem, setSelectedItem] = useState([]);
    function handleTextAreaChange(event:any,index:number) {
      const newTextData:any = [...textData];
    newTextData[index] = event.target.value;
    setTextData(newTextData);
    }
  
    const OptionsList = ()=>{
   
      let btns:any = [];
      selectOptions.forEach((element:any,index:number)=> {
    
        const items: MenuProps['items'] = element.data;
        const onClick: MenuProps['onClick'] = ({key})=>{
          const ns:any = [...selectedItem];
          ns[index]=key;
          setSelectedItem(ns);
        };
  
       btns.push(
        <div key={element.name}>
        <LabelTitle>{element.name}</LabelTitle>
        <Dropdown menu={{items, onClick}} >
       <OptionsButton>{selectedItem[index]===undefined?element.name:selectedItem[index]}<CaretDown style={{height:"20px"}} /></OptionsButton>
       </Dropdown>
       </div>
       );    
      })
  
      
      return(
        <OptionsButtonBody>{btns}</OptionsButtonBody>
      )
    }

return(<div>
<MobileHeader/>
<Body>
<Title>{title}</Title>
<SubTitle>{description}</SubTitle>
<Divider>
    <DividerFirst>
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
        <GenButton onClick={()=>{
            buttonFunction(textData,selectedItem);
        }} >{buttonText}</GenButton>
    </DividerFirst>
    <DividerLast>
        <GenTitle><span>{generationTitle}</span><ContentHeader>
        {
          content!=""?(<>
          <div className="copyAndExport">
                  <CopyToClipboard
                      text={removeMarkdown(content)}
                      onCopy={() => {
                        alerts.success(t`Copied`, t`Copied`);
                      }}
                  >
                    <button className="copy">
                      <Image src={CopyIcon} alt="" />
                    </button>
                  </CopyToClipboard>
                  <button
                      className="export"
                      onClick={() => {
                        exportPDF();
                      }}
                  >
                    PDF <Image src={Export} alt="" />
                  </button>
                </div>
          </>):(<></>)
        }
            </ContentHeader></GenTitle>
        <div>
        {
         isLoading ? <SpinContainer><Spinner style={{width:"40px"}} /></SpinContainer> : null
        }
        <MarkDownView>
            {content}
            </MarkDownView>
        </div>
    </DividerLast>
</Divider>
</Body>

</div>)
}

export default Generator;