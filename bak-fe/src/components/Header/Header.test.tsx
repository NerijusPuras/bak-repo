import { render, screen } from "@testing-library/react";
import { withProviders } from "utils/testUtils";
import Header from "./Header";

const SELECTORS = {
  header: "header",
};

const renderComponent = () => render(withProviders(<Header />));

describe("Header", () => {
  it("should render the header component", () => {
    renderComponent();
    expect(screen.getByTestId(SELECTORS.header)).toBeInTheDocument();
  });
});
