import React, {useState} from "react";
import styled from "styled-components";
import {Drawer, Grid, Input, Modal, Select} from "antd";
import {Check, XCircle} from "@phosphor-icons/react/dist/ssr";
import {t, Trans} from "@lingui/macro";
import {alerts} from "@/utils/alerts";
import {fetchMessageByIndex, sendFeedback} from "@/services/conversations";
import {useAuth} from "@/providers/AuthProvider";
import Spinner from "../Spinner";

type modalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  chatID: string;
  messageIndex: number | undefined;
  messageID: string | undefined;
  setMessages: React.Dispatch<React.SetStateAction<any[]>>;
  expression: string | undefined;
};

const { TextArea } = Input;
const ConversationFeedbackModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 8px;
  }
  font-family: var(--font-satoshi);
  font-style: normal;
`;
const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;

  button {
    background: none;
    border: none;
    cursor: pointer;
  }
`;
const ModalBody = styled.div`
  color: #000;
  font-family: var(--font-satoshi);
  font-size: 16px;
`;
const ModalHeading = styled.div`
  display: flex;
  justify-content: center;

  font-size: 20px;
  font-family: var(--font-satoshi);
  color: #000;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
`;
const SelectOptions = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 25px;

  color: #000;
  font-family: var(--font-satoshi);
  font-size: 20px;
  font-style: normal;

  .ant-select {
    width: 100%;
    outline: none;
    &:focus {
      border-color: #000;
      outline: none;
      box-shadow: none;
    }
    &:hover {
      border-color: #000;
    }
  }
  .ant-select-selector {
    color: #000;
    opacity: 0.5;
    font-family: var(--font-satoshi);
    font-size: 16px;
    border-radius: 8px;
    border-color: #8a8a8a !important;
    height: unset !important;
    padding: 7px 20px !important;
    border-radius: 8px !important;
    border: 1px solid #000 !important;
  }
  .ant-select-dropdown {
    font-family: var(--font-satoshi) !important;
    background-color: #f4f4f4 !important;
  }
  .ant-select-item-option-active {
    background-color: #98a2b3 !important;
    color: white !important;
  }
`;

const InputCont = styled.div`
  width: 100%;
  margin-block: 35px;
  display: flex;
  flex-direction: column;
`;
const Label = styled.label`
  margin-bottom: 8px;
  opacity: 0.5;
`;
const MessageTextArea = styled(TextArea)`
  box-sizing: border-box;
  width: 100%;
  border-radius: 8px;
  border-color: #8a8a8a;
  padding: 10px;
  resize: none !important;
  &::placeholder {
    color: #000;
    opacity: 0.5;
    font-family: var(--font-satoshi);
    font-size: 16px;
  }
  &:focus {
    border-color: #000;
    outline: none;
    box-shadow: none;
  }
  &:hover {
    border-color: #000;
  }
`;
const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 10px;
  margin-top: 50px;
`;
const CancelButton = styled.button`
  border: 1px solid #000;
  border-radius: 8px;
  width: 27%;
  height: 50px;
  background: none;
  font-family: var(--font-satoshi);
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  cursor: pointer;

  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;
const SubmitButton = styled.button`
  border: 1px solid #000;
  border-radius: 8px;
  width: 27%;
  height: 50px;
  background: #000;
  color: #fff;
  font-family: var(--font-satoshi);
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  cursor: pointer;

  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;
const CloseButton = styled.button`
  border: 1px solid #000;
  border-radius: 8px;
  width: 30%;
  height: 50px;
  background: #000;
  color: #fff;
  font-family: var(--font-satoshi);
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  cursor: pointer;
`;
const CloseBtnCont = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 30px;
`;

const BottomSheet = styled(Drawer)`
  border-radius: 20px 20px 0px 0px;

  .ant-drawer-body {
    padding-top: 60px;
  }
`;

const SelectMenu = styled.div`
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  background: #f4f4f4;
  border-radius: 5px;
  border: 1px solid #98a2b3;
  .ant-select-item-option {
    flex-direction: row-reverse;
    gap: 8px;
    padding-inline: 30px;
    padding-block: 10px;

    font-family: var(--font-satoshi);
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.32px;

    &:not(:last-of-type) {
      border-bottom: 1px solid #e4e7ec;
    }
  }

  .ant-select-item-option-selected {
    position: relative !important;
    background: #98a2b3 !important;
    color: #ffffff !important;
    padding-inline: 7px;
  }
`;

const { useBreakpoint } = Grid;

export default function ConversationFeedback({
  open,
  setOpen,
  chatID,
  messageIndex,
  messageID,
  setMessages,
  expression,
}: modalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [messageText, setMessageText] = useState("");
  const handleClose = () => {
    setOpen(false);
  };

  const { userToken } = useAuth();

  const handleFormSubmit = async () => {
    try {
      setIsSubmitting(true);

      const ID = await getMessageId();
      await sendFeedback(messageText, selectedOption, userToken, chatID, ID);
      updateMessages(ID);

      setSubmitted(true);
    } catch (error) {
      const errorMessage = error as string;
      alerts.error(
          t`Submission Failed`,
          t`Error submitting your issue: ${errorMessage}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getMessageId = async (): Promise<string> => {
    if (messageID !== undefined) {
      return messageID;
    }

    const message = await fetchMessageByIndex(1, messageIndex!, chatID, userToken);
    return message.message_id;
  };

  const updateMessages = (ID: string) => {
    setMessages((oldMessages: any) => {
      return oldMessages.map((message: any) => {
        const isTargetMessage = messageID !== undefined
            ? message.message_id === ID
            : message.index === messageIndex;

        if (isTargetMessage) {
          return {
            ...message,
            expression: "DISLIKE",
          };
        }
        return message;
      });
    });
  };

  const screens = useBreakpoint();
  return screens.lg ? (
    <ConversationFeedbackModal
      open={open}
      onCancel={handleClose}
      maskStyle={{
        background: "rgba(0, 0, 0, 0.35)",
        backdropFilter: "blur(8px)",
      }}
      footer={null}
      width={550}
      closeIcon={<></>}
      destroyOnClose
      wrapClassName="dev__modal"
      closable={!isSubmitting}
      maskClosable={!isSubmitting}
    >
      <ModalHeader>
        {isSubmitting ? (
          <button onClick={handleClose} disabled>
            <XCircle size={34} color="#bababa" />
          </button>
        ) : (
          <button onClick={handleClose}>
            <XCircle size={34} color="#000000" />
          </button>
        )}
      </ModalHeader>
      <ModalBody>
        {expression == "DISLIKE" || submitted ? (
          <div>
            <ModalHeading>
              <Trans>Thank You</Trans>
            </ModalHeading>
            <div
              style={{
                lineHeight: 1.3,
                fontWeight: 500,
                textAlign: "center",
                paddingTop: "20px",
              }}
            >
              <Trans>
                Your feedback is crucial for improving our user experience and
                our team is actively working to resolve the issue. We truly
                appreciate your contribution to improving our platform.
              </Trans>
            </div>
            <CloseBtnCont>
              <CloseButton onClick={handleClose}>
                <Trans>Close</Trans>
              </CloseButton>
            </CloseBtnCont>
          </div>
        ) : (
          <>
            <ModalHeading>
              <Trans>Report an Issue</Trans>
            </ModalHeading>

            <SelectOptions>
              <Select
                defaultValue={t`Select an option`}
                onChange={(value) => {
                  setSelectedOption(value);
                }}
                options={[
                  { value: "bug", label: t`Bug` },
                  { value: "harmful", label: t`Harmful Content` },
                  { value: "incorrect", label: t`Incorrect Response` },
                  { value: "other", label: t`Other` },
                ]}
                dropdownRender={(menu) => <SelectMenu>{menu}</SelectMenu>}
                dropdownStyle={{
                  borderRadius: "0",
                  background: "transparent",
                  border: "0",
                  padding: 0,
                  paddingRight: "20px",
                  boxShadow: "none",
                }}
                menuItemSelectedIcon={<Check size={15} color="#FFFFFF" />}
              />
            </SelectOptions>

            <InputCont>
              <Label>
                <Trans>Please provide details: (Optional)</Trans>
              </Label>
              <MessageTextArea
                rows={3}
                draggable={false}
                placeholder={t`What was unsatisfying about this response?`}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
              />
            </InputCont>

            <div style={{ lineHeight: 1.3, fontWeight: 500 }}>
              <Trans>
                Submitting this report will send the current conversation to
                AskYourPDF and store with your feedback for future improvements
                to our models.
              </Trans>
            </div>

            <ButtonGroup>
              <CancelButton onClick={handleClose} disabled={isSubmitting}>
                <Trans>Cancel</Trans>
              </CancelButton>
              <SubmitButton
                type="submit"
                onClick={handleFormSubmit}
                disabled={isSubmitting || selectedOption === ""}
              >
                {isSubmitting ? (
                  <Spinner style={{ width: "32px", height: "auto" }} />
                ) : (
                  <Trans>Submit</Trans>
                )}
              </SubmitButton>
            </ButtonGroup>
          </>
        )}
      </ModalBody>
    </ConversationFeedbackModal>
  ) : (
    <BottomSheet
      open={open}
      placement="bottom"
      maskClosable={true}
      closable={false}
    >
      <ModalHeader>
        <button onClick={handleClose}>
          <XCircle size={34} color="#000000" />
        </button>
      </ModalHeader>
      <ModalBody>
        {expression == "DISLIKE" ? (
          <div>
            <ModalHeading>
              <Trans>Thank You</Trans>
            </ModalHeading>
            <div
              style={{
                lineHeight: 1.3,
                fontWeight: 500,
                textAlign: "center",
                paddingTop: "20px",
              }}
            >
              <Trans>
                Your feedback is crucial for improving our user experience and
                our team is actively working to resolve the issue. We truly
                appreciate your contribution to improving our platform.
              </Trans>
            </div>
            <CloseBtnCont>
              <CloseButton onClick={handleClose}>
                <Trans>Close</Trans>
              </CloseButton>
            </CloseBtnCont>
          </div>
        ) : (
          <>
            <ModalHeading>
              <Trans>Report an Issue</Trans>
            </ModalHeading>

            <SelectOptions>
              <Select
                defaultValue={t`Select an option`}
                onChange={(value) => {
                  setSelectedOption(value);
                }}
                options={[
                  { value: "bug", label: t`Bug` },
                  { value: "harmful", label: t`Harmful Content` },
                  { value: "other", label: t`Other` },
                ]}
                dropdownRender={(menu) => <SelectMenu>{menu}</SelectMenu>}
                dropdownStyle={{
                  borderRadius: "0",
                  background: "transparent",
                  border: "0",
                  padding: 0,
                  paddingRight: "20px",
                  boxShadow: "none",
                }}
                menuItemSelectedIcon={<Check size={15} color="#FFFFFF" />}
              />
            </SelectOptions>

            <InputCont>
              <Label>
                <Trans>Please provide details: (Optional)</Trans>
              </Label>
              <MessageTextArea
                rows={3}
                draggable={false}
                placeholder={t`What was unsatisfying about this response?`}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
              />
            </InputCont>

            <div style={{ lineHeight: 1.3, fontWeight: 500 }}>
              <Trans>
                Submitting this report will send the current conversation to
                 AskYourPDF and store with your feedback for future improvements
                to our models.
              </Trans>
            </div>

            <ButtonGroup>
              <CancelButton onClick={handleClose} disabled={isSubmitting}>
                <Trans>Cancel</Trans>
              </CancelButton>
              <SubmitButton
                type="submit"
                onClick={handleFormSubmit}
                disabled={isSubmitting || selectedOption === ""}
              >
                {isSubmitting ? (
                  <Spinner style={{ width: "32px", height: "auto" }} />
                ) : (
                  <Trans>Submit</Trans>
                )}
              </SubmitButton>
            </ButtonGroup>
          </>
        )}
      </ModalBody>
    </BottomSheet>
  );
}
