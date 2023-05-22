import { ReactNode } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "store";

export const withProviders = (children: ReactNode) => (
  <Provider store={store}>
    <Router>{children}</Router>
  </Provider>
);
