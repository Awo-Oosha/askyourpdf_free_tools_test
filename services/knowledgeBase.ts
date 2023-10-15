import {
  CONVERSATIONS_SERVER_URL,
  DOCUMENT_MANAGEMENT_SERVER_URL,
  INCLUDE_CREDENTIALS,
} from "@/config/config";
import { APIError } from "./conversations";
import { ModelName } from "@/types/conversations";

export async function createKnowledgeBase({
  token,
  name,
  document_ids,
}: {
  token: string;
  name: string;
  document_ids: string[];
}) {
  const requestUrl = `${DOCUMENT_MANAGEMENT_SERVER_URL}/api/knowledge`;

  try {
    const res = await fetch(requestUrl, {
      method: "POST",
      credentials: INCLUDE_CREDENTIALS,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        document_ids,
      }),
    });

    const j = await res.json();

    if (!res.ok) {
      if (j?.detail) {
        throw new APIError(j.detail, res.status);
      } else {
        throw new APIError("An error occurred. Please try again", res.status);
      }
    }

    return j;
  } catch (err) {
    throw err;
  }
}

export async function updateKnowledgeBase({
  token,
  knowledgeBaseID,
  document_ids,
}: {
  token: string;
  knowledgeBaseID: string;
  document_ids: string[];
}) {
  const requestUrl = `${DOCUMENT_MANAGEMENT_SERVER_URL}/api/knowledge/${knowledgeBaseID}`;

  try {
    const res = await fetch(requestUrl, {
      method: "PUT",
      credentials: INCLUDE_CREDENTIALS,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        document_ids,
      }),
    });

    const j = await res.json();

    if (!res.ok) {
      if (j?.detail) {
        throw new APIError(j.detail, res.status);
      } else {
        throw new APIError("An error occurred. Please try again", res.status);
      }
    }

    return j;
  } catch (err) {
    throw err;
  }
}

export async function deleteKnowledgeBase({
  token,
  knowledgeBaseID,
}: {
  token: string;
  knowledgeBaseID: string;
}) {
  const requestUrl = `${DOCUMENT_MANAGEMENT_SERVER_URL}/api/knowledge/${knowledgeBaseID}`;

  try {
    const res = await fetch(requestUrl, {
      method: "DELETE",
      credentials: INCLUDE_CREDENTIALS,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const j = await res.json();

    if (!res.ok) {
      if (j?.detail) {
        throw new APIError(j.detail, res.status);
      } else {
        throw new APIError("An error occurred. Please try again", res.status);
      }
    }

    return j;
  } catch (err) {
    throw err;
  }
}

export async function getKnowledgeBases(
  token: string,
  page: number = 1,
  pageSize: number = 100
) {
  const requestUrl = `${DOCUMENT_MANAGEMENT_SERVER_URL}/api/knowledge?page=${page}&page_size=${pageSize}&order=desc`;

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

export async function getKnowledgeBase(token: string, knowledgeBaseID: string) {
  const requestUrl = `${DOCUMENT_MANAGEMENT_SERVER_URL}/api/knowledge/${knowledgeBaseID}`;

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

export async function getKnowledgBaseConversations(
  token: string,
  page: number = 1,
  pageSize: number = 100
) {
  const requestUrl = `${CONVERSATIONS_SERVER_URL}/knowledge/conversations?page=${page}&page_size=${pageSize}&order=desc`;

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

export async function sendKnowledgeBaseMessage(
  message: any,
  knowledgeId: any,
  chatId: any,
  token: any,
  modelName: ModelName,
  signal: AbortSignal
) {
  try {
    const res = await fetch(
      `${CONVERSATIONS_SERVER_URL}/knowledge/chat/${knowledgeId}?chat_id=${chatId}&model_name=${modelName}`,
      {
        method: "POST",
        credentials: INCLUDE_CREDENTIALS,
        body: JSON.stringify({ message: message }),
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

export async function searchKnowledgeBaseConversations(
  token: string,
  query: string
) {
  const requestUrl = `${CONVERSATIONS_SERVER_URL}/knowledge/search_conversation?query=${query}`;
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
