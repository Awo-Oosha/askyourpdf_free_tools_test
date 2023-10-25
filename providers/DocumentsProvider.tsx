import React, { createContext, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { getDocuments } from "../services/documents";

const DocumentsContext = createContext<any>({});

export const DocumentsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const [documentCount, setDocumentCount] = useState(-1);

  const DOCUMENTS_LIMIT = 20;

  const {
    data: documents,
    fetchNextPage: fetchNextDocuments,
    status: documentsFetchStatus,
    isFetchingNextPage: isFetchingNextDocuments,
    isLoading: isLoadingDocuments,
    isFetching: isFetchingDocuments
  } = useInfiniteQuery(
    "documents",
    ({ pageParam = 1 }) => getDocuments("", pageParam, DOCUMENTS_LIMIT),
    {
      getNextPageParam: (lastPage: any, allPages: any) => {
        const nextPage =
          lastPage.documents.length === DOCUMENTS_LIMIT
            ? allPages.length + 1
            : undefined;
        return nextPage;
      },
      onSuccess: (data) => {
        const totalDocuments = data.pages.reduce((sum, page) => {
          const documentCount = page?.documents?.length || 0;
          return sum + documentCount;
      }, 0);
        setDocumentCount(totalDocuments);
      },
      refetchOnWindowFocus: false,
      enabled: "" !== undefined,
    }
  );

  return (
    <DocumentsContext.Provider
      value={{
        documents,
        fetchNextDocuments,
        documentsFetchStatus,
        isFetchingNextDocuments,
        isLoadingDocuments,
        documentCount,
        DOCUMENTS_LIMIT,
        isFetchingDocuments
      }}
    >
      {children}
    </DocumentsContext.Provider>
  );
};

export function useDocuments() {
  const context = React.useContext(DocumentsContext);
  if (context === undefined) {
    throw new Error("useDocuments must be used within a DocumentsProvider");
  }

  return context;
}

export default DocumentsContext;
