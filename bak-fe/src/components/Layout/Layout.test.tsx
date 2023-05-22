import { render, screen } from "@testing-library/react";
import { withProviders } from "utils/testUtils";
import Layout from "./Layout";

const SELECTORS = {
  layout: "layout",
};

const renderComponent = () =>
  render(
    withProviders(
      <Layout>
        <></>
      </Layout>
    )
  );

describe("Layout", () => {
  it("should render Layout component", () => {
    renderComponent();
    expect(screen.getByTestId(SELECTORS.layout)).toBeInTheDocument();
  });
});
