import React, { useState } from "react";
import styled from "styled-components";
import { Header } from "antd/lib/layout/layout";
import SettingsIcon from "../img/Settings.svg";
import UserAvatar from "../img/UserAvatar.svg";
import { Dropdown } from "antd";
import { useAuth } from "../providers/AuthProvider";
import { logoutUser } from "../services/authService";
import Profile from "./Modals/Profile";
import { Trans, t } from "@lingui/macro";
import { useRouter } from "next/router";
import Link from "next/link";

const MobileHeaderStyles = styled(Header)`
  display: flex;
  align-items: center;
  background: #050505;
  padding-inline: 30px;
  padding-block: 40px;

  button {
    border: none;
    background: none;
    cursor: pointer;

    svg {
      display: block;
    }
  }

  a {
    margin: 0;
    color: #fff;
    font-size: 16px;
    font-family: var(--font-satoshi);
    font-style: normal;
    font-weight: 700;
    line-height: 20px;
    margin-inline: auto;
  }

  @media (min-width: 992px) {
    display: none;
  }
`;

export default function MobileHeader({ style }: any) {
  const { userDetails, removeAuth } = useAuth();
  const [profile, setProfile] = useState(false);

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

  return (
    <MobileHeaderStyles style={style}>
      {userDetails?.email && (
        <button
          onClick={() => {
            router.push("/settings");
          }}
        >
          <SettingsIcon />
        </button>
      )}
      <Link href={"/"}>AskYourPDF</Link>
      {userDetails?.email && (
        <Dropdown
          menu={{
            items: [
              {
                key: 1,
                label: (
                  <div
                    onClick={() => {
                      setProfile(!profile);
                    }}
                    style={{ fontWeight: "700" }}
                  >
                    <Trans>Profile</Trans>
                  </div>
                ),
              },
              {
                key: 2,
                label: (
                  <Link href={"/knowledge-base"} style={{ fontWeight: "700" }}>
                    <Trans>Knowledge Base</Trans>
                  </Link>
                ),
              },
              {
                key: 3,
                label: (
                  <Link href={"/summarise"} style={{ fontWeight: "700" }}>
                    <Trans>Summarisation</Trans>
                  </Link>
                ),
              },
              {
                key: 4,
                label: (
                  <Link href={"/apikeys"} style={{ fontWeight: "700" }}>
                    <Trans>Developers</Trans>
                  </Link>
                ),
              },
              {
                key: 5,
                label: (
                  <Link href={"/upload"} style={{ fontWeight: "700" }}>
                    <Trans>ID Generator</Trans>
                  </Link>
                ),
              },
              {
                key: 6,
                label: (
                  <div onClick={handleLogout} style={{ fontWeight: "700" }}>
                    <Trans>Logout</Trans>
                  </div>
                ),
              },
            ],
            style: { fontFamily: "var(--font-satoshi)" },
          }}
          trigger={["click"]}
        >
          <button>
            <UserAvatar />
          </button>
        </Dropdown>
      )}
      <Profile
        profile={profile}
        setProfile={setProfile}
        currentPath={router.asPath}
      />
    </MobileHeaderStyles>
  );
}
