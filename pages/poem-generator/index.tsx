import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import LyricsGen from "@/img/AI-Poem-Generator.png";
import { t, Trans } from "@lingui/macro";
import { GetStaticProps } from "next";
import { loadCatalog } from "@/utils/i18n";
import Navbar from "@/components/Navbar";
import Hero from "@/components/FreeLanding/Hero";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { PAGE_DESCRIPTION, PAGE_TITLE, path } from "@/routes";
import { FAQDATA, MAIN_APP_URL } from "@/config/config";
import { GENERATOR_PARAMETERS } from "@/config/config";

export const getStaticProps: GetStaticProps = async (ctx) => {
    const translation = await loadCatalog(ctx.locale!);
    return {
        props: {
            translation,
            description: PAGE_DESCRIPTION[path.sourceTool],
            canonicalUrl: `${MAIN_APP_URL}${path.sourceTool}`,
            title: PAGE_TITLE[path.sourceTool],
            imageUrl:  "/6201447e-3545-4eb4-334d-cadf31496100/public"
        },
    };
};


const PoemGenerator = () => {

    const faqs=FAQDATA;
    return (
        <div>
            <Navbar />
            <Hero
                generator="POEM WRITER"
                params={GENERATOR_PARAMETERS.poem_generator}
                title={t`AI Poem Generator`}
                desc={t`Poem Generator `}
                img={LyricsGen}
                placeholder={t`Input some line here to begin `}
                routerPath={'poem-generator/generate'}
                CtaTitle={t`Generate Poem`}
            />
            <FAQ data={faqs} />
            <Footer />
        </div>
    );
};

export default PoemGenerator;