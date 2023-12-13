import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import styled from "styled-components";
import { Input } from "antd";
import { CTA } from "@/styles/styles";
import Dragger from "antd/lib/upload/Dragger";
import type { InputRef, UploadProps } from "antd";
import FileUploadIcon from "@/img/FileUpload.svg";
import FileIcon from "@/img/FileIcon.svg?url";
import { DOCUMENT_MANAGEMENT_SERVER_URL } from "@/config/config";
import { validateURL } from "@/utils/utils";
import { sendUrl } from "@/services/documents";
import Spinner from "@/components/Spinner";
import { ActivityLabels, trackButtonClick } from "@/utils/analytics";
import { useQueryClient } from "react-query";
import { alerts } from "@/utils/alerts";
import { Trans, t } from "@lingui/macro";
import Image from "next/image";
import ProgressModal from "@/components/Modals/ProgressModal";
import Check from "@/img/Check.png";
import { useDocuments } from "@/providers/DocumentsProvider";

const DocumentUploadContainer = styled.div<{ $uploaded: boolean }>`
  .ant-upload-wrapper {
    margin-top: 18px;
  }

  .ant-upload-wrapper .ant-upload-drag:not(.ant-upload-disabled):hover {
    border-color: #e4e7ec;
  }

  .ant-upload-wrapper .ant-upload-drag {
    background: #ffffff;
    border: 1px solid #e4e7ec;
    border-radius: 8px;
    display: ${(props) => (props.$uploaded ? "none" : "block")};
  }

  .ant-upload-drag-container {
    img {
      margin-bottom: 12px;
    }

    p {
      margin: 0;
      font-family: var(--font-satoshi);
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      color: #667085;
      max-width: 240px;
      margin-inline: auto;

      span {
        font-weight: 500;
        color: #6941c6;
      }
    }

    p:nth-of-type(2) {
      font-size: 14px;
    }

    @media (min-width: 576px) {
      p {
        font-size: 14px;
      }

      p:nth-of-type(2) {
        font-size: 12px;
      }
    }
  }
`;

const TabContainer = styled.div`
  display: flex;
  gap: 4px;
  padding: 4px;
  margin-block: 10px;
  background: #f6f6f8;
  border-radius: 24px;
  align-self: start;
  width: 100%;
  justify-content: space-between;
`;

const Tab = styled.div<{ $active?: boolean }>`
  background: ${(props) => (props.$active ? "#FFFFFF" : "transparent")};
  padding: 8px 16px;
  box-shadow: ${(props) =>
      props.$active
          ? "0px 1px 3px rgba(47, 43, 67, 0.1), inset 0px -1px 0px rgba(47, 43, 67, 0.1)"
          : "0"};
  border-radius: ${(props) => (props.$active ? "24px" : "0")};
  cursor: pointer;

  p {
    margin: 0;
    font-family: var(--font-satoshi);
    font-style: normal;
    font-weight: ${(props) => (props.$active ? "700" : "500")} !important;
    font-size: 12px;
    line-height: 24px;
    text-align: center;
    letter-spacing: -0.01em;
    color: ${(props) =>
        props.$active ? "#2F2B43" : "rgba(47, 43, 67, 0.60)"} !important;
  }
`;

const UploadItemContainer = styled.div`
  background: #ffffff;
  border: 1px solid #e4e7ec;
  border-radius: 8px;
  width: 100%;
`;

const UploadInfoContainer = styled.div`
  display: flex;
  gap: 2px;
  border-radius: 8px;
  padding: 14px;
  width: 100%;
`;

const UploadInfo = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr auto;

  p {
    margin: 0;
    font-family: var(--font-satoshi);
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    display: flex;
    align-items: center;
    color: #344054 !important;
  }
`;

const ProgressInfo = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const UploadActions = styled.div`
  text-align: right;

  width: 100%;

  button {
    background: none;
    border: none;
    cursor: pointer;
    color: #b90000;
    font-family: var(--font-satoshi);
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: -0.02em;
  }
`;

const ProgressBar = styled.div`
  height: 8px;
  background: #f9f5ff;
  border-radius: 4px;
  width: 100%;

  div {
    height: 100%;
    transition: width 1s;
    border-radius: 4px;
  }

  .success,
  .done {
    background: #02b53f;
  }

  .error {
    background: #b90000;
  }

  .uploading {
    background: #0ba5ec;
  }
