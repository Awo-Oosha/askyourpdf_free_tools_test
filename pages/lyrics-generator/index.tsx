import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import LyricsGen from "@/img/tools/lyricsGen.png";
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

export const options: any = [
    {
        name: "Select Genre",
        data: [
            { label: "Pop", key: "pop", onClick: (key: any) => {} },
            { label: "Rock", key: "rock", onClick: (key: any) => {} },
            { label: "Hip Hop", key: "hiphop", onClick: (key: any) => {} },
            { label: "Electronic", key: "electronic", onClick: (key: any) => {} },
            { label: "R&B", key: "rnb", onClick: (key: any) => {} },
            // Add more genres as needed
        ]
    },
    {
        name: "Select Mood",
        data: [
            { label: "Happy", key: "happy", onClick: (key: any) => {} },
            { label: "Sad", key: "sad", onClick: (key: any) => {} },
            { label: "Energetic", key: "energetic", onClick: (key: any) => {} },
            { label: "Chill", key: "chill", onClick: (key: any) => {} },
            { label: "Romantic", key: "romantic", onClick: (key: any) => {} },
            // Add more moods as needed
        ]
    }
];

const LyricsGenerator = () => {
    const router = useRouter();
    const textfields:any=[
        {placeholder:t`Input some line here to begin`,height:"90px"},
    ];
    const faqs= FAQDATA;
    return (<div>
        <Navbar/>
        <Hero 
        image={LyricsGen} 
        title={t`AI Lyrics Generator`} 
        description={t`Your creative companion on your musical journey, create lyrics that tell your unique story`}
        fields={textfields}
        buttonText={"Generate Lyrics"}
        buttonFunction={(text:any,items:any)=>{
            //console.log(text);
            if(text[0]==''){
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
                    "Please select genre and mood",
                    2000
                  ); 
                return null;
            }
            routerData(text,items,"./lyrics-generator/generate");
        }}
        selectOptions={options} 
        />
        <FAQ data={faqs}/>
        <Footer/>

    </div>);
 
};

export default LyricsGenerator;