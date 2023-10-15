import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Chat, MagnifyingGlass, Warning, XCircle } from "@phosphor-icons/react/dist/ssr";
import useDebounce from "../hooks/useDebounce";
import Highlighter from "react-highlight-words";
import { transformPDFName, trimWord } from "../utils/utils";
import DocumentIcon from "../img/DocumentIcon.svg";
import { InfiniteData, useQuery, useQueryClient } from "react-query";
import { getDocument, searchDocuments } from "../services/documents";
import { useAuth } from "../providers/AuthProvider";
import Spinner from "./Spinner";
import { searchConversations } from "../services/conversations";
import { Trans, t } from "@lingui/macro";
import { useRouter } from "next/router";
import { searchKnowledgeBaseConversations } from "@/services/knowledgeBase";

const SearchResultContainer = styled.div`
  // height: 100%;
  padding-block: 20px;
  padding-inline: 1rem;

  @media (min-width: 992px) {
    height: unset;
    padding-top: 10px;
    padding-bottom: 20px;
    padding-inline: 24px;
    margin-top: unset;
  }
`;

const SearchStatus = styled.div`
  height: 50dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2,
  p {
    margin: 0;
    color: #000;
    font-family: var(--font-satoshi);
    font-style: normal;
  }

  h2 {
    margin-top: 18px;
    margin-bottom: 14px;
    font-size: 18px;
    font-weight: 700;
    line-height: 20px;
  }

  p {
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.28px;
    max-width: 277px;
  }
`;

const SearchList = styled.div``;

