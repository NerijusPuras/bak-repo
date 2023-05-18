import { AlertColor } from "@mui/material";

export const BASE_API_URL = "https://localhost:7210/api";

export const MODAL_BUTTON_TEXT = {
  cancel: "Cancel",
  confirm: "Yes",
  leave: "Leave",
  refresh: "Refresh",
  close: "Close",
  joinNewQuiz: "Join Quiz",
};

export const TOAST_TYPES: { [key: string]: AlertColor } = {
  success: "success",
  error: "error",
  warning: "warning",
  info: "info",
};
