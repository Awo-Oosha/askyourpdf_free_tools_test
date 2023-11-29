import React from "react";
import { styled } from "styled-components";
import EyeIcon from "@/img/tools/eye.png";
import SplitIcon from "@/img/tools/split.png";
import MergeIcon from "@/img/tools/merge.png";
import ScanIcon from "@/img/tools/scan.png";
import SourceIcon from "@/img/SourceIcon.svg?url";
import InstaIcon from "@/img/tools/insta.png";
import PoemIcon from "@/img/tools/poem.png";
import RapIcon from "@/img/tools/rap.png";
import BookIcon from "@/img/tools/book.png";
import CompressIcon from "@/img/tools/compress.png";
import EssayIcon from "@/img/tools/essay.png";
import StoryIcon from "@/img/tools/story.png";
import TextIcon from "@/img/tools/text.png";
import LyricsIcon from "@/img/tools/rap.png";
import ThesisIcon from "@/img/tools/thesis.png";
import ParagraphIcon from "@/img/tools/paragraph.png";
import { Trans } from "@lingui/macro";
import Image from "next/image";
import Link from "next/link";

const ToolsList = styled.div`
  width: 100%;
  box-sizing: border-box;
  background: #f9f9fa;
  position: relative;
  top: -160px;
  display: flex;
  justify-content: center;
  margin-bottom: -160px;
  z-index: 2;
  @media screen and (max-width: 900px) {
    padding: 0 20px;
    top: 0px;
    margin-bottom: 0px;
  }
`;
const ToolsListInner = styled.div`
  box-sizing: border-box;
  width: 1200px;
  max-width: 90%;
  border-radius: 18px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  border-bottom: 0;
  border: 1px solid rgba(47, 43, 67, 0.1);
  background: #fff;
  padding: 36px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding-bottom: 200px;
  @media screen and (max-width: 900px) {
    width: 100%;
    max-width: 100%;
    display: block;
    padding: 20px;
  }
`;
const ToolComp = styled(Link)`
  color: inherit;
  text-decoration: none;
  box-sizing: border-box;
  border-radius: 16px;
  background: #f9fafb;
  padding: 24px;
  width: calc(33% - 20px);
  margin-top: 30px;
  @media screen and (max-width: 900px) {
    width: 100%;
    margin-bottom: 50px;
    display: block;
  }

  img {
    width: 64px;
    height: 64px;
    position: relative;
    top: -50px;
    margin-bottom: -45px;
  }

  .thead {
    color: #101828;
    font-size: 19.844px;
    font-style: normal;
    font-weight: 700;
    line-height: 30px; /* 151.181% */
  }

  .tdesc {
    color: #646b82;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */
    letter-spacing: -0.14px;
  }
`;
const Thead = styled.div`
  color: #101828;
  font-size: 19.844px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px; /* 151.181% */
`;
const Tdesc = styled.div`
  color: #646b82;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px; /* 137.5% */
  letter-spacing: -0.14px;
`;

