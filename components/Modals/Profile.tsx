"use client";
import { Modal, Row, Col, Input, Space } from "antd";
import styled from "styled-components";
import CloseIcon from "../../img/ModalCloseIcon.svg";
import UserAvatar from "../../img/UserAvatar.svg";
import NextIcon from "../../img/next.svg";
import LockIcon from "../../img/Lock.svg";
import React, { useMemo, useState } from "react";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { path } from "@/routes";
import { useAuth } from "@/providers/AuthProvider";
import AppAlert from "../AppAlert";
import { getUserPlans } from "@/utils/utils";
import { Trans, t } from "@lingui/macro";
import { useRouter } from "next/router";
import { deleteAccount, logoutUser } from "@/services/authService";
import Spinner from "../Spinner";
import { alerts } from "@/utils/alerts";
import Link from "next/link";

interface Passwords {
  old: string;
  new: string;
  confirm: string;
}

interface Roles {
  plans: string[];
  api_roles: string[];
}
const UpgradeButton = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 10%;
  right: 20px;
  background: #000000;
  padding: 8px 14px;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  border-radius: 8px;
  border: 1px solid var(--black, #000);
  color: #fff;
  cursor: pointer;
  margin-bottom: 7px;
  font-family: var(--font-satoshi);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  @media (max-width: 900px) {
    position: relative;
    top: 0;
    right: 0;
    width: 200px;
    height: 40px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const PaymentButton = styled(UpgradeButton)`
  background: #fff;
  width: 200px;
  position: relative;
  right: 0px;
  top: 0px;
  color: #000;
  @media (max-width: 574px) {
    width: 100%;
  }

  &:disabled {
    opacity: 0.5;
  }
`;

export default function Profile({
  currentPath,
  profile,
  setProfile,
}: {
  currentPath: string;
  profile: boolean;
  setProfile: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [passwordScreen, setPasswordScreen] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [isAccountDeleted, setIsAccountDeleted] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [password, setPassword] = useState<Passwords>();
  const [error, setError] = useState(false);
  const { userDetails } = useAuth();
  const router = useRouter();
  const location = router.asPath;
  // const {mutate, isLoading} = useUpdatePasswordMutation()
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let Name = name.split(" ")[0];
    const passwords = {
      ...password,
      [Name]: value,
    } as Passwords;
    setPassword(passwords);
  };

  async function handlePasswordUpdate() {
    if (!(password?.new === password?.confirm)) {
      return setError(true);
    }
    let data = { password: password?.new };
    console.log("mutate", data);
  }
  async function handleDeleteAccount() {
    try {
      setIsDeleting(true);
      await Promise.all([deleteAccount(), logoutUser()]);
      setIsAccountDeleted(true);
    } catch (error) {
      const errorMessage = error as string;
      alerts.error(
        t`Deletion Failed`,
        t`Error deleting your account: ${errorMessage}`
      );
    } finally {
      setIsDeleting(false);
    }
  }

  const { normal_role, api_role } = useMemo(
    () => getUserPlans(userDetails?.roles || []),
    [userDetails?.roles]
  );

  return (
    <CustomModal
      title={
        passwordScreen ? (
          <p onClick={() => setPasswordScreen(!passwordScreen)}>
            <span>
              <ArrowLeft />
            </span>{" "}
            <Trans>Change Password</Trans>
          </p>
        ) : (
          "Profile"
        )
      }
      open={profile}
      maskStyle={{
        background: "rgba(0, 0, 0, 0.60)",
        backdropFilter: "blur(8px)",
      }}
      width={636}
      footer={null}
      closeIcon={
        <WhiteCloseIcon
          onClick={() => {
            if (isAccountDeleted) {
              window.location.href = "/"
            } else {
              setProfile(!profile);
            }
          }}
        />
      }
      onCancel={() => setProfile(!profile)}
      wrapClassName={
        [path.apiKeys, path.billingInfo].some((subPath) =>
          currentPath.includes(subPath)
        )
          ? "dev__modal"
          : ""
      }
      closable={!isDeleting}
      maskClosable={!isDeleting}
    >
      {passwordScreen ? (
        <>
          <CustomSpace direction="vertical" size="middle">
            {error && (
              <AppAlert
                type="error"
                message={t`confirm password and new password don' match`}
              />
            )}
            <CustomCol>
              <h1>
                <Trans>Old Password</Trans>
              </h1>
              <InputContainer>
                <LockIcon />
                <StyledInput
                  name={t`old password`}
                  onChange={handleOnChange}
                  placeholder="••••••••••••••••••"
                  value={password?.old}
                />
              </InputContainer>
            </CustomCol>
            <CustomRow>
              <CustomCol>
                <h1>
                  <Trans>New Password</Trans>
                </h1>
                <InputContainer>
                  <LockIcon />
                  <StyledInput
                    name={t`new password`}
                    onChange={handleOnChange}
                    placeholder="••••••••••••••••••"
                    value={password?.new}
                  />
                </InputContainer>
              </CustomCol>
              <CustomCol>
                <h1>
                  <Trans>Confirm Password</Trans>
                </h1>
                <InputContainer>
                  <LockIcon />
                  <StyledInput
                    name={t`confirm password`}
                    onChange={handleOnChange}
                    placeholder="••••••••••••••••••"
                    value={password?.confirm}
                  />
                </InputContainer>
              </CustomCol>
            </CustomRow>
            <UpdateButton onClick={handlePasswordUpdate}>
              <Trans>Update</Trans>
            </UpdateButton>
          </CustomSpace>
        </>
      ) : showDeleteConfirmation ? (
        <>
          {!isAccountDeleted ? (
            <>
              <DeleteContainer>
                <h1>
                  <Trans>Delete Account</Trans>
                </h1>
                <p>
                  <Trans>
                    Are you sure you want to delete your account? Deleting your
                    account will result in the permanent loss of all your data.
                  </Trans>
                </p>
                <DelBtnGroup>
                  <CancelButton
                    onClick={() => setShowDeleteConfirmation(false)}
                    disabled={isDeleting}
                  >
                    <Trans>Go Back</Trans>
                  </CancelButton>
                  <DelButton
                    onClick={handleDeleteAccount}
                    disabled={isDeleting}
                  >
                    {isDeleting ? (
                      <Spinner style={{ width: "32px", height: "auto" }} />
                    ) : (
                      <Trans>Delete Account</Trans>
                    )}
                  </DelButton>
                </DelBtnGroup>
              </DeleteContainer>
            </>
          ) : (
            <>
              <DeleteContainer>
                <h1>
                  <Trans>Your Account has been Deleted</Trans>
                </h1>
                <p>
                  <Trans>
                    Your account has been successfully deleted. We're sorry to
                    see you go, but if you ever change your mind, we'll be here
                    to welcome you back. Thank you for being a part of our
                    community.
                  </Trans>
                </p>
                <DelBtnGroup>
                  <CancelButton  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = "/";
                  }}>
                      <Trans>Back to Homepage</Trans>
                  </CancelButton>
                </DelBtnGroup>
              </DeleteContainer>
            </>
          )}
        </>
      ) : (
        <>
          <ImageSection>
            <figure>
              <UserAvatar />
            </figure>
            <div>
              <BoldP>
                <Trans> Email Address</Trans>
              </BoldP>
              <ThinP>{userDetails?.email}</ThinP>
            </div>
          </ImageSection>
          <ColumnContainer>
            {/* <Col>
                            <BoldP>Email Address</BoldP>
                            <ThinP>{userDetails?.email}</ThinP>
                        </Col> */}
            <PlansRow justify={"space-between"} align={"bottom"}>
              <Col>
                <BoldP>
                  <Trans>Plan</Trans>
                </BoldP>
                <ThinP>
                  {normal_role} <Trans> Plan</Trans>
                </ThinP>
              </Col>

              <ManageButton
                onClick={() => {
                  if (location === path.settings) {
                    return setProfile(!profile);
                  }
                  router.push(path.settings);
                }}
              >
                <Trans> Manage</Trans>
              </ManageButton>
            </PlansRow>
            <Row
              style={{ cursor: "pointer" }}
              justify={"space-between"}
              onClick={() => router.push(path.apiKeys)}
            >
              <Col>
                <BoldP>
                  <Trans>API Plan</Trans>
                </BoldP>
                <ThinP>{api_role}</ThinP>
              </Col>
              <Col>
                <NextIcon />
              </Col>
            </Row>
            <Row
              style={{
                cursor: "pointer",
                alignItems: "center",
                borderTop: "1px solid rgba(0, 0, 0, 0.05)",
                paddingTop: "10px",
              }}
              justify={"space-between"}
              align={"bottom"}
              onClick={() => setShowDeleteConfirmation(true)}
            >
              <Col>
                <BoldP>
                  <Trans>Delete Account</Trans>
                </BoldP>
              </Col>
              <Col>
                <NextIcon />
              </Col>
            </Row>
          </ColumnContainer>
        </>
      )}
    </CustomModal>
  );
}
const ManageButton = styled(PaymentButton)`
  position: relative;
  width: 110px;
`;
const DelButton = styled(PaymentButton)`
  background: #fff;
  border: none;
  color: #c82035;
  width: fit-content;
  box-shadow: none;
  font-family: var(--font-satoshi);
  font-size: 16px;
  font-style: normal;
  font-weight: 700;

  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;
const UpdateButton = styled(PaymentButton)`
  background: #000;
  color: #fefefe;
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px 0 -15px;
  position: relative;
  width: 200px;
  @media (max-width: 576px) {
    width: 100%;
    margin: auto;
  }
