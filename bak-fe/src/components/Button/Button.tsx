import { Link } from "react-router-dom";
import classNames from "classnames";
import "./Button.scss";
import { ButtonVariant } from "./enums";
import { ButtonProps } from "./types";

const Button = ({
  ariaLabel,
  children,
  className,
  href,
  isDisabled = false,
  onClick,
  variant = ButtonVariant.primaryFilled,
  type = "button",
  icon,
  testId,
  onMouseDown,
}: ButtonProps) => {
  const buttonClasses = classNames(`button button--${variant}`, {
    [`${className}`]: className,
  });

  const buttonContent = (
    <>
      {icon}
      {children}
    </>
  );

  if (href)
    return (
      <Link
        aria-label={ariaLabel}
        className={buttonClasses}
        onClick={onClick}
        to={href}
        data-testid={testId}
      >
        {buttonContent}
      </Link>
    );

  return (
    <button
      aria-label={ariaLabel}
      className={buttonClasses}
      onClick={onClick}
      type={type}
      disabled={isDisabled}
      data-testid={testId}
      onMouseDown={onMouseDown}
    >
      {buttonContent}
    </button>
  );
};

export default Button;
