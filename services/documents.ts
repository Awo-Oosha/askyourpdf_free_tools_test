import {DOCUMENT_MANAGEMENT_SERVER_URL, INCLUDE_CREDENTIALS, PRO_PLUGIN_SERVER_URL} from "../config/config";
import { APIError } from "./conversations";

export async function getDocuments(
  token: string,
  page: number,
  pageSize: number
) {
  const requestUrl = `${DOCUMENT_MANAGEMENT_SERVER_URL}/api/documents?page=${page}&page_size=${pageSize}`;

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

export async function getDocument(token: string, docID: string) {
  const requestUrl = `${DOCUMENT_MANAGEMENT_SERVER_URL}/api/documents/${docID}`;

  try {
    const res = await fetch(requestUrl, {
      method: "GET",
      credentials: token ? INCLUDE_CREDENTIALS : undefined,
      headers: { Authorization: `Bearer ${token}` },
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

export async function deleteDocument({
  token,
  doc_id,
}: {
  token: string;
  doc_id: string;
}) {
  try {
    const res = await fetch(
      `${DOCUMENT_MANAGEMENT_SERVER_URL}/api/documents/${doc_id}`,
      {
        method: "DELETE",
        credentials: token ? INCLUDE_CREDENTIALS : undefined,
        headers: {
          Authorization: `Bearer ${token}`,
          "Cache-Control": "no-cache",
        },
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

export async function deleteDocumentOld(doc_id: string) {
  try {
    const res = await fetch(
      `${DOCUMENT_MANAGEMENT_SERVER_URL}/api/delete/${doc_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
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




export async function updateDocumentShare({
  token,
  doc_id,
  share,
}: {
  token: string;
  doc_id: string;
  share: string;
}) {
  try {
    const res = await fetch(
      `${DOCUMENT_MANAGEMENT_SERVER_URL}/api/share/${doc_id}`,
      {
        method: "PATCH",
        credentials: token ? INCLUDE_CREDENTIALS : undefined,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shareable: share,
        }),
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
export async function searchDocuments(token: string, query: string) {
  const requestUrl = `${DOCUMENT_MANAGEMENT_SERVER_URL}/api/search?query=${query}`;
  try {
    const res = await fetch(requestUrl, {
      method: "GET",
      credentials: token ? INCLUDE_CREDENTIALS : undefined,
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

export async function sendUrl(url: string, token: string) {
  const requestUrl = `${PRO_PLUGIN_SERVER_URL}/api/download_pdf?url=${url}`;

  try {
    const res = await fetch(requestUrl, {
      method: "POST",
      body: JSON.stringify({}),
      credentials: token ? INCLUDE_CREDENTIALS : undefined,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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

export async function getDailyUsage(token: string) {
  const requestUrl = `${DOCUMENT_MANAGEMENT_SERVER_URL}/api/usage`;
  try {
    const res = await fetch(requestUrl, {
      method: "GET",
      credentials: token ? INCLUDE_CREDENTIALS : undefined,
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
