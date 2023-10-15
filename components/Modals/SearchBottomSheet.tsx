import React from "react";
import { Dropdown, Space, Input, Drawer, Tooltip } from "antd";
import { MagnifyingGlass, CaretDown } from "@phosphor-icons/react/dist/ssr";
import SearchResults from "../SearchResults";
import styled from "styled-components";
import { CloseIcon } from "yet-another-react-lightbox";
import { useAuth } from "../../providers/AuthProvider";
import { Trans, t } from "@lingui/macro";

type props = {
  open: boolean;
};

const BottomSheet = styled(Drawer)`
  background: #f6f6f6 !important;
  border-radius: 20px 20px 0px 0px;

  .ant-drawer-body {
    padding-top: 0;
    padding-inline: 0;
  }
`;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 16px;
  padding-left: 23px;
  padding-right: 14px;
`;

const SearchSelector = styled.button`
  background: #ffffff;
  border-radius: 12px;
  border: 2px solid rgba(232, 236, 239, 0.5);
  padding-inline: 16px;
  padding-block: 11px;
  cursor: pointer;

  color: var(--neutral-06100, #232627);
  font-size: 14px;
  font-family: var(--font-satoshi);
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: -0.14px;

  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 70px;
  }
`;

const SearchInput = styled(Input)`
  border-radius: 12px;
  border: 2px solid var(--neutral-0350, rgba(232, 236, 239, 0.5));
  background: #fff;
  padding-block: 11px;
  padding-inline: 16px;
  margin-right: 9px;

  .ant-input {
    color: #000000;
    font-size: 14px !important;
    font-family: var(--font-satoshi);
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: -0.14px;

    &::placeholder {
      color: #8a91a8;
    }
  }

  &:hover {
    border-color: rgba(232, 236, 239, 0.5) !important;
    border-inline-end-width: 2px !important;
  }
`;

const DrawerHeader = styled.div`
  position: sticky;
  top: 0;
  background: #ffffff;
  border-bottom: solid 1px rgba(0, 0, 0, 0.05);
  padding-top: 16px;
  border-radius: 20px 20px 0px 0px;
`;

const DrawerBody = styled.div`
  background: #f6f6f6;
`;

const searchModes = {
  "1": "chat",
  "2": "docs",
  "3": "knowledgeBase",
};

const searchModeRepresentation: any = {
  chat: "Chat",
  docs: "Docs",
  knowledgeBase: "Knowledge Base",
};

function SearchBar({
  searchTerm,
  searchMode,
  setSearchMode,
  setSearchTerm,
}: any) {
  const toolTipText =
    searchTerm.trim().length < 3 ? t`Enter three or more characters` : "";

  const { userDetails } = useAuth();
  return (
    <SearchBarContainer>
      <Tooltip
        trigger={["focus"]}
        title={toolTipText}
        overlayInnerStyle={{
          fontFamily: "Satoshi",
          fontSize: "14px",
        }}
      >
        <SearchInput
          prefix={<MagnifyingGlass color="#19191B" size={20} />}
          placeholder={t`Search`}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      </Tooltip>
      <Dropdown
        placement="top"
        menu={{
          items: [
            {
              key: 1,
              label: (
                <p
                  style={{
                    margin: 0,
                    fontFamily: "Satoshi",
                    fontWeight: 500,
                  }}
                >
                  <Trans>Chat</Trans>
                </p>
              ),
            },
            {
              key: 2,
              label: (
                <p
                  style={{
                    margin: 0,
                    fontFamily: "Satoshi",
                    fontWeight: 500,
                  }}
                >
                  <Trans>Docs</Trans>
                </p>
              ),
            },
            {
              key: 3,
              label: (
                <p
                  style={{
                    margin: 0,
                    fontFamily: "Satoshi",
                    fontWeight: 500,
                  }}
                >
                  <Trans>Knowledge Base Conversations</Trans>
                </p>
              ),
            },
          ],
          onClick: ({ key }) => {
            //@ts-ignore
            setSearchMode(searchModes[key]);
            setSearchTerm("");
          },
        }}
        trigger={["click"]}
      >
        <SearchSelector>
          <Space>
            <p>{searchModeRepresentation[searchMode]}</p> <CaretDown />
          </Space>
        </SearchSelector>
      </Dropdown>
    </SearchBarContainer>
  );
}

export default function SearchBottomSheet({
  open,
  searchMode,
  searchTerm,
  setSearchMode,
  setSearchTerm,
  openedChat,
  setOpenedChat,
}: any) {
  return (
    <BottomSheet
      open={open}
      closable={false}
      maskClosable={true}
      placement="bottom"
      height={"80dvh"}
      onClose={() => {
        setSearchMode("");
      }}
    >
      <DrawerHeader>
        <div
          style={{
            textAlign: "right",
            marginRight: "15px",
            marginBottom: "4px",
          }}
        >
          <button
            style={{ background: "none", border: "none", cursor: "pointer" }}
            onClick={() => {
              setSearchMode("");
            }}
          >
            <CloseIcon style={{ display: "block" }} />
          </button>
        </div>
        <SearchBar
          searchTerm={searchTerm}
          searchMode={searchMode}
          setSearchMode={setSearchMode}
          setSearchTerm={setSearchTerm}
        />
      </DrawerHeader>
      <DrawerBody>
        <SearchResults
          searchTerm={searchTerm}
          mode={searchMode}
          openedChat={openedChat}
          setOpenedChat={setOpenedChat}
        />
      </DrawerBody>
    </BottomSheet>
  );
}
