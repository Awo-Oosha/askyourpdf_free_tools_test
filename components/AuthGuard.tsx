import React, { Component, useEffect } from "react";
import { AUTH_FRONTEND_URL } from "../config/config";
import { useAuth } from "../providers/AuthProvider";
import { Space } from "antd";
import { Loading } from "../styles/styles";
import Spinner from "./Spinner";
import { useRouter } from "next/router";

const AuthGuard = (Component: React.ComponentType) =>
  function Comp(props: any) {
    const { auth } = useAuth();
    const { asPath } = useRouter();

    useEffect(() => {
      let timeoutId: number;

      const redirectToLogin = () => {
        const loginUrl = new URL(`${AUTH_FRONTEND_URL}/login`);
        loginUrl.searchParams.append("next", asPath);
        window.location.href = loginUrl.toString();
      };

      // Check the initial state of auth
      if (!auth?.access_token) {
        // If not authenticated, set a timeout to redirect the user if loading takes too long
        timeoutId = window.setTimeout(redirectToLogin, 3000);
      }

      const checkAuth = () => {
        if (auth?.access_token) {
          // If user is authenticated, clear the timeout to prevent redirection
          clearTimeout(timeoutId);
        } else if (auth !== undefined && auth !== null) {
          redirectToLogin();
        }
      };

      checkAuth();

      return () => {
        clearTimeout(timeoutId);
      };
    }, [auth, asPath]);

    if (auth === null || auth === undefined) {
      return (
        <Loading>
          <Space size="middle">
            <Spinner />
          </Space>
        </Loading>
      );
    }

    return (
      <>
        <Component {...props!} />
      </>
    );
  };

export default AuthGuard;
