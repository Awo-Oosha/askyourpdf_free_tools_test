import React, { ReactNode, createContext, useEffect, useState } from "react";
import { useLocalStorage } from "react-use";
import { createAnonymousUser, currentUser } from "../services/authService";
import { useQuery } from "react-query";
import { Loading } from "../styles/styles";
import Spinner from "../components/Spinner";
import { getDailyUsage } from "../services/documents";
import { CURRENT_ENV } from "../config/config";
import { useRouter } from "next/router";
import * as Sentry from "@sentry/nextjs";
import { generateRandomIdentifier } from "@/utils/utils";

const AuthContext = createContext<any>({});

const ANONYMOUS_ID_PREFIX = "anon_";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userDetails, setUserDetails] = useState({});
  const [userToken, setUserToken] = useState<any>();
  const [auth, setAuth, removeAuth] = useLocalStorage<any>("auth");
  const [anonUser] = useLocalStorage<any>("anonUser");
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);

  const { pathname } = useRouter();

  const { isLoading, isError, data, error } = useQuery(
    "fetchCurrentUser",
    async () => {
      return await currentUser();
    },
    {
      staleTime: 5 * (60 * 1000),
      cacheTime: 10 * (60 * 1000),
    }
  );

  React.useEffect(() => {
    if (!isLoading && !isError && data?.is_active) {
      setAuth({ access_token: "true" });
    } else if (isError) {
      removeAuth();
    }
  }, [isLoading, isError, data, setAuth, removeAuth]);

  useEffect(() => {
    (async () => {
      try {
        if (auth?.access_token) {
          const response = await currentUser(auth.access_token);
          setUserDetails(response);
          // Sentry.configureScope((scope) => {
          //   scope.setUser({
          //     id: response?.id,
          //     email: response?.email,
          //   });
          // });
        } else {
          setUserDetails({});
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, [auth]);

  useEffect(() => {
    (async () => {
      const getBrowserFingerprint = (await import("get-browser-fingerprint"))
        .default;

      try {
        setIsLoadingAuth(true);

        // new anon user id would have anon prefix attached in localstorage
        if (anonUser?.userId && anonUser?.userId.includes(ANONYMOUS_ID_PREFIX)) {
          const userToken = anonUser?.userId.replace(ANONYMOUS_ID_PREFIX, "");
          setUserToken(
            CURRENT_ENV === "production" || CURRENT_ENV === "staging"
              ? userToken
              : localStorage.getItem("token")
          );
        } else {
          const response = await createAnonymousUser();
          const userToken = response.userId;
          localStorage.setItem(
            "anonUser",
            JSON.stringify({ userId: `${ANONYMOUS_ID_PREFIX}${userToken}` })
          );
          setUserToken(userToken);
          setUserDetails({});
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoadingAuth(false);
      }
    })();
  }, [auth, anonUser]);

  const { data: userAnalytics, isLoading: isUserAnalyticsLoading } = useQuery({
    queryKey: "userAnalytics",
    queryFn: async () => getDailyUsage(userToken!),
    enabled: userToken !== undefined,
    refetchOnWindowFocus: false,
    select: (data) => {
      return {
        ...data,
        number_of_conversations: Number(data.number_of_conversations),
      };
    },
  });

  if ((isLoading || isLoadingAuth) && pathname !== "/") {
    return (
      <Loading>
        <Spinner />
      </Loading>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        userDetails,
        userToken,
        auth,
        setAuth,
        removeAuth,
        userAnalytics,
        isUserAnalyticsLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthContext;
