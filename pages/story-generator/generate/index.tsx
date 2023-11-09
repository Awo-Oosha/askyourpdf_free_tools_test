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

const StoryGeneratorSub = ()=>{
  const [generatedContent,setGeneratedContent]= useState("");
  const [isLoading,setIsLoading]= useState(false);
  const [previousData,setPreviousData]= useState(null); //data from previos page/ null if empty
  useEffect(()=>{
    getRouterData().then((data:any)=>{
        if(data!=null){
            const texts = data.texts;
            const options = data.items;
            //execute direct api function here
            setPreviousData(data);
        }
        
    })
    console.log("previous",previousData);
  },[setPreviousData,previousData])
    const options:any = [
        {name:" Genre",data:[
            {label:"Story",key:"str",  onClick:(key:any)=>{}},
            {label:"Story2",key:"str2",onClick:(key:any)=>{}},
            {label:"Story3",key:"str3",onClick:(key:any)=>{}},
        ]},
        {name:"Length",data:[
            {label:"Story",key:"str",  onClick:(key:any)=>{}},
            {label:"Story2",key:"str2",onClick:(key:any)=>{}},
            {label:"Story3",key:"str3",onClick:(key:any)=>{}},
        ]}
        ,
        {name:" Settings",data:[
            {label:"Story",key:"str",  onClick:(key:any)=>{}},
            {label:"Story2",key:"str2",onClick:(key:any)=>{}},
            {label:"Story3",key:"str3",onClick:(key:any)=>{}},
        ]}
    ];
    const textfields:any=[
        {placeholder:t`Input Names and a brief description of the main characters`,height:"70px"},
        {placeholder:t`input Key events/plot points `,height:"70px"},
    ];
return(<div>
<Generator
   title={t`AI Story Generator`} 
   description={t`Fill`}
   fields={textfields }
   buttonText={"Generate Story"}
 generationTitle={"Generated Story"}
 content={generatedContent}
 isLoading={isLoading}
 buttonFunction={(text:any,items:any)=>{
     console.log(text,items);
 }}
 selectOptions={options} 
/>
</div>)
}

export default StoryGeneratorSub;