const ToolsSection = () => {
  return (
    <ToolsList>
      <ToolsListInner>
        <ToolComp href="source-tool">
          <Image src={SourceIcon} alt="" />
          <Thead>
            <Trans>AI Source Finder</Trans>
          </Thead>
          <Tdesc>
            <Trans>
              Enhance your research with our Source-Tool, which automatically
              cites and creates references for your academic text.
            </Trans>
          </Tdesc>
        </ToolComp>
        <ToolComp href="literature-review-writer">
          <Image src={EyeIcon} alt="" />
          <Thead>
            <Trans>AI Literature Review Generator</Trans>
          </Thead>
          <Tdesc>
            <Trans>
              Harness the power of our AI-driven Literature Review Assistant.
              Simplify your research process, produce structured overviews, and
              craft in-depth literature reviews to elevate your academic work.
            </Trans>
          </Tdesc>
        </ToolComp>
        <ToolComp href="split">
          <Image src={SplitIcon} alt="" />
          <Thead>
            {" "}
            <Trans>PDF Splitter</Trans>
          </Thead>
          <Tdesc>
            {" "}
            <Trans>
              Efficiently split, separate, and manage your PDF files using our
              superior free online PDF splitter.
            </Trans>
          </Tdesc>
        </ToolComp>
        <ToolComp href="merge">
          <Image src={MergeIcon} alt="" />
          <Thead>
            <Trans>PDF Merger</Trans>
          </Thead>
          <Tdesc>
            <Trans>
              With our smart, automated merging, your PDFs are unified
              seamlessly into a single, cohesive document while maintaining
              quality and formatting.
            </Trans>
          </Tdesc>
        </ToolComp>
        <ToolComp href="ocr">
          <Image src={ScanIcon} alt="" />
          <Thead>
            <Trans>OCR PDF Reader</Trans>
          </Thead>
          <Tdesc>
            <Trans>
              Transform scanned or image-based PDFs into editable and searchable
              text with our AI powered OCR PDF Reader.
            </Trans>
          </Tdesc>
        </ToolComp>
        <ToolComp href="pdf-comp">
          <Image src={CompressIcon} alt="" />
          <Thead>
            <Trans>PDF Compressor</Trans>
          </Thead>
          <Tdesc>
            <Trans>
              Effortlessly shrink PDFs for quicker sharing and storage, while
              preserving quality, all with the precision of AI.
            </Trans>
          </Tdesc>
        </ToolComp>
        <ToolComp href="lyrics">
          <Image src={LyricsIcon} alt="" />
          <Thead>
            <Trans>AI Lyrics Generator</Trans>
          </Thead>
          <Tdesc>
            <Trans>
              Your creative companion on your musical journey, create lyrics
              that tell your unique story
            </Trans>
          </Tdesc>
        </ToolComp>
        <ToolComp href="poem">
          <Image src={PoemIcon} alt="" />
          <Thead>
            <Trans>AI Poem Generator </Trans>
          </Thead>
          <Tdesc>
            <Trans>
              Craft personalized and enchanting verses effortlessly with our AI
              Poem Generator. Unleash creativity in just a click.
            </Trans>
          </Tdesc>
        </ToolComp>
        <ToolComp href="insta">
          <Image src={InstaIcon} alt="" />
          <Thead>
            <Trans>AI Instagram Caption Generator</Trans>
          </Thead>
          <Tdesc>
            <Trans>
              Instantly enhance your Instagram posts with our AI Caption
              Generator. Elevate your captions effortlessly for the perfect
              social media presence.
            </Trans>
          </Tdesc>
        </ToolComp>
        <ToolComp href="rap">
          <Image src={RapIcon} alt="" />
          <Thead>
            <Trans>AI Rap Generator</Trans>
          </Thead>
          <Tdesc>
            <Trans>
              Unleash lyrical brilliance with our AI Rap Generator. Elevate your
              flow with personalized, AI-crafted rhymes. Ignite your rap game.
            </Trans>
          </Tdesc>
        </ToolComp>
        <ToolComp href="book">
          <Image src={BookIcon} alt="" />
          <Thead>
            <Trans>AI Book Title Generator </Trans>
          </Thead>
          <Tdesc>
            <Trans>
              Fuel your literary imagination with our AI Book Title Generator.
              Discover captivating titles for your next literary masterpiece
              effortlessly.
            </Trans>
          </Tdesc>
        </ToolComp>
        <ToolComp href="story">
          <Image src={StoryIcon} alt="" />
          <Thead>
            <Trans>AI Story Generator</Trans>
          </Thead>
          <Tdesc>
            <Trans>
              Unleash limitless creativity with our AI Story Generator. Craft
              unique tales, explore diverse genres, and bring your narratives to
              life.
            </Trans>
          </Tdesc>
        </ToolComp>
        <ToolComp href="thesis">
          <Image src={ThesisIcon} alt="" />
          <Thead>
            <Trans>AI Thesis Statement Generator</Trans>
          </Thead>
          <Tdesc>
            <Trans>
              Simplify your academic writing. Let our AI Thesis Statement
              Generator craft concise, impactful thesis statements for your
              research effortlessly.
            </Trans>
          </Tdesc>
        </ToolComp>
        <ToolComp href="essay">
          <Image src={EssayIcon} alt="" />
          <Thead>
            <Trans>AI Essay Maker</Trans>
          </Thead>
          <Tdesc>
            <Trans>
              Effortlessly generate well-structured essays with our AI Essay
              Maker. Elevate your writing with clear arguments and compelling
              content.
            </Trans>
          </Tdesc>
        </ToolComp>
        <ToolComp href="para">
          <Image src={ParagraphIcon} alt="" />
          <Thead>
            <Trans>AI Paragraph Generator</Trans>
          </Thead>
          <Tdesc>
            <Trans>
              Streamline your writing. Our AI Paragraph Generator crafts concise
              and coherent paragraphs, enhancing the clarity and impact of your
              content.
            </Trans>
          </Tdesc>
        </ToolComp>
        <ToolComp href="text">
          <Image src={TextIcon} alt="" />
          <Thead>
            <Trans>AI Text Generator</Trans>
          </Thead>
          <Tdesc>
            <Trans>
              Transform ideas into text effortlessly. Our AI Text Generator
              crafts diverse and engaging content, making creativity and
              productivity seamless.
            </Trans>
          </Tdesc>
        </ToolComp>
      </ToolsListInner>
    </ToolsList>
  );
};

export default ToolsSection;
