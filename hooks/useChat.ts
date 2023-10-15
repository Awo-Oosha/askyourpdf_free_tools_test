import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useInfiniteQuery, useMutation, useQueryClient} from "react-query";
import {
    clearConversationHistory,
    fetchMessageByIndex,
    getConversation,
    sendMessage,
} from "../services/conversations";
import useIsInView from "./useIsInView";
import {useAuth} from "../providers/AuthProvider";
import {timeoutPromise} from "../utils/utils";
import {usePDF} from "@react-pdf/renderer"
import { PDFExport } from "@/components/PDFExport";
import { useRouter } from "next/router";
import { useConversations } from "@/providers/ConversationsProvider";

export default function useChat(
    chatLoader: any,
    stopConversationRef: any,
    idType: any,
    id: any
) {
    const [isTyping, setIsTyping] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<any | undefined>([
        {question: "", answer: "", answerForPdf: ""},
    ]);
    const [messagesLength, setMessagesLength] = useState(messages.length);
    const [conversationError, setConversationError] = useState("");
    const [initialFetch, setInitialFetch] = useState(true);

    const queryClient = useQueryClient();

    // used to trigger auto scroll to bottom of chat screen
    const messageEndRef: any = useRef(null);

    // used to trigger fetch next page when user scrolls to top of chat screen
    const messageTopRef: any = useRef(null);

    const messageTopInView = useIsInView(null, messageTopRef, 1.0);

    const messageEndInView = useIsInView(null, messageEndRef, 0.5);

    const  [instance, updateInstance] = usePDF({document: PDFExport(messages)});

    const {activeModel} = useConversations();

    // if there is a conversation id in the url, then load the messages
    // if there is no conversation id, then send the initial message which triggers the creation of a new conversation

    const MESSAGE_LIMIT = 50;

    const {userToken} = useAuth();

    const clearChatState = () => {
        setInitialFetch(true);
        setIsTyping(false);
        setConversationError("");
        setMessage("");
        setMessages([{question: "", answer: "", answerForPdf: ""}]);
    };

    const {
        data: conversations,
        isLoading: messagesLoading,
        fetchNextPage,
        isFetchingNextPage: isFetchingNextMessages,
    } = useInfiniteQuery({
        queryKey: ["messages", id],
        queryFn: async ({pageParam = 1}) => {
            return await getConversation(userToken, id!, pageParam, MESSAGE_LIMIT);
        },
        getNextPageParam: (lastPage: any, allPages: any) => {
            const nextPage =
                lastPage.chat_history.length === MESSAGE_LIMIT
                    ? allPages.length + 1
                    : undefined;
            return nextPage;
        },
        onSuccess: (data) => {
            if (chatLoader.chatState === undefined) {
                chatLoader.setChatState({
                    name: data.pages[0].name,
                    docID: data.pages[0].doc_id,
                    chatID: data.pages[0].chat_id,
                });
            }
        },
        onError: (error: any) => {
            chatLoader.setIsError(true);
            let errorMessage =
                "An error occurred while loading the chat. Please try again.";

            if (error?.message?.includes("detail")) {
                const errObj = JSON.parse(error.message);
                if (errObj.detail) {
                    errorMessage = errObj.detail;
                }
            }

            chatLoader.setErrMsg(errorMessage);
        },
        enabled: !!id && idType === "c",
        refetchOnWindowFocus: false,
        staleTime: Infinity,
        cacheTime: 0,
        retry: false,
    });

    const allMessages = useMemo(
        () => conversations?.pages.flatMap((page) => page.chat_history),
        [conversations]
    );

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (allMessages) {
            const allMessagesCopy = allMessages.slice();
            setMessages(allMessagesCopy.reverse());
            if (initialFetch) {
                timer = setTimeout(() => {
                    messageEndRef.current?.scrollIntoView({behavior: "smooth"});
                    setInitialFetch(false);
                }, 1000);
            }
        }

        return () => {
            clearTimeout(timer);
        };
    }, [allMessages]);

    useEffect(() => {
        if (
            id !== undefined &&
            messageTopInView &&
            messages.length > 0 &&
            !initialFetch
        ) {
            fetchNextPage();
        }
    }, [messageTopInView]);

    // useEffect(() => {
    //     setInitialFetch(true);
    //     if (isTyping) {
    //         setIsTyping(false);
    //     }
    // }, [id]);

    const timeoutError = Symbol();
    useEffect(() => {
    }, [messages]);

    const handleSendingMessages = useCallback(
        (newMessage: any) => {
            setIsTyping(true);
            setConversationError("");

            const abortController = new AbortController();
            const signal = abortController.signal;

            timeoutPromise(
                sendMessage(
                    newMessage.question,
                    chatLoader.chatState.docID,
                    chatLoader.chatState.chatID,
                    userToken,
                    activeModel,
                    signal
                ),
                60000,
                timeoutError
            )
                .then((response) => {
                    const reader = response.body?.getReader();
                    const decoder = new TextDecoder("utf-8");

                    function processText({done, value}: any) {
                        if (stopConversationRef.current) {
                            setIsTyping(false);
                            abortController.abort();
                            return;
                        }

                        if (done) {
                            if (id) {
                                queryClient.invalidateQueries(["messages", id]);
                            }
                            setIsTyping(false);
                            queryClient.invalidateQueries("userAnalytics");
                            if (newMessage.question.length === 0) {
                                queryClient.invalidateQueries("conversations");
                            }
                            return;
                        }

                        const chunk = decoder.decode(value);
                        newMessage.answer += chunk;
                        newMessage.answerForPdf += chunk;
                        newMessage.date_time = new Date()


                        messageEndRef.current &&
                        messageEndRef.current.scrollIntoView({behavior: "smooth"});

                        setMessages(
                            (
                                oldMessages: {
                                    question: string;
                                    answer: string;
                                    answerForPdf: string;
                                }[]
                            ) => {
                                const copyMessages = [...oldMessages];
                                newMessage.index = copyMessages.length - 1;
                                copyMessages[copyMessages.length - 1] = newMessage;
                                setMessagesLength(copyMessages.length)
                                return copyMessages;
                            }
                        );

                        reader?.read().then(processText);
                    }

                    reader
                        ?.read()
                        .then(processText)
                        .catch((err: any) => {
                            let errorMessage = "Request timed out. Please try again";
                            abortController.abort();
                            setConversationError(errorMessage);
                            setIsTyping(false);
                            if (newMessage.question.length > 0) {
                                setMessages((oldMessages: any) => oldMessages.slice(0, -1));
                            }
                        });
                })
                .catch((err: any) => {
                    let errorMessage = err.message;
                    if (err === timeoutError) {
                        abortController.abort();
                        errorMessage = "Request timed out. Please try again";
                    } else if (err.status === 404) {
                        errorMessage =
                            "The document for this chat cannot be found or has been deleted. Please start a new chat";
                    }

                    setConversationError(errorMessage);

                    if (newMessage.question.length > 0) {

                        setMessages((oldMessages: any) => oldMessages.slice(0, -1));
                    }

                    setIsTyping(false);
                });
        },
        [chatLoader.chatState, stopConversationRef, activeModel]
    );

    useEffect(() => {
        if (
            id === undefined &&
            chatLoader.chatState !== undefined &&
            messages.length === 1 &&
            messages[0].answer === ""
        ) {
            handleSendingMessages({question: "", answer: "", answerForPdf: ""});
        }
    }, [id, chatLoader.chatState]);

    useEffect(() => {
        messageEndRef.current &&
        messageEndRef.current.scrollIntoView({behavior: "smooth"});
    }, [isTyping]);

    useEffect(() => {
        updateInstance(PDFExport(messages));
    }, [messages]);

    return {
        messages,
        setMessages,
        messagesLoading,
        message,
        setMessage,
        handleSendingMessages,
        isTyping,
        messageEndRef,
        messageTopRef,
        conversationError,
        setConversationError,
        messageEndInView,
        isFetchingNextMessages,
        instance,
        clearChatState,
    };
}