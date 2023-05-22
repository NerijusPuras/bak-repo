import { render, screen } from "@testing-library/react";
import { withProviders } from "utils/testUtils";
import Container from "./Container";

const SELECTORS = {
  container: "container",
};

const renderComponent = () =>
  render(
    withProviders(
      <Container testId={SELECTORS.container}>
        <></>
      </Container>
    )
  );

describe("Container", () => {
  it("should render Container component", () => {
    renderComponent();
    expect(screen.getByTestId(SELECTORS.container)).toBeInTheDocument();
  });
});
