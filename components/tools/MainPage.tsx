import { PageContainer } from "@/styles/styles";
import React from "react";
import { Trans } from "@lingui/macro";
import ToolsHero from "@/components/tools/ToolsHero";
import ToolsSection from "@/components/tools/ToolsSection";
import NavbarExt from "./ToolBarExt";
import Footer from "../Footer";
import Waitlist from "../Waitlist";





const ToolsPage = () => {
  
 const title= <Trans>Explore our Free Tools</Trans>;
 const desc = <Trans>Seamlessly cite, reference, edit, split, merge, compress, and extract text from PDFs. Harness the power of AI to simplify your
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
