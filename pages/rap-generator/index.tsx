import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import LyricsGen from "@/img/AI-Rap-Generator.png";
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
    
        {name:"Select Style",data:[
            {label:"Old School",key:"Old School",  onClick:(key:any)=>{}},
            {label:"Trap",key:"Trap",onClick:(key:any)=>{}},
            {label:"Gangsta",key:"Gangsta",onClick:(key:any)=>{}},
        ]},
        {name:"Select Best Tempo",data:[
            {label:"Fast",key:"Fast",  onClick:(key:any)=>{}},
            {label:"Medium",key:"Medium",onClick:(key:any)=>{}},
            {label:"Slow",key:"Slow",onClick:(key:any)=>{}},
        ]}
        ,
        {name:"Select Complexity",data:[
            {label:"Simplicity of Words",key:"Simplicity of Words",  onClick:(key:any)=>{}},
            {label:"Complex Vocabulary",key:"Complex Vocabulary",onClick:(key:any)=>{}},
           
        ]}
    
];
const RapGenerator = () => {
    const router = useRouter();
 
    const textfields:any=[
        {placeholder:t`Input some line here to begin`,height:"90px"},
    ];
    const faqs=FAQDATA;
    return (<div>
        <Navbar/>
        <Hero 
        image={LyricsGen} 
        title={t`AI Rap Generator`} 
        description={t`Rap Generator`}
        fields={textfields}
        buttonText={"Generate Rap"}
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
                    "Please select style, tempo and complexity",
                    2000
                  ); 
                return null;
            }
            routerData(text,items,"./rap-generator/generate");
        }}
        selectOptions={options} 
        />
        <FAQ data={faqs}/>
        <Footer/>

    </div>);
 
};

export default RapGenerator;