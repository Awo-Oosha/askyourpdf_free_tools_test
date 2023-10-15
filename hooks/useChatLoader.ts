import { useEffect, useState } from "react";
import {
  APIError,
  createConversation,
  validateID,
} from "../services/conversations";
import { useQueryClient } from "react-query";
import { useRouter } from "next/router";

export default function useChatLoader({
  idType,
  paramDocID,
  paramID,
  userToken,
}: {
  idType?: string | undefined;
  paramDocID: string | undefined;
  paramID?: string | undefined;
  userToken: string;
}) {
  const [chatState, setChatState] = useState<any>();
  const [errMsg, setErrMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();

  const clearState = () => {
    setErrMsg("");
    setIsError(false);
    setChatState(undefined);
    // setIsLoading(false);
  };


  useEffect(() => {
    const fetchData = async () => {
      if (userToken && paramDocID) {
        clearState();
        try {
          const response = await validateID(paramDocID, userToken);
          if (response.docName === undefined) {
            setIsError(true);
            setErrMsg("Invalid document ID. Please try again.");
            return;
          }

          const chatResponse = await createConversation(userToken);

          setChatState({
            docID: paramDocID,
            name: response.docName,
            chatID: chatResponse.chat_id,
          });
          queryClient.invalidateQueries("userAnalytics");
        } catch (error: any) {
          console.error("Error:", error);
          setIsError(true);
          let errorMessage =
            "An error occurred while loading the chat. Please try again";

          if (error instanceof APIError) {
            if (error.status === 403) {
              errorMessage = `${error.message}. Please try again tomorrow or upgrade your account's plan.`;
            } else {
              errorMessage = error.message;
            }
          }

          setErrMsg(errorMessage);
        } finally {
          window.history.replaceState({}, "");
          setIsLoading(false);
        }
      } else if (userToken && paramID) {
        setIsLoading(false);

        if (idType === "d") {
          router.replace(
            { pathname: `/conversations/${paramID}`, },
            undefined,
            // {shallow: true}
          );
          return;
        }
      }
    };

    if (userToken && paramDocID) {
      setIsLoading(true);
    }
    fetchData();
  }, [paramDocID, userToken, paramID, idType]);

  return {
    chatState,
    isLoading,
    isError,
    errMsg,
    setChatState,
    setIsError,
    setErrMsg,
    clearState
  };
}
