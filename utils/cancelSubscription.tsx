import { getChurnHash } from "@/services/payment";
import { initiateChurn } from "./churn";
import { alerts } from "./alerts";
import { useMutation, UseMutationResult } from "react-query";

type ExecuteCancelSubscriptionArgs = {
  setConfirmDownGrade: (value: boolean) => void;
  setIsCanceled?: (value: boolean) => void;
};
type GetChurnHashResult = {
  customer_id: string;
  key: string;
};
export const ExecuteCancelSubscription = ({
  setConfirmDownGrade,
  setIsCanceled,
}: ExecuteCancelSubscriptionArgs): UseMutationResult<
  GetChurnHashResult,
  any,
  string,
  any
> => {
  return useMutation<GetChurnHashResult, any, string, any>(getChurnHash, {
    onSuccess: (data) => {
      initiateChurn(data.customer_id, data.key);
      setConfirmDownGrade(false);
      if (setIsCanceled) {
        setIsCanceled(true);
      }
    },
    onError: (error) => {
      alerts.error(
        "Error",
        "An error occurred while cancelling your subscription. Please try again"
      );
    },
  });
};
