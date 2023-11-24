import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import LyricsGen from "@/img/AI-Book-Title-Generator.png";
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
import {FAQDATA , MAIN_APP_URL} from "@/config/config";
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
    {name:"Select Genre",data:[
        {label:"Dynamic",key:"dynamic",  onClick:(key:any)=>{}},
    ]},
    {name:"Select Target Audience ",data:[
        {label:"Children",key:"Children",  onClick:(key:any)=>{}},
        {label:"YA",key:"YA",onClick:(key:any)=>{}},
        {label:"Adults",key:"Adults",onClick:(key:any)=>{}},
    ]}
    ,
    {name:"Mood/Tone",data:[
        {label:"Professional",key:"formal",  onClick:(key:any)=>{}},
        {label:"Casual",key:"casual",  onClick:(key:any)=>{}},
        {label:"Technical",key:"tenchnical",  onClick:(key:any)=>{}},
    ]}
    
];
const BookTitleGenerator = () => {
    const router = useRouter();

    const textfields:any=[
        {placeholder:t`Input some line here to begin`,height:"90px"},
    ];
    const faqs= FAQDATA;
    return (<div>
        <Navbar/>
        <Hero 
        image={LyricsGen} 
        title={t`AI Book Title Generator`} 
        description={t`Book Title Generator`}
        fields={textfields}
        buttonText={"Generate Book"}
        buttonFunction={(text:any,items:any)=>{
            if(text[0]==''  || text[0]==null){
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
                    "Please select genre,audience and toon",
                    2000
                  ); 
                return null;
            }
             routerData(text,items,"./book-title-generator/generate");
        }}
        selectOptions={options} 
        />
        <FAQ data={faqs}/>
        <Footer/>

    </div>);
 
};

export default BookTitleGenerator;