`;

const DocumentListStatus = styled.div`
  height: 150px;
  border: 1px solid #eaecf0;
  border-radius: 10px;
  padding: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-family: var(--font-satoshi);
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 24px;
  text-align: center;
  letter-spacing: -0.01em;
  color: #2f2b43;
`;

const UploadDocumentContainer = styled.div`
  position: relative;
  .heading {
    color: #344054;
    font-family: var(--font-satoshi);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    margin-bottom: 5px;
  }

  ul {
    height: 150px;
    border: 1px solid #eaecf0;
    border-radius: 10px;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 4px;

    &::-webkit-scrollbar {
      width: 8px;
      padding: 4px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #eaecf0;
      border-radius: 6px;
      width: 5px;
    }
    &::-webkit-scrollbar-track {
      background-color: #fff;
    }
    .clicked-item {
      background-color: #f0f0f0;
    }
    li {
      display: flex;
      flex-direction: row;
      color: #000;
      align-items: center;
      padding: 5px;
      padding-inline: 10px;
      border: 0.5px solid #eaecf0;
      border-radius: 10px;
      margin: 2px 0;
      cursor: pointer;

      color: #344054;
      font-family: var(--font-satoshi);
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 20px;

      .fileIcon {
        padding: 8px;
        background: #f4ebff;
        border-radius: 28px;
        border: 4px solid #f9f5ff;
        margin-right: 8px;
      }

      .file {
        width: 200px;
      }

      .check {
        margin-left: auto;
      }
    }
  }
`;

const LoadingContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  left: 0;
  backdrop-filter: blur(8px);
  border-radius: 10px;
`;

export const UploadItem = ({ file, actions }: any) => {
  return (
      <UploadItemContainer>
        <UploadInfoContainer>
          <Image src={FileIcon} alt="" />
          <UploadInfo>
            <div>
              <p style={{ fontWeight: 700 }}>{file?.name}</p>
              <p>
                {file?.size ? (file?.size / 1000000).toFixed(3) : ""}
                MB
              </p>
              <ProgressInfo>
                <ProgressBar>
                  <div
                      style={{
                        // width: `100%`,
                        width: `${file?.percent}%`,
                      }}
                      className={file?.status}
                  ></div>
                </ProgressBar>
                <p style={{ fontWeight: 500 }}>{file?.percent?.toFixed(2)}%</p>
              </ProgressInfo>
              <UploadActions>
                <button onClick={actions.remove}>
                  <Trans>Delete</Trans>
                </button>
              </UploadActions>
            </div>
          </UploadInfo>
        </UploadInfoContainer>
      </UploadItemContainer>
  );
};

