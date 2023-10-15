import React, { useState } from "react";
import styled from "styled-components";
import { Alert, Drawer, Input } from "antd";
import { Globe, Info, XCircle } from "@phosphor-icons/react/dist/ssr";
import CopyIcon from "../../img/CopyIconAlt.svg";
import { createApiKey } from "../../services/devapi";
import Spinner from "../Spinner";
import { alerts } from "../../utils/alerts";
import { Trans, t } from "@lingui/macro";

type modalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  keyType: String;
  onUpdate: any;
};

const APIDrawer = styled(Drawer)`
  border-radius: 8px 8px 0px 0px;
  .ant-drawer-body {
    padding: 0;
  }
`;

const ModalHeader = styled.div`
  border-radius: 8px 8px 0px 0px;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  border-bottom: 1px solid #e4e7ec;

  h1 {
    color: #000000;
    font-family: var(--font-satoshi);
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;

    svg {
      display: block;
    }
  }
`;

const ModalBody = styled.div<{ $background?: string }>`
  background: ${(props) => (props.$background ? props.$background : "#ffffff")};
  border-radius: 0px 0px 8px 8px;

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
    padding: 16px;
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

const FormContent = styled.form`
  padding-block: 16px;
  padding-inline: 24px;
`;

const InputContainer = styled.div`
  margin-bottom: 20px;
  p {
    font-family: var(--font-satoshi);
    color: #141718;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px; /* 171.429% */
    letter-spacing: -0.14px;
    margin-bottom: 6px;
  }

  input {
    font-family: var(--font-satoshi);
    border-radius: 8px;
    border: 1px solid #d0d5dd;
    box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
    padding: 10px 14px;

    &:hover {
      border: 1px solid #d0d5dd;
    }

    &:focus {
      border-color: #d0d5dd;
    }
  }

  .ant-input-wrapper {
    .ant-input-group-addon {
      font-family: var(--font-satoshi);
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 24px;
    }
  }

  .ant-input-affix-wrapper-disabled {
    background: #ffffff;
    cursor: default;
    border-radius: 8px;
    padding: 10px 14px;
    input {
      cursor: default;
      font-family: var(--font-eudoxus);
      font-size: 15px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px;
      &:hover,
      &:focus {
        border: none;
      }

      &:disabled {
        color: #667085;
      }
    }
  }

  &:last-child {
    margin-bottom: 26px;
  }
`;

const ModalButton = styled.button`
  border-radius: 8px;
  margin-top: 15px;
  border: 1px solid #000;
  background: #000;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  padding: 8px 14px;

  color: #fff;
  font-family: var(--font-satoshi);
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;

  cursor: pointer;
`;

const ResultContainer = styled.div``;

const ResultContent = styled.div`
  background: #fff;
  padding-inline: 24px;
`;

const ResultHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  padding-block: 17px;
  margin-bottom: 30px;

  p {
    color: #141718;
    font-family: var(--font-satoshi);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: -0.14px;
  }
`;

