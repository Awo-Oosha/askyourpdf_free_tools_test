export const path = Object.freeze({
    tools: "/tools",
    literatureReview: "/literature-review-writer",
    sourceTool: "/source-tool",
    ocr: "/ocr",
    merge: "/merge",
    split: "/split",
    apiPricing:"/api-pricing",
    FAQs: "/faq",
    PrivacyPolicy: "/privacy",
    chat: "/chat/:docID?",
    upload: "/file-upload",
    documents: "/documents/:docID?",
    conversations: "/conversations/:idType?/:id?",
    TermsAndCondition: "/terms",
    settings: "/settings",
    gptUpload: "/upload",
    apiKeys: "/apikeys",
    billingInfo: "/billing",
    billingUpgrade: "/billing/upgrade",
    knowledgeBase: "/knowledge-base",
    delete: "/delete",
    extension: "/extension",
    summarise: "/summarise",
    pdfToChat: "/pdf-to-chat",
    affiliateProgram: "/affiliate-program",
    lyrics: "/lyrics-generator",
    rap: "/rap-generator",
    instagram: "/instagram-caption",
    poem: "/poem-generator",
    thesis: "/thesis-statement",
    story: "/story-generator",
    book: "/book-title-generator",
    essay: "/essay-maker",
    text: "/text-generator",
    paragraph: "/paragraph-generator"

});

const DEFAULT_DESCRIPTION =
    "We built AskYourPDF as the only ChatPDF AI App you will ever need. Easily upload your PDF files and engage with our intelligent chat AI to extract valuable insights from your documents.";
export const PAGE_DESCRIPTION = {
    [`${path.literatureReview}`]:
        "Generate high-quality literature reviews fast with our AI tool. Summarize papers, identify key themes, and synthesize conclusions with just a few clicks. The AI reviews thousands of sources to find the most relevant info for your topic.",
    [`${path.sourceTool}`]:
        "Elevate your research with our best free online research and citation tool. Streamline your academic work and gain relevant insights. ",
    [`${path.tools}`]:
        "Unlock the power of PDF with our free  online PDF tools. Convert, edit, merge, split, and compress PDF files effortlessly.",
    [`${path.ocr}`]: "Make your PDF searchable with our free OCR PDF Reader. Search for text and easily edit a pdf. Our Free OCR Reader converts text within an image or scanned document into a customizable PDF file.",
    [`${path.merge}`]: "Merge your PDF files seamlessly with our best free online merger tool. Combining multiple PDFs into a single document has never been easier.",
    [`${path.split}`]: "Split, extract, and manage your PDF files with our advanced free PDF Online Splitter Tool. Tailored for precision, our tool empowers you to handle PDFs with ease.",
    [`${path.lyrics}`]: "Generate original and creative song lyrics effortlessly using our Lyrics Generator. Unleash your musical creativity and find inspiration for your next hit song.",
    [`${path.rap}`]: "Elevate your rap game with our Rap Generator. Unleash your lyrical prowess, find the perfect rhyme, and create authentic rap verses that resonate with your audience.",
    [`${path.instagram}`]: "Elevate your Instagram presence with our Caption Generator. Find the perfect words to complement your photos and engage your followers with compelling captions.",
    [`${path.poem}`]: "Unlock the power of words with our Poem Generator. Craft beautiful and evocative poems effortlessly, expressing your emotions and creativity with every verse.",
    [`${path.thesis}`]: "Ace your academic writing with our Thesis Statement Generator. Construct powerful and well-defined thesis statements that lay the foundation for your research and essays.",
    [`${path.story}`]: "Embark on a journey of creativity with our Story Generator. Generate unique story ideas, characters, and plots to fuel your imagination and storytelling prowess.",
    [`${path.book}`]: "Find the ideal title for your literary masterpiece with our Book Title Generator. Capture the essence of your story and attract readers with a compelling book title.",
    [`${path.essay}`]: "Streamline your essay writing process with our Essay Maker. Generate well-organized and coherent essays with ease, saving time and ensuring academic success.",
    [`${path.text}`]: "Empower your content creation with our Text Generator. Whether it's for websites, projects, or creative endeavors, effortlessly generate text that suits your needs.",
    [`${path.paragraph}`]: "Enhance your writing with our Paragraph Generator. Generate well-structured and compelling paragraphs for essays, articles, and more, saving time and boosting your content quality.",

};


export const DEFAULT_PAGE_TITLE = "AskYourPDF: The Best PDF AI Chat App"
export const PAGE_TITLE = {
    [`${path.tools}`]: "Best Free PDF tools",
    [`${path.sourceTool}`]: "Best Free AI Research and Citation Tool",
    [`${path.ocr}`]: "Best Free OCR PDF Reader",
    [`${path.merge}`]: "Best Online PDF Merger Tool",
    [`${path.split}`]: "Best PDF Splitter Online",
    [`${path.literatureReview}`]: "AI-Powered Literature Review Generator",
    [`${path.lyrics}`]: "AI Lyrics Generator |   AI Songwriting Tool",
    [`${path.rap}`]: "AI Rap Generator | AI Rhyme and Flow",
    [`${path.instagram}`]: "AI Caption Generator | AI Instagram",
    [`${path.poem}`]: "AI Poem Generator | Express Emotions",
    [`${path.thesis}`]: "AI Thesis Generator | Strong Statements",
    [`${path.story}`]: "AI Story Generator | Creative Writing",
    [`${path.book}`]: "AI Book Title Generator | Discover",
    [`${path.essay}`]: "AI Essay Maker | Effortless Writing",
    [`${path.text}`]: "AI Text Generator | AI-Powered",
    [`${path.paragraph}`]: "AI Paragraph Generator | AI Writing Aid"
    
};

