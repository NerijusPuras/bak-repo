import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { withProviders } from "utils/testUtils";
import Button from "./Button";
import { ButtonVariant } from "./enums";
import { ButtonProps } from "./types";

const renderComponent = (props?: ButtonProps) =>
  render(withProviders(<Button {...props}>{props?.children}</Button>));

describe("Button", () => {
  it("should render the button component", () => {
    renderComponent();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should call onClick event when clicked", () => {
    const content = "Click";
    const handleClick = jest.fn();
    renderComponent({ children: content, onClick: handleClick });
    userEvent.click(screen.getByText(content));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should render button as a link if href is given", () => {
    const route = "/";
    renderComponent({ href: route });
    expect(screen.getByRole("link")).toHaveAttribute("href", route);
  });

  it("should render correct content", () => {
    const content = "Test Content";
    renderComponent({ children: content });
    expect(screen.getByText(content)).toBeInTheDocument();
  });

  it("should add correct className", () => {
    const classname = "test-class";
    renderComponent({ className: classname });
    expect(screen.getByRole("button").className).toContain(classname);
  });

  it("should disable button if isDisabled is true", () => {
    renderComponent({ isDisabled: true });
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("should have correct aria label", () => {
    const ariaLabel = "Test Aria Label";
    renderComponent({ ariaLabel: ariaLabel });
    expect(screen.getByRole("button")).toHaveAttribute("aria-label", ariaLabel);
  });

  it("should render correct variant button", () => {
    renderComponent({ variant: ButtonVariant.dangerFilled });
    expect(screen.getByRole("button").className).toContain(
      "button--danger-filled"
    );
  });

  it("should render correct type button", () => {
    renderComponent({ type: "submit" });
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });
});
