import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import ParaGen from "@/img/AI-Paragraph- Generator.png";
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
    {name:"Select Purpose",data:[
        {label:"Informative",key:"Informative",  onClick:(key:any)=>{}},
        {label:"Persuasive",key:"Persuasive",onClick:(key:any)=>{}},
        {label:"Descriptive",key:"Descriptive",onClick:(key:any)=>{}},
        {label:"Narrative",key:"Narrative",onClick:(key:any)=>{}},
    ]},
    {name:"Select Tone",data:[
        {label:"Formal",key:"Formal",  onClick:(key:any)=>{}},
        {label:"Informal",key:"Informal",onClick:(key:any)=>{}},
        {label:"Professional",key:"Professional",onClick:(key:any)=>{}},
        {label:"Casual",key:"Casual",onClick:(key:any)=>{}},
    ]}
    
];

const ParagraphGenerator = () => {
    const router = useRouter();
  
    const textfields:any=[
        {placeholder:t`Main idea`,height:"90px"},
        {placeholder:t` Supporting points`,height:"90px"},

    ];
    const faqs= FAQDATA;
    return (<div>
        <Navbar/>
        <Hero 
        image={ParaGen} 
        title={t`AI Paragraph Generator`} 
        description={t`Paragraph Generator`}
        fields={textfields}
        buttonText={"Generate Paragraph"}
        buttonFunction={(text:any,items:any)=>{
            if(text[0]=='' || text[0]==null){
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
                    "Please select purpose and toon",
                    2000
                  ); 
                return null;
            }
            routerData(text,items,"./paragraph-generator/generate");
        }}
        selectOptions={options} 
        />
        <FAQ data={faqs}/>
        <Footer/>

    </div>);
 
};

export default ParagraphGenerator;