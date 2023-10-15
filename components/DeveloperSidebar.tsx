import React from "react";
import { Layout } from "antd";
import styled from "styled-components";
import Link from "next/link";
import { CardIcon, CodeIcon } from "../img/icons";
import { Trans, t } from "@lingui/macro";
import { useRouter } from "next/router";

const { Sider } = Layout;
const DeveloperSidebarStyles = styled(Sider)`
  display: none;
  @media (min-width: 992px) {
    display: block;
    margin-left: 72px;
    color: #fff;
    padding-top: 85px;
    padding-inline: 20px;
  }

  .active {
    div {
      p:first-of-type {
        color: #edb01a;
      }
    }

    #keys_icon {
      fill: #edb01a;
    }

    #billing_icon {
      stroke: #edb01a;
    }
  }
`;

const SidebarContent = styled.div`
  h6 {
    color: #fff;
    font-family: var(--font-satoshi);
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px;
    text-transform: uppercase;
  }

  ul {
    list-style-type: none;

    li {
      padding-block: 24px;
      &:not(:last-child) {
        border-bottom: solid 1px rgba(255, 255, 255, 0.1);
      }
    }
  }
`;

const MenuButton = styled(Link)`
  display: flex;
  gap: 11px;
  svg {
    flex-shrink: 0;
  }
  div {
    p {
      color: #ffffff;
      font-family: var(--font-satoshi);
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
    }

    p:first-of-type {
      font-weight: 700;
      margin-bottom: 8px;
    }
  }

  #keys_icon {
    fill: #ffffff;
  }

  #billing_icon {
    stroke: #ffffff;
  }
  &:hover {
    div {
      p:first-of-type {
        color: #edb01a;
      }
    }

    #keys_icon {
      fill: #edb01a;
    }

    #billing_icon {
      stroke: #edb01a;
    }
  }
`;

// million-ignore
export default function DeveloperSidebar() {
  const router = useRouter();
  const pathName = router.asPath;
  return (
    <DeveloperSidebarStyles
      style={{
        background: "#141414",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        overflow: "auto",
        zIndex: 1010,
      }}
      width={290}
    >
      <SidebarContent>
        <h6>
          {" "}
          <Trans>Developers</Trans>
        </h6>
        <ul>
          <li>
            <MenuButton
              href="/apikeys"
              className={pathName == "/apikeys" ? "active" : ""}
            >
              <CodeIcon id="keys_icon" />
              <div>
                <p>
                  <Trans>API Keys</Trans>
                </p>
                <p>
                  <Trans>
                    Manage & Create API Keys to connect your applications
                  </Trans>
                </p>
              </div>
            </MenuButton>
          </li>
          <li>
            <MenuButton
              href={"/billing"}
              className={pathName.includes("/billing") ? "active" : ""}
            >
              <CardIcon id="billing_icon" />
              <div>
                <p>
                  <Trans>Billing</Trans>
                </p>
                <p>
                  <Trans> Manage payments for your developer account</Trans>
                </p>
              </div>
            </MenuButton>
          </li>
        </ul>
      </SidebarContent>
    </DeveloperSidebarStyles>
  );
}