`;
const CustomCol = styled(Col)`
  width: 45%;
  @media (max-width: 576px) {
    margin: auto;
    width: 100%;
  }
`;
const CustomRow = styled(Row)`
  width: 100;
  justify-content: space-between;
`;
const InputContainer = styled(Row)`
  flex-wrap: nowrap;
  align-items: center;
  background: #f3f5f7;
  padding: 12px 14px;
  gap: 5px;
  border-radius: 12px;
`;
const StyledInput = styled(Input.Password)`
  border: none;
  font-family: var(--font-inter);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  background: #f3f5f7;
  padding: 0px;
  width: 80%;
  margin-left: 8%;

  &:not(:focus) {
    box-shadow: none;
    border-color: transparent;
  }

  input {
    background-color: inherit;
  }

  input::placeholder {
    color: #232627;
  }
`;
const CustomSpace = styled(Space)`
  width: 90%;
  margin: auto;
  display: flex;
  margin-top: -4%;

  h1 {
    color: #141718;
    font-family: var(--font-satoshi);
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 36px;
  }
`;
const BoldP = styled.p`
  display: flex;
  align-items: center;
  color: #141718;
  font-family: var(--font-satoshi);
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: -0.56px;

  span {
    height: 17px;
    margin-left: 5px;
  }
