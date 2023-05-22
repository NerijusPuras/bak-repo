import { render, screen } from "@testing-library/react";
import Button from "components/Button";
import Toolbar from "./Toolbar";

const SELECTORS = {
  toolbar: "toolbar",
  exitBtn: "toolbar-exit-btn",
  actionBtn: "toolbar-action-btn",
};

const MOCK_HEADING_TEXT = "Toolbar Heading";
const MOCK_HEADING = <h2>{MOCK_HEADING_TEXT}</h2>;
const MOCK_EXIT_BTN = <Button testId="toolbar-exit-btn" />;
const MOCK_ACTION_BTN = <Button testId="toolbar-action-btn" />;

const renderComponent = () =>
  render(
    <Toolbar
      contentLeft={
        <>
          {MOCK_EXIT_BTN}
          {MOCK_HEADING}
        </>
      }
      contentRight={MOCK_ACTION_BTN}
    />
  );

describe("Toolbar", () => {
  it("should render Toolbar component", () => {
    renderComponent();
    expect(screen.getByTestId(SELECTORS.toolbar)).toBeInTheDocument();
  });

  it("should render correct heading", () => {
    renderComponent();
    expect(screen.getByText(MOCK_HEADING_TEXT)).toBeInTheDocument();
  });

  it("should render exit button", () => {
    renderComponent();
    expect(screen.getByTestId(SELECTORS.exitBtn)).toBeInTheDocument();
  });

  it("should render action button", () => {
    renderComponent();
    expect(screen.getByTestId(SELECTORS.actionBtn)).toBeInTheDocument();
  });
});
