//import { Plan, Subscription } from "@/services/payment";
import {ModelName} from '@/types/conversations';
import Sparkle from "@/img/Sparkle.svg?url";
import SparkleActive from "@/img/SparkleGold.svg?url";
import Flash from "@/img/Flash.svg?url";
import FlashActive from "@/img/FlashGold.svg?url";
import ClaudeActive from '@/img/ClaudeActive.svg?url';
import Claude from '@/img/Claude.svg?url';
import { msg } from "@lingui/macro";

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
  API_SERVICE_SERVER_URL,
  AUTH_FRONTEND_URL,
  LIT_REVIEW_SERVER_URL,
  CURRENT_ENV,
  MAIN_APP_URL,
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
  web:{
    title: msg`Account Upgraded`,
    body: msg`Communicating with documents has never felt this easy using AskYourPDF`,
  },
  api:{
    title: msg`Account Upgraded`,
    body: msg`Communicating with documents has never felt this easy using AskYourPDF`,
  },
  one_time:{
    title: msg`Purchase Successful`,
    body: msg`Communicating with documents has never felt this easy using AskYourPDF`,
  }
}