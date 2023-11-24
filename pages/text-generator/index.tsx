import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import LyricsGen from "@/img/Ai-Text-Generator.png";
import {alerts} from "@/utils/alerts";
import {t, Trans} from "@lingui/macro";
import {GetStaticPaths, GetStaticProps} from "next";
import {loadCatalog} from "@/utils/i18n";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import {PAGE_DESCRIPTION, PAGE_TITLE, path} from "@/routes";
import {FAQDATA, MAIN_APP_URL} from "@/config/config";
import {Filter, getSourceInformation, getSources} from "@/services/tools";
import {useRouter} from "next/router";
import {routerData } from "@/services/libtools";
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

export const options:any = [
    {name:"Select Purpose ",data:[
        {label:"General Content",key:"General Content",  onClick:(key:any)=>{}},
        {label:"Marketing",key:"Marketing",onClick:(key:any)=>{}},
        {label:"Educatonal",key:"Educational",onClick:(key:any)=>{}},
        {label:"Fictional",key:"Fictional",onClick:(key:any)=>{}},
    ]},
    {name:"Select Tone ",data:[
        {label:"Professional",key:"Professional",  onClick:(key:any)=>{}},
        {label:"Casual",key:"Casual",onClick:(key:any)=>{}},
        {label:"Technical",key:"Technical",onClick:(key:any)=>{}},
    ]}
    ,
    {name:"Select Length",data:[
        {label:"Word Limit",key:"Word Limit",  onClick:(key:any)=>{}},
        {label:"Character Limit",key:"Character Limit",onClick:(key:any)=>{}},
        
    ]}
];
const TextGenerator = () => {
    const router = useRouter();
   
    const textfields:any=[
        {placeholder:t`Input some line here to begin`,height:"90px"},
    ];
   
    const faqs= FAQDATA;
    return (<div>
        <Navbar/>
        <Hero 
        image={LyricsGen} 
        title={t`AI Text Generator`} 
        description={t`Text Generator`}
        fields={textfields}
        buttonText={"Generate Text"}
        buttonFunction={(text:any,items:any)=>{
            if(text[0]=='' || text[0]==null){
                alerts.error(
                    t`Warning`,
                    "Please enter some text",
                    2000
                  ); 
                return null;
            }
            if(items.length<3){
                alerts.error(
                    t`Warning`,
                    "Please select purpose, tone and length",
                    2000
                  ); 
                return null;
            }
            routerData(text,items,"./text-generator/generate");
        }}
        selectOptions={options} 
        />
        <FAQ data={faqs}/>
        <Footer/>

    </div>);
 
};

export default TextGenerator;