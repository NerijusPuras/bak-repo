import Header from "components/Header";
import "./Layout.scss";
import { LayoutProps } from "./types";

const Layout = ({ children, testId = "layout" }: LayoutProps) => (
  <div className="layout" data-testid={testId}>
    <Header />
    <main className="layout__main" data-testid="layout-main">
      {children}
    </main>
  </div>
);

export default Layout;
