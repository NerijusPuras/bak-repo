import { render, screen } from "@testing-library/react";
import Tag from "./Tag";
import { TagVariant } from "./enums";
import { TagProps } from "./types";

const renderComponent = ({ ...props }: TagProps) =>
  render(<Tag {...props} children={props.children} />);

const SELECTORS = {
  tagTestId: "tag",
};

describe("Tag", () => {
  it("should render the tag component", () => {
    renderComponent({ children: undefined, variant: TagVariant.contribution });

    expect(screen.getByTestId(SELECTORS.tagTestId)).toBeInTheDocument();
  });

  it("should display the correct tag value", () => {
    const testValue = "testValue";
    renderComponent({ variant: TagVariant.contribution, children: testValue });

    expect(screen.getByText(testValue)).toBeInTheDocument();
  });
});
