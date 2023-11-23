import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import {Layout} from "antd";
import {alerts} from "@/utils/alerts";
import {t, Trans} from "@lingui/macro";
import {GetStaticPaths, GetStaticProps} from "next";
import {loadCatalog} from "@/utils/i18n";
import Image from "next/image";
import {PAGE_DESCRIPTION, PAGE_TITLE, path} from "@/routes";
import {MAIN_APP_URL} from "@/config/config";
import Generator from "@/components/Generator";
import { getRouterData } from "@/services/libtools";
import { generateBookTitle } from "@/services/toolsApi";


export const getStaticProps: GetStaticProps = async (ctx) => {
    const translation = await loadCatalog(ctx.locale!);
    return {
        props: {
            translation,
            description: PAGE_DESCRIPTION[path.sourceTool],
            canonicalUrl: `${MAIN_APP_URL}${path.sourceTool}`,
            title: PAGE_TITLE[path.sourceTool],
            imageUrl: "/6201447e-3545-4eb4-334d-cadf31496100/public"
        },
    };
};

const BookTitleGeneratorSub = ()=>{
  const [generatedContent,setGeneratedContent]= useState("");
  const [isLoading,setIsLoading]= useState(false);
  const [previousData,setPreviousData]= useState(null); //data from previos page/ null if empty
 
  const genBookTitle = async(text:any,parameters:any)=>{
    if(text==null){
        alerts.error(
            t`Warning`,
            "Please enter some text",
            2000
          ); 
        return null;
    }
    if(parameters.length<2){
        alerts.error(
            t`Warning`,
            "Please select genre and mood",
            2000
          ); 
        return null;
    }
    const newParam:any = {
        "GENRE":parameters[0],
        "TARGET_AUDIENCE":parameters[1],
        "MOOD/TONE":parameters[2],
    }
    
    setGeneratedContent("");
    let dynamicContent = ""
    setIsLoading(true);
  const st = await generateBookTitle (text,newParam);
  const reader = st.body!.getReader();
  setIsLoading(false);
  while (true) {

const { value, done } = await reader.read();

if (done) {
  break;
} else {
const textDecoder = new TextDecoder('utf-8'); // Assuming utf-8 encoding
const text = textDecoder.decode(value);
const nwText = dynamicContent + text;
setGeneratedContent(nwText);
//console.log(text);
}
  }
  }
  useEffect(()=>{
    getRouterData().then((data:any)=>{
        if(data!=null){
            const texts = data.texts;
            const options = data.items;
            //execute direct api function here
            genBookTitle(texts[0],options).catch((e:any)=>{console.log(e)});
            setPreviousData(data);
        }
        
    })
    console.log("previous",previousData);
},[setPreviousData,previousData])



    const options:any = [
        {name:"Select Genre",data:[
            {label:"Music",key:"muz",  onClick:(key:any)=>{}},
            {label:"Music2",key:"muz1",onClick:(key:any)=>{}},
            {label:"Music3",key:"muz3",onClick:(key:any)=>{}},
        ]},
        {name:"Select Target Audience ",data:[
            {label:"Music",key:"muz",  onClick:(key:any)=>{}},
            {label:"Music2",key:"muz1",onClick:(key:any)=>{}},
            {label:"Music3",key:"muz3",onClick:(key:any)=>{}},
        ]}
        ,
        {name:"Mood/Tone",data:[
            {label:"Music",key:"muz",  onClick:(key:any)=>{}},
            {label:"Music2",key:"muz1",onClick:(key:any)=>{}},
            {label:"Music3",key:"muz3",onClick:(key:any)=>{}},
        ]}
        
    ];
    const textfields:any=[
        {placeholder:t`Input some line here to begin`,height:"90px"},
    ];

return(<div>
<Generator
 title={t`AI Book Title Generator`} 
 description={t`fill`}
 fields={textfields}
 buttonText={"Generate Book"}
 generationTitle={"Generated Book"}
 content={generatedContent}
 isLoading={isLoading}
 buttonFunction={(text:any,items:any)=>{
     console.log(text,items);

     genBookTitle(text[0],items).catch((e:any)=>{
        setIsLoading(false);
        alerts.error(
            t`Warning`,
            "An error has occured",
            2000
          ); 
    });
 }}
 selectOptions={options} 
/>
</div>)
}

export default BookTitleGeneratorSub;