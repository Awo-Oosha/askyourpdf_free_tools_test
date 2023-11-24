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
import { generateRap} from "@/services/toolsApi";
import dynamic from "next/dynamic";
import FullLoader from "@/components/tools/FullLoader";
import {options} from "../index";
import { useRouter } from "next/router";


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

const RapGeneratorSub = ()=>{
  const router = useRouter();
  const [generatedContent,setGeneratedContent]= useState("");
  const [isLoading,setIsLoading]= useState(false);
  const [previousData,setPreviousData]= useState(null); //data from previos page/ null if empty
  const genRap = async(text:any,parameters:any)=>{
    if(text==null){
        alerts.error(
            t`Warning`,
            "Please enter some text",
            2000
          ); 
        return null;
    }
    if(parameters.length<3){
        alerts.error(
            t`Warning`,
            "Please select the style , best tempo and the complexity",
            2000
          ); 
        return null;
    }
    const newParam:any = {
        "STYLE":parameters[0],
        "BEST_TEMPO":parameters[1],
        "COMPLEXITY":parameters[2],
        
    }
    
    setGeneratedContent("");
    let dynamicContent = ""
    setIsLoading(true);
  const st = await generateRap (text,newParam,router.locale);
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
            genRap(texts[0],options).catch((e:any)=>{console.log(e)});
            setPreviousData(data);
        }
        
    })
    console.log("previous",previousData);
},[setPreviousData,previousData])
   
    const textfields:any=[
        {placeholder:t`Topic/Theme`,height:"90px"},
    ];

return(<div>
<Generator
  title={t`AI Rap Generator`} 
  description={t`Rap Generator`}
  fields={textfields}
  buttonText={"Generate Rap"}
 generationTitle={"Generated Rap"}
 content={generatedContent}
 isLoading={isLoading}
 buttonFunction={(text:any,items:any)=>{
     console.log(text,items);
 
     genRap(text[0],items).catch((e:any)=>{
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

export default RapGeneratorSub;