import { combineReducers } from "@reduxjs/toolkit";
import { api } from "./api";
import lecture from "./game/slices/lecture";
import toast from "./toast/slices/toast";

export const rootReducer = combineReducers({
  lecture,
  toast,
  [api.reducerPath]: api.reducer,
});
