import {CONVERSATIONS_SERVER_URL, INCLUDE_CREDENTIALS,} from "@/config/config";

export class APIError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export enum SummarizationFormat {
  AUTO = "AUTO",
  PARAGRAPH = "PARAGRAPH",
  BULLET = "BULLET",
  PAPER = "PAPER",
}

export enum SummarizationLength {
  AUTO = "AUTO",
  SHORT = "SHORT",
  LONG = "LONG",
}

export async function createConversation(token: string) {
  try {
    const res = await fetch(`${CONVERSATIONS_SERVER_URL}/chat`, {
      method: "GET",
      credentials: INCLUDE_CREDENTIALS,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const j = await res.json();
      if (j?.detail) {
        throw new APIError(j.detail, res.status);
      } else {
        throw new Error(JSON.stringify(j));
      }
    }

    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getConversations(
  token: string,
  page: number = 1,
  pageSize: number = 20
) {
  const requestUrl = `${CONVERSATIONS_SERVER_URL}/conversations?page=${page}&page_size=${pageSize}&order=desc`;

  try {
    const res = await fetch(requestUrl, {
      method: "GET",
      credentials: INCLUDE_CREDENTIALS,
      headers: { Authorization: `Bearer ${token}` },
    });

    const j = await res.json();

    if (!res.ok) {
      throw new Error(JSON.stringify(j));
    }

    return j;
  } catch (err) {
    throw err;
  }
}

export async function getConversation(
  token: string,
  chatID: string,
  page: number = 1,
  pageSize: number = 100,
  order?: string 
) {
  if (order === undefined) {
    order = "desc";
  }
  const requestUrl = `${CONVERSATIONS_SERVER_URL}/conversations/${chatID}?page=${page}&page_size=${pageSize}&order=${order}`;
  try {
    const res = await fetch(requestUrl, {
      method: "GET",
      credentials: INCLUDE_CREDENTIALS,
      headers: { Authorization: `Bearer ${token}` },
    });

    const j = await res.json();

    if (!res.ok) {
      throw new Error(JSON.stringify(j));
    }

    return j;
  } catch (err) {
    throw err;
  }
}

export async function validateID(docID: string, token: string) {
  try {
    const res = await fetch(`${CONVERSATIONS_SERVER_URL}/chat/${docID}`, {
      method: "GET",
      credentials: INCLUDE_CREDENTIALS,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const j = await res.json();

    if (!res.ok) {
      if (j?.detail) {
        throw new APIError(j.detail, res.status);
      } else {
        throw new Error(JSON.stringify(j));
      }
    }

    return j;
  } catch (err) {
    throw err;
  }
}

export async function sendMessage(
    message: any,
    documentId: any,
    chatId: any,
    token: any,
    modelName: any,
    signal: AbortSignal
) {
    try {
        const res = await fetch(
            `${CONVERSATIONS_SERVER_URL}/chat/${documentId}?chat_id=${chatId}&model_name=${modelName}`,
            {
                method: "POST",
                credentials: INCLUDE_CREDENTIALS,
                body: JSON.stringify({message: message}),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                signal,
            }
        );

    if (!res.ok) {
      const j = await res.json();
      if (j?.detail) {
        throw new APIError(j.detail, res.status);
      } else {
        throw new APIError("An error occurred. Please try again", res.status);
      }
    }

    return res;
  } catch (err) {
    throw err;
  }
}

export async function sendFeedback(
  details: any,
  issue: any,
  token: any,
  chatId: any,
  messageID: any
) {
  try {
    const res = await fetch(
      `${CONVERSATIONS_SERVER_URL}/feedback/${chatId}/${messageID}`,
      {
        method: "POST",
        credentials: INCLUDE_CREDENTIALS,
        body: JSON.stringify({ expression: "DISLIKE", details, issue }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new APIError(
        errorData.detail || "An error occurred while submitting feedback",
        res.status
      );
    }

    return res;
  } catch (err) {
    throw err;
  }
}


export async function sendExpression(
  token: any,
  chatId: any,
  messageID: any
) {
  try {
    const res = await fetch(
      `${CONVERSATIONS_SERVER_URL}/feedback/${chatId}/${messageID}`,
      {
        method: "POST",
        credentials: INCLUDE_CREDENTIALS,
        body: JSON.stringify({ expression: "LIKE"}),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new APIError(
        errorData.detail || "An error occurred while submitting feedback",
        res.status
      );
    }

    return res;
  } catch (err) {
    throw err;
  }
}
// https://chat.askingstage.com/docs#/conversations/chat_endpoint_summary_post

export async function summariseDocument(
  doc_id: any,
  prompt: any,
  token: any,
  signal: AbortSignal,
  summarizationFormat: SummarizationFormat = SummarizationFormat.AUTO,
  summarizationLength: SummarizationLength = SummarizationLength.AUTO
) {
  try {
    const res = await fetch(`${CONVERSATIONS_SERVER_URL}/summary`, {
      method: "POST",
      credentials: INCLUDE_CREDENTIALS,
      body: JSON.stringify({
        doc_id,
        prompt,
        format: summarizationFormat,
        length: summarizationLength,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      signal,
    });

    if (!res.ok) {
      const j = await res.json();
      if (j?.detail) {
        throw new APIError(j.detail, res.status);
      } else {
        throw new APIError("An error occurred. Please try again", res.status);
      }
    }

    return res;
  } catch (err) {
    throw err;
  }
}

export async function summariseText(
  summary_text: string,
  summarizationFormat: SummarizationFormat = SummarizationFormat.AUTO,
  summarizationLength: SummarizationLength = SummarizationLength.AUTO,
  token: any,
  signal: AbortSignal
) {
  try {
    const res = await fetch(`${CONVERSATIONS_SERVER_URL}/text-summary`, {
      method: "POST",
      credentials: INCLUDE_CREDENTIALS,
      body: JSON.stringify({
        summary_text,
        format: summarizationFormat,
        length: summarizationLength,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      signal,
    });

    if (!res.ok) {
      const j = await res.json();
      if (j?.detail) {
        throw new APIError(j.detail, res.status);
      } else {
        throw new APIError("An error occurred. Please try again", res.status);
      }
    }

    return res;
  } catch (err) {
    throw err;
  }
}

export async function deleteConversation({
  token,
  chat_id,
}: {
  token: string;
  chat_id: string;
}) {
  try {
    const res = await fetch(
      `${CONVERSATIONS_SERVER_URL}/conversations/${chat_id}`,
      {
        method: "DELETE",
        credentials: INCLUDE_CREDENTIALS,
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const j = await res.json();

    if (!res.ok) {
      throw new Error(JSON.stringify(j));
    }

    return j;
  } catch (err) {
    throw err;
  }
}

export async function searchConversations(token: string, query: string) {
  const requestUrl = `${CONVERSATIONS_SERVER_URL}/search_conversation?query=${query}`;
  try {
    const res = await fetch(requestUrl, {
      method: "GET",
      credentials: INCLUDE_CREDENTIALS,
      headers: { Authorization: `Bearer ${token}` },
    });

    const j = await res.json();

    if (!res.ok) {
      throw new Error(JSON.stringify(j));
    }

    return j;
  } catch (err) {
    throw err;
  }
}

export async function getConversationsByDocID(token: string, docID: string) {
  const requestUrl = `${CONVERSATIONS_SERVER_URL}/conversations/documents/${docID}?page=1&page_size=1&order=desc`;
  try {
    const res = await fetch(requestUrl, {
      method: "GET",
      credentials: INCLUDE_CREDENTIALS,
      headers: { Authorization: `Bearer ${token}` },
    });

    const j = await res.json();

    if (!res.ok) {
      throw new Error(JSON.stringify(j));
    }

    return j;
  } catch (err) {
    throw err;
  }
}

export async function clearConversationHistory({
  token,
  chatID,
}: {
  token: string;
  chatID: string;
}) {
  const requestUrl = `${CONVERSATIONS_SERVER_URL}/conversations/${chatID}/clear`;

  try {
    const res = await fetch(requestUrl, {
      method: "DELETE",
      credentials: INCLUDE_CREDENTIALS,
      headers: { Authorization: `Bearer ${token}` },
    });

    const j = await res.json();

    if (!res.ok) {
      throw new Error(JSON.stringify(j));
    }

    return j;
  } catch (err) {
    throw err;
  }
}

export async function fetchMessageByIndex(pageNumber: number, index: number, chatID: string, token: string) {
  try {
    const pageSize = 2;
    const pageIndex = Math.floor(index / pageSize) + 1;
    const indexWithinPage = index % pageSize;

    const conversations = await getConversation(token, chatID, pageIndex, pageSize, "asc")
    return conversations.chat_history[indexWithinPage];
  } catch (error) {
    console.error('Error fetching message:', error);
    throw error;
  }
}

