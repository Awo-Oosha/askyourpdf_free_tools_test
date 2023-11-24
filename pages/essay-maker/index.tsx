import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import LyricsGen from "@/img/AI-essay-maker.png";
import {alerts} from "@/utils/alerts";
import {t, Trans} from "@lingui/macro";
import {GetStaticPaths, GetStaticProps} from "next";
import {loadCatalog} from "@/utils/i18n";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import {useMedia} from "react-use";
import HeroImage from "@/img/Mask.svg?url";
import {PAGE_DESCRIPTION, PAGE_TITLE, path} from "@/routes";
import {FAQDATA, MAIN_APP_URL} from "@/config/config";
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
    {name:" Select Type",data:[
        {label:"Argumentative",key:"Argumentative",  onClick:(key:any)=>{}},
        {label:"Descriptive",key:"Descriptive",onClick:(key:any)=>{}},
        {label:"Narrative",key:"Narrative",onClick:(key:any)=>{}},
        {label:"Expository",key:"Expository",onClick:(key:any)=>{}},
    ]},
    {name:"No of Paragraphs",data:[
        {label:"1",key:"1",  onClick:(key:any)=>{}},
        {label:"2",key:"2",onClick:(key:any)=>{}},
        {label:"3",key:"3",onClick:(key:any)=>{}},
    ]}
   
];
const EssayMaker = () => {
    const router = useRouter();
   
    const textfields:any=[
        {placeholder:t`Input Title or Topic`,height:"70px"},
        {placeholder:t`input Thesis Statement  `,height:"70px"},
        {placeholder:t`input Key Points to Cover `,height:"70px"},
        
    ];

    const faqs= FAQDATA;
    return (<div>
        <Navbar/>
        <Hero 
        image={LyricsGen} 
        title={t`AI Essay Maker`} 
        description={t`Fill`}
        fields={textfields }
        buttonText={"Generate Essay"}
        buttonFunction={(text:any,items:any)=>{
            if(text[0]==''  || text[0]==null){
                alerts.error(
                    t`Warning`,
                    "Please enter some text",
                    2000
                  ); 
                return null;
            }
            if(items.length<2){
                alerts.error(
                    t`Warning`,
                    "Please select type and paragraphs",
                    2000
                  ); 
                return null;
            }
            routerData(text,items,"./essay-maker/generate");
        }}
        selectOptions={options} 
        />

        
        <FAQ data={faqs}/>
        <Footer/>

    </div>);
 
};

export default EssayMaker;