const SearchItem = styled.div<{ $active?: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 8px;

  // margin-bottom: 8px;
  padding-inline: 20px;
  padding-block: 16px;
  border-radius: ${(props) => (props.$active ? "8px" : "0")};
  border-bottom: ${(props) => (props.$active ? "none" : "1px solid #E8ECEF")};
  background: ${(props) => (props.$active ? "#f2f4f7" : "none")};
  cursor: pointer;

  svg {
    flex-shrink: 0;
  }

  div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    h2,
    .subtitle,
    .title {
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    h2,
    .title {
      color: #000;
      font-size: 16px;
      font-family: var(--font-satoshi);
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: -0.32px;
    }

    .subtitle {
      color: #8a91a8;
      font-size: 14px;
      font-family: var(--font-satoshi);
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: -0.28px;
    }
    .highlighted {
      background: #242426;
      border-radius: 4px;
      color: #ffffff;
      border: 0px;
      padding-inline: 4px;
    }
  }

  &:hover {
    background: #f2f4f7;
    border-radius: 8px;
  }

  @media (min-width: 992px) {
    padding-inline: 12px;
    padding-block: 16px;
  }
`;

const DocumentSearchItem = styled(SearchItem)`
  padding-block: 24px;
`;

const SearchGroup = styled.div`
  background: #ffffff;
  border-radius: 8px;
`;

type props = {
  searchTerm: string;
  mode: "chat" | "docs" | "knowledgeBase" | "";
  setOpenedChat: React.Dispatch<React.SetStateAction<number>>;
  openedChat: number;
};

export default function SearchResults({
  searchTerm,
  mode,
  setOpenedChat,
  openedChat,
}: props) {
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const debouncedSearchTerm = useDebounce(searchTerm.trim());

  const { userToken, userDetails } = useAuth();

  const router = useRouter();

  const { status: documentSearchStatus } = useQuery(
    ["documentSearchResults", debouncedSearchTerm],
    async () => await searchDocuments(userToken, debouncedSearchTerm),
    {
      onSuccess: (data) => {
        setSearchResults(data);
      },
      enabled:
        mode === "docs" &&
        debouncedSearchTerm.length >= 3 &&
        userDetails?.email !== undefined,
      refetchOnWindowFocus: false,
      select: (data) => {
        const transformedData = data.map((document: any) => {
          const documentSummary = document.summary;
          const trimmedSummary = trimWord(
            documentSummary,
            debouncedSearchTerm,
            2
          );

          return { ...document, summary: trimmedSummary };
        });

        return transformedData;
      },
    }
  );

  const { status: chatSearchStatus } = useQuery(
    ["conversationSearchResults", debouncedSearchTerm],
    async () => await searchConversations(userToken, debouncedSearchTerm),
    {
      onSuccess: async (data) => {
        setSearchResults(data);
      },
      enabled: mode === "chat" && debouncedSearchTerm.length >= 3,
      select: (data) => {
        const transformedData = data.map((chat: any) => {
          const documentSummary = chat.chat_history[0].answer;
          const trimmedSummary = trimWord(
            documentSummary,
            debouncedSearchTerm,
            2
          );

          return { ...chat, documentSummary: trimmedSummary };
        });

        return transformedData;
      },
      refetchOnWindowFocus: false,
    }
  );

  const { status: knowledgeBaseSearchStatus } = useQuery(
    ["knowledgeBaseSearchResults", debouncedSearchTerm],
    async () =>
      await searchKnowledgeBaseConversations(userToken, debouncedSearchTerm),
    {
      onSuccess: async (data) => {
        setSearchResults(data);
      },
      enabled: mode === "knowledgeBase" && debouncedSearchTerm.length >= 3,
      select: (data) => {
        const transformedData = data.map((chat: any) => {
          const documentSummary = chat.chat_history[0].answer;
          const trimmedSummary = trimWord(
            documentSummary,
            debouncedSearchTerm,
            2
          );

          return { ...chat, documentSummary: trimmedSummary };
        });

        return transformedData;
      },
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (debouncedSearchTerm === "") {
      setSearchResults([]);
    }
  }, [debouncedSearchTerm]);

  return (
    <SearchResultContainer>
      {debouncedSearchTerm.length < 3 || mode === "" ? (
        <SearchStatus>
          <MagnifyingGlass size={42} />
          <h2>
            <Trans>Search for any conversation</Trans>
          </h2>
          <p>
            <Trans>
              Type what you want to search for in the search box, you can filter
              by conversation
            </Trans>
            {userDetails?.email && t`or document`}
          </p>
        </SearchStatus>
      ) : documentSearchStatus === "success" ||
        chatSearchStatus === "success" || knowledgeBaseSearchStatus === "success" ? (
        <SearchList>
          {searchResults.length > 0 ? (
            <SearchGroup>
              {searchResults.map((result) =>
                mode === "chat" ? (
                  <SearchItem
                    key={result.chat_id}
                    onClick={() => {
                      router.push(`/conversations/c/${result.chat_id}`);
                    }}
                    $active={router.query.chatID === result.chat_id}
                  >
                    <Chat size={24} color="#101828" />
                    <div>
                      <h2>{result.name}</h2>
                      <Highlighter
                        className="subtitle"
                        highlightClassName="highlighted"
                        searchWords={[debouncedSearchTerm]}
                        autoEscape={true}
                        textToHighlight={result.documentSummary}
                      />
                    </div>
                  </SearchItem>
                ) : mode === "knowledgeBase" ? (
                  <SearchItem
                    key={result.chat_id}
                    onClick={() => {
                      router.push(`/knowledge-base/c/${result.chat_id}`);
                    }}
                    $active={router.query.chatID === result.chat_id}
                  >
                    <Chat size={24} color="#101828" />
                    <div>
                      <h2>{result.name}</h2>
                      <Highlighter
                        className="subtitle"
                        highlightClassName="highlighted"
                        searchWords={[debouncedSearchTerm]}
                        autoEscape={true}
                        textToHighlight={result.documentSummary}
                      />
                    </div>
                  </SearchItem>
                ) : (
                  <SearchItem
                    key={result.doc_id}
                    onClick={() => {
                      router.push(`/documents/${result.doc_id}`);
                    }}
                    $active={router.query.docID === result.doc_id}
                  >
                    <DocumentIcon />
                    <div>
                      <h2>{result.name}</h2>
                      <Highlighter
                        className="subtitle"
                        highlightClassName="highlighted"
                        searchWords={[debouncedSearchTerm]}
                        autoEscape={true}
                        textToHighlight={result.summary}
                      />
                    </div>
                  </SearchItem>
                )
              )}
            </SearchGroup>
          ) : (
            <SearchStatus>
              <XCircle size={42} />
              <h2>
                <Trans>No results found</Trans>
              </h2>
              <p>
                <Trans>
                  I could not find any results related to{" "}
                  <span style={{ fontWeight: 700 }}>
                    &quot;{debouncedSearchTerm}&quot;
                  </span>
                  . Try searching for something else
                </Trans>
              </p>
            </SearchStatus>
          )}
        </SearchList>
      ) : (
        <SearchStatus>
          {documentSearchStatus === "loading" ||
          chatSearchStatus === "loading"  || knowledgeBaseSearchStatus === "loading" ? (
            <Spinner style={{ width: "50px", height: "auto" }} />
          ) : documentSearchStatus === "error" ||
            chatSearchStatus === "error" || knowledgeBaseSearchStatus === "error" ? (
            <>
              <Warning size={42} />
              <h2>
                <Trans>Search Failed</Trans>
              </h2>
              <p>
                <Trans>
                  An error occurred while searching for{" "}
                  <span style={{ fontWeight: 700 }}>
                    &quot;{debouncedSearchTerm}&quot;
                  </span>
                  . Please try again.
                </Trans>
              </p>
            </>
          ) : (
            <></>
          )}
        </SearchStatus>
      )}
    </SearchResultContainer>
  );
}
