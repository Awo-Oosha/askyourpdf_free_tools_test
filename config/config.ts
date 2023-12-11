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
            TOOLS_GEN_URL: "https://tools.askyourpdf.com"
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

export const GENERATOR_PARAMETERS = {
        rap_generator : [
            {
                type: 'SELECT_TYPE',
                place_holder: msg`Select Style`,
                options: [
                    { value: 'Old School', label: msg`Old School`},
                    { value: 'Trap', label: msg`Trap`},
                    { value: 'Gangstar', label: msg`Gangstar`},
                ],
            },
            {
                type: 'SELECT_BEST_TEMPO',
                place_holder: msg`Select Best Tempo`,
                options: [
                    { value: 'fast', label: msg`Fast`},
                    { value: 'medium', label: msg`Medium`},
                    { value: 'slow', label: msg`Slow`},
                ]
            },
            {
                type: 'COMPLEXITY',
                place_holder: msg`Select Complexity`,
                options: [
                    { value: 'simplicity of words', label: msg`Simplicity Of Words`},
                    { value: 'complex vocabulary', label: msg`Complex Vocabulary`},
                ]
            }
        ],

        book_title_generator : [
            {
                type: "GENRE",
                place_holder: msg`Select Genre`,
                options : [
                    { value: "Fiction", label: msg`Fiction` },
                    { value: "Non-Fiction", label: msg`Non-Fiction` },
                    { value: "Misery", label: msg`Misery` },
                    { value: "Novel", label: msg`Novel` },
                    { value: "Thriller", label: msg`Thriller` },
                    { value: "Fantasy", label: msg`Fantasy` },
                    { value: "Sci-Fi", label: msg`Sci-Fi` },
                    { value: "Narrative", label: msg`Narrative` },
                ]
            },

            {

                type: "TARGET_AUDIENCE",
                place_holder:"Select Target Audience ",
                options : [
                    { value: "Children", label: msg`Children` },
                    { value: "YA", label: msg`YA` },
                    { value: "Adults", label: msg`Adults` },
                ]
            }
            ,
            {
                type:"MOOD/TONE",
                place_holder: msg`Mood/Tone`,
                options : [
                    { value: "Professional", label: msg`Professional` },
                    { value: "Casual", label: msg`Casual` },
                    { value: "Technical", label: msg`Tenchnical` },
                ]
            }
        ],

        essay_maker : [
            {
                type: "TYPE",
                place_holder: msg`Select Type`,
                options: [
                    {value: "Argumentative", label: msg`Argumentative` },
                    {value: "Descriptive", label: msg`Descriptive` },
                    {value: "Narrative", label: msg`Narrative` },
                    {value: "Expository", label: msg`Expository` },
            ]},
            {
                type: "PARAGRAPH",
                place_holder: msg`Number of Paragraphs`,
                options: [
                    {value: null, label: msg`Number of Paragraphs` },
                    {value: "1", label: msg`One` },
                    {value: "2", label: msg`Two` },
                    {value: "3", label: msg`Three` },
                    {value: "4", label: msg`Four` },
                    {value: "5", label: msg`Five` },
                    {value: "6", label: msg`Six` },
                    {value: "7", label: msg`Seven` },
                    {value: "8", label: msg`Eight` },
                ]
            }
        ],

        instagram_caption: [
            {
                type: "TYPE_OF_POST",
                place_holder:"Select Type of Post",
                options: [
                        {value : "Travel", label: msg`Travel` },
                        {value : "Food", label: msg`Food` },
                        {value : "Passion", label: msg`Passion` },
                    ]
                },
            {
                type: "Mood",
                place_holder: msg`Select Mood `,
                options: [
                        {value : "Funny", label: msg`Funny` },
                        {value : "Inspirational", label: msg`Inspirational` },
                        {value : "Casual", label: msg`Casual` },
                        {value : "Serious", label: msg`Serious` },

                    ]
                }
            ,
            {
                type: "HASHTAGS_PREFERENCES",
                place_holder: msg`Hashtags Preferences`,
                options: [
                        {value : "", label: msg`Hashtags Preferences` },
                        {value : "Include Hashtag", label: msg`Include Hashtag` },
                ]
            }
        ],

        lyrics_generator: [
            {   type: "GENRE",
                place_holder: msg`Select Genre`,
                options: [
                    { value: "Pop", label: msg`Pop` },
                    { value: "Rock", label: msg`Rock` },
                    { value: "Hip Hop", label: msg`Hip Hop` },
                    { value: "Electronic", label: msg`Electronic` },
                    { value: "R&B", label: msg`R&B` },
                    { value: "Afro Beat", label: msg`Afro Beat` },
                    // Add more genres as needed
                ]
            },
            {   type: "MOOD",
                place_holder: msg`Select Mood`,
                options: [
                    { value: "Happy", label: msg`Happy` },
                    { value: "Sad", label: msg`Sad` },
                    { value: "Energetic", label: msg`Energetic` },
                    { value: "Chill", label: msg`Chill` },
                    { value: "Romantic", label: msg`Romantic` },
                    // Add more moods as needed
                ]
            },
            {   type: "THEME",
                place_holder: msg`Select Theme`,
                options: [
                    { value: "Love ", label: msg`Love` },
                    { value: "Betrayal", label: msg`Betrayal` },
                    { value: "Success", label: msg`Success` },
                    
                    // Add more moods as needed
                ]
            },
            {
                type: "STYLE",
                place_holder: msg`Artist Style`,
                options: [
                    { value: "JayZ", label: msg`JayZ` },
                    { value: "Beyonce", label: msg`Beyonce` },
                    { value: "Kendrick Lamar", label: msg`Kendrick Lamar` },
                    { value: "Burna Boy", label: msg`Burna Boy` },
                    { value: "Bad bunny", label: msg`Bad Bunny` },
                    // Add more moods as needed
                ]
            }
        ],
        
        paragraph_generator: null,

        poem_generator: [
            {   
                type: "STYLE",
                place_holder: msg`Select Style`,
                options: [
                    {value: "Sonnet", label: msg`Sonnet` },
                    {value: "Haiku", label: msg`Haiku` },
                    {value: "Limerick", label: msg`Limerick` },
                    {value: "Free Verse", label: msg`Free Verse` },
                ]
            },
            {   
                type: "MOOD",
                place_holder: msg`Select Mood`,
                options: [
                    {value: "Romantic", label: msg`Romantic` },
                    {value: "Melancholic", label: msg`Melancholic` },
                    {value: "Joyful", label: msg`Joyful` },
                ]
            },
            {   
                type: "THEME",
                place_holder: msg`Select Themes`,
                options: [
                    {value: "Nature", label: msg`Nature` },
                    {value: "Love", label: msg`Love` },
                    {value: "Death", label: msg`Death` },
                    {value: "Time", label: msg`Time` },
                ]
            },
            {   
                type: "LENGTH",
                place_holder: msg`Length`,
                options: [
                    {value: null, label: msg`Length` },
                    {value: "Very Short", label: msg`Very Short` },
                    {value: "Short", label: msg`Short` },
                    {value: "Medium", label: msg`Medium` },
                    {value: "Long", label: msg`Long` },
                    {value: "Very Long", label: msg`Very Long` },
                ]
            }
        ],

        story_generator: [
            {
                type: "LENGTH",
                place_holder: msg`Length`,
                options: [
                    {value: "Short story", label: msg`Short story` },
                    {value: "Novella", label: msg`Novella` },
                    {value: "Full length", label: msg`Full length` },
                ]
            },
            {
                type: "SETTINGS",
                place_holder: msg` Settings`,
                options: [
                    {value: "Time", label: msg`Time` },
                    {value: "Period", label: msg`Period` },
                    {value: "Location", label: msg`Location` },
                ]
            }
        ],
        
        text_generator: [
            {
                type: "PURPOSE",
                place_holder: msg`Select Purpose `,
                options: [
                    {value: "General Content", label: msg`General Content` },
                    {value: "Marketing", label: msg`Marketing` },
                    {value: "Educatonal", label: msg`Educational` },
                    {value: "Fictional", label: msg`Fictional` },
                ]
            },
            {
                type: "TONE",
                place_holder: msg`Select Tone `,
                options: [
                    {value: "Professional", label: msg`Professional` },
                    {value: "Casual", label: msg`Casual` },
                    {value: "Technical", label: msg`Technical` },
                ]
            }
            ,
            {
                type: "LENGHT",
                place_holder: msg`Select Length`,
                options: [
                    {value: null, label: msg`Select Length` },
                    {value: "Very Short", label: msg`Very Short` },
                    {value: "Short", label: msg`Short` },
                    {value: "Medium", label: msg`Medium` },
                    {value: "Long", label: msg`Long` },
                    {value: "Very Long", label: msg`Very Long` },
                ]
            }
        ],

        thesis_generator: [
            {
                type: "TYPE_OF_PAPER",
                place_holder: msg`Select Type of Paper`,
                options:[
                    {value: "Argumentative", label: msg`Argumentative` },
                    {value: "Analytical", label: msg`Analytical` },
                    {value: "Expository", label: msg`Expository` },
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