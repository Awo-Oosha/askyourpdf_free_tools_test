import React from "react";
import LyricsGen from "@/img/AI-Paragraph-Generator.png";
import { msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { GetStaticProps } from "next";
import {loadCatalog} from "@/utils/i18n";
import Navbar from "@/components/Navbar";
import Hero from "@/components/FreeLanding/Hero";
import Footer from "@/components/Footer";
import {PAGE_DESCRIPTION, PAGE_TITLE, path} from "@/routes";
import {MAIN_APP_URL} from "@/config/config";
import { GENERATOR_PARAMETERS } from "@/config/config";
import LandingFAQ from "@/components/FreeLanding/ToolsFaq";

export const getStaticProps: GetStaticProps = async (ctx) => {
    const translation = await loadCatalog(ctx.locale!);
    return {
        props: {
            translation,
            description: PAGE_DESCRIPTION[path.book],
            canonicalUrl: `${MAIN_APP_URL}${path.book}`,
            title: PAGE_TITLE[path.book],
            imageUrl: "/6201447e-3545-4eb4-334d-cadf31496100/public"
        },
    };
};


const BookTitleGenerator = () => {
    const { _ } = useLingui();
    return (
        <div>
            <Navbar />
            <Hero
                generator="BOOK_TITLE_GENERATOR"
                params={GENERATOR_PARAMETERS.book_title_generator}
                title={_(msg`AI Book Title Generator`)}
                desc={_(msg`Book Title Generator`)}
                img={LyricsGen}
                placeholder={_(msg`Input some line here to begin`)}
                routerPath={'book-title-generator/generate'}
                CtaTitle={_(msg`Generate Book`)}
            />
            <LandingFAQ />
            <Footer />
        </div>
    );
};

export default BookTitleGenerator;