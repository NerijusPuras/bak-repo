import { configureStore } from "@reduxjs/toolkit";
import { api } from "store/api";
import { rtkQueryErrorHandler } from "./middleware";
import { rootReducer } from "./rootReducer";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, rtkQueryErrorHandler),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
