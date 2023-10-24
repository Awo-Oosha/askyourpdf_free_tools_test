import WhatsappIcon from "../img/Whatsapp.svg?url";
import TelegramIcon from "../img/Telegram.svg?url";
import TwitterIcon from "../img/TwitterBlue.svg?url";
import FacebookIcon from "../img/Facebook.svg?url";
import {
  ANON_CONVERSATION_LIMIT,
  API_ENTERPRISE_ROLE,
  API_PAID_ROLE,
  API_UNPAID_ROLE,
  ENTERPRISE_CONVERSATION_LIMIT,
  ENTERPRISE_ROLE,
  PAID_ROLES,
  PREMIUM_CONVERSATION_LIMIT,
  PRO_CONVERSATION_LIMIT,
  PRO_ROLE,
  UNPAID_CONVERSATION_LIMIT,
  UNPAID_ROLES,
  UserAPIPlan,
  UserPlan,
} from "../config/config";

export function trimWord(
  sentence: string,
  searchTerm: string,
  numWordsBefore: number
) {
  const words = sentence.split(" ");
  let index: number = -1;

  // Find the index of the word that contains the specified part
  for (let i = 0; i < words.length; i++) {
    if (words[i].toLowerCase().includes(searchTerm.toLowerCase())) {
      index = i;
      break;
    }
  }

  const startIndex = Math.max(0, index - numWordsBefore);
  const modifiedString = words.slice(startIndex).join(" ");

  return modifiedString;
}

export function formatDate(dateString: string) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dateObj = new Date(dateString);

  const month = months[dateObj.getUTCMonth()];
  const year = dateObj.getUTCFullYear();

  return `${month} ${year}`;
}

export function getPDFName(url: string) {
  let strings = url.split(".");
  if (strings.length < 2) {
    return null;
  }

  let lastString = strings[strings.length - 1];
  if (lastString === "pdf") {
    let paths = url.split("/");
    return paths[paths.length - 1];
  }
  return null;
}

export const validateURL = (url: string) => {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "http://" + url;
  }
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};

export function transformPDFName(documentName: string) {
  const extensionIndex = documentName.lastIndexOf(".");

  if (extensionIndex === -1) {
    return documentName;
  }

  const documentNameWithoutExtension = documentName.slice(0, extensionIndex);

  return (
    documentNameWithoutExtension.charAt(0).toUpperCase() +
    documentNameWithoutExtension.slice(1)
  );
}

export const formatListDate = (date: string) => {
  const now = new Date();
  const conversationDate = new Date(date);
  const timeDifferenceInDays =
    (new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime() -
      new Date(
        conversationDate.getFullYear(),
        conversationDate.getMonth(),
        conversationDate.getDate()
      ).getTime()) /
    (1000 * 60 * 60 * 24);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (timeDifferenceInDays < 1) {
    return "Today";
  } else if (timeDifferenceInDays < 2) {
    return "Yesterday";
  } else if (timeDifferenceInDays < 7) {
    return "Past 7 days";
  } else if (timeDifferenceInDays < 30) {
    return "Past 30 days";
  } else if (timeDifferenceInDays < 365) {
    return monthNames[conversationDate.getMonth()];
  } else {
    return `${
      monthNames[conversationDate.getMonth()]
    } ${conversationDate.getFullYear()}`;
  }
};

export function timeoutPromise(
  prom: Promise<any>,
  time: number,
  exception: string | Symbol
) {
  let timer: NodeJS.Timeout;
  return Promise.race([
    prom,
    new Promise((_r, rej) => (timer = setTimeout(rej, time, exception))),
  ]).finally(() => clearTimeout(timer));
}

export function getShareLinks(name: string, shareUrl: string) {
  const appUrl = encodeURIComponent(shareUrl);
  const shareText = encodeURIComponent(
    `Click on this link to chat with my document titled ${name} on AskYourPDF`
  );
  const facebookLink = `https://www.facebook.com/sharer.php?u=${appUrl}&text=${shareText}`;
  const twitterShareUrl = `https://twitter.com/share?url=${appUrl}&text=${shareText}`;
  const telegramLink = `https://t.me/share/url?url=${appUrl}&text=${shareText}`;
  const whatsapplink = `https://api.whatsapp.com/send?text=${appUrl} ${shareText}`;

  return [
    {
      name: "Facebook",
      link: facebookLink,
      icon: FacebookIcon,
    },
    {
      name: "Telegram",
      link: telegramLink,
      icon: TelegramIcon,
    },
    {
      name: "Twitter",
      link: twitterShareUrl,
      icon: TwitterIcon,
    },
    {
      name: "WhatsApp",
      link: whatsapplink,
      icon: WhatsappIcon,
    },
  ];
}

