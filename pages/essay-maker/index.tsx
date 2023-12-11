import React from "react";
import LyricsGen from "@/img/AI-essay-maker.png";
import { msg } from "@lingui/macro";
import {GetStaticProps} from "next";
import {loadCatalog} from "@/utils/i18n";
import Navbar from "@/components/Navbar";
import Hero from "@/components/FreeLanding/Hero";
import Footer from "@/components/Footer";
import {PAGE_DESCRIPTION, PAGE_TITLE, path} from "@/routes";
import {MAIN_APP_URL} from "@/config/config";
import { GENERATOR_PARAMETERS } from "@/config/config";
import LandingFAQ from "@/components/FreeLanding/ToolsFaq";
import { useLingui } from "@lingui/react";


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


const EssayMaker = () => {
    const { _ } = useLingui();
    return (
        <div>
            <Navbar />
            <Hero
                generator="ESSAY_WRITER"
                params={GENERATOR_PARAMETERS.essay_maker}
                title={_(msg`AI Essay Writer`)}
                desc={_(msg`Essay Writer`)}
                img={LyricsGen}
                placeholder={_(msg`Input some line here to begin `)}
                routerPath={'essay-maker/generate'}
                CtaTitle={_(msg`Generate Essay`)}
            />
            <LandingFAQ />
            <Footer />
        </div>
    );
 
};

export default EssayMaker;