import { ReactNode } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { MockStoreEnhanced } from "redux-mock-store";
import store from "store";

export const withProviders = (
  children: ReactNode,
  updatedStore?: MockStoreEnhanced<any>
) => (
  <Provider store={updatedStore ?? store}>
    <Router>{children}</Router>
  </Provider>
);
