import type { Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import { isRejectedWithValue } from "@reduxjs/toolkit";

export const rtkQueryErrorHandler: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      if (action.payload.status === 401) {
        // api.dispatch(setAccessToken(undefined));
        console.log("grazino 401");
        
      }
    }

    return next(action);
  };
