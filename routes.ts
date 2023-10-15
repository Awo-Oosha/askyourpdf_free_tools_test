export const path = Object.freeze({
  home: "/",
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
  apiPricing: "/api-pricing",
  delete: "/delete",
  extension: "/extension",
  summarise: "/summarise",
  pdfToChat: "/pdf-to-chat",
  tools: "/tools",
  literatureReview: "/literature-review-writer",
  affiliateProgram: "/affiliate-program",
});

const DEFAULT_DESCRIPTION =
  "We built AskYourPDF as the only ChatPDF AI App you will ever need. Easily upload your PDF files and engage with our intelligent chat AI to extract valuable insights from your documents.";
export const PAGE_DESCRIPTION = {
  [`${path.home}`]: DEFAULT_DESCRIPTION,
  [`${path.FAQs}`]:
    "Find solutions to common queries about our PDF AI Chat App. Get insights into how AskYourPDF simplifies PDF file interactions and enhances your experience.",
  [`${path.PrivacyPolicy}`]:
    "Explore our commitment to safeguarding your data while using our PDF analysis features. Learn how we ensure your privacy is a top priority.",
  [`${path.chat}`]:
    "Engage in dynamic chats with your documents using AskYourPDF, the ultimate PDF AI Chat App. Easily upload PDFs and interact with our intelligent chat AI to extract invaluable insights and knowledge.",
  [`${path.upload}`]:
    "Harness the power of our AI chat app for PDF insights. Begin your journey by easily uploading your PDFs here. Our user-friendly interface ensures a hassle-free experience.",
  [`${path.documents}`]: DEFAULT_DESCRIPTION,
  [`${path.conversations}`]:
    "We built AskYourPDF as the only PDF AI Chat App you will ever need. Easily upload your PDF files and engage with our intelligent chat AI to extract valuable insights from your documents.",
  [`${path.TermsAndCondition}`]:
    "Explore our comprehensive terms to understand how we serve you better. Learn about the rules, rights, and responsibilities that govern your experience with AskYourPDF.",
  [`${path.settings}`]:
    "We built AskYourPDF as the only PDF AI Chat App you will ever need. Easily upload your PDF files and engage with our intelligent chat AI to extract valuable insights and answers from your documents to help you make informed decisions.",
  [`${path.gptUpload}`]:
    "We built AskYourPDF as the only PDF AI Chat App you will ever need. Easily upload your PDF files and engage with our intelligent chat AI to extract valuable insights from your documents.",
  [`${path.apiKeys}`]:
    "Our PDF Chat API empowers developers with the ability to programmatically extract valuable information from PDF files and leverage it to create custom chatbots.",
  [`${path.billingInfo}`]: DEFAULT_DESCRIPTION,
  [`${path.billingUpgrade}`]: DEFAULT_DESCRIPTION,
  [`${path.knowledgeBase}`]:
    "Chat with multiple documents at once with AskYourPDF, the ultimate PDF AI Chat App. Easily upload PDFs and interact with our intelligent chat AI to extract invaluable insights and knowledge.",
  [`${path.apiPricing}`]:
    "Our PDF Chat API empowers developers with the ability to programmatically extract valuable information from PDF files and leverage it to create custom chatbots.",
  [`${path.delete}`]: DEFAULT_DESCRIPTION,
  [`${path.extension}`]:
    "AskYourPDF Chrome Extension: Our Chrome Extension empowers users with the ability to extract valuable information from PDF files",
  [`${path.pdfToChat}`]: "The easiest way to unlock insights from documents",
  [`${path.literatureReview}`]:
    "Generate high-quality literature reviews fast with our AI tool. Summarize papers, identify key themes, and synthesize conclusions with just a few clicks. The AI reviews thousands of sources to find the most relevant info for your topic.",
  [`${path.affiliateProgram}`]:
    "At AskYourPDF we cherish our community and think you should be rewarded for spreading the word about our platform's advantages. To earn 30% commission on all payments made by users you refer within the first 12 months, Join our affiliate program.",
    [`${path.tools}`]:
    "At AskYourPDF we cherish our community and think you should be rewarded for spreading the word about our platform's advantages. To earn 30% commission on all payments made by users you refer within the first 12 months, Join our affiliate program.",
};

export const PAGE_TITLE = {
  [`${path.literatureReview}`]: "AI-Powered Literature Review Writer",
};
