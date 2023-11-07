import React, { useState } from "react";
import styled from "styled-components";
import { Header } from "antd/lib/layout/layout";
import SettingsIcon from "../img/Settings.svg";
import UserAvatar from "../img/UserAvatar.svg";
import { Dropdown } from "antd";
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
  const [profile, setProfile] = useState(false);

  const router = useRouter();

  const handleLogout = async () => {

  };

  return (
    <MobileHeaderStyles style={style}>
     
      <Link href={"/"}>AskYourPDF</Link>
     
      
    </MobileHeaderStyles>
  );
}
