import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Input } from "antd";
import { CTA } from "../styles/styles";
import Dragger from "antd/lib/upload/Dragger";
import type { InputRef, UploadProps } from "antd";
import FileUploadIcon from "../img/FileUpload.svg";
import FileIcon from "../img/FileIcon.svg?url";
import { DOCUMENT_MANAGEMENT_SERVER_URL } from "../config/config";
import { validateURL } from "../utils/utils";
import { sendUrl } from "../services/documents";
import { useAuth } from "../providers/AuthProvider";
import Spinner from "./Spinner";
import { ActivityLabels, trackButtonClick } from "../utils/analytics";
import { useQueryClient } from "react-query";
import { alerts } from "../utils/alerts";
import { Trans, t } from "@lingui/macro";
import Image from "next/image";
import ProgressModal from "./Modals/ProgressModal";

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

      span {
        font-weight: 500;
        color: #000000;
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
  margin-block: 24px;
  background: #f6f6f8;
  border-radius: 24px;
  align-self: start;
  width: fit-content;
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
    font-size: 14px;
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
`;

const UploadInfoContainer = styled.div`
  display: flex;
  gap: 4px;
  border-radius: 8px;
  padding: 16px;
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

const URLUpload = styled.div`
  margin-top: 35px;
`;

const URLUploadForm = styled.form`
  .ant-input-group {
    font-family: var(--font-satoshi);
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
  }

  .ant-input-group-addon {
    background: #ffffff;
    color: #667085;
    border-radius: 8px;
    padding: 10px 12px 10px 14px;
    border: 1px solid #d0d5dd;
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  }

  .ant-input {
    border-radius: 8px;
    padding: 10px 14px;
    border: 1px solid #d0d5dd;
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);

    font-family: var(--font-satoshi);
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;

    &::placeholder {
      color: #667085;

      opacity: 1;
    }
  }
`;

const FetchButton = styled(CTA)`
  background: #000000;
  margin-top: 28px;

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
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
}: {
  onUpload: (id: string) => void;
  onError?: (error?: any) => void;
  onRemoved?: () => void;
  allowUploadModeSwitch?: boolean;
  defaultUploadMode?: 0 | 1;
}) {
  const [activeTab, setActiveTab] = useState(defaultUploadMode);
  const [showProgressModal, setShowProgressModal] = useState(false);

  const urlRef = useRef<InputRef>(null);
  const [fileDropped, setFileDropped] = useState(false);
  const [url, setUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const { userToken } = useAuth();

  const queryClient = useQueryClient();

  const draggerProps: UploadProps = {
    name: "file",
    multiple: false,
    maxCount: 1,
    action: `${DOCUMENT_MANAGEMENT_SERVER_URL}/api/upload`,
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Cache-Control": "no-cache",
    },
    withCredentials: true,
    accept: ".pdf,.doc,.docx,.xml,.txt,.ppt,.pptx,.csv,.epub,.rtf",
    async onChange(info) {
      const { status, percent } = info.file;
      status === "removed" ? setFileDropped(false) : setFileDropped(true);
      status === "uploading" ? setUploading(true) : setUploading(false);

      if(percent === 100 && status != "removed") {
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
        if(showProgressModal) {
          setShowProgressModal(false);
        }
      }
    },
    onRemove: () => {
      onRemoved?.();
    },
  };

  useEffect(() => {
    if (activeTab === 1) {
      urlRef?.current?.focus();
    }
  }, [activeTab]);

  const handleSendUrl = async () => {
    let isUrl = validateURL(url);

    if (url.length < 1 || !isUrl) {
      alerts.error(t`Error`, t`Invalid Entry. Please try again`);
      return;
    }

    const parsedUrl = encodeURIComponent(url);

    try {
      setUploading(true);

      let response = await sendUrl(parsedUrl, userToken);

      if (response.docId) {
        alerts.success(t`Upload Success`, t`File uploaded successfully`);
        trackButtonClick(ActivityLabels.UPLOAD_SUCCESS);
        setShowProgressModal(true);
        await queryClient.invalidateQueries("documents");
        queryClient.invalidateQueries("documentSearchResults");
        onUpload(response.docId);
      }
      else if (response.detail && response.detail.error) {
        const errorMessage = response.detail.error;
        alerts.error(t`File upload failed`, errorMessage);
        trackButtonClick(ActivityLabels.UPLOAD_FAILURE);
        onError?.(errorMessage);
      }
    } catch (err: any) {
      trackButtonClick(ActivityLabels.UPLOAD_FAILURE);
      if (err?.response?.detail?.error) {
        const errorMessage = err.response.detail.error;
        alerts.error(t`File Upload Failed`, errorMessage);
      } else {
        alerts.error(t`Upload failed`, t`Failed to upload file. Try downloading the file and upload it manually.`);
      }
      onError?.(err);
    } finally {
      setUploading(false);
      setShowProgressModal(false);
    }
  };

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
                <Trans>Upload Document</Trans>
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
                <Trans>Upload From URL</Trans>
              </p>
            </Tab>
          </TabContainer>
        )}
        {activeTab === 0 ? (
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
                Supported formats: .pdf&apos;, &apos;.txt&apos;, &apos;.ppt&apos;, &apos;.pptx&apos;, &apos;.csv&apos;, &apos;.epub&apos;,
                &apos;.rtf&apos;
              </Trans>
            </p>
          </Dragger>
        ) : (
          <URLUpload>
            <URLUploadForm
              onSubmit={async (e) => {
                e.preventDefault();
                await handleSendUrl();
              }}
            >
              <Input
                addonBefore="https://"
                placeholder="www.askyourpdf.com"
                value={url.replace(/^(https?:\/\/)/, "")}
                onChange={(e) => {
                  setUrl(e.target.value);
                }}
                ref={urlRef}
              />
              <FetchButton disabled={uploading || url.length < 1}>
                {uploading ? (
                  <>
                    <Trans>Fetching document</Trans> <Spinner style={{ width: "20px", height: "auto" }} />
                  </>
                ) : (
                  t`Fetch document`
                )}
              </FetchButton>
            </URLUploadForm>
          </URLUpload>
        )}
      </DocumentUploadContainer>
      <ProgressModal message={t`Analysing Document`} open={showProgressModal} />
    </>
  );
}
