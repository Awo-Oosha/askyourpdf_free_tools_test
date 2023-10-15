import {
  DOCUMENT_MANAGEMENT_SERVER_URL,
  INCLUDE_CREDENTIALS,
} from "../config/config";
import { APIError } from "./conversations";

export enum Subscription {
  MONTHLY = "MONTHLY",
  YEARLY = "YEARLY",
  DAILY = "DAILY",
}

export enum Plan {
  PREMIUM = "PREMIUM",
  PRO = "PRO",
  FREE = "FREE",
  ENTERPRISE = "ENTERPRISE",
  API_PREMIUM = "API_PREMIUM",
  API_FREE = "API_FREE",
  API_ENTERPRISE = "API_ENTERPRISE",
  API_PREMIUM_1 = "API_PREMIUM_1",
  API_PREMIUM_2 = "API_PREMIUM_2",
  API_PREMIUM_3 = "API_PREMIUM_3",
  API_PREMIUM_4 = "API_PREMIUM_4",
}

export enum SubType {
  API = "API",
  WEB = "WEB",
}

export enum ActionType {
  SUBSCRIPTION_UPDATE = "SUBSCRIPTION_UPDATE",
  SUBSCRIPTION_CANCEL = "SUBSCRIPTION_CANCEL",
  PAYMENT_UPDATE = "PAYMENT_UPDATE",
}

export async function subscribeToPlan({
  subscription,
  plan,
  token,
}: {
  subscription: Subscription;
  plan: Plan;
  token: string;
}) {
  try {
    const res = await fetch(
      `${DOCUMENT_MANAGEMENT_SERVER_URL}/api/subscription`,
      {
        method: "POST",
        credentials: INCLUDE_CREDENTIALS,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subscription, plan }),
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

export async function getUserSubscription(token: string) {
  try {
    const res = await fetch(
      `${DOCUMENT_MANAGEMENT_SERVER_URL}/api/user_subscription`,
      {
        method: "GET",
        credentials: INCLUDE_CREDENTIALS,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const j = await res.json();

    if (!res.ok) {
      if (j?.detail) {
        throw new APIError(j.detail, res.status);
      } else {
        throw new APIError(
          "An error occurred while fetching your subscription. Please try again",
          res.status
        );
      }
    }

    return j;
  } catch (err) {
    throw err;
  }
}

export async function cancelUserSubscription({
  token,
  sub_type,
}: {
  token: string;
  sub_type: SubType;
}) {
  try {
    const res = await fetch(
      `${DOCUMENT_MANAGEMENT_SERVER_URL}/api/cancel/subscription?sub_type=${sub_type}`,
      {
        method: "DELETE",
        credentials: INCLUDE_CREDENTIALS,
        headers: {
          Authorization: `Bearer ${token}`,
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
export async function getChurnHash(token: string) {
  try {
    const res = await fetch(`${DOCUMENT_MANAGEMENT_SERVER_URL}/api/churn`, {
      method: "GET",
      credentials: INCLUDE_CREDENTIALS,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const j = await res.json();

    if (!res.ok) {
      if (j?.detail) {
        throw new APIError(j.detail, res.status);
      } else {
        throw new APIError(
          "An error occurred while getting hash key. Please try again",
          res.status
        );
      }
    }

    return j;
  } catch (err) {
    throw err;
  }
}
export async function getSubscriptionDetails(
  subscriptionID: string,
  token: string
) {
  try {
    const res = await fetch(
      `${DOCUMENT_MANAGEMENT_SERVER_URL}/api/subscription/${subscriptionID}`,
      {
        method: "GET",
        credentials: INCLUDE_CREDENTIALS,
        headers: {
          Authorization: `Bearer ${token}`,
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

export async function getUserBillingHistory(
  token: string,
  page: number,
  pageSize: number,
  type: SubType
) {
  try {
    const res = await fetch(
      `${DOCUMENT_MANAGEMENT_SERVER_URL}/api/billing_history?page=${page}&page_size=${pageSize}&order=desc&type=${type}`,
      {
        method: "GET",
        credentials: INCLUDE_CREDENTIALS,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const j = await res.json();

    if (!res.ok) {
      if (j?.detail) {
        throw new APIError(j.detail, res.status);
      } else {
        throw new APIError(
          "An error occurred while fetching your billing history. Please try again",
          res.status
        );
      }
    }

    return j;
  } catch (err) {
    throw err;
  }
}

export async function manageSubscription({
  token,
  subType,
  action,
}: {
  token: string;
  subType: SubType;
  action?: ActionType;
}) {
  const requestUrl = action
    ? `${DOCUMENT_MANAGEMENT_SERVER_URL}/api/manage/subscription?sub_type=${subType}&action=${action}`
    : `${DOCUMENT_MANAGEMENT_SERVER_URL}/api/manage/subscription?sub_type=${subType}`;
  try {
    const res = await fetch(requestUrl, {
      method: "GET",
      credentials: INCLUDE_CREDENTIALS,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const j = await res.json();

    if (!res.ok) {
      if (j?.detail) {
        throw new APIError(j.detail, res.status);
      } else {
        throw new APIError(
          "An error occurred while fetching your billing history. Please try again",
          res.status
        );
      }
    }

    return j;
  } catch (err) {
    throw err;
  }
}

export async function buyCredits({
  product,
  quantity,
  token
}: {
 product: string;
 quantity: number;
 token: string
}) {
  try {
    const res = await fetch(
      `${DOCUMENT_MANAGEMENT_SERVER_URL}/api/one_time_payment`,
      {
        method: "POST",
        credentials: INCLUDE_CREDENTIALS,
        headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
        body: JSON.stringify({ product, quantity }),
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
