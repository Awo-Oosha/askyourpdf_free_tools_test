"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Alert, Dropdown, DatePicker } from "antd";
import {
  ArrowRight,
  CalendarBlank,
  CodesandboxLogo,
  DotsThreeOutlineVertical,
  Eye,
  EyeSlash,
  Globe,
  Info,
  Lock,
  Warning,
} from "@phosphor-icons/react/dist/ssr";
import KeyIcon from "../img/KeyIcon.svg";
import DocumentEmpty from "../img/DocumentEmpty.svg";
import DocumentIcon from "../img/DocumentIcon.svg";
import MessasgeSquareQuestion from "../img/MessageSquareQuestion.svg";
import { deleteApiKey, apiAnalytics } from "../services/devapi";
import { useQuery } from "react-query";
import Link from "next/link";
import { alerts } from "../utils/alerts";
import { PREMIUM_ROLES, LIVE_API_CREATION } from "../config/config";
import { Trans, t } from "@lingui/macro";

const EmptyListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border-radius: 12px;
  border: 1px solid var(--gray-200, #eaecf0);
  padding: 16px;
  min-height: 290px;

  color: #344054;
  font-family: var(--font-satoshi);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;

  button {
    color: #ffffff;
    padding: 8px 14px;
    border-radius: 8px;
    border: 1px solid var(--black, #000);
    background: var(--black, #000);
    box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
    font-family: var(--font-satoshi);
    font-weight: 700;
    cursor: pointer;
  }
`;

const KeyListContainer = styled.div`
  .ant-alert {
    padding: 16px;
  }

  .ant-alert-info {
    border: 1px solid #d0d5dd;
    background: #fcfcfd;

    .ant-alert-message,
    .ant-alert-description {
      color: #344054;
    }
  }

  .ant-alert-error {
    border: 1px solid #fda29b;
    background: #fffbfa;

    .ant-alert-message,
    .ant-alert-description {
      color: #b42318;
    }
  }

  .ant-alert-with-description {
    .ant-alert-message {
      font-family: var(--font-satoshi);
      font-size: 14px;
      font-style: normal;
      line-height: 20px;
      font-weight: 700;
      margin-bottom: 4px;
    }
    .ant-alert-description {
      font-family: var(--font-satoshi);
      font-size: 14px;
      font-style: normal;
      line-height: 20px;
      font-weight: 400;

      .alert__actions {
        display: flex;
        gap: 12px;
        margin-top: 12px;
        flex-wrap: wrap;

        button {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          background: none;
          border: none;
          color: #667085;
          font-family: var(--font-satoshi);
          font-size: 14px;
          font-style: normal;
          font-weight: 500;
          line-height: 20px;
        }
      }
    }
  }
`;

const KeyList = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const APIKeyItem = styled.div`
  border-radius: 12px;
  border: 1px solid #eaecf0;
  background: #f9f9f9;
  padding-block: 24px;
  margin-bottom: 20px;
`;

const APIKeyItemHeader = styled.div`
  display: flex;
  align-items: center;
  border-bottom: solid 1px rgba(32, 32, 32, 0.1);
  padding-inline: 30px;
  padding-bottom: 15px;
  h1 {
    color: #101828;
    font-family: var(--font-satoshi);
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 28px;
  }

  .key__name {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  @media (min-width: 992px) {
    .key__name {
      flex-direction: row;
    }
  }
`;

const APIKeyItemBody = styled.div`
  padding-inline: 30px;
  padding-top: 30px;

  .key_label {
    font-family: var(--font-satoshi);
    font-size: 14px;
    color: #344054;
    margin-bottom: 6px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
  }
`;

const APIKeyBadge = styled.div<{ $color?: string; $background?: string }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px 2px 10px;
  border-radius: 16px;
  background: ${(props) => (props.$background ? props.$background : "#f2f4f7")};

  color: ${(props) => (props.$color ? props.$color : "#344054")};
  font-family: var(--font-satoshi);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;

  svg {
    flex-shrink: 0;
  }
`;

const APIKeyFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: 992px) {
    flex-direction: row;
    align-items: center;
    gap: 22px;
  }
`;

const APIKeyInputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #d0d5dd;
  background: #fff;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  gap: 8px;

  input {
    width: 100%;
    color: #667085;
    font-family: var(--font-inter);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    border: 0px;
    background: transparent;
  }

  button {
    background: none;
    border: 0px;
    cursor: pointer;

    svg {
      display: block;
    }
  }
`;

const APIKeyDate = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  flex-shrink: 0;

  p {
    color: #667085;
    font-family: var(--font-satoshi);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
  }
`;

const AnalyticsToggle = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border-radius: 8px;
  border: 1px solid #4b4d56;
  padding: 6px 14px;
  margin-top: 20px;

  color: #292d32;
  font-family: var(--font-satoshi);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  cursor: pointer;
`;

const APIKeyItemAnalytics = styled.div`
  margin-top: 24px;
  border-radius: 12px;
  border: 1px solid #eaecf0;
  padding: 32px;

  h1 {
    color: #101828;
    font-family: var(--font-satoshi);
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 28px;
  }
`;

const AnalyticsDataContainer = styled.div`
  margin-top: 40px;
`;

const AnalyticsData = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  padding-block: 18px;
  border-bottom: solid 1px rgba(32, 32, 32, 0.1);

  color: #667085;
  font-weight: 500;
  font-family: var(--font-satoshi);
  font-size: 14px;
  font-style: normal;
  line-height: 20px;

  div {
    display: flex;
    gap: 14px;
    align-items: center;

    p {
      color: #000;
      font-weight: 700;
    }
  }

  & > p {
    margin-left: 38px;
  }

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
    border-bottom: 0px;
  }

  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;

    & > p {
      margin-left: 0;
    }
  }
`;

const AnalyticsHeader = styled.div`
  display: flex;
  gap: 15px;
  flex-direction: column;
  margin-bottom: 23px;

  @media (min-width: 992px) {
    gap: unset;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const DatePickerContainer = styled.div`
  display: flex;
  justify-content: center;

  align-items: center;
  // padding: 10px 16px;
  border-radius: 8px;
  border: 1px solid #d0d5dd;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);

  .calendar__icon {
    padding-left: 16px;
    svg {
      display: block;
    }
  }

  .ant-picker {
    // width: 100%;
    padding-left: 4px;
    padding-block: 10px;
    padding-right: 16px;
  }

  .ant-picker-range-separator {
    display: none;
  }

  .ant-picker-input input {
    text-align: center;
    color: #344054;
    font-family: var(--font-satoshi);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
  }

  @media (min-width: 992px) {
    max-width: 240px;
    justify-content: unset;
  }
`;

const StyleWrapperDatePicker = styled.div`
  .ant-picker-panel {
    &:last-child {
      width: 0;
      .ant-picker-header {
        position: absolute;
        right: 0;
        .ant-picker-header-prev-btn,
        .ant-picker-header-view {
          visibility: hidden;
        }
      }

      .ant-picker-body {
        display: none;
      }

      @media (min-width: 992px) {
        width: 280px !important;
        .ant-picker-header {
          position: relative;
          .ant-picker-header-prev-btn,
          .ant-picker-header-view {
            visibility: initial;
          }
        }

        .ant-picker-body {
          display: block;
        }
      }
    }
  }
`;

const panelRender = (panelNode: any) => (
  <StyleWrapperDatePicker>{panelNode}</StyleWrapperDatePicker>
);

const { RangePicker } = DatePicker;

export default function APIKeysList({
  apiKeys,
  keyType,
  userData,
  onUpdate,
}: {
  apiKeys: any[];
  keyType: "prod" | "test";
  userData?: any;
  onUpdate?: any;
}) {
  const isAccountFree =
    keyType === "test"
      ? !userData.roles.some((i: any) => PREMIUM_ROLES.includes(i))
      : !userData.roles.some((i: any) => LIVE_API_CREATION.includes(i));

  const analytics = useQuery({
    queryKey: ["todos", keyType === "prod" ? "PROD" : "DEV"],
    queryFn: ({ queryKey }) => apiAnalytics(queryKey[1]),
  });

  const removeKey = (itemId: String) => {
    deleteApiKey(itemId).then((data) => {
      alerts.success(t`Key Deleted`, data.message);
      onUpdate();
    });
  };

  if (isAccountFree) {
    return (
      <EmptyListContainer>
        <CodesandboxLogo weight="bold" size={43} />
        <p>
          You need to upgrade your account to create{" "}
          {keyType === "prod" ? t`production` : t`test`} keys
        </p>
        <Link href="/billing/upgrade">
          <button>Upgrade Account</button>
        </Link>
      </EmptyListContainer>
    );
  }
  return keyType === "prod" ? (
    true ? (
      <KeyListContainer>
        {userData.roles.some((i: any) => PREMIUM_ROLES.includes(i)) ? (
          <></>
        ) : (
          <Alert
            message={t`You're on the Free Plan. Your quota will be limited to the free plan quota`}
            description={
              <>
                <p>
                  <Trans>
                    {" "}
                    This quota sets the maximum number of API calls or actions
                    you can perform within a given period. If you find your
                    needs exceeding this limit, consider upgrading to one of our
                    premium plans for additional quota and features.
                  </Trans>
                </p>
                <div className="alert__actions">
                  <button>
                    <Trans>Upgrade Developer Account</Trans>{" "}
                    <ArrowRight size={20} color="#667085" />
                  </button>
                </div>
              </>
            }
            type="info"
            showIcon
            icon={<Info size={20} weight="bold" color="#475467" />}
          />
        )}

        <KeyList>
          <div>
            {apiKeys
              .filter((item: { key_type: String }) => item.key_type === "PROD")
              .map((keyinfo) => (
                <APIKeyItem key={keyinfo.id}>
                  <APIKeyItemHeader>
                    <div className="key__name">
                      <h1>{keyinfo.name}</h1>
                      {/* <APIKeyBadge $color="#027A48" $background="#ECFDF3">
                        <Globe size={12} color="#12B76A" weight="bold" />
                        {keyinfo.domain}
                      </APIKeyBadge> */}
                    </div>
                    <Dropdown
                      menu={{
                        items: [
                          {
                            key: 1,
                            label: t`Delete Key`,
                            onClick: () => {
                              removeKey(keyinfo.id);
                            },
                          },
                        ],
                      }}
                      trigger={["click"]}
                    >
                      <DotsThreeOutlineVertical
                        color="#98A2B3"
                        size={20}
                        style={{ marginLeft: "auto", cursor: "pointer" }}
                      />
                    </Dropdown>
                  </APIKeyItemHeader>
                  <APIKeyItemBody>
                    <p className="key_label">
                      <Trans>API Key</Trans>
                    </p>
                    <APIKeyFieldContainer>
                      <APIKeyInputContainer>
                        <input
                          type="password"
                          disabled
                          value={
                            "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
                          }
                        />
                      </APIKeyInputContainer>
                      <APIKeyDate>
                        <KeyIcon />
                        <p>
                          <Trans>Generated on</Trans>{" "}
                          {new Date(keyinfo.created).toDateString()}
                        </p>
                      </APIKeyDate>
                    </APIKeyFieldContainer>
                  </APIKeyItemBody>
                </APIKeyItem>
              ))}

            {apiKeys.filter(
              (item: { key_type: String }) => item.key_type === "PROD"
            ).length > 0 &&
            userData.roles.some((i: any) => PREMIUM_ROLES.includes(i)) ? (
              <APIKeyItemAnalytics>
                <AnalyticsHeader>
                  <h1>
                    <Trans>Analytics for Default Key</Trans>
                  </h1>
                  <DatePickerContainer>
                    <div className="calendar__icon">
                      <CalendarBlank size={20} color="#344054" />
                    </div>
                    <RangePicker
                      bordered={false}
                      suffixIcon={null}
                      panelRender={panelRender}
                    />
                  </DatePickerContainer>
                </AnalyticsHeader>
                <Alert
                  message={t`Need to increase your monthly limits?`}
                  description={
                    <>
                      <p>
                        <Trans>
                          If you wish to increase your monthly limits you can
                          upgrade to a higher subscription plan
                        </Trans>
                      </p>
                      <div className="alert__actions">
                        <Link href="/billing/upgrade">
                          {" "}
                          <button>
                            <Trans>Upgrade Account</Trans>{" "}
                            <ArrowRight size={20} color="#667085" />
                          </button>
                        </Link>
                      </div>
                    </>
                  }
                  type="info"
                  showIcon
                  icon={<Info size={20} weight="bold" color="#475467" />}
                  closable
                />
                <AnalyticsDataContainer>
                  <AnalyticsData>
                    <div>
                      <MessasgeSquareQuestion />
                      <p>
                        <Trans>Number of Questions</Trans>
                      </p>
                    </div>
                    <p>
                      {!analytics.isLoading
                        ? analytics.data.number_of_questions
                        : ""}{" "}
                      <Trans>Used</Trans>
                    </p>
                  </AnalyticsData>
                  <AnalyticsData>
                    <div>
                      <DocumentEmpty />
                      <p>
                        <Trans>Number of Pages</Trans>
                      </p>
                    </div>
                    <p>
                      {!analytics.isLoading
                        ? analytics.data.number_of_pages
                        : ""}{" "}
                      <Trans> Used</Trans>
                    </p>
                  </AnalyticsData>
                </AnalyticsDataContainer>
              </APIKeyItemAnalytics>
            ) : (
              <></>
            )}
          </div>
        </KeyList>
      </KeyListContainer>
    ) : (
      <EmptyListContainer>
        <CodesandboxLogo weight="bold" size={43} />
        <p>
          <Trans>Click the button below to get started</Trans>
        </p>
        <button>
          <Trans>Generate API Key</Trans>
        </button>
      </EmptyListContainer>
    )
  ) : (
    <KeyListContainer>
      <Alert
        message={t`Do not use test keys on production server`}
        description={t`Test API keys should only be used on staging or during development. Switch to production keys when you wish to go live`}
        type="error"
        showIcon
        icon={<Warning size={20} weight="bold" color="#D92D20" />}
      />
      <KeyList>
        <div>
          {apiKeys
            .filter((item: { key_type: String }) => item.key_type === "DEV")
            .map((keyinfo) => (
              <APIKeyItem key={keyinfo.id}>
                <APIKeyItemHeader>
                  <div className="key__name">
                    <h1>{keyinfo.name}</h1>
                    {/* <APIKeyBadge $color="#027A48" $background="#ECFDF3">
                               <Globe size={12} color="#12B76A" weight="bold" />
                               {keyinfo.domain}
                             </APIKeyBadge> */}
                  </div>
                  <Dropdown
                    menu={{
                      items: [
                        {
                          key: 1,
                          label: t`Delete Key`,
                          onClick: () => {
                            removeKey(keyinfo.id);
                          },
                        },
                      ],
                    }}
                    trigger={["click"]}
                  >
                    <DotsThreeOutlineVertical
                      color="#98A2B3"
                      size={20}
                      style={{ marginLeft: "auto", cursor: "pointer" }}
                    />
                  </Dropdown>
                </APIKeyItemHeader>
                <APIKeyItemBody>
                  <p className="key_label">
                    <Trans> API Key</Trans>
                  </p>
                  <APIKeyFieldContainer>
                    <APIKeyInputContainer>
                      <input
                        type="password"
                        disabled
                        value={
                          "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
                        }
                      />
                    </APIKeyInputContainer>
                    <APIKeyDate>
                      <KeyIcon />
                      <p>
                        <Trans>Generated on</Trans>{" "}
                        {new Date(keyinfo.created).toDateString()}
                      </p>
                    </APIKeyDate>
                  </APIKeyFieldContainer>
                </APIKeyItemBody>
              </APIKeyItem>
            ))}

          {apiKeys.filter(
            (item: { key_type: String }) => item.key_type === "DEV"
          ).length > 0 ? (
            <APIKeyItemAnalytics>
              <AnalyticsHeader>
                <h1>
                  <Trans>Analytics for Default Key</Trans>
                </h1>
              </AnalyticsHeader>
              <Alert
                message="Test Keys Are Limited"
                description={
                  <>
                    <p>
                      <Trans>
                        {" "}
                        Once you exhaust your quota you will have to upgrade to
                        a production account to keep using your service
                      </Trans>
                    </p>
                    <div className="alert__actions">
                      <button>
                        <Trans>Read Documentation</Trans>
                      </button>
                      <Link href="/billing/upgrade">
                        {" "}
                        <button>
                          <Trans>Upgrade Account</Trans>
                        </button>
                      </Link>
                    </div>
                  </>
                }
                type="info"
                showIcon
                icon={<Info size={20} weight="bold" color="#475467" />}
              />
              <AnalyticsDataContainer>
                <AnalyticsData>
                  <div>
                    <MessasgeSquareQuestion />
                    <p>
                      <Trans>Number of Questions</Trans>
                    </p>
                  </div>
                  <p>
                    {!analytics.isLoading
                      ? analytics.data.number_of_questions
                      : ""}{" "}
                    <Trans>Used</Trans>
                  </p>
                </AnalyticsData>
                <AnalyticsData>
                  <div>
                    <DocumentEmpty />
                    <p>
                      <Trans>Number of Pages</Trans>
                    </p>
                  </div>
                  <p>
                    {!analytics.isLoading ? analytics.data.number_of_pages : ""}{" "}
                    <Trans>Used</Trans>
                  </p>
                </AnalyticsData>
              </AnalyticsDataContainer>
            </APIKeyItemAnalytics>
          ) : (
            <></>
          )}
        </div>
      </KeyList>
    </KeyListContainer>
  );
}