const ResultBody = styled.div`
  padding-bottom: 29px;
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

const CopyButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  svg {
    display: block;
  }
`;
export default function CreateAPIKeyDesktop({
  keyType,
  open,
  setOpen,
  onUpdate,
}: modalProps) {
  const [keyGenerated, setKeyGenerated] = useState(false);
  const [apiname, setApiName] = useState("");
  const [domainname, setDomainName] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isError, showError] = useState(false);
  const [errorMsg, setError] = useState("");
  const [keyData, setKeyData] = useState({ api_key: "" });
  const handleChange =
    (field: string) =>
    (event: { target: { value: React.SetStateAction<string> } }) => {
      switch (field) {
        case "apiName":
          setApiName(event.target.value);
          break;
        case "domainName":
          setDomainName(event.target.value);
          break;
        default:
          break;
      }
    };
  const onSubmitData = async () => {
    showError(false);

    if (apiname === "") {
      setError(t`Please enter a API name`);
      showError(true);
      return;
    }
    // if (domainname === "") {
    //   setError("Please enter a domain name");
    //   showError(true);
    //   return;
    // }

    setLoading(true);
    let req = await createApiKey(apiname, keyType).catch((e) => {
      showError(true);
      if (!e.response.data.detail[0]) {
        setError(e.response.data.detail);
      } else {
        setError(t`An error has occured`);
      }
    });
    setLoading(false);
    if (req === undefined) return;
    setKeyData(req);
    if (req === false) {
    } else {
      setKeyGenerated(true);
    }
  };
  const handleClose = () => {
    setOpen(false);
    setKeyGenerated(false);
    onUpdate();
  };

  return (
    <APIDrawer
      open={open}
      closable={false}
      destroyOnClose
      placement="bottom"
      height={"85dvh"}
    >
      {isLoading ? (
        <ModalBody $background="#E1E1E1">
          <ResultContainer>
            <ResultContent>
              <ResultBody>
                <div
                  style={{
                    minHeight: "100px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Spinner type="primary" />
                </div>
              </ResultBody>
            </ResultContent>
          </ResultContainer>
        </ModalBody>
      ) : (
        <div>
          <ModalHeader>
            <h1>
              {keyGenerated ? t`API Key Generated` : t`Create New API Key`}
            </h1>
            <button onClick={handleClose}>
              <XCircle size={34} color="#000000" />
            </button>
          </ModalHeader>
          {keyGenerated ? (
            <ModalBody $background="#E1E1E1">
              <ResultContainer>
                <ResultContent>
                  {/* <ResultHeader>
                    <p>Your API Key has been generated successfully for</p>
                    <APIKeyBadge $color="#027A48" $background="#ECFDF3">
                      <Globe size={12} color="#12B76A" weight="bold" />
                      https://{domainname.replace(/^https?\:\/\//i, "")}
                    </APIKeyBadge>
                  </ResultHeader> */}
                  <ResultBody>
                    <InputContainer>
                      <p>
                        <Trans>API Key</Trans>
                      </p>
                      <Input
                        disabled
                        placeholder={t`e.g My Website API Key`}
                        suffix={
                          <CopyButton
                            onClick={() => {
                              navigator.clipboard.writeText(keyData.api_key);
                              alerts.success(t`Copied`, t`API Key copied`);
                            }}
                          >
                            <CopyIcon />
                          </CopyButton>
                        }
                        value={keyData.api_key}
                      />
                    </InputContainer>
                    <Alert
                      message={t`Hey there, Just a quick reminder`}
                      description={t`You'll only see this key once, so please make sure to copy it and keep it safe`}
                      type="error"
                      showIcon
                      icon={<Info size={20} weight="bold" color="#D92D20" />}
                    />
                    {/* <ModalButton onClick={handleClose}>
                      Download Key
                    </ModalButton> */}
                  </ResultBody>
                </ResultContent>
              </ResultContainer>
            </ModalBody>
          ) : (
            <ModalBody>
              <FormContent
                onSubmit={async (e) => {
                  e.preventDefault();
                  onSubmitData();
                }}
              >
                {isError ? (
                  <Alert message="Error" type="error" description={errorMsg} />
                ) : (
                  <></>
                )}
                <InputContainer>
                  <p>
                    <Trans>Name of API Key</Trans>
                  </p>
                  <Input
                    onChange={handleChange("apiName")}
                    value={apiname}
                    placeholder={t`e.g My Website API Key`}
                  />
                </InputContainer>
                {/* <InputContainer>
                  <p>Domain</p>
                  <Input
                    onChange={handleChange("domainName")}
                    value={domainname}
                    addonBefore="https://"
                    placeholder="www.example.com"
                  />
                </InputContainer> */}
                <Alert
                  message={t`Before generating your API Key`}
                  description={
                    <ul>
                      {/* <li>
                        Use a domain that you currently own where your API keys
                        will be used.
                      </li> */}
                      <li>
                        <Trans>
                          Do not share the generated key with anyone.
                        </Trans>
                      </li>
                      <li>
                        <Trans>
                          <span style={{ fontWeight: 700 }}>
                            You&apos;ll only see your API key once
                          </span>{" "}
                          after it&apos;s generated. Please make sure to save it
                          securely.
                        </Trans>
                      </li>
                    </ul>
                  }
                  type="info"
                  showIcon
                  icon={<Info size={20} weight="bold" color="#475467" />}
                />
                <ModalButton>
                  <Trans>Create New Key</Trans>
                </ModalButton>
              </FormContent>
            </ModalBody>
          )}
        </div>
      )}
    </APIDrawer>
  );
}
