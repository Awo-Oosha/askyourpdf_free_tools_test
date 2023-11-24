import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import {Layout} from "antd";
import {alerts} from "@/utils/alerts";
import {t, Trans} from "@lingui/macro";
import {GetStaticPaths, GetStaticProps} from "next";
import {loadCatalog} from "@/utils/i18n";
import Image from "next/image";
import {PAGE_DESCRIPTION, PAGE_TITLE, path} from "@/routes";
import {MAIN_APP_URL} from "@/config/config";
import { getRouterData } from "@/services/libtools";
import { generatePoem} from "@/services/toolsApi";
import dynamic from "next/dynamic";
import FullLoader from "@/components/tools/FullLoader";

const Generator = dynamic(() => import('@/components/Generator'), {
  ssr: false,
  loading:()=>{
    return (<FullLoader/>);
  }
}); 



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

const PoemGeneratorSub = ()=>{
  const [generatedContent,setGeneratedContent]= useState("");
  const [isLoading,setIsLoading]= useState(false);
  const [previousData,setPreviousData]= useState(null); //data from previos page/ null if empty
  const genPoem = async(text:any,parameters:any)=>{
    if(text==null){
        alerts.error(
            t`Warning`,
            "Please enter some text",
            2000
          ); 
        return null;
    }
    if(parameters.length<4){
        alerts.error(
            t`Warning`,
            "Please select the style,mood,themes and length",
            2000
          ); 
        return null;
    }
    const newParam:any = {
        "STYLE":parameters[0],
        "MOOD":parameters[1],
        "THEMES":parameters[2],
        "LENGTH":parameters[3],
    }
    
    setGeneratedContent("");
    let dynamicContent = ""
    setIsLoading(true);
  const st = await generatePoem (text,newParam);
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
            genPoem(texts[0],options).catch((e:any)=>{console.log(e)});
            setPreviousData(data);
        }
        
    })
    console.log("previous",previousData);
},[setPreviousData,previousData])
    
    const options:any = [
        {name:"Select Style",data:[
            {label:"Sonnet",key:"muz",  onClick:(key:any)=>{}},
            {label:"Haiku",key:"muz1",onClick:(key:any)=>{}},
            {label:"Limerick",key:"muz3",onClick:(key:any)=>{}},
            {label:"Free Verse",key:"muz4",onClick:(key:any)=>{}},
        ]},
        {name:"Select Mood",data:[
            {label:"Romantic",key:"muz",  onClick:(key:any)=>{}},
            {label:"Melancholic",key:"muz1",onClick:(key:any)=>{}},
            {label:"Joyful",key:"muz3",onClick:(key:any)=>{}},
        ]}
        ,
        {name:"Select Themes",data:[
            {label:"Nature",key:"muz",  onClick:(key:any)=>{}},
            {label:"Love",key:"muz1",onClick:(key:any)=>{}},
            {label:"Death",key:"muz3",onClick:(key:any)=>{}},
            {label:"Time",key:"muz4",onClick:(key:any)=>{}},
        ]}
        ,
        {name:"Rhyming Scheme",data:[
            {label:"ABAB",key:"muz",  onClick:(key:any)=>{}},
            {label:"AABB",key:"muz1",onClick:(key:any)=>{}},
           
        ]}

        ,
        {name:"Length",data:[
            {label:"1",key:"muz",  onClick:(key:any)=>{}},
            {label:"2",key:"muz1",onClick:(key:any)=>{}},
            {label:"3",key:"muz3",onClick:(key:any)=>{}},
        ]}
    ];
    const textfields:any=[
        {placeholder:t`Input some line here to begin`,height:"90px"},
    ];

return(<div>
<Generator
 title={t`AI Poem Generator`} 
 description={t`fill`}
 fields={textfields}
 buttonText={"Generate Poem"}
 generationTitle={"Generated Poem"}
 content={generatedContent}
 isLoading={isLoading}
 buttonFunction={(text:any,items:any)=>{
     console.log(text,items);

     genPoem(text[0],items).catch((e:any)=>{
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

export default PoemGeneratorSub;