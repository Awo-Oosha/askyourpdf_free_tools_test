import { LIT_REVIEW_SERVER_URL, INCLUDE_CREDENTIALS } from "../config/config";
import { APIError } from "./conversations";

export async function literatureReviewText(
  literature_text: string,
  signal: AbortSignal,
  fromYear?: number,
  toYear?: number
) {
  try {
    const res = await fetch(`${LIT_REVIEW_SERVER_URL}/reviewer/stream`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: INCLUDE_CREDENTIALS,
      body: JSON.stringify({
        research_question: literature_text,
        ...(fromYear && { year_from: fromYear }),
        ...(toYear && { year_to: toYear }),
      }),
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

export interface Filter {
  citation_format: string;
  year_from: number;
  year_to: number;
  min_citations: number;
  include_keywords: string[];
  exclude_keywords: string[];
}
export async function getSources(data: { text: string; filter: Filter }) {
  try {
    const res = await fetch(`${LIT_REVIEW_SERVER_URL}/source`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: INCLUDE_CREDENTIALS,
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const j = await res.json();
      if (j?.detail) {
        throw new APIError(j.detail, res.status);
      } else {
        throw new APIError("An error occurred. Please try again", res.status);
      }
    }
    const j = await res.json();
    return j;
  } catch (err) {
    throw err;
  }
}
export async function getSourceInformation(source_id: string) {
  try {
    const res = await fetch(
      `${LIT_REVIEW_SERVER_URL}/source/${source_id}?order=normal&page=1&page_size=100`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: INCLUDE_CREDENTIALS,
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
    const j = await res.json();
    return j;
  } catch (err) {
    throw err;
  }
}
