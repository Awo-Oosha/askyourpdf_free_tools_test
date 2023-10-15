import React, { useState } from "react";
import styled from "styled-components";
import Sider from "antd/lib/layout/Sider";
import { Dropdown, Grid, Input, Space, Tabs, Tooltip } from "antd";
import {
  ArrowCircleLeft,
  CaretDown,
  Lock,
  MagnifyingGlass,
} from "@phosphor-icons/react/dist/ssr";
import CloseSidebar from "@/img/Hide-sidebar.svg";
import AppAlert, { AlertButton } from "./AppAlert";
import MobileHeader from "./MobileHeader";
import PaymentModal from "./Modals/PaymentModal";
import { useAuth } from "../providers/AuthProvider";
import Spinner from "./Spinner";
import AppHeader from "./AppHeader";
import {
  AUTH_FRONTEND_URL,
  ENTERPRISE_CONVERSATION_LIMIT,
  ENTERPRISE_ROLE,
  PAID_ROLES,
  PREMIUM_CONVERSATION_LIMIT,
  PRO_CONVERSATION_LIMIT,
  UNPAID_CONVERSATION_LIMIT,
  UNPAID_ROLES,
  UserPlan,
} from "../config/config";
import { useConversations } from "../providers/ConversationsProvider";
import { getUserRole, validateConversationCount } from "../utils/utils";
import { ActivityLabels, trackButtonClick } from "../utils/analytics";
import { useSubscription } from "../providers/SubscriptionProvider";
import { Trans, t } from "@lingui/macro";
import { useRouter } from "next/router";
import Link from "next/link";
import dynamic from "next/dynamic";

const SearchResults = dynamic(
  () => import("@/components/SearchResults"),
  {
      ssr: false,
  }
);

const SearchBottomSheet = dynamic(
  () => import("@/components/Modals/SearchBottomSheet"),
  {
      ssr: false,
  }
);


const Actions = styled.div`
  position: sticky;
  top: 0;
  // width: 100%;

  .upgrade__alert {
    .ant-alert {
      flex-direction: row;
    }
    .ant-alert-action {
      width: unset;
    }
  }

  .billing__alert {
    .ant-alert {
      flex-direction: column;
      padding: 8px 20px;
      align-items: flex-start;
    }
  }

  @media (min-width: 576px) {
    .billing__alert {
      .ant-alert {
        flex-direction: row;
        align-items: center;
      }
    }
  }

  @media (min-width: 992px) {
    position: sticky;
    top: 0;
  }
`;
const MainSidebarStyles = styled(Sider)<{ $isOpen?: boolean }>`
  background: #f6f6f6 !important;
  min-height: 100vh;
  -ms-overflow-style: none;
  scrollbar-width: none;
  width: 100% !important;
  min-width: unset !important;
  max-width: unset !important;
  flex: unset !important;
  .link {
    text-decoration: none;
    color: inherit;
    @media (min-width: 992px) {
      text-decoration: underline;
      cursor: pointer;
    }
  }

  .ant-layout-sider-children {
    height: unset;
  }

  &::-webkit-scrollbar {
    display: none;
  }

  // @media (min-width: 992px) {
  //   position: fixed;
  //   left: 72;
  //   top: 0;
  //   bottom: 0;
  // }

  @media (min-width: 992px) {
    background: #ffffff !important;
    max-width: ${(props) =>
      props.$isOpen ? "386px !important" : "0px !important"};
    min-width: ${(props) =>
      props.$isOpen ? "386px !important" : "0px !important"};
    width: ${(props) =>
      props.$isOpen ? "386px !important" : "0px !important"};
    position: fixed !important;
    left: 72px;
    top: 0px;
    bottom: 0px;
    border-right: 1px solid #d0d5dd;
    overflow: auto;
  }
`;

const ButtonFlex = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  width: 100%;
  margin-top: 10px;
