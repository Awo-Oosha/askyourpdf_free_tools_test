import React, { useState } from "react";
import { Layout } from "antd";
import styled from "styled-components";
import Logo from "../img/Logo.svg";
import Link from "next/link";
import MessageSquare from "../img/MessageSquare.svg";
import KnowledgeBaseIcon from "../img/KnowledgeBaseIcon.svg";
import HelpCircle from "../img/HelpCircle.svg";
import SettingsIcon from "../img/Settings.svg";
import UserIcon from "../img/User.svg";
import LogoutIcon from "../img/Logout.svg";
import { Badge, Tooltip } from "antd";
import { path } from "../routes";
import {
  CloudArrowUp,
  CodeSimple,
  FileText,
  Trash,
} from "@phosphor-icons/react/dist/ssr";
import Profile from "./Modals/Profile";
import { useAuth } from "../providers/AuthProvider";
import { useConversations } from "../providers/ConversationsProvider";
import { logoutUser } from "../services/authService";
import { useRouter } from "next/router";
import { useSidebar } from "@/providers/SidebarProvider";
import { Trans, t } from "@lingui/macro";

const { Sider } = Layout;

const AppSidebarContainer = styled(Sider)`
  display: none;

  @media (min-width: 992px) {
    display: block;
  }
`;

const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px;
  height: calc(100% - 64px);

  ul {
    margin: 0;
    padding-left: 0;
    display: flex;
    flex-direction: column;
    gap: 16px;

    li {
      .ant-badge .ant-badge-count {
        color: #344054;
        text-align: center;
        font-size: 12px;
        font-family: var(--font-satoshi);
        font-style: normal;
        font-weight: 500;
        box-shadow: none;
      }
    }
  }
`;

const MenuButton = styled(Link)`
  display: flex;
  border-radius: 7.628px;
  padding: 8px;

  &:hover {
    background: #292928;
  }

  &.active {
    background: #292928;
  }
`;
const NotLinkMenuButton = styled.div`
  display: flex;
  border-radius: 7.628px;
  padding: 8px;
  cursor: pointer;

  &:hover {
    background: #292928;
  }

  &.active {
    background: #292928;
  }
`;
const LogoutButton = styled.div`
  display: flex;
  border-radius: 7.628px;
  cursor: pointer;
  padding: 8px;

  &:hover {
    background: #292928;
  }

  &.active {
    background: #292928;
  }
`;

const TooltipText = styled.div`
  color: #000;
  font-family: var(--font-satoshi);
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
  padding: 10px 8px;
