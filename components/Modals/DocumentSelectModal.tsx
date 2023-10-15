import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import styled from "styled-components";
import { Input, Modal, Table } from "antd";
import CloseIcon from "@/img/ModalCloseIcon.svg";
import Link from "next/link";
import { useDocuments } from "@/providers/DocumentsProvider";
import Spinner from "../Spinner";
import { Trans, t } from "@lingui/macro";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { useMutation, useQueryClient } from "react-query";
import {
  createKnowledgeBase,
  deleteKnowledgeBase,
  updateKnowledgeBase,
} from "@/services/knowledgeBase";
import { useRouter } from "next/router";
import { alerts } from "@/utils/alerts";
import { useAuth } from "@/providers/AuthProvider";
import { deleteConversation } from "@/services/conversations";
import { DeleteModal } from "./ConversationDeleteModal";
import { ModalContentStyles } from "./DocumentDeleteModal";
import DocumentUploadModal from "./DocumentUploadModal";

type props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDocuments: any[];
  setSelectedDocuments: React.Dispatch<React.SetStateAction<any[]>>;
  mutationMode: "create" | "update";
  setMutationMode: React.Dispatch<React.SetStateAction<"create" | "update">>;
  currentKnowledgeBase: string;
  currentConversation: string;
};

const ModalStyles = styled(Modal)`
  .ant-modal-content {
    padding-top: 0;
    padding-inline: 0;
    border-radius: 16px;
  }
`;

const ModalTitle = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  border-radius: 16px 16px 0px 0px;
  padding-top: 24px;
  padding-inline: 30px;
  padding-bottom: 26px;
  background: #f9fafb;

  h1 {
    color: #141718;
    font-family: var(--font-satoshi);
    font-size: 40px;
    font-style: normal;
    font-weight: 700;
    line-height: 48px; /* 120% */
    letter-spacing: -1.6px;
  }

  p {
    color: #141718;
    font-family: var(--font-satoshi);
    font-size: 14px;
    font-weight: 500;
    font-style: normal;
  }

  .title__actions {
    button {
      background: none;
      border: 0px;
      color: #0054c9;
      text-align: right;
      font-family: var(--font-satoshi);
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 18px; /* 128.571% */
      text-decoration-line: underline;
    }
  }

  button {
    background: none;
    border: 0;
    cursor: pointer;

    svg {
      display: block;
    }
  }
