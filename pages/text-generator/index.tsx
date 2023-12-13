import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import LyricsGen from "@/img/Ai-Text-Generator.png";
import { msg} from "@lingui/macro";
import { GetStaticProps } from "next";
import { loadCatalog } from "@/utils/i18n";
import Navbar from "@/components/Navbar";
import Hero from "@/components/FreeLanding/Hero";
import Footer from "@/components/Footer";
import { PAGE_DESCRIPTION, PAGE_TITLE, path } from "@/routes";
import { MAIN_APP_URL } from "@/config/config";
import { GENERATOR_PARAMETERS } from "@/config/config";
import LandingFAQ from "@/components/FreeLanding/ToolsFaq";
import { useLingui } from "@lingui/react";

export const getStaticProps: GetStaticProps = async (ctx) => {
    const translation = await loadCatalog(ctx.locale!);
    return {
        props: {
            translation,
            description: PAGE_DESCRIPTION[path.text],
            canonicalUrl: `${MAIN_APP_URL}${path.text}`,
            title: PAGE_TITLE[path.text],
            imageUrl: "/6201447e-3545-4eb4-334d-cadf31496100/public"
        },
    };
};


const TextGenerator = () => {
    const { _ } = useLingui();

    return (
        <div>
            <Navbar />
            <Hero
                generator="TEXT_GENERATOR"
                params={GENERATOR_PARAMETERS.text_generator}
                title={_(msg`AI Text Generator`)}
                desc={_(msg`Text Generator `)}
                img={LyricsGen}
                placeholder={_(msg`Input some line here to begin `)}
                routerPath={'text-generator/generate'}
                CtaTitle={_(msg`Generate Text `)}
            />
            <LandingFAQ />
            <Footer />
        </div>
    );
 
};

export default TextGenerator;