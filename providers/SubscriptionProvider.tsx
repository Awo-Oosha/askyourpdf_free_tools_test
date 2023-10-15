import React, { createContext, useState } from "react";
import { useQuery } from "react-query";
import { getUserSubscription } from "../services/payment";
import { useAuth } from "./AuthProvider";
import {
  API_SUBSCRIPTION_PLAN_TYPE,
  WEB_SUBSCRIPTION_PLAN_TYPE,
} from "../config/config";

const SubscriptionContext = createContext<any>({});

export const SubscriptionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Used to manage any component that would rely on the completion status of lemonsqueezy
  const [purchaseComplete, setPurchaseComplete] = useState(false);

  const { userToken } = useAuth();

  const {
    data: subscriptionInfoArray,
    status: subscriptionStatus,
    isError: isSubscriptionError,
    error: subscriptionError,
  } = useQuery("userSubscription", async () => getUserSubscription(userToken), {
    enabled: userToken !== undefined,
    retry: false,
    refetchOnWindowFocus: false,
    select: (data) => {
      const sortedSubInfo = data.sort((a: any, b: any) => {
        const aDate = new Date(a.date_time);
        const bDate = new Date(b.date_time);

        return bDate.getTime() - aDate.getTime();
      });

      return sortedSubInfo;
    },
  });

  const userSubscriptionInfo = subscriptionInfoArray?.find(
    (subInfo: any) => subInfo.plan_type === WEB_SUBSCRIPTION_PLAN_TYPE
  );

  const devSubscriptionInfo = subscriptionInfoArray?.find(
    (subInfo: any) => subInfo.plan_type === API_SUBSCRIPTION_PLAN_TYPE
  );

  return (
    <SubscriptionContext.Provider
      value={{
        purchaseComplete,
        setPurchaseComplete,
        subscriptionError,
        isSubscriptionError,
        subscriptionStatus,
        devSubscriptionInfo,
        userSubscriptionInfo,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export function useSubscription() {
  const context = React.useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error(
      "useSubscription must be used within a SubscriptionProvider"
    );
  }

  return context;
}

export default SubscriptionContext;
