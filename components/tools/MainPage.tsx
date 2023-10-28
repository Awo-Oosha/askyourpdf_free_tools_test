import type { NextPage, GetStaticProps } from "next";
import { Container, PageContainer } from "@/styles/styles";
import { loadCatalog } from "@/utils/i18n";
import React, { useRef } from "react";
import {PAGE_DESCRIPTION, path} from "@/routes";
import {MAIN_APP_URL} from "@/config/config";
import { Trans, t } from "@lingui/macro";
import ToolsHero from "@/components/tools/ToolsHero";
import ToolsSection from "@/components/tools/ToolsSection";
import NavbarExt from "./ToolBarExt";
import Footer from "../Footer";
import Waitlist from "../Waitlist";





const ToolsPage = () => {
  
 const title= <Trans>Explore our Free Tools</Trans>;
 const desc = <Trans>Seamlessly edit, split, merge, compress, and extract text from PDFs. Harness the power of AI to simplify your 
 PDF interactions for free</Trans>;
 const tab = <Trans>Tools</Trans>;
  return (
    <div>
      <PageContainer>
        <NavbarExt />
        <ToolsHero title={title} desc={desc} tab={tab} isHome={true} />
       <ToolsSection/>
        <Waitlist />
        <Footer />
      </PageContainer>
    </div>
  );
};

export default ToolsPage;