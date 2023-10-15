import {AUTH_SERVER_URL, CURRENT_ENV, INCLUDE_CREDENTIALS} from "../config/config";
import { APIError } from "./conversations";

export async function createAnonymousUser() {
  try {
    const res = await fetch(`${AUTH_SERVER_URL}/create-anon-user`, {
      method: "GET",
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

export async function currentUser(token?: string) {
  try {
    const res = await fetch(`${AUTH_SERVER_URL}/users/me`, {
      method: "GET",
      credentials: INCLUDE_CREDENTIALS,
      headers: { Authorization: `Bearer ${(CURRENT_ENV === "production" || CURRENT_ENV === "staging") ? token : localStorage.getItem("token")}`},
    });

    const j = await res.json();

    if (!res.ok) {
      throw new Error(JSON.stringify(j));
    }

    return j;
  } catch (err) {
    console.error(err);
  }
}

export async function logoutUser() {
  try {
    const res = await fetch(`${AUTH_SERVER_URL}/auth/cookie/logout`, {
      method: "POST",
      credentials: INCLUDE_CREDENTIALS,
    });
    if (!res.ok) {
      const j = res.json();
      throw new Error(JSON.stringify(j));
    }
    return { status: "success" };
  } catch (err) {
    console.error(err);
  }
}

export async function deleteAccount(token?: string) {
  try {
    const res = await fetch(`${AUTH_SERVER_URL}/users/account/me`, {
      method: "DELETE",
      credentials: INCLUDE_CREDENTIALS,
      headers: { Authorization: `Bearer ${(CURRENT_ENV === "production" || CURRENT_ENV === "staging") ? token : localStorage.getItem("token")}`},
    });

    if (!res.ok) {
      const errorResponse = await res.json();
      throw new Error(JSON.stringify(errorResponse));
    }
    return res.json(); 
  } catch (err) {
    console.error(err);
    throw err; 
  }
}

export async function linkMobileAccount({
  token,
  deviceID
}: {
  token: string;
  deviceID: string;
}) {
  const requestUrl = `${AUTH_SERVER_URL}/mobile/link/mobile_account?device_id=${deviceID}`;
  try {
    const res = await fetch(requestUrl, {
      method: "GET",
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
        throw new APIError(
          "An error occurred while linking your mobile device. Please try again",
          res.status
        );
      }
    }

    return j;
  } catch (err) {
    throw err;
  }
}