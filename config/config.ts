//import { Plan, Subscription } from "@/services/payment";
import {ModelName} from '@/types/conversations';
import Sparkle from "@/img/Sparkle.svg?url";
import SparkleActive from "@/img/SparkleGold.svg?url";
import Flash from "@/img/Flash.svg?url";
import FlashActive from "@/img/FlashGold.svg?url";
import ClaudeActive from '@/img/ClaudeActive.svg?url';
import Claude from '@/img/Claude.svg?url';
import {msg} from "@lingui/macro";

export const TRACKING_ID = "G-4061KC8JMW";
export const DOCUMENTATION_URL = "https://docs.askyourpdf.com/askyourpdf-docs";

type EnvironmentConfig = {
    AUTH_SERVER_URL?: string;
    CONVERSATIONS_SERVER_URL?: string;
    DOCUMENT_MANAGEMENT_SERVER_URL?: string;
    PRO_PLUGIN_SERVER_URL?: string;
    API_SERVICE_SERVER_URL?: string;
    AUTH_FRONTEND_URL?: string;
    LIT_REVIEW_SERVER_URL?: string;
    CURRENT_ENV: string;
    MAIN_APP_URL?: string;
    OG_IMAGE_URL?: string;
    TOOLS_GEN_URL? : string;
};

function getURL() {
    const environments: Record<string, EnvironmentConfig> = {
        production: {
            AUTH_SERVER_URL: "https://auth-service.askyourpdf.com",
            CONVERSATIONS_SERVER_URL: "https://chat-api.askyourpdf.com",
            DOCUMENT_MANAGEMENT_SERVER_URL: "https://doc-api.askyourpdf.com",
            PRO_PLUGIN_SERVER_URL: "https://pro.askyourpdf.com",
            API_SERVICE_SERVER_URL: "https://api.askyourpdf.com",
            AUTH_FRONTEND_URL: "https://auth.askyourpdf.com",
            LIT_REVIEW_SERVER_URL: "https://lit-review.askyourpdf.com",
            CURRENT_ENV: "production",
            MAIN_APP_URL: "https://askyourpdf.com",
            OG_IMAGE_URL: "https://imagedelivery.net/hYJU-PhERMuLWB8TBRFWpw",
            TOOLS_GEN_URL: "https://tools.askyourpdf.com"
        },
        staging: {
            AUTH_SERVER_URL: "https://auth.askingstage.com",
            CONVERSATIONS_SERVER_URL: "https://chat.askingstage.com",
            DOCUMENT_MANAGEMENT_SERVER_URL: "https://upload.askingstage.com",
            PRO_PLUGIN_SERVER_URL: "https://pro-plugin.askingstage.com",
            API_SERVICE_SERVER_URL: "https://api.askingstage.com",
            AUTH_FRONTEND_URL: "https://beta-auth.askingstage.com",
            LIT_REVIEW_SERVER_URL: "https://lit-review.askingstage.com",
            CURRENT_ENV: "staging",
            MAIN_APP_URL: "https://next.askingstage.com/",
            OG_IMAGE_URL: "https://imagedelivery.net/hYJU-PhERMuLWB8TBRFWpw",
            TOOLS_GEN_URL: "https://tools.askyourpdf.com"
        },
        development: {
            AUTH_SERVER_URL: "http://127.0.0.1:5100",
            CONVERSATIONS_SERVER_URL: "http://127.0.0.1:5200",
            DOCUMENT_MANAGEMENT_SERVER_URL: "http://127.0.0.1:5300",
            PRO_PLUGIN_SERVER_URL: "http://127.0.0.1:5400",
            API_SERVICE_SERVER_URL: "http://127.0.0.1:5500",
            LIT_REVIEW_SERVER_URL: "http://127.0.0.1:5700",
            AUTH_FRONTEND_URL: "http://localhost:3000",
            MAIN_APP_URL: "http://localhost:3000",
            CURRENT_ENV: "development",
            OG_IMAGE_URL: "https://imagedelivery.net/hYJU-PhERMuLWB8TBRFWpw",
            TOOLS_GEN_URL: "https://tools.askingstage.com"
        },
    };
    const env = process.env.NEXT_PUBLIC_MY_ENV || "production";
    return environments[env];
}