`;

const ModalBody = styled.div`
  .ant-table-wrapper {
    .ant-table-content {
      .ant-table-thead {
        th {
          background: #f9fafb;

          color: var(--gray-600, #475467);
          font-family: var(--font-satoshi);
          font-size: 14px;
          font-style: normal;
          font-weight: 500;
          line-height: 18px;

          &:before {
            display: none;
          }

          &:first-of-type {
            padding-inline: 30px;
          }
          &:last-of-type {
            padding-inline: 30px;
          }
        }
      }

      .ant-checkbox-wrapper {
        .ant-checkbox {
          .ant-checkbox-inner {
            border-color: rgba(0, 0, 0, 0.3);
          }
        }

        .ant-checkbox-checked {
          .ant-checkbox-inner {
            background: #ffffff;
            border-color: rgba(0, 0, 0, 1);
            &:after {
              border-color: #000000;
            }
          }
        }
      }
    }
    --wave-color: rgba(0, 0, 0, 0.3);
  }

  .ant-table-wrapper .ant-table-tbody > tr.ant-table-row-selected > td {
    background: #ffffff;
  }

  .ant-table-wrapper .ant-table-tbody > tr > td {
    background: #ffffff;
    padding-block: 20px;

    color: #475467;
    font-family: var(--font-satoshi);
    font-size: 14px;
    font-style: normal;
    line-height: 20px;

    &:first-of-type {
      color: #101828;
      padding-inline: 30px;
      font-weight: 500;
    }
  }

  .ant-table-wrapper .ant-table-tbody > tr.ant-table-row:hover > td {
    background: #ffffff;
  }

  .ant-checkbox {
    .ant-checkbox-inner {
      border-color: rgba(0, 0, 0, 0.3);
    }
  }

  .ant-checkbox:not(.ant-checkbox-disabled):hover .ant-checkbox-inner {
    background: #ffffff;
    border-color: rgba(0, 0, 0, 1);
  }

  .ant-checkbox-checked:not(.ant-checkbox-disabled):hover .ant-checkbox-inner {
    background: #ffffff !important;
    border-color: rgba(0, 0, 0, 1) !important;
  }

  .ant-checkbox-checked {
    .ant-checkbox-inner {
      background: #ffffff;
      border-color: rgba(0, 0, 0, 1);
      &:after {
        border-color: #000000;
      }
    }
  }

  .ant-checkbox-wrapper:not(.ant-checkbox-wrapper-disabled):hover
    .ant-checkbox-inner {
    background: #ffffff;
    border-color: rgba(0, 0, 0, 1);
  }

  .ant-checkbox-wrapper:not(.ant-checkbox-wrapper-disabled):hover
    .ant-checkbox-checked:not(.ant-checkbox-disabled)
    .ant-checkbox-inner {
    background: #ffffff;
    border-color: rgba(0, 0, 0, 1);
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 14px;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    width: 336px;
    box-sizing: border-box;
    border-radius: 12px;
    border: 1px solid #000;
    background: #000;
    padding: 16px 24px;

    color: #fff;
    font-family: var(--font-satoshi);
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px; /* 150% */
    letter-spacing: -0.32px;

    cursor: pointer;

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }
`;

const InputContainer = styled.div`
  margin-bottom: 20px;
  padding-inline: 1rem;
  p {
    font-family: var(--font-satoshi);
    color: #141718;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px; /* 171.429% */
    letter-spacing: -0.14px;
    margin-bottom: 6px;
  }

  input {
    font-family: var(--font-satoshi);
    border-radius: 8px;
    border: 1px solid #d0d5dd;
    box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
    padding: 10px 14px;
    &:hover {
      border: 1px solid #d0d5dd;
    }

    &:focus {
      border-color: #d0d5dd;
    }
  }

  .ant-input-wrapper {
    .ant-input-group-addon {
      font-family: var(--font-satoshi);
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 24px;
    }
  }

  .ant-input-affix-wrapper-disabled {
    background: #ffffff;
    cursor: default;
    border-radius: 8px;
    padding: 10px 14px;
    input {
      cursor: default;
      font-family: var(--font-eudoxus);
      font-size: 15px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px;
      &:hover,
      &:focus {
        border: none;
      }

      &:disabled {
        color: #667085;
      }
    }
  }

  &:last-child {
    margin-bottom: 26px;
  }
`;

const columns = [
  {
    title: "File Name",
    dataIndex: "name",
    key: "name",
    ellipsis: true,
  },
  {
    title: "Pages",
    dataIndex: "pages",
    key: "pages",
    responsive: ["md"],
    width: 80,
    align: "center",
  },
  {
    title: "Date Uploaded",
    dataIndex: "date_time",
    key: "date_time",
    align: "center",
    render: (text: string) => (
      <p>
        {new Date(text).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
        })}
      </p>
    ),
  },
  Table.SELECTION_COLUMN,
];

export default function DocumentSelectModal({
  open,
  setOpen,
  selectedDocuments,
  setSelectedDocuments,
  mutationMode = "create",
  setMutationMode,
  currentKnowledgeBase,
  currentConversation,
}: props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [documentsSelected, setDocumentsSelected] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [knowledgeBaseName, setKnowledgeBaseName] = useState("");
  const [knowledgeBaseNameFocus, setKnowledgeBaseNameFocus] = useState(false);
  const { documents, isFetchingDocuments, fetchNextDocuments } = useDocuments();

  const [showDocumentUploadModal, setShowDocumentUploadModal] = useState(false);

  const documentsList = useMemo(
    () => documents?.pages?.flatMap((document: any) => document?.documents),
    [documents]
  );

  const [lastRow, setLastRow] = useState<any>(null);

  const { userToken } = useAuth();

  const lastRowRef = useCallback((lastRowNode: any) => {
    setLastRow(lastRowNode);
  }, []);

  const createKnowledgeBaseMutation = useMutation(createKnowledgeBase, {
    onSuccess: (data) => {
      // navigate to the knowledge base page using the knowledge_base_id
      router.push(`/knowledge-base/${data.knowledge_base_id}`);
      handleCloseModal();
    },
    onError: (error) => {
      alerts.error(
        t`Failed`,
        t`An error occurred while creating the knowledge base. Please try again.`
      );
    },
  });

  const updateKnowledgeBaseMutation = useMutation(updateKnowledgeBase, {
    onSuccess: (data, variables) => {
      // navigate to the knowledge base page using the knowledge_base_id
      alerts.success(
        t`Update Success`,
        t`Your knowledge base has been updated`
      );
      queryClient.invalidateQueries([
        "knowledgeBaseItem",
        variables.knowledgeBaseID,
      ]);
      handleCloseModal();
    },
    onError: (error) => {
      alerts.error(
        t`Failed`,
        t`An error occurred while updating the knowledge base. Please try again.`
      );
    },
  });

  const deleteKnowledgeBaseConversationMutation = useMutation(
    deleteConversation,
    {
      onSuccess: (data) => {
        alerts.success(
          t`Delete Success`,
          t`Your knowledge base has been deleted`
        );
        queryClient.invalidateQueries(["knowledgebaseConversations"]);
        handleCloseModal();
        router.push("/knowledge-base");
      },
      onError: (error) => {
        alerts.error(
          t`Failed to delete conversation`,
          t`An error occurred while deleting the conversation. However, the associated knowledge base has been deleted. Please delete the conversation manually.`
        );
      },
    }
  );

  const deleteKnowledgeBaseMutation = useMutation(deleteKnowledgeBase, {
    onSuccess: async (data, variables) => {
      await deleteKnowledgeBaseConversationMutation.mutateAsync({
        token: userToken,
        chat_id: currentConversation,
      });
    },
    onError: (error) => {
      alerts.error(
        t`Failed`,
        t`An error occurred while deleting the knowledge base. Please try again.`
      );
    },
  });

  const handleCreateKnowledgeBase = () => {
    if (selectedDocuments.length === 0 || knowledgeBaseName.length < 3) {
      alerts.error(
        t`Invalid Entry`,
        t`Please confirm if you have selected any documents or given the knowledge base a name`
      );
      return;
    }

    if (selectedDocuments.length > 5) {
      alerts.error(
        t`Invalid Entry`,
        t`You have selected more than 5 documents`
      );
      return;
    }

    createKnowledgeBaseMutation.mutate({
      token: userToken,
      name: knowledgeBaseName,
      document_ids: selectedDocuments,
    });
  };

  const handleUpdateKnowledgeBase = () => {
    if (selectedDocuments.length === 0) {
      alerts.error(
        t`Invalid Entry`,
        t`Please confirm if you have selected any documents`
      );
      return;
    }

    if (selectedDocuments.length > 5) {
      alerts.error(
        t`Invalid Entry`,
        t`You have selected more than 5 documents`
      );
      return;
    }

    updateKnowledgeBaseMutation.mutate({
      token: userToken,
      knowledgeBaseID: currentKnowledgeBase,
      document_ids: selectedDocuments,
    });
  };

  const handleDeleteKnowledgeBase = () => {
    deleteKnowledgeBaseMutation.mutate({
      token: userToken,
      knowledgeBaseID: currentKnowledgeBase,
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextDocuments();
        }
      },
      {
        root: null,
        threshold: 0.5,
      }
    );
    const lastRowElement = lastRow;

    if (lastRowElement) {
      observer.observe(lastRowElement);
    }

    return () => {
      if (lastRowElement) {
        observer.unobserve(lastRowElement);
      }
    };
  }, [lastRow]);

  const handleCloseModal = () => {
    setDocumentsSelected(false);
    setKnowledgeBaseName("");
    setSelectedDocuments([]);
    setMutationMode("create");
    setShowDeleteModal(false);
    setShowDocumentUploadModal(false);
    setOpen(false);
  };

  return !showDeleteModal ? (
    <>
      <ModalStyles
        open={open}
        width={documentsSelected ? 600 : 820}
        footer={null}
        closeIcon={<CloseIcon />}
        maskStyle={{
          background: "rgba(0, 0, 0, 0.46)",
          backdropFilter: "blur(5px)",
        }}
        onCancel={() => {
          handleCloseModal();
        }}
        closable={!createKnowledgeBaseMutation.isLoading}
        maskClosable={!createKnowledgeBaseMutation.isLoading}
      >
        {documentsSelected ? (
          <>
            <ModalTitle
              style={{
                alignItems: "center",
                gap: "8px",
                justifyContent: "unset",
              }}
            >
              <button
                onClick={() => {
                  setDocumentsSelected(false);
                }}
                disabled={createKnowledgeBaseMutation.isLoading}
              >
                <ArrowLeft size={20} />
              </button>
              <h1>
                <Trans>Name your Knowledge Base</Trans>
              </h1>
            </ModalTitle>
            <ModalBody>
              <InputContainer>
                <p>
                  <Trans>Name of Knowledge Base</Trans>
                </p>
                <Input
                  onChange={(e) => {
                    setKnowledgeBaseName(e.target.value);
                  }}
                  value={knowledgeBaseName}
                  placeholder={t`e.g Exploring the Effects of Climate Change`}
                  onFocus={() => {
                    setKnowledgeBaseNameFocus(true);
                  }}
                  onBlur={() => {
                    setKnowledgeBaseNameFocus(false);
                  }}
                />
                {knowledgeBaseName.length < 3 && knowledgeBaseNameFocus && (
                  <p style={{ color: "red", marginTop: "4px" }}>
                    <Trans>Enter three or more characters</Trans>
                  </p>
                )}
              </InputContainer>
            </ModalBody>
            <ModalFooter>
              <button
                onClick={handleCreateKnowledgeBase}
                disabled={
                  knowledgeBaseName.length < 3 ||
                  createKnowledgeBaseMutation.isLoading
                }
              >
                <Trans>Create New Knowledge Base</Trans>{" "}
                {createKnowledgeBaseMutation.isLoading && (
                  <Spinner style={{ width: "24px" }} />
                )}
              </button>
            </ModalFooter>
          </>
        ) : (
          <Fragment>
            <ModalTitle>
              <div>
                <h1>
                  <Trans>Select Documents</Trans>
                </h1>
                <p>
                  <Trans>Maximum of 5 documents</Trans>
                </p>
              </div>
              <div className="title__actions">
                <button
                  onClick={() => {
                    setShowDocumentUploadModal(true);
                  }}
                >
                  +<Trans>Upload New Document</Trans>
                </button>
              </div>
            </ModalTitle>
            <ModalBody>
              <Table
                columns={columns}
                dataSource={documentsList}
                rowSelection={{
                  type: "checkbox",
                  columnTitle: "Select",
                  columnWidth: 100,
                  onChange: (selectedRowKeys: any, selectedRowData: any) => {
                    setSelectedDocuments(selectedRowKeys);
                  },
                  selectedRowKeys: selectedDocuments,
                  getCheckboxProps: (record) => ({
                    disabled:
                      selectedDocuments.length >= 5 &&
                      !selectedDocuments.find(
                        (doc_id) => doc_id === record.doc_id
                      ),
                  }),
                }}
                pagination={false}
                rowKey={"doc_id"}
                loading={{
                  spinning: isFetchingDocuments,
                  indicator: (
                    <div>
                      <Spinner style={{ width: "30px", height: "30px" }} />
                    </div>
                  ),
                }}
                scroll={{ y: 370 }}
                onRow={(_, index) => {
                  if (index === documentsList?.length - 1) {
                    return {
                      ref: lastRowRef,
                    };
                  }
                  return {
                    className: "",
                  };
                }}
              />
            </ModalBody>
            <ModalFooter>
              {mutationMode === "create" ? (
                <button
                  onClick={() => {
                    setDocumentsSelected(true);
                  }}
                  disabled={
                    selectedDocuments.length === 0 ||
                    selectedDocuments.length > 5
                  }
                >
                  <Trans>Next</Trans>
                  <ArrowRight size={20} />
                </button>
              ) : (
                <button
                  onClick={() => {
                    if (selectedDocuments.length === 0) {
                      setShowDeleteModal(true);
                    } else {
                      handleUpdateKnowledgeBase();
                    }
                  }}
                  disabled={
                    updateKnowledgeBaseMutation.isLoading ||
                    selectedDocuments.length > 5
                  }
                >
                  {selectedDocuments.length === 0 ? (
                    <>
                      <Trans>Delete Knowledge Base</Trans>
                    </>
                  ) : (
                    <>
                      <Trans>Update Knowledge Base</Trans>{" "}
                      {updateKnowledgeBaseMutation.isLoading && (
                        <Spinner style={{ width: "24px" }} />
                      )}
                    </>
                  )}
                </button>
              )}
            </ModalFooter>
          </Fragment>
        )}
      </ModalStyles>
      <DocumentUploadModal
        open={showDocumentUploadModal}
        setOpen={setShowDocumentUploadModal}
        customUploadAction={() => {
          setShowDocumentUploadModal(false);
        }}
      />
    </>
  ) : (
    <DeleteModal
      open={showDeleteModal}
      maskStyle={{
        background: "rgba(0, 0, 0, 0.60)",
        backdropFilter: "blur(8px)",
      }}
      footer={null}
      width={350}
      closable={false}
      onCancel={() => {}}
    >
      <ModalContentStyles>
        <h1>
          <Trans>Delete Knowledge Base</Trans>
        </h1>
        <p>
          <Trans>Are you sure you want to delete this knowledge base?</Trans>
        </p>
        <div>
          <button
            onClick={() => setShowDeleteModal(false)}
            disabled={
              deleteKnowledgeBaseMutation.isLoading ||
              deleteKnowledgeBaseConversationMutation.isLoading
            }
          >
            <Trans>Go Back</Trans>
          </button>
          <button
            onClick={() => {
              handleDeleteKnowledgeBase();
            }}
            disabled={
              deleteKnowledgeBaseMutation.isLoading ||
              deleteKnowledgeBaseConversationMutation.isLoading
            }
          >
            <Trans>Delete Knowledge Base</Trans>{" "}
            {(deleteKnowledgeBaseMutation.isLoading ||
              deleteKnowledgeBaseConversationMutation.isLoading) && (
              <Spinner style={{ width: "24px", height: "24px" }} />
            )}
          </button>
        </div>
      </ModalContentStyles>
    </DeleteModal>
  );
}
