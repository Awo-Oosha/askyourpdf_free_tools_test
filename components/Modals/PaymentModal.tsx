import React, { useState } from "react";
import { Grid } from "antd";
import { Plan, Subscription, subscribeToPlan } from "../../services/payment";
import { useMutation } from "react-query";
import { useAuth } from "../../providers/AuthProvider";
import { useSubscription } from "../../providers/SubscriptionProvider";
import { AUTH_FRONTEND_URL } from "../../config/config";
import { alerts } from "../../utils/alerts";
import { t } from "@lingui/macro";
import dynamic from "next/dynamic";

const { useBreakpoint } = Grid;

const PaymentModalDesktop = dynamic(
    () => import("@/components/Modals/PaymentModalDesktop"),
    {
        ssr: false,
    }
);

const PaymentBottomSheet = dynamic(
    () => import("@/components/Modals/PaymentBottomSheet"),
    {
        ssr: false,
    }
);

export default function PaymentModal({ open, setOpen }: any) {
    const screens = useBreakpoint();

    const { userToken, userDetails } = useAuth();
    const { purchaseComplete, setPurchaseComplete } = useSubscription();

    const [currentStep, setCurrentStep] = useState(1);
    const [chosenPlan, setChosenPlan] = useState<Plan>();
    const [chosenSubscription, setChosenSubscription] = useState<Subscription>(
        Subscription.MONTHLY
    );

    const subscribeMutation = useMutation(subscribeToPlan, {
        onSuccess: (data) => {
            const subscriptionUrl = data.url;
            // window.LemonSqueezy.Url.Open(subscriptionUrl);
            window.location.href = subscriptionUrl;
        },
        onError: (error) => {
            alerts.error(
                t`Subscription Failed`,
                t`Something went wrong. Please try again`
            );
        },
    });

    const handleSubscribeToPlan = async () => {
        // navigate to the auth page when the user is not authenticated
        if (userDetails?.email === undefined) {
            window.location.href = `${AUTH_FRONTEND_URL}`;
        }

        if (chosenPlan === undefined) {
            return;
        }

        subscribeMutation.mutate({
            subscription: chosenSubscription,
            plan: chosenPlan,
            token: userToken,
        });
    };

    return screens.lg
        ? open && (
              <PaymentModalDesktop
                  open={open}
                  setOpen={setOpen}
                  currentStep={currentStep}
                  setCurrentStep={setCurrentStep}
                  chosenPlan={chosenPlan}
                  setChosenPlan={setChosenPlan}
                  chosenSubscription={chosenSubscription}
                  setChosenSubscription={setChosenSubscription}
                  handleSubscribeToPlan={handleSubscribeToPlan}
                  isSubscribing={subscribeMutation.isLoading}
                  purchaseComplete={purchaseComplete}
                  setPurchaseComplete={setPurchaseComplete}
              />
          )
        : open && (
              <PaymentBottomSheet
                  open={open}
                  setOpen={setOpen}
                  currentStep={currentStep}
                  setCurrentStep={setCurrentStep}
                  chosenPlan={chosenPlan}
                  setChosenPlan={setChosenPlan}
                  chosenSubscription={chosenSubscription}
                  setChosenSubscription={setChosenSubscription}
                  handleSubscribeToPlan={handleSubscribeToPlan}
                  isSubscribing={subscribeMutation.isLoading}
                  purchaseComplete={purchaseComplete}
                  setPurchaseComplete={setPurchaseComplete}
              />
          );
}