export const {
    AUTH_SERVER_URL,
    CONVERSATIONS_SERVER_URL,
    DOCUMENT_MANAGEMENT_SERVER_URL,
    PRO_PLUGIN_SERVER_URL,
    AUTH_FRONTEND_URL,
    LIT_REVIEW_SERVER_URL,
    CURRENT_ENV,
    MAIN_APP_URL,
    OG_IMAGE_URL,
    TOOLS_GEN_URL
} = getURL();

export const INCLUDE_CREDENTIALS =
    CURRENT_ENV === "production" || CURRENT_ENV === "staging"
        ? "include"
        : undefined;

export enum UserPlan {
    ANONYMOUS = "anonymous",
    BASIC = "basic",
    PREMIUM = "premium",
    PRO = "pro",
    ENTERPRISE = "enterprise",
}

export enum UserAPIPlan {
    API_FREE = "api_free",
    API_PREMIUM = "api_premium",
    API_ENTERPRISE = "api_enterprise",
}

export const UNPAID_ROLES = [UserPlan.ANONYMOUS, UserPlan.BASIC];
export const PAID_ROLES = [UserPlan.PREMIUM];
export const PRO_ROLE = UserPlan.PRO;
export const ENTERPRISE_ROLE = UserPlan.ENTERPRISE;

export const ANON_CONVERSATION_LIMIT = 1;
export const UNPAID_CONVERSATION_LIMIT = 2;
export const PREMIUM_CONVERSATION_LIMIT = 1000;
export const PRO_CONVERSATION_LIMIT = 1000;
export const ENTERPRISE_CONVERSATION_LIMIT = 10000;

export const API_UNPAID_ROLE = UserAPIPlan.API_FREE;
export const API_PAID_ROLE = UserAPIPlan.API_PREMIUM;
export const API_ENTERPRISE_ROLE = UserAPIPlan.API_ENTERPRISE;

export const WEB_SUBSCRIPTION_PLAN_TYPE = "WEB";
export const API_SUBSCRIPTION_PLAN_TYPE = "API";
export const ENTERPRISE_EMAIL = "mailto:enterprise@askyourpdf.com";

export const DEV_PLAN_CONFIG: { [key: string]: any } = {
    api_free: {
        name: "API Free",
        price: "0",
        messages: 100,
        pages: 5000,
        maximumDocuments: 10,
    },
    api_premium: {
        name: "API Premium",
        price: "19.99",
        messages: 2000,
        pages: 30000,
        maximumDocuments: 100,
    },
    api_premium_1: {
        name: "API Premium 1",
        price: "49.99",
        messages: 6000,
        pages: 60000,
        maximumDocuments: 300,
    },
    api_premium_2: {
        name: "API Premium 2",
        price: "99.99",
        messages: 9000,
        pages: 90000,
        maximumDocuments: 500,
    },
    api_premium_3: {
        name: "API Premium 3",
        price: "299.99",
        messages: 36000,
        pages: 360000,
        maximumDocuments: 1500,
    },
    api_premium_4: {
        name: "API Premium 4",
        price: "499.99",
        messages: 60000,
        pages: 600000,
        maximumDocuments: 3000,
    },
    api_enterprise: {
        name: "API Enterprise",
        price: "Custom",
        messages: 2000,
        pages: 60000,
    },
};

export const LIVE_API_CREATION = [
    UserAPIPlan.API_PREMIUM,
    UserAPIPlan.API_ENTERPRISE,
];
export const PREMIUM_ROLES = [
    UserAPIPlan.API_PREMIUM,
    UserAPIPlan.API_ENTERPRISE,
    UserPlan.PREMIUM,
    UserPlan.ENTERPRISE,
    UserPlan.PRO,
];

interface Plans {
    name: string;
    maxFileSizePerDoc: number;
    maxNumberPagesPerDoc: string;
    maxNumberDocsPerDay: string;
    maxNumberConversationsPerDay: string;
    maxNumberQuestionsPerDay: string;
    MaxNumberQuestionsPerDayPlugin: string;
}

interface PremiumPlans {
    name: string;
    maxNumberOfPagesPerMonth: string;
    maxNumberOfDocsPerMonth: string;
    maxFileSizePerDoc: string;
    maxNumberOfQuestionsPerMonth: string;
    maxAp1Keys: string;
    amount: number;
}

