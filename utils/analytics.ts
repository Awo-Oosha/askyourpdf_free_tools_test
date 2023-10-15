import ReactGA from "react-ga4";
export const ActivityLabels = {
  CHAT_SHARED: "Chat shared",
  CHAT_PRIVATE: "Chat private",
  DOCUMENT_DELETE_SUCCESS: "Document Delete Successful",
  DOCUMENT_DELETE_FAILED: "Document Delete failed",
  CONVERSATION_DELETE_SUCCESS: "Conversation Delete Successful",
  CONVERSATION_DELETE_FAILED: "Conversation Delete failed",
  UPLOAD_SUCCESS: "Upload Successful",
  PLUGIN_UPLOAD_SUCCESS: "Plugin Upload Successful",
  PLUGIN_UPLOAD_FAILURE: "Plugin Upload Failure",
  UPLOAD_FAILURE: "Upload failed",
  SIGN_UP: "Signup Successful",
  LOGIN: "login Successful",
  CONVERSATION_STARTED: "Conversation started",
  MESSAGES_SENT: "Messages sent",
};
export const trackButtonClick = (label: string) => {
  ReactGA.event({
    category: "Button",
    action: "Click",
    label: label,
  });
};