export function formatMessageDateTime(datetimeStr: string): string {
  const today: Date = new Date(); // Current date and time

  // Parse the datetime string into a Date object
  const datetime: Date = new Date(datetimeStr);

  if (datetime.toDateString() === today.toDateString()) {
    // If the datetime is today, return time only
    const timeString: string = datetime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return timeString;
  } else {
    // If the datetime is earlier than today, return full datetime
    const dateTimeString: string = datetime.toLocaleString([], {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return dateTimeString;
  }
}

export function validateConversationCount(
  userDetails: any,
  conversationCount: number,
  userAnalyticsConversationCount: any
) {
  if (
    userDetails?.email === undefined &&
    conversationCount >= ANON_CONVERSATION_LIMIT
  ) {
    return false;
  }

  const userRole = getUserRole(userDetails);

  if (userRole === UserPlan.ENTERPRISE) {
    return true;
  }

  if (userRole === UserPlan.PRO) {
    return true;
  }

  if (userRole === UserPlan.PREMIUM) {
    return userAnalyticsConversationCount < PREMIUM_CONVERSATION_LIMIT;
  }

  if (userRole === "free") {
    return userAnalyticsConversationCount < UNPAID_CONVERSATION_LIMIT;
  }

  return true;
}

export function convertToMB(fileSize: number) {
  return fileSize / (1024 * 1024);
}

export function calculateAnalytics(analytic: string) {
  if (analytic === undefined) {
    return "-";
  }

  const [numerator, denominator] = analytic.split("/").map(Number);

  if (isNaN(numerator) || isNaN(denominator)) {
    return "-";
  }

  return ((numerator / denominator) * 100).toFixed(2);
}

export function getUserRole(
  userDetails: any
): "free" | "premium" | "enterprise" | "pro" {
  let plan: "free" | "premium" | "enterprise" | "pro" = "free";
  if (userDetails?.roles === undefined) {
    return plan;
  }

  if (userDetails.roles.includes(ENTERPRISE_ROLE)) {
    plan = "enterprise";
    return plan;
  }

  if (userDetails.roles.includes(PRO_ROLE)) {
    plan = "pro";
    return plan;
  }

  if (PAID_ROLES.some((role) => userDetails.roles.includes(role))) {
    plan = "premium";
    return plan;
  }

  if (
    UNPAID_ROLES.some((role) => userDetails.roles.includes(role)) &&
    !PAID_ROLES.some((role) => userDetails.roles.includes(role))
  ) {
    return plan;
  }

  return plan;
}

export function getUserConversationLimit(userDetails: any) {
  if (userDetails === undefined) {
    return ANON_CONVERSATION_LIMIT;
  }

  const userRole = getUserRole(userDetails);

  return {
    free: UNPAID_CONVERSATION_LIMIT,
    premium: PREMIUM_CONVERSATION_LIMIT,
    pro: PRO_CONVERSATION_LIMIT,
    enterprise: ENTERPRISE_CONVERSATION_LIMIT,
  }[userRole];
}

export function getAPIRole(userDetails: any) {
  if (userDetails === undefined) {
    return API_UNPAID_ROLE;
  }

  if (userDetails.roles?.includes(API_ENTERPRISE_ROLE)) {
    return API_ENTERPRISE_ROLE;
  }

  if (userDetails.roles?.includes(API_PAID_ROLE)) {
    return API_PAID_ROLE;
  }

  if (userDetails.roles?.includes(API_UNPAID_ROLE)) {
    return API_UNPAID_ROLE;
  }
  return API_UNPAID_ROLE;
}

function capitalizeFirstLetter(role: string) {
  if (role.startsWith("api")) {
    let split_role = role.split("_");
    let role_name =
      split_role[1].charAt(0).toUpperCase() + split_role[1].slice(1);
    return split_role[0].toUpperCase() + " " + role_name;
  }
  return role.charAt(0).toUpperCase() + role.slice(1);
}

export function getUserPlan(roles: string[]) {
  let plan = "FREE";

  if (roles.includes(UserPlan.ENTERPRISE)) {
    return capitalizeFirstLetter(UserPlan.ENTERPRISE);
  }
  if (roles.includes(UserPlan.PRO)) {
    return capitalizeFirstLetter(UserPlan.PRO);
  }
  if (roles.includes(UserPlan.PREMIUM)) {
    return capitalizeFirstLetter(UserPlan.PREMIUM);
  }
  return plan;
}

export function getUserPlanAPI(roles: string[]) {
  let plan = "API Free";

  if (roles.includes(UserAPIPlan.API_ENTERPRISE)) {
    return capitalizeFirstLetter(UserAPIPlan.API_ENTERPRISE);
  }
  if (roles.includes(UserAPIPlan.API_PREMIUM)) {
    return capitalizeFirstLetter(UserAPIPlan.API_PREMIUM);
  }
  return plan;
}

export function getUserPlans(roles: string[]) {
  let api_role = getUserPlanAPI(roles);
  let normal_role = getUserPlan(roles);

  return { normal_role, api_role };
}

export function formatPlan(plan: string): string {
  return plan
    .split("_")
    .map((word, index) =>
      word
        .split(" ")
        .map((part) => {
          if (index === 0 && part === "API") {
            return part;
          }
          return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
        })
        .join(" ")
    )
    .join(" ");
}

export function getCurrentTimestamp() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
}
export function convertUTCToLocalTime(utcTime: string) {
  const time = utcTime.concat("Z");

  return new Date(time);
}
export function convertPlanString(inputString: string) {
  // Replace spaces with underscores and convert to uppercase
  return inputString.replace(/ /g, "_").toUpperCase();
}

export function generateRandomIdentifier(length: number) {
  const characters = "0123456789";
  let identifier = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    identifier += characters[randomIndex];
  }

  return identifier;
}

