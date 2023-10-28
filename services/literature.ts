import { LIT_REVIEW_SERVER_URL, INCLUDE_CREDENTIALS } from "@/config/config";
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