`;

const ModeSwitcher = styled.div`
  background: #f6f6f6;

  .ant-tabs-top > .ant-tabs-nav {
    margin: 0;
  }

  .ant-tabs .ant-tabs-tab {
    padding-top: 18px;
    padding-bottom: 16px;
    padding-inline: 16px;
    font-size: 14px;
    font-family: var(--font-satoshi);
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: -0.28px;
  }

  .ant-tabs .ant-tabs-tab-btn {
    color: #8a91a8;
  }

  .ant-tabs .ant-tabs-tab-btn:active {
    color: #141414;
  }

  .ant-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #141414;
    text-shadow: none;
  }

  .ant-tabs .ant-tabs-tab:hover {
    color: #141414;
  }

  .ant-tabs .ant-tabs-ink-bar {
    background: #000000;
  }
`;

const SearchBar = styled.div`
  display: none;
  align-items: center;
  padding-block: 4px;
  background: #f6f6f6;
  padding-left: 23px;
  padding-right: 14px;

  button:first-of-type {
    background: none;
    border: none;
    cursor: pointer;
    margin-right: 5px;
  }

  @media (min-width: 992px) {
    display: flex;
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
`;

const ConversationButton = styled.button`
  display: none;
  padding: 16px 24px;
  background: #000000;
  border: 1px solid #000;
  border-radius: 12px;
  width: 100%;
  cursor: pointer;

  color: #fff;
  font-size: 16px;
  font-family: var(--font-satoshi);
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: -0.32px;

  @media (min-width: 992px) {
    display: block;
  }
`;
const AuthButton = styled.button`
  display: none;
  padding: 16px 24px;
  background: #000000;
  border: 1px solid #000;
  border-radius: 12px;
  width: 50%;
  cursor: pointer;

  color: #fff;
  font-size: 16px;
  font-family: var(--font-satoshi);
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: -0.32px;

  @media (min-width: 992px) {
    display: block;
  }
`;
const ListContainer = styled.div`
  padding-block: 20px;
  padding-inline: 1rem;

  @media (min-width: 992px) {
    padding-inline: 24px;
    margin-top: unset;
  }
`;

const List = styled.div`
  margin-top: 24px;
`;

const { useBreakpoint } = Grid;

export default function MainSidebar({
  openedChat,
  setOpenedChat,
  ListContent,
  listEndRef,
  isFetchingData,
  isOpen,
  onClose,
}: any) {
  const screens = useBreakpoint();
  const router = useRouter();
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [searchMode, setSearchMode] = useState<"chat" | "docs" | "">("");
  const [searchTerm, setSearchTerm] = useState("");

  const { userDetails, userAnalytics } = useAuth();
  const { conversationCount } = useConversations();
  const { userSubscriptionInfo } = useSubscription();
  const toolTipText =
    searchTerm.trim().length < 3 ? t`Enter three or more characters` : "";

  const userRole = getUserRole(userDetails);

  return (
    <MainSidebarStyles $isOpen={isOpen}>
      <Actions>
        <AppHeader onClose={onClose} />
        <MobileHeader />
        {!searchMode ? (
          <ModeSwitcher>
            <Tabs
              defaultActiveKey={
                router.pathname.includes("/conversations") ? "1" : "2"
              }
              items={[
                { label: t`Conversations`, key: "1" },
                {
                  label: (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <Trans>Documents</Trans>{" "}
                    </div>
                  ),
                  key: "2",
                },
              ]}
              tabBarExtraContent={{
                right: (
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      textAlign: "center",
                      marginRight: "26px",
                      marginTop: "5px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      if (router.pathname.includes("/documents")) {
                        setSearchMode("docs");
                      } else {
                        setSearchMode("chat");
                      }
                    }}
                  >
                    <MagnifyingGlass size={20} color="#101828" />
                  </button>
                ),
              }}
              style={{ width: "100%" }}
              centered
              tabBarGutter={60}
              onTabClick={(activeKey) => {
                if (activeKey === "1") {
                  router.push("/conversations");
                } else {
                  router.push("/documents");
                }
              }}
            />
          </ModeSwitcher>
        ) : (
          <SearchBar>
            <button
              onClick={() => {
                setSearchMode("");
                setSearchTerm("");
              }}
            >
              <ArrowCircleLeft
                style={{ display: "block" }}
                size={24}
                color="#101828"
              />
            </button>
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
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
            </Tooltip>
            <Dropdown
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
                ],
                onClick: ({ key }) => {
                  setSearchMode(Number(key) === 1 ? "chat" : "docs");
                  setSearchTerm("");
                },
              }}
              trigger={["click"]}
            >
              <SearchSelector>
                <Space>
                  {searchMode.charAt(0).toUpperCase() + searchMode.slice(1)}{" "}
                  <CaretDown />
                </Space>
              </SearchSelector>
            </Dropdown>
          </SearchBar>
        )}
        {!searchMode &&
          userDetails?.email === undefined &&
          (conversationCount >= 1 ? (
            <AppAlert
              type="warning"
              message={t`You have exceeded your conversation limit. Login or create an account to create more conversations.`}
              style={{
                paddingLeft: "30px",
                paddingRight: "45px",
              }}
              action={
                <ButtonFlex>
                  <AlertButton
                    mobileOnly={false}
                    invertColor={true}
                    padding="10px 32px"
                    onClick={() => {
                      trackButtonClick(ActivityLabels.SIGN_UP);
                      window.location.href = `${AUTH_FRONTEND_URL}/register`;
                    }}
                  >
                    <Trans>Create Account</Trans>
                  </AlertButton>
                  <AlertButton
                    mobileOnly={false}
                    padding="10px 46px"
                    style={{
                      marginLeft: "10px",
                    }}
                    onClick={() => {
                      trackButtonClick(ActivityLabels.LOGIN);
                      window.location.href = `${AUTH_FRONTEND_URL}/login`;
                    }}
                  >
                    <Trans>Log In</Trans>
                  </AlertButton>
                </ButtonFlex>
              }
            />
          ) : (
            <AppAlert
              type="info"
              message={t`Login or create an account to have multiple conversations, access your chat history and manage your documents seamlessly`}
              style={{
                paddingLeft: "30px",
                paddingRight: "45px",
              }}
              action={
                <ButtonFlex>
                  <AlertButton
                    mobileOnly={false}
                    invertColor={true}
                    padding="10px 32px"
                    onClick={() => {
                      window.location.href = `${AUTH_FRONTEND_URL}/register`;
                    }}
                  >
                    <Trans>Create Account</Trans>
                  </AlertButton>
                  <AlertButton
                    mobileOnly={false}
                    padding="10px 46px"
                    style={{
                      marginLeft: "10px",
                    }}
                    onClick={() => {
                      window.location.href = `${AUTH_FRONTEND_URL}/login`;
                    }}
                  >
                    <Trans>Log In</Trans>
                  </AlertButton>
                </ButtonFlex>
              }
            />
          ))}
        {!searchMode &&
          userDetails?.email !== undefined &&
          userRole === "free" &&
          (userAnalytics?.number_of_conversations >=
          UNPAID_CONVERSATION_LIMIT ? (
            <AppAlert
              type="warning"
              message={t`You have exceeded the conversation limits of a free account. Please try again tomorrow.`}
              style={{
                paddingLeft: "30px",
                paddingRight: "45px",
              }}
              className="upgrade__alert"
              action={
                <AlertButton
                  mobileOnly={true}
                  padding="10px 46px"
                  style={{
                    marginLeft: "10px",
                  }}
                  onClick={() => {
                    setUpgradeModalOpen(true);
                  }}
                >
                  <Trans>Upgrade</Trans>
                </AlertButton>
              }
            />
          ) : (
            <AppAlert
              type="info"
              className="upgrade__alert"
              message={t`Upgrade to access more features`}
              action={
                <AlertButton
                  mobileOnly={true}
                  onClick={() => setUpgradeModalOpen(true)}
                  style={{
                    margin: "10px auto",
                  }}
                >
                  <Trans>Upgrade</Trans>
                </AlertButton>
              }
            />
          ))}
        {!searchMode &&
          userDetails?.email !== undefined &&
          userRole !== "free" &&
          userSubscriptionInfo?.subscription_status === "past_due" && (
            <AppAlert
              type="warning"
              className="upgrade__alert billing__alert"
              message={
                <span>
                  <Trans>
                    Your subscription could not be renewed because billing
                    failed. Please
                  </Trans>{" "}
                  <Link className="link" href="/settings">
                    <Trans>check your payment method.</Trans>
                  </Link>
                </span>
              }
              action={
                <AlertButton
                  mobileOnly={true}
                  onClick={() => router.push("/settings")}
                  style={{
                    margin: "10px auto",
                  }}
                >
                  <Trans>Manage Subscription</Trans>
                </AlertButton>
              }
            />
          )}
        {!searchMode &&
          userDetails?.email !== undefined &&
          userRole === UserPlan.PREMIUM &&
          (userAnalytics?.number_of_conversations >=
          PREMIUM_CONVERSATION_LIMIT ? (
            <AppAlert
              type="warning"
              message={t`You have exceeded the conversation limits for your account. Please try again tomorrow.`}
              style={{
                paddingLeft: "30px",
                paddingRight: "45px",
              }}
              className="upgrade__alert"
            />
          ) : (
            <></>
          ))}
        {!searchMode &&
          userDetails?.email !== undefined &&
          userRole === UserPlan.PRO &&
          (userAnalytics?.number_of_conversations >= PRO_CONVERSATION_LIMIT ? (
            <AppAlert
              type="warning"
              message={t`You have exceeded the conversation limits for your account. Please try again tomorrow.`}
              style={{
                paddingLeft: "30px",
                paddingRight: "45px",
              }}
              className="upgrade__alert"
            />
          ) : (
            <></>
          ))}
        {!searchMode &&
          userDetails?.email !== undefined &&
          userRole === UserPlan.ENTERPRISE &&
          (userAnalytics?.number_of_conversations >=
          ENTERPRISE_CONVERSATION_LIMIT ? (
            <AppAlert
              type="warning"
              message={t`You have exceeded the conversation limits for your account. Please try again tomorrow.`}
              style={{
                paddingLeft: "30px",
                paddingRight: "45px",
              }}
              className="upgrade__alert"
            />
          ) : (
            <></>
          ))}
      </Actions>
      {!searchMode ? (
        <ListContainer>
          {validateConversationCount(
            userDetails,
            conversationCount,
            userAnalytics ? userAnalytics.number_of_conversations : -1
          ) && (
            <ConversationButton
              onClick={() => {
                router.push("/file-upload");
              }}
            >
              +<Trans>New Conversation</Trans>
            </ConversationButton>
          )}

          <List>{ListContent}</List>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "1rem",
            }}
            ref={listEndRef}
          >
            {isFetchingData && (
              <Spinner style={{ width: "50px", height: "auto" }} />
            )}
          </div>
        </ListContainer>
      ) : (
        <>
          {screens.lg ? (
            <SearchResults
              searchTerm={searchTerm}
              mode={searchMode}
              setOpenedChat={setOpenedChat}
              openedChat={openedChat}
            />
          ) : (
            <SearchBottomSheet
              open={searchMode}
              searchMode={searchMode}
              searchTerm={searchTerm}
              setSearchMode={setSearchMode}
              setSearchTerm={setSearchTerm}
              setOpenedChat={setOpenedChat}
              openedChat={openedChat}
            />
          )}
        </>
      )}
      <PaymentModal open={upgradeModalOpen} setOpen={setUpgradeModalOpen} />
    </MainSidebarStyles>
  );
}