export default function DocumentUpload({
                                         onUpload,
                                         onError,
                                         onRemoved,
                                         allowUploadModeSwitch = true,
                                         defaultUploadMode = 0,
                                         docID,
                                       }: {
  onUpload: (id: string) => void;
  onError?: (error?: any) => void;
  onRemoved?: () => void;
  allowUploadModeSwitch?: boolean;
  defaultUploadMode?: 0 | 1;
  docID?: any;
}) {
  const [activeTab, setActiveTab] = useState(defaultUploadMode);
  const [showProgressModal, setShowProgressModal] = useState(false);

  const urlRef = useRef<InputRef>(null);
  const [fileDropped, setFileDropped] = useState(false);
  const [uploading, setUploading] = useState(false);

  const queryClient = useQueryClient();

  const draggerProps: UploadProps = {
    name: "file",
    multiple: false,
    maxCount: 1,
    action: `${DOCUMENT_MANAGEMENT_SERVER_URL}/api/upload`,
    headers: {
      // Authorization: `Bearer ${userToken}`,
      "Cache-Control": "no-cache",
    },
    withCredentials: true,
    accept: ".pdf,.doc,.docx,.xml,.txt,.ppt,.pptx,.csv,.epub,.rtf",
    async onChange(info) {
      const { status, percent } = info.file;
      status === "removed" ? setFileDropped(false) : setFileDropped(true);
      status === "uploading" ? setUploading(true) : setUploading(false);

      if (percent === 100 && status != "removed") {
        setShowProgressModal(true);
      }

      if (status === "done") {
        let docID = info.file.response.docId;
        await queryClient.invalidateQueries("documents");
        queryClient.invalidateQueries("documentSearchResults");
        onUpload(docID);
        setShowProgressModal(false);
      } else if (status === "error") {
        onError?.(info.file.response);
        info.file.response === undefined
            ? alerts.error(
                t`File Upload Failed`,
                t`${info.file.name} file upload failed`
            )
            : alerts.error(
                t`File Upload Failed`,
                `${info.file.name} file upload failed ${
                    info.file.response?.detail || ""
                }.`
            );
        if (showProgressModal) {
          setShowProgressModal(false);
        }
      }
    },
    onRemove: () => {
      onRemoved?.();
    },
  };

  useEffect(() => {
    onUpload("");
    if (activeTab === 1) {
      urlRef?.current?.focus();
    }
  }, [activeTab]);

  const handleItemClick = (index: any) => {
    onUpload(index);
  };

  const {
    documents,
    isFetchingDocuments,
    fetchNextDocuments,
    documentsFetchStatus,
  } = useDocuments();

  const documentsList = useMemo(
      () => documents?.pages?.flatMap((document: any) => document?.documents),
      [documents]
  );

  const [documentsListEnd, setDocumentsListEnd] = useState<any>(null);

  const documentsListEndRef = useCallback((documentsListEndNode: any) => {
    setDocumentsListEnd(documentsListEndNode);
  }, []);

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
    const documentsListEndElement = documentsListEnd;
    if (documentsListEndElement) {
      observer.observe(documentsListEndElement);
    }

    return () => {
      if (documentsListEndElement) {
        observer.unobserve(documentsListEndElement);
      }
    };
  }, [documentsListEnd]);

  return (
      <>
        <DocumentUploadContainer $uploaded={fileDropped}>
          {allowUploadModeSwitch && (
              <TabContainer>
                <Tab
                    $active={activeTab === 0}
                    onClick={() => {
                      if (uploading || !allowUploadModeSwitch) {
                        return;
                      }
                      setActiveTab(0);
                    }}
                >
                  <p>
                    <Trans>Upload New Document</Trans>
                  </p>
                </Tab>
                <Tab
                    $active={activeTab === 1}
                    onClick={() => {
                      if (uploading || !allowUploadModeSwitch) {
                        return;
                      }
                      setActiveTab(1);
                      setFileDropped(false);
                    }}
                >
                  <p>
                    <Trans>From Your Documents</Trans>
                  </p>
                </Tab>
              </TabContainer>
          )}
          {/* {activeTab === 0 ? (
          <Dragger
            {...draggerProps}
            itemRender={(originNode, file, fileList, actions) => (
              <UploadItem file={file} actions={actions} />
            )}
          >
            <FileUploadIcon />
            <p>
              <Trans>
                <span>Click to upload</span> or drag and drop
              </Trans>
            </p>
            <p>
              <Trans>
                Supported formats: .pdf&apos;, &apos;.txt&apos;,
                &apos;.ppt&apos;, &apos;.pptx&apos;, &apos;.csv&apos;,
                &apos;.epub&apos;, &apos;.rtf&apos; (max 200 pages)
              </Trans>
            </p>
          </Dragger>
        ) : (
          <UploadDocumentContainer style={{ color: "#000 !important" }}>
            {documentsList && documentsList.length > 0 ? (
              <ul>
                {isFetchingDocuments && (
                  <LoadingContainer>
                    <Spinner style={{ width: "64px" }} />
                  </LoadingContainer>
                )}
                {documentsList.map((document: any) => (
                  <li
                    key={document.doc_id}
                    onClick={() => {
                      handleItemClick(document.doc_id);
                    }}
                    className={docID === document.doc_id ? "clicked-item" : ""}
                  >
                    <div className="fileIcon">
                      <Image src={FileIcon} alt="" width={32} height={32} />
                    </div>
                    <div className="file">{document?.name}</div>
                    <div className="check">
                      {docID === document.doc_id && (
                        <Image src={Check} alt="" />
                      )}
                    </div>
                  </li>
                ))}
                <div ref={documentsListEndRef}></div>
              </ul>
            ) : (
              <DocumentListStatus>
                {documentsFetchStatus === "loading" && (
                  <Spinner style={{ width: "48px" }} />
                )}
                {documentsFetchStatus === "error" && (
                  <p>Failed to fetch documents</p>
                )}
                {documentsFetchStatus === "success" &&
                  documentsList?.length === 0 && (
                    <>
                      <p>No Documents</p>
                      <p>Upload a document to get started</p>
                    </>
                  )}
              </DocumentListStatus>
            )}
          </UploadDocumentContainer>
        )} */}
        </DocumentUploadContainer>
        <ProgressModal message={t`Analysing Document`} open={showProgressModal} />
      </>
  );
}