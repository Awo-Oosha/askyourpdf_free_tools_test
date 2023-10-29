import Head from "next/head";
import React from "react";
import {LCDScript, LCDScript2} from "@/components/CustomScripts";

export default function AppHead() {
    return (
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <meta name="robots" content="index, follow"/>
            <meta name="googlebot"
                  content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"/>
            <meta name="bingbot"
                  content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"/>
            <meta property="og:site_name" content="AskYourPDF"/>

            {/* <!-- Google / Search Engine Tags --> */}
            <meta property="og:type" content="website"/>
            {/*<meta property="og:title" content="AskYourPDF: The Best PDF AI Chat App"/>*/}
            {/*<meta property="og:image:alt" content="AskYourPDF: The Best PDF AI Chat App"/>*/}


            {/* <!-- Twitter Meta Tags --> */}
            <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:title" content="AskYourPDF: The Best PDF AI Chat App"/>
                <meta name="twitter:image"
                      content="https://askyourpdf.com/logo512.png"/>
                <meta name="twitter:description"
                      content="We built AskYourPDF as the only PDF AI Chat App you will ever need. Easily upload your PDF files and engage with our intelligent chat AI to extract valuable insights and answers from your documents to help you make informed decisions."/>

            {/* iOS Smart Banner Tag */}
            <meta name="apple-itunes-app" content="app-id=6462732878" />

            <link rel="apple-touch-icon" href="https://askyourpdf.com/logo512.png"/>

            <link rel="manifest" href="/manifest.json"/>
            <link rel="icon" href="https://askyourpdf.com/favicon.ico"/>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={LCDScript()}
                key="lcd-jsonld"
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={LCDScript2()}
                key="lcd2-jsonld"
            />
        </Head>
    );
}
