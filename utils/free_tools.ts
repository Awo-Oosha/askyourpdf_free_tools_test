import { Trans, msg } from "@lingui/macro";
import { MessageDescriptor } from "../types/localization";
import { path } from "@/routes";


import EyeIcon from "@/img/tools/eye.svg?url";
import SplitIcon from "@/img/tools/split.svg?url";
import MergeIcon from "@/img/tools/merge.svg?url";
import ScanIcon from "@/img/tools/ocr.svg?url";
import SourceIcon from "@/img/tools/source.svg?url";
import InstaIcon from "@/img/tools/insta.svg?url";
import PoemIcon from "@/img/tools/poem.svg?url";
import RapIcon from "@/img/tools/rap.svg?url";
import BookIcon from "@/img/tools/book.svg?url";
import CompressIcon from "@/img/tools/compress.svg?url";
import EssayIcon from "@/img/tools/essay.svg?url";
import StoryIcon from "@/img/tools/story.svg?url";
import TextIcon from "@/img/tools/text.svg?url";
import LyricsIcon from "@/img/tools/rap.svg?url";
import ThesisIcon from "@/img/tools/thesis.svg?url";
import ParagraphIcon from "@/img/tools/paragraph.svg?url";
import { UrlObject } from "url";


interface free_tools_data {
  icon: any,
  title: MessageDescriptor,
  desc: MessageDescriptor,
  link: UrlObject | string 
}


export const FreeToolsData : free_tools_data[] = [
  {
    icon: EyeIcon,
    title: msg`Literature Review Tool`,
    desc: msg`Streamline research, generate structured summaries, and create cohesive and comprehensive reviews that elevate your academic work.`,
    link: path.literatureReview
  },
  {
    icon: SplitIcon,
    title: msg`PDF Splitter`,
    desc: msg`Let artificial intelligence do the work as it divides your PDF documents into separate files, saving you time and streamlining your document management tasks.`,
    link: path.split
  },
  {
    icon: MergeIcon,
    title: msg`PDF Merger`,
    desc: msg`With smart, automated merging, your PDFs are unified seamlessly into a single, cohesive document while maintaining quality and formatting.`,
    link: path.merge
  },
  {
    icon: CompressIcon,
    title: msg`PDF Compressor`,
    desc: msg`Effortlessly shrink PDFs for quicker sharing and storage, while preserving quality, all with the precision of AI.`,
    link: ""
  },
  {
    icon: ScanIcon,
    title: msg`OCR PDF Reader`,
    desc: msg`Transform scanned or image-based PDFs into editable and searchable text with our AI powered OCR PDF Reader.`,
    link: path.ocr
  },
  {
    icon: SourceIcon,
    title: msg`Source Tool`,
    desc: msg`Leverage the power of artificial intelligence to discover, analyse, and recommend sources of relevant to your needs.`,
    link: path.sourceTool
  },
  {
    icon: LyricsIcon,
    title: msg`AI Lyrics Generator`,
    desc: msg`Your creative companion on your musical journey, create lyrics that tell your unique story`,
    link: path.lyrics
  },
  {
    icon: PoemIcon,
    title: msg`AI Poem Generator`,
    desc: msg`Craft personalized and enchanting verses effortlessly with our AI Poem Generator. Unleash creativity in just a click.`,
    link: path.poem
  },
  {
    icon: InstaIcon,
    title: msg`AI Instagram Caption Generator`,
    desc: msg`Instantly enhance your Instagram posts with our AI Caption Generator. Elevate your captions effortlessly for the perfect social media presence.`,
    link: path.instagram
  },
  {
    icon: RapIcon,
    title: msg`AI Rap Generator`,
    desc: msg`Unleash lyrical brilliance with our AI Rap Generator. Elevate your flow with personalized, AI-crafted rhymes. Ignite your rap game.`,
    link: path.rap
  },
  {
    icon: BookIcon,
    title: msg`AI Book Title Generator`,
    desc: msg`Fuel your literary imagination with our AI Book Title Generator. Discover captivating titles for your next literary masterpiece effortlessly.`,
    link: path.book
  },
  {
    icon: StoryIcon,
    title: msg`AI Story Generator`,
    desc: msg`Unleash limitless creativity with our AI Story Generator. Craft unique tales, explore diverse genres, and bring your narratives to life.`,
    link: path.story
  },
  {
    icon: ThesisIcon,
    title: msg`AI Thesis Statement Generator`,
    desc: msg`Simplify your academic writing. Let our AI Thesis Statement Generator craft concise, impactful thesis statements for your research effortlessly.`,
    link: path.thesis
  },
  {
    icon: EssayIcon,
    title: msg`AI Essay Maker`,
    desc: msg`Effortlessly generate well-structured essays with our AI Essay Maker. Elevate your writing with clear arguments and compelling content.`,
    link: path.essay
  },
  {
    icon: ParagraphIcon,
    title: msg`AI Paragraph Generator`,
    desc: msg`Streamline your writing. Our AI Paragraph Generator crafts concise and coherent paragraphs, enhancing the clarity and impact of your content.`,
    link: path.paragraph
  },
  {
    icon: TextIcon,
    title: msg`AI Text Generator`,
    desc: msg`Transform ideas into text effortlessly. Our AI Text Generator crafts diverse and engaging content, making creativity and productivity seamless.`,
    link: path.text
  }
] 