import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import LyricsGen from "@/img/AI-story-.png";
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
import {FAQDATA,  MAIN_APP_URL} from "@/config/config";
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
   
    {name:"Length",data:[
        {label:"Short story",key:"Short story",  onClick:(key:any)=>{}},
        {label:"Novella",key:"Novella",onClick:(key:any)=>{}},
        {label:"Full length",key:"Full length",onClick:(key:any)=>{}},
    ]}
    ,
    {name:" Settings",data:[
        {label:"Time",key:"Time",  onClick:(key:any)=>{}},
        {label:"Period",key:"Period",onClick:(key:any)=>{}},
        {label:"Location",key:"Location",onClick:(key:any)=>{}},
    ]}
];
const StoryGenerator = () => {
    const router = useRouter();

    const textfields:any=[
        {placeholder:t`Input Names and a brief description of the main characters`,height:"70px"},
       
    ];

    const faqs= FAQDATA;
    return (<div>
        <Navbar/>
        <Hero 
        image={LyricsGen} 
        title={t`AI Story Generator`} 
        description={t`Story Generator`}
        fields={textfields }
        buttonText={"Generate Story"}
        buttonFunction={(text:any,items:any)=>{
            if(text[0]=='' || text[0]==null){
                alerts.error(
                    t`Warning`,
                    "Please enter some text",
                    2000
                  ); 
                return null;
            }
            
            routerData(text,items,"./story-generator/generate");
        }}
        selectOptions={options} 
        />

        
        <FAQ data={faqs}/>
        <Footer/>

    </div>);
 
};

export default StoryGenerator;