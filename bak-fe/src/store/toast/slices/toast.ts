import { AlertColor } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TOAST_TYPES } from "utils/constants";

export type ToastState = {
  isOpen: boolean;
  type: AlertColor;
  message: string;
  title: string;
  displayType?: boolean;
  displayCloseBtn?: boolean;
  autoHide?: boolean;
  closeOnRouteChange?: boolean;
};

type ShowToastAction = {
  type: AlertColor;
  message: string;
  title: string;
  displayType?: boolean;
  displayCloseBtn?: boolean;
  autoHide?: boolean;
  closeOnRouteChange?: boolean;
};

const initialState: ToastState = {
  isOpen: false,
  type: TOAST_TYPES.success,
  message: "",
  title: "",
  displayType: true,
  displayCloseBtn: true,
  autoHide: true,
  closeOnRouteChange: false,
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    closeToast: (state) => {
      state.isOpen = false;
    },
    showToast: (state, action: PayloadAction<ShowToastAction>) => {
      const { payload } = action;
      state.isOpen = true;
      state.type = payload.type ?? initialState.type;
      state.message = payload.message;
      state.title = payload.title;
      state.displayType = payload.displayType ?? initialState.displayType;
      state.displayCloseBtn =
        payload.displayCloseBtn ?? initialState.displayCloseBtn;
      state.autoHide = payload.autoHide ?? initialState.autoHide;
      state.closeOnRouteChange =
        payload.closeOnRouteChange ?? initialState.closeOnRouteChange;
    },
  },
});

const { actions, reducer } = toastSlice;
export default reducer;

export const { closeToast, showToast } = actions;