export const WEB_PLAN_PRICES: { [key: string]: { [key: string]: string } } = {
    month: {
        free: "0.00",
        premium: "9.99",
        pro: "14.99",
        slashedPremium: "12.99",
        slashedPro: "19.99",
        enterprise: "Custom",
    },
    year: {
        free: "0.00",
        premium: "89.99",
        pro: "119.99",
        slashedPremium: "119.99",
        slashedPro: "179.99",
        enterprise: "Custom",
    },
};


export const WEB_PLAN_CONFIG: Plans[] = [
    {
        name: "Free",
        maxFileSizePerDoc: 15728640,
        maxNumberPagesPerDoc: "100",
        maxNumberDocsPerDay: "1",
        maxNumberQuestionsPerDay: "50",
        MaxNumberQuestionsPerDayPlugin: "50",
        maxNumberConversationsPerDay: "3",
    },
    {
        name: "Premium",
        maxFileSizePerDoc: 31457280,
        maxNumberPagesPerDoc: "2500",
        maxNumberDocsPerDay: "50",
        maxNumberQuestionsPerDay: "1200",
        MaxNumberQuestionsPerDayPlugin: "1200",
        maxNumberConversationsPerDay: "50",
    },
    {
        name: "Pro",
        maxFileSizePerDoc: 94371840,
        maxNumberPagesPerDoc: "6000",
        maxNumberDocsPerDay: "150",
        maxNumberQuestionsPerDay: "Unlimited",
        MaxNumberQuestionsPerDayPlugin: "Unlimited",
        maxNumberConversationsPerDay: "Unlimited",
    },
    {
        name: "Enterprise",
        maxFileSizePerDoc: 150000000,
        maxNumberPagesPerDoc: "2500",
        maxNumberDocsPerDay: "1000",
        maxNumberQuestionsPerDay: "Unlimited",
        MaxNumberQuestionsPerDayPlugin: "Unlimited",
        maxNumberConversationsPerDay: "Unlimited",
    },
];
export const SUMMARY_MAX_PAGES = 200;


export const CREDITS = {
    1: {quantity: 50, price: 5},
    2: {quantity: 100, price: 10},
    3: {quantity: 200, price: 20},
    4: {quantity: 300, price: 30},
    5: {quantity: 400, price: 40},
    6: {quantity: 500, price: 50},
    7: {quantity: 600, price: 60},
    8: {quantity: 700, price: 70},
    9: {quantity: 800, price: 80},
    10: {quantity: 1000, price: 100},
};

export const modelDisplayNames = {
    [ModelName.GPT3]: "GPT-3.5",
    [ModelName.GPT4]: "GPT-4",
    [ModelName.CLAUDE1]: "Claude",
    [ModelName.CLAUDE2]: "Claude-2"
};


export const chat_models = [
    {
        name: ModelName.GPT3,
        text: "GPT-3.5",
        image: Flash,
        activeImage: FlashActive
    },
    {
        name: ModelName.GPT4,
        text: "GPT-4",
        image: Sparkle,
        activeImage: SparkleActive
    },
    {
        name: ModelName.CLAUDE1,
        text: "Claude",
        image: Claude,
        activeImage: ClaudeActive
    },
    {
        name: ModelName.CLAUDE2,
        text: "Claude 2",
        image: Claude,
        activeImage: ClaudeActive
    }
];

