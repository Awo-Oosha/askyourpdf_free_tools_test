import React from "react";
import { toast } from "react-toastify";
import AppToast from "../components/AppToast";
import AlertSuccess from "../img/AlertSuccess.svg";
import AlertError from "../img/AlertError.svg";

export const alerts = {
  success: (heading: React.ReactNode, body: React.ReactNode, duration?: number) => {
    return toast(<AppToast heading={heading} body={body} />, {
      icon: <AlertSuccess />,
      autoClose: duration
    });
  },
  error: (heading: React.ReactNode, body: React.ReactNode, duration?: number) => {
    return toast(<AppToast heading={heading} body={body} />, {
      icon: <AlertError />,
      autoClose: duration
    });
  },
};
