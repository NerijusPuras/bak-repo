import { render, screen } from "@testing-library/react";
import { withProviders } from "utils/testUtils";
import Loader from "./Loader";

const SELECTORS = {
  loader: "loader",
};

const renderComponent = () => render(withProviders(<Loader />));

describe("Loader", () => {
  it("should render Loader component", () => {
    renderComponent();
    expect(screen.getByTestId(SELECTORS.loader)).toBeInTheDocument();
  });
});
