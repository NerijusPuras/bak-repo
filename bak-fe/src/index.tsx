import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { Provider } from "react-redux";
import store from "./store";
import { theme } from "utils/theme";
import "styles/global.scss";
import Toast from "components/Toast";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Toast />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);