export function toSentenceCase(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export function removeMarkdown(input: string): string {
  // Remove inline code blocks (backticks)
  const withoutCodeBlocks = input.replace(/`[^`]+`/g, "");

  // Remove headings (lines starting with '#')
  const withoutHeadings = withoutCodeBlocks.replace(/^#+\s+/gm, "");

  // Remove emphasis (italic and bold)
  const withoutEmphasis = withoutHeadings.replace(
    /(\*|_){1,3}([^\*_]+)(\*|_){1,3}/g,
    "$2"
  );

  // Remove links
  const withoutLinks = withoutEmphasis.replace(/\[([^\]]+)\]\(.*?\)/g, "$1");

  // Remove images
  const withoutImages = withoutLinks.replace(/\!\[([^\]]+)\]\(.*?\)/g, "$1");

  // Remove blockquotes (lines starting with '>')
  const withoutBlockquotes = withoutImages.replace(/^\s*>/gm, "");

  return withoutBlockquotes;
}

export function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}
export function covertToItalics(sentence: any) {
  return sentence.replace(/<i>(.*?)<\/i>/g, "*$1*");
}

export const referenceBibTeXData = (bibTeXData: any) => {
  bibTeXData = bibTeXData.replace("booktitle", "book");
  // Define regular expressions to extract BibTeX fields
  const authorRegex = /author = {(.*?)},/;
  const journalRegex = /journal = {(.*?)},/;
  const volumeRegex = /volume = {(.*?)},/;
  const yearRegex = /year = {(.*?)}/;
  const bookTitleRegex = /book = {(.*?)}/;
  const pagesRegex = /pages = {(.*?)},/;
  const titleRegex = /title\s*=\s*{([^}]+)}/;

  // Extract relevant fields from BibTeX data
  const authorMatch = authorRegex.exec(bibTeXData);
  const titleMatch = titleRegex.exec(bibTeXData);
  const journalMatch = journalRegex.exec(bibTeXData);
  const volumeMatch = volumeRegex.exec(bibTeXData);
  const yearMatch = yearRegex.exec(bibTeXData);
  const pagesMatch = pagesRegex.exec(bibTeXData);
  const bookTitleMatch = bookTitleRegex.exec(bibTeXData);

  // Format the details into a complete sentence
  const author = authorMatch ? authorMatch[1] : "";
  const title = titleMatch ? titleMatch[1] : "";
  const journal = journalMatch ? journalMatch[1] : "";
  const volume = volumeMatch ? volumeMatch[1] : "";
  const year = yearMatch ? yearMatch[1] : "";
  const bookTitle = bookTitleMatch ? bookTitleMatch[1] : "";
  const pages = pagesMatch ? pagesMatch[1] : "";
  // const citation = `${title}," authored by ${author}, was published in ${year}. The work is part of the ${bookTitle} book, featured in the ${journal} journal, and falls under volume ${volume} and can be found in page ${pages}".`;
  let sentence = `${title},`;
  if (author) {
    sentence += ` authored by ${author},`;
  } else {
    sentence += ` author information is not available,`;
  }

  if (year) {
    sentence += ` was published in ${year}.`;
  } else {
    sentence += ` publication year is not available.`;
  }

  if (bookTitle) {
    sentence += ` The work is part of the ${bookTitle} book.`;
  }

  if (journal) {
    sentence += ` featured in the ${journal} journal.`;
  }

  if (volume) {
    sentence += ` falls under volume ${volume}.`;
  }
  if (pages) {
    sentence += ` It can be found on pages ${pages}.`;
  }
  return sentence;
};
