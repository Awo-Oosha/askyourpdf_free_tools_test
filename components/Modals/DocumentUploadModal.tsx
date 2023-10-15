import React from "react";
import styled from "styled-components";
import { Modal } from "antd";
import CloseIcon from "../../img/ModalCloseIcon.svg";
import DocumentUpload from "@/components/DocumentUpload";
import { useRouter } from "next/router";

type props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  customUploadAction?: () => void;
};

const UploadModal = styled(Modal)`
  .ant-modal-body {
    display: flex;
    flex-direction: column;
  }

  .ant-modal-content {
    padding-bottom: 34px;
    padding-inline: 16px;
  }

  @media (min-width: 576px) {
    .ant-modal-content {
      padding-bottom: 34px;
      padding-inline: 30px;
    }
  }
`;

export default function DocumentUploadModal({
  open,
  setOpen,
  customUploadAction,
}: props) {
  const router = useRouter();

  const onUpload = (id: string) => {
    router.push({ pathname: `/conversations/${id}` });
  };

  return (
    <UploadModal
      open={open}
      onOk={() => {
        setOpen(false);
      }}
      onCancel={() => {
        setOpen(false);
      }}
      maskStyle={{
        background: "rgba(0, 0, 0, 0.46)",
        backdropFilter: "blur(5px)",
      }}
      width={700}
      footer={null}
      closeIcon={<CloseIcon />}
      destroyOnClose={true}
    >
      <DocumentUpload
        onUpload={(id) => {
          if (customUploadAction) {
            customUploadAction();
          } else {
            onUpload(id);
          }
        }}
      />
    </UploadModal>
  );
}
