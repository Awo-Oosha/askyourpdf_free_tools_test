import { useEffect, useState, useRef } from "react";
import { useQuery, useMutation } from "react-query";
import { useAuth } from "@/providers/AuthProvider";
import { Plan, subscribeToPlan, Subscription, buyCredits } from "@/services/payment";
import { AUTH_FRONTEND_URL, DEV_PLAN_CONFIG } from "@/config/config";
import { alerts } from "@/utils/alerts";
import { getAPIRole } from "@/utils/utils";
import { apiAnalytics } from "@/services/devapi";
interface UserSubscription {
  sliderValue: number;
  planName: string;
  ref: React.RefObject<any>;
  apiRole: string;
  analytics: any;
  userToken: any;
  handleSliderChange: (value: number) => void;
  subscribeMutation: any;
  setDisabled: boolean;
  handleSubscribeToPlan: (plan: Plan, subscription: Subscription) => void;
  planToPayment: Record<string, Plan>;
  keys: string[];
}

export function useUserSubscription(): UserSubscription {
  const { userDetails, userToken } = useAuth();
  const [sliderValue, setSliderValue] = useState<number>(1);
  const [planName, setPlanName] = useState<string>("API_PREMIUM");
  const ref = useRef(null);
  const apiRole = getAPIRole(userDetails);
  const apiRoleToSliderValue: Record<string, number> = {
    API_PREMIUM: 1,
    API_PREMIUM_1: 2,
    API_PREMIUM_2: 3,
    API_PREMIUM_3: 4,
    API_PREMIUM_4: 5,
  };

  useEffect(() => {
    if (planName in apiRoleToSliderValue) {
      setSliderValue(apiRoleToSliderValue[planName]);
    } else {
      setSliderValue(1);
    }
  }, [planName]);

  const analytics = useQuery({
    queryKey: ["DEV", "PROD"],
    queryFn: ({ queryKey }) => apiAnalytics(queryKey[1]),
  });

  useEffect(() => {
    if (
      apiRole === "api_premium" &&
      analytics.isSuccess &&
      analytics.data.plan_name
    ) {
      let name = analytics.data.plan_name.toUpperCase();
      setPlanName(name);
    }
  }, [apiRole, analytics]);

  const handleSliderChange = (value: number) => {
    const index = apiRoleToSliderValue[planName];
    if (value >= index) {
      setSliderValue(value);
    }
  };

  const subscribeMutation = useMutation(subscribeToPlan, {
    onSuccess: (data) => {
      window.location.href = data.url;
    },
    onError: (error) => {
      alerts.error(
        "Subscription Failed",
        "Something went wrong. Please try again"
      );
    },
  });

  const setDisabled =
    apiRole !== "api_free" && sliderValue === apiRoleToSliderValue[planName];

  const handleSubscribeToPlan = async (
    plan: Plan,
    subscription: Subscription
  ) => {
    if (userDetails?.email === undefined) {
      window.location.href = `${AUTH_FRONTEND_URL}`;
    }
    subscribeMutation.mutate({ subscription, plan, token: userToken });
  };
  const planToPayment: Record<string, Plan> = {
    API_PREMIUM: Plan.API_PREMIUM,
    API_PREMIUM_1: Plan.API_PREMIUM_1,
    API_PREMIUM_2: Plan.API_PREMIUM_2,
    API_PREMIUM_3: Plan.API_PREMIUM_3,
    API_PREMIUM_4: Plan.API_PREMIUM_4,
  };
  const keys = Object.keys(DEV_PLAN_CONFIG);
  return {
    sliderValue,
    planName,
    ref,
    apiRole,
    userToken,
    analytics,
    handleSliderChange,
    subscribeMutation,
    setDisabled,
    handleSubscribeToPlan,
    planToPayment,
    keys,
  };
}