export const successMessages = {
    web: {
        title: msg`Account Upgraded`,
        body: msg`Communicating with documents has never felt this easy using AskYourPDF`,
    },
    api: {
        title: msg`Account Upgraded`,
        body: msg`Communicating with documents has never felt this easy using AskYourPDF`,
    },
    one_time: {
        title: msg`Purchase Successful`,
        body: msg`Communicating with documents has never felt this easy using AskYourPDF`,
    }
}
export const FAQDATA = [
    {question:"What is AskYourPDF?",answer:"It's an application that lets you chat with any document you upload"},
    {question:"Can I chat in any language?",answer:"Yes, AskYourPDF is multilingual and supports chatting in any language of your choice."},
    {question:"How does it work?",answer:"The application uses artificial intelligence to analyze the content of the document and provide a chat interface for users to ask questions get answers."},
    {question:"Can I download the chat history?",answer:"Yes, chat history can be downloaded."},
    {question:"Can I upload any document?", answer: 'We support multiple document formats: ".pdf", ".txt", ".ppt", ".pptx", ".csv", ".epub", and ".rtf".',},
    {question:"What if I have a question that the AI can't answer?",answer:" If the answer is in the uploaded document, there's a high likelihood the AI will provide it. The AI is constantly learning, so if it doesn't have an answer, you can always rephrase or ask a different question."},
    {question:"How does billing work?",answer:"AskYourPDF offers three plans: Premium, Pro and Enterprise. "},
    {question:"Is my data secure?",answer:"Absolutely. Data privacy is our top priority. The application employs industry-standard SSL encryption to ensure the protection of your information."},
    {question:"Is it necessary to create an account to use the application?",answer:"No, you don't need to create an account to use the application. However, there are some restrictions. To explore the vast capabilities of AskYourPDF, you'll need an upgraded plan."},
    {question:"Can I edit the document while using AskYourPDF?",answer:"No, documents cannot be edited within AskYourPDF. But this will be possible in the future."},
    {question:"Can I chat with other users of the application?",answer:"No, the chat interface is solely for interacting with the content of the document."},
    {question:"Is there a limit to the size of the document that can be uploaded?",answer:"Yes, the maximum file size for document uploads is 15MB for free users. However, Premium and Pro users can upload as high as 30MB and 90MB respectively. For larger file sizes, users need to contact us for the enterprise plan."},
    {question:"Is there a limit to the number of documents I can upload?",answer:"Free users can upload one document per day. Premium and Pro users can upload 50 and 150 documents per day respectively. For higher number of uploads, users need to contact us for the enterprise plan."},
    {question:"Can I upload multiple documents at once?",answer:"No, only one document can be uploaded at a time. But this will be possible in the future."},
    {question:"Is the application free to use?",answer:"Yes, the application is free to use, but with certain restrictions. An upgraded plan is required to explore the vast capabilities of AskYourPDF. Documents uploaded by Free users remain in our database for a maximum of 90 days before removal."},
    {question:"If I cancel my subscription, will I get a refund?",answer:"Subscribers can cancel their subscription at any time. However, no refunds will be provided for any unused portion of the subscription period."},
    {question:"How long are the chat sessions saved on AskYourPDF?",answer:"Chat sessions remain available as long as the browser tab is open."},
    {question:"What if I have a question or a problem while using AskYourPDF?",answer:" If you encounter any issues or have questions while using AskYourPDF, please contact our support team: support@askyourpdf.com. They're here to help! "},
    {question:"What does 'additional credits may be required' mean in the pricing section?",answer:"The summarisation service, GPT4 and Claude 2, operate on a credit-based system; while initial credits are provided complimentary as part of your subscription, additional credits may need to be purchased once these are exhausted. All credit purchases are final, non-refundable, and must be used exclusively for the Summarization Service, GPT4, or Claude 2."},
]


export const GENERATOR_PARAMETERS = {
        rap_generator : [
            {
                type: 'SELECT_TYPE',
                place_holder: 'Select Style',
                options: [
                    { value: 'Old School', label: 'Old School'},
                    { value: 'Trap', label: 'Trap'},
                    { value: 'Gangstar', label: 'Gangstar'},
                ],
            },
            {
                type: 'SELECT_BEST_TEMPO',
                place_holder: 'Select Best Tempo',
                options: [
                    { value: 'fast', label: 'Fast'},
                    { value: 'medium', label: 'Medium'},
                    { value: 'slow', label: 'Slow'},
                ]
            },
            {
                type: 'COMPLEXITY',
                place_holder: 'Select Complexity',
                options: [
                    { value: 'simplicity of words', label: 'Simplicity Of Words'},
                    { value: 'complex vocabulary', label: 'Complex Vocabulary'},
                ]
            }
        ]
    };



export const ChatLocales : { [key: string]: string }= {
  EN: "ENGLISH",
  ZH: "CHINESE",
  JA: "JAPANESE",
  ES: "SPANISH",
  DE: "GERMAN",
  FR: "FRENCH",
  KO: "KOREAN",
  PT: "PORTUGUESE",
  AR: "ARABIC",
}