
import axios from "axios";
import {API_SERVICE_SERVER_URL, AUTH_SERVER_URL, CURRENT_ENV} from "@/config/config";

let header = () => (
  CURRENT_ENV === "production" || CURRENT_ENV === "staging"
    ? {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    : {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")?.trim(),
      }
);
export async function createApiKey(name: String, type: String) {
  let data = JSON.stringify({
    name: name,
    type: type,
  });
  let config = {
    method: "post",
    url: `${API_SERVICE_SERVER_URL}/v1/key`,
    withCredentials: CURRENT_ENV === "production" || CURRENT_ENV === "staging",
    headers: header(),
    data: data,
  };

  let res = await axios(config);
  if (res !== undefined) {
    return res.data;
  } else {
    return false;
  }
}

export async function deleteApiKey(key: String) {
  let data = "";

  let config = {
    method: "delete",
    url: `${API_SERVICE_SERVER_URL}/v1/keys/${key}`,
    withCredentials: CURRENT_ENV === "production" || CURRENT_ENV === "staging",
    headers: header(),
    data: data,
  };

  let res = await axios(config).catch(function (error) {
    console.log(error);
  });
  if (res !== undefined) {
    return res.data;
  } else {
    return false;
  }
}

export async function apiAnalytics(type: String) {
  let data = "";

  let config = {
    method: "get",
    url: `${API_SERVICE_SERVER_URL}/v1/usage?environment=${type}`,
    withCredentials: CURRENT_ENV === "production" || CURRENT_ENV === "staging",
    headers: header(),
    data: data,
  };

  let res = await axios(config).catch(function (error) {
    //console.log(error);
  });
  if (res !== undefined) {
    return res.data;
  } else {
    return false;
  }
}

export async function getCurrentUser() {
  let data = "";

  let config = {
    method: "get",
    url: `${AUTH_SERVER_URL}/users/me`,
    withCredentials: CURRENT_ENV === "production" || CURRENT_ENV === "staging",
    headers: header(),
    data: data,
  };

  let res = await axios(config).catch(function (error) {});
  if (res !== undefined) {
    let rtdata: any = {};
    //res.data.roles = ["basic"];
    rtdata["data"] = res.data;
    rtdata["keys"] = await listApiKey();
    return rtdata;
  } else {
    let rtdata: any = {};
    rtdata["data"] = { roles: [] };
    rtdata["keys"] = [];
    return rtdata;
  }
}

export async function listApiKey() {
  let data = "";

  let config = {
    method: "get",
    url: `${API_SERVICE_SERVER_URL}/v1/keys`,
    withCredentials: CURRENT_ENV === "production" || CURRENT_ENV === "staging",
    headers: header(),
    data: data,
  };

  let res = await axios(config).catch(function (error) {
    //console.log(error);
  });
  if (res !== undefined) {
    return res.data;
  } else {
    return [];
  }
}