`;

export default function AppSidebar() {
  const [profile, setProfile] = useState(false);
  const { userDetails, removeAuth } = useAuth();
  const { conversationCount } = useConversations();
  const router = useRouter();
  const handleLogout = async () => {
    try {
      if (userDetails) {
        await logoutUser();
        removeAuth();
      }
    } catch (e) {
      console.error(e);
    } finally {
      router.replace("/");
    }
  };
  const { isSidebarOpen, handleSidebarToggle } = useSidebar();
  return (
    <AppSidebarContainer
      style={{
        background: "#070707",
        paddingInline: "16px",
        paddingBottom: "32px",
        paddingTop: "20px",
        textAlign: "center",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        overflow: "auto",
        zIndex: 1010,
      }}
      width={72}
    >
      {profile && (
        <Profile
          currentPath={router.asPath}
          profile={profile}
          setProfile={setProfile}
        />
      )}
      <Link href={"/"}>
        <Logo />
      </Link>
      <SidebarContent>
        <ul>
          <li>
            <Badge
              color="#F2F4F7"
              count={conversationCount > -1 ? conversationCount : "-"}
              size="small"
              style={{ marginRight: "6px" }}
            >
              <Tooltip
                title={<TooltipText>{t`Conversations`}</TooltipText>}
                placement="right"
                color="#fff"
              >
                <NotLinkMenuButton
                  onClick={() => {
                    if (!isSidebarOpen) {
                      handleSidebarToggle();
                    }
                    router.push("/conversations");
                  }}
                  className={
                    [
                      path.chat,
                      path.conversations,
                      path.upload,
                      path.documents,
                      "/conversations",
                      "/documents",
                      "/chat",
                    ].some((url) => router.asPath.includes(url)) && !profile
                      ? "active"
                      : ""
                  }
                >
                  <MessageSquare />
                </NotLinkMenuButton>
              </Tooltip>
            </Badge>
          </li>
          <li>
            <Badge
              color="#EDB01A"
              count={"New"}
              size="small"
              style={{
                marginRight: "6px",
                paddingBottom: "15px",
                color: "#000000",
              }}
            >
              <Tooltip
                title={<TooltipText>{t`Knowledge Base`}</TooltipText>}
                placement="right"
                color="#fff"
              >
                <NotLinkMenuButton
                  onClick={() => {
                    if (!isSidebarOpen) {
                      handleSidebarToggle();
                    }
                    router.push(path.knowledgeBase);
                  }}
                  style={{ marginTop: "3px" }}
                  className={
                    [path.knowledgeBase].some((url) =>
                      router.asPath.includes(url)
                    ) && !profile
                      ? "active"
                      : ""
                  }
                >
                  <KnowledgeBaseIcon />
                </NotLinkMenuButton>
              </Tooltip>
            </Badge>
          </li>
          {userDetails?.email && (
            <>
              <li>
                <Tooltip
                  title={<TooltipText>{t`Developers`}</TooltipText>}
                  placement="right"
                  color="#fff"
                >
                  <MenuButton
                    href={path.apiKeys}
                    className={
                      [path.apiKeys, path.billingInfo].some((url) =>
                        router.asPath.includes(url)
                      )
                        ? "active"
                        : ""
                    }
                  >
                    <CodeSimple size={24} color="#FFFFFF" />
                  </MenuButton>
                </Tooltip>
              </li>
              <li>
                <Tooltip
                  title={<TooltipText>{t`Upload Doc`}</TooltipText>}
                  placement="right"
                  color="#fff"
                >
                  <MenuButton
                    href={path.gptUpload}
                    className={
                      [path.gptUpload].some((url) =>
                        router.asPath.includes(url)
                      )
                        ? "active"
                        : ""
                    }
                  >
                    <CloudArrowUp size={24} color="#FFFFFF" />
                  </MenuButton>
                </Tooltip>
              </li>
              <li>
                <Badge
                  color="#EDB01A"
                  count={"New"}
                  size="small"
                  style={{
                    marginRight: "6px",
                    paddingBottom: "15px",
                    color: "#000000",
                  }}
                >
                  <Tooltip
                    title={<TooltipText>{t`Summarisation`}</TooltipText>}
                    placement="right"
                    color="#fff"
                  >
                    <MenuButton
                      href={path.summarise}
                      className={
                        [path.summarise].some((url) =>
                          router.asPath.includes(url)
                        )
                          ? "active"
                          : ""
                      }
                    >
                      <FileText size={24} color="#FFFFFF" />
                    </MenuButton>
                  </Tooltip>
                </Badge>
              </li>

              <li>
                <Tooltip
                  title={<TooltipText> {t`Delete Doc`} </TooltipText>}
                  placement="right"
                  color="#fff"
                >
                  <MenuButton
                    href={path.delete}
                    className={
                      [path.delete].some((url) => router.asPath.includes(url))
                        ? "active"
                        : ""
                    }
                  >
                    <Trash size={24} color="#FFFFFF" />
                  </MenuButton>
                </Tooltip>
              </li>
            </>
          )}
        </ul>
        <ul>
          <Tooltip
            title={<TooltipText> {t`Documentation`} </TooltipText>}
            placement="right"
            color="#fff"
          >
            <MenuButton
              href={"https://docs.askyourpdf.com/askyourpdf-docs/"}
              target="_blank"
            >
              <HelpCircle />
            </MenuButton>
          </Tooltip>

          {userDetails?.email && (
            <>
              <Tooltip
                title={<TooltipText> {t`Settings`} </TooltipText>}
                placement="right"
                color="#fff"
              >
                <MenuButton
                  href={path.settings}
                  className={
                    router.asPath.includes(path.settings) && !profile
                      ? "active"
                      : ""
                  }
                >
                  <SettingsIcon />
                </MenuButton>
              </Tooltip>
              <Tooltip
                title={<TooltipText> {t`Profile`} </TooltipText>}
                placement="right"
                color="#fff"
              >
                <NotLinkMenuButton
                  className={profile ? "active" : ""}
                  onClick={() => setProfile(!profile)}
                >
                  <UserIcon />
                </NotLinkMenuButton>
              </Tooltip>
            </>
          )}

          {userDetails?.email && (
            <Tooltip
              title={<TooltipText> {t`Logout`} </TooltipText>}
              placement="right"
              color="#fff"
            >
              <LogoutButton onClick={handleLogout}>
                <LogoutIcon />
              </LogoutButton>
            </Tooltip>
          )}
        </ul>
      </SidebarContent>
    </AppSidebarContainer>
  );
}
