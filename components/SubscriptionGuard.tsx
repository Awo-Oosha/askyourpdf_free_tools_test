import React, { useEffect } from "react";
import { useAuth } from "../providers/AuthProvider";
import { Space } from "antd";
import { Loading } from "../styles/styles";
import Spinner from "./Spinner";
import { useRouter } from "next/router";
import { getUserRole } from "@/utils/utils";
import { alerts } from "@/utils/alerts";
import { t } from "@lingui/macro";

const SubscriptionGuard = (Component: React.ComponentType) =>
  function Comp(props: any) {
    const { userDetails } = useAuth();
    const { replace } = useRouter();

    useEffect(() => {
      let timeoutId: NodeJS.Timeout;

      const redirectToConversations = () => {
        replace("/conversations");
      };

      // If we cannot get the user's role after 3 seconds
      // Redirect to the conversations page
      if (userDetails?.roles === undefined) {
        timeoutId = setTimeout(() => {
          redirectToConversations();
          alerts.error(
            t`Couldn't get your plan`,
            t`You tried accessing a premium feature, however an error occurred while fetching your plan. Please try again`,
            10000
          );
        }, 3000);
      }

      // Check the users role and redirect to the subscription error page if free
      const checkSubscription = () => {
        if (userDetails?.roles !== undefined) {
          clearTimeout(timeoutId);
          const userRole = getUserRole(userDetails);
          if (userRole === "free") {
            replace("/subscription-error");
          }
        }
      };

      checkSubscription();

      return () => {
        clearTimeout(timeoutId);
      };
    }, [userDetails]);

    if (userDetails?.roles === undefined) {
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

export default SubscriptionGuard;
