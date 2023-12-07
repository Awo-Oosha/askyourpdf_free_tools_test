import React from "react";
import LyricsGen from "@/img/AI-instagram-caption-generator.png";
import {t, Trans} from "@lingui/macro";
import {GetStaticProps} from "next";
import {loadCatalog} from "@/utils/i18n";
import Navbar from "@/components/Navbar";
import Hero from "@/components/FreeLanding/Hero";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import {PAGE_DESCRIPTION, PAGE_TITLE, path} from "@/routes";
import {FAQDATA, MAIN_APP_URL} from "@/config/config";
import { GENERATOR_PARAMETERS } from "@/config/config";

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


const InstagramCaptionGenerator = () => {
    const faqs= FAQDATA;
    return (
        <div>
            <Navbar />
            <Hero
                generator="INSTAGRAM_CAPTION"
                params={GENERATOR_PARAMETERS.instagram_caption}
                title={t`AI Instagram Caption Generator`}
                desc={t`Instagram Caption Generator `}
                img={LyricsGen}
                placeholder={t`Input some line here to begin `}
                routerPath={'instagram-caption/generate'}
                CtaTitle={t`Generate Instagram caption`}
            />
            <FAQ data={faqs} />
            <Footer />
        </div>
    );
};

export default InstagramCaptionGenerator;