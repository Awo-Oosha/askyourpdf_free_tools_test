export const path = Object.freeze({
    tools: "/tools",
    literatureReview: "/literature-review-writer",
    sourceTool: "/source-tool",
    ocr: "/ocr",
    merge: "/merge",
    split: "/split",
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
    [`${path.split}`]: "Split, extract, and manage your PDF files with our advanced free PDF Online Splitter Tool. Tailored for precision, our tool empowers you to handle PDFs with ease."
};

export const PAGE_TITLE = {
    [`${path.tools}`]: "Best Free PDF tools",
    [`${path.sourceTool}`]: "Best Free online Research and Citation Tool",
    [`${path.ocr}`]: "Best Free OCR PDF Reader",
    [`${path.merge}`]: "Best Online PDF Merger Tool",
    [`${path.split}`]: "Best PDF Splitter Online",
    [`${path.literatureReview}`]: "AI-Powered Literature Review Generator",
};