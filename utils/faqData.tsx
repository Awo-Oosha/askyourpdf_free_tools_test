import { Trans, msg } from "@lingui/macro";
import { MessageDescriptor } from "../types/localization";

export const faqArrays: {
  id: number;
  Question: MessageDescriptor;
  answer: MessageDescriptor;
  customRender?: React.ReactNode;
}[][] = [
    [
      {
        id: 1,
        Question: msg`What is AskYourPDF?`,
        answer: msg`It's an application that lets you chat with any document you upload`,
      },
      {
        id: 2,
        Question: msg`How does it work?`,
        answer: msg`The application uses artificial intelligence to analyze the content of the document and provide a chat interface for users to ask questions get answers.`,
      },
      {
        id: 3,
        Question: msg`Can I upload any document?`,
        answer: msg`We support multiple document formats: ".pdf", ".txt", ".ppt", ".pptx", ".csv", ".epub", and ".rtf".`,
      },
      {
        id: 4,
        Question: msg`How does billing work?`,
        answer: msg`AskYourPDF offers three plans: Premium, Pro and Enterprise. [See here (https://askyourpdf.com/settings) for details].`,
        customRender: (
          <Trans>
            AskYourPDF offers three plans: Premium, Pro and Enterprise. [See{" "}
            <a href="https://askyourpdf.com/settings">here</a> for details].
          </Trans>
        ),
      },
      {
        id: 5,
        Question: msg`Is it necessary to create an account to use the application?`,
        answer: msg`No, you don't need to create an account to use the application. However, there are some restrictions. To explore the vast capabilities of AskYourPDF, you'll need an upgraded plan.`,
      },
      {
        id: 6,
        Question: msg`Is there a discount for students?`,
        answer: msg`Yes, however, there isn't currently an automated application process. We will provide you with a discount coupon if you contact us at billing@askyourpdf.com with details of your educational institution and enrolment.`,
        customRender: (
          <Trans>
            Yes, however, there isn't currently an automated application process.
            We will provide you with a discount coupon if you contact us at{" "}
            <a href="mailto:billing@askyourpdf.com">
              billing@askyourpdf.com
            </a>{" "}
            with details of your educational institution and enrolment.
          </Trans>
        ),
      },
      {
        id: 7,
        Question: msg`Can I chat with other users of the application?`,
        answer: msg`No, the chat interface is solely for interacting with the content of the document.`,
      },
      {
        id: 8,
        Question: msg`Is there a limit to the number of documents I can upload?`,
        answer: msg`Free users can upload one document per day. Premium and Pro users can upload 50 and 150 documents per day respectively. For higher number of uploads, users need to contact us for the enterprise plan.`,
      },
      {
        id: 9,
        Question: msg`Is the application free to use? `,
        answer: msg`Yes, the application is free to use, but with certain restrictions. An upgraded plan is required to explore the vast capabilities of AskYourPDF. Documents uploaded by Free users remain in our database for a maximum of 90 days before removal.`,
      },
      {
        id: 10,
        Question: msg`If I cancel my subscription, will I get a refund?`,
        answer: msg`Subscribers can cancel their subscription at any time. However, no refunds will be provided for any unused portion of the subscription period.`,
      },
    ],
    [
      {
        id: 11,
        Question: msg`Can I chat in any language?`,
        answer: msg`Yes, AskYourPDF is multilingual and supports chatting in any language of your choice.`,
      },
      {
        id: 12,
        Question: msg`Can I download the chat history?`,
        answer: msg`Yes, chat history can be downloaded.`,
      },
      {
        id: 13,
        Question: msg`What if I have a question that the AI can't answer?`,
        answer: msg`If the answer is in the uploaded document, there's a high likelihood the AI will provide it. The AI is constantly learning, so if it doesn't have an answer, you can always rephrase or ask a different question.`,
      },
      {
        id: 14,
        Question: msg`Is my data secure?`,
        answer: msg`Absolutely. Data privacy is our top priority. The application employs industry-standard SSL encryption to ensure the protection of your information.`,
      },
      {
        id: 15,
        Question: msg`Can I edit the document while using AskYourPDF?`,
        answer: msg`No, documents cannot be edited within AskYourPDF. But this will be possible in the future.
`,
      },
      {
        id: 16,
        Question: msg`Can I use AskYourPDF on any device?`,
        answer: msg`Yes, AskYourPDF is accessible from any device with standard browsers and an internet connection.`,
      },
      {
        id: 17,
        Question: msg`Is there a limit to the size of the document that can be uploaded?`,
        answer: msg`Yes, the maximum file size for document uploads is 15MB for free users. However, Premium and Pro users can upload as high as 30MB and 90MB respectively. For larger file sizes, users need to contact us for the enterprise plan.`,
      },
      {
        id: 18,
        Question: msg`Can I upload multiple documents at once?`,
        answer: msg`No, only one document can be uploaded at a time. But this will be possible in the future.
`,
      },
      {
        id: 19,
        Question: msg`Can I upload password-protected documents to AskYourPDF?`,
        answer: msg`No, password-protected documents cannot be uploaded to AskYourPDF.
`,
      },
      {
        id: 20,
        Question: msg`How long are the chat sessions saved on AskYourPDF?`,
        answer: msg`Chat sessions remain available as long as the browser tab is open.`,
      },
      {
        id: 21,
        Question: msg`What if I have a question or a problem while using AskYourPDF?`,
        answer: msg`If you encounter any issues or have questions while using AskYourPDF, please contact our support team: support@askyourpdf.com. They're here to help!`,
      },
      {
        id: 22,
        Question: msg`What does "additional credits may be required" mean in the pricing section?`,
        answer: msg`The summarisation service, GPT4 and Claude 2, operate on a credit-based system; while initial credits are provided complimentary as part of your subscription, additional credits may need to be purchased once these are exhausted. All credit purchases are final, non-refundable, and must be used exclusively for the Summarization Service, GPT4, or Claude 2.`
      },
    ],
  ];