`;
const ThinP = styled(BoldP)`
  font-weight: 400;
  letter-spacing: -0.28px;
`;
const ImageSection = styled.div`
  display: flex;
  width: 50%;
  justify-content: flex-start;
  align-items: center;
  padding-left: 10%;
  margin-bottom: 35px;

  figure > SVG {
    width: 55.755px;
    height: 55.755px;
    margin-right: 15px;
    object-fit: cover;
  }

  @media (max-width: 576px) {
    width: 100%;
  }
`;
const CustomModal = styled(Modal)`
  .ant-modal-content {
    padding: 0 0 10px;
    background: #e1e1e1;
    min-height: 393px;
  }

  .ant-modal-body {
    border-radius: 8px;
    margin: auto;
    background: #fff;
    width: 90%;
    min-height: 301px;
    padding: 7% 0px;
  }

  .ant-modal-header {
    display: flex;
    align-items: center;
    padding: 20px 20px;
    border-radius: 8px 8px 0px 0px;
    background: #030303;
    cursor: pointer;

    span {
      margin: 8px;
    }
  }

  .ant-modal-close-x {
    background: #030303;
  }

  .ant-modal-title {
    color: #fff;
    flex-grow: 1;
    font-family: var(--font-satoshi);
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px;
  }

  @media (max-width: 576px) {
    .ant-modal-body {
      width: 95%;
    }
  }
`;
const WhiteCloseIcon = styled(CloseIcon)`
  path {
    fill: #fff;
  }
`;
const ColumnContainer = styled(Col)`
  gap: 30px;
  padding: 0 6%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PlansRow = styled(Row)`
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  height: 70px;
  padding-bottom: 10px;
`;
const DeleteContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: var(--font-satoshi);

  h1 {
    font-size: 20px;
  }
  p {
    width: 80%;
    text-align: center;
    font-size: 16px;
    padding-block: 8px;
    font-weight: 500;
    opacity: 1;
  }
`;
const DelBtnGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding-top: 24px;
  width: 100%;

  a {
    color: #fff;
  }
`;
const CancelButton = styled(PaymentButton)`
  background: #000;
  border: none;
  color: #fff;
  width: 70%;
  padding: 14px 0;
  box-shadow: none;
  font-family: var(--font-satoshi);
  font-size: 16px;
  font-style: normal;
  font-weight: 700;

  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;
