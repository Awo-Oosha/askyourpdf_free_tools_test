import React, { createContext, useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { formatListDate, getUserRole } from "../utils/utils";
import { getConversations } from "../services/conversations";
import { useAuth } from "./AuthProvider";
import { ModelName } from "@/types/conversations";

const ConversationsContext = createContext<any>({});

export const ConversationsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { userToken, userDetails } = useAuth();

  const [conversationCount, setConversationCount] = useState(-1);
  const [activeModel, setActiveModel] = useState<ModelName>(ModelName.GPT3);

  const CONVERSATIONS_LIMIT = 20;

  // Set active model to GPT3 if user is free
  useEffect(()=>{
    const userRole = getUserRole(userDetails);

    if (userRole === "free" && activeModel !== ModelName.GPT3) {
      setActiveModel(ModelName.GPT3);
    }
  }, [userDetails, activeModel]);

  const {
    data: conversations,
    fetchNextPage: fetchNextConversations,
    status: conversationsFetchStatus,
    isFetchingNextPage: isFetchingNextConversations,
    isLoading: isLoadingConversations
  } = useInfiniteQuery(
    "conversations",
    ({ pageParam = 1 }) => getConversations(userToken, pageParam, CONVERSATIONS_LIMIT),
    {
      getNextPageParam: (lastPage: any, allPages: any) => {
        const nextPage =
          lastPage.conversations.length === CONVERSATIONS_LIMIT
            ? allPages.length + 1
            : undefined;
        return nextPage;
      },
      onSuccess: (data) => {
        const totalConversations = Object.values(data).reduce(
          (sum, conversations) => sum + conversations.length,
          0
        );
        setConversationCount(totalConversations);
      },
      select: (data) => {
        const conversationGroups: any = {};
        const flatData = data.pages.flatMap((page) => {
          return page.conversations;
        });
        flatData.forEach((conversation) => {
          const date = formatListDate(conversation.date_time);
          if (!conversationGroups[date]) {
            conversationGroups[date] = [];
          }
          conversationGroups[date].push(conversation);
        });
        return conversationGroups;
      },
      refetchOnWindowFocus: false,
      enabled: userToken !== undefined,
    }
  );

  return (
    <ConversationsContext.Provider
      value={{
        conversations,
        fetchNextConversations,
        conversationsFetchStatus,
        isFetchingNextConversations,
        isLoadingConversations,
        conversationCount,
        activeModel,
        setActiveModel
      }}
    >
      {children}
    </ConversationsContext.Provider>
  );
};

export function useConversations() {
  const context = React.useContext(ConversationsContext);
  if (context === undefined) {
    throw new Error("useConversations must be used within a ConversationsProvider");
  }
  return context;
}

export default ConversationsContext;
