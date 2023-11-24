import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import LyricsGen from "@/img/AI-Thesis-statement-generator.png";
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
    {name:"Select Type of Paper",data:[
        {label:"Argumentative",key:"Argumentative",  onClick:(key:any)=>{}},
        {label:"Analytical",key:"Analytical",onClick:(key:any)=>{}},
        {label:"Expository",key:"Expository",onClick:(key:any)=>{}},
    ]},
    {name:"Fill ",data:[
        {label:"fill 1",key:"fill1",  onClick:(key:any)=>{}},
        {label:"fill 2",key:"fill2",onClick:(key:any)=>{}},
        {label:"fill 3",key:"fill3",onClick:(key:any)=>{}},
    ]}
    
];

const ThesisStatementGenerator = () => {
    const router = useRouter();
   
    
    const textfields:any=[
        {placeholder:t`Input some line here to begin`,height:"90px"},
    ];
    const faqs= FAQDATA;
    return (<div>
        <Navbar/>
        <Hero 
        image={LyricsGen} 
        title={t`AI Thesis Statement Generator`} 
        description={t`Thesis Statement Generator`}
        fields={textfields}
        buttonText={"Generate Thesis Statement"}
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
                    "Please select paper type and fill",
                    2000
                  ); 
                return null;
            }
            routerData(text,items,"./thesis-statement/generate");
        }}
        selectOptions={options} 
        />
        <FAQ data={faqs}/>
        <Footer/>

    </div>);
 
};

export default ThesisStatementGenerator;