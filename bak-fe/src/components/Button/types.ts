import { MouseEvent, ReactElement, ReactNode } from "react";
import { ButtonVariant } from "./enums";

export interface ButtonProps {
  ariaLabel?: string;
  children?: ReactNode;
  className?: string;
  href?: string;
  isDisabled?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  variant?: ButtonVariant;
  type?: "button" | "submit" | "reset";
  icon?: ReactElement;
  testId?: string;
  onMouseDown?: (e: MouseEvent<HTMLButtonElement>) => void;
}
