import classNames from "classnames";
import "./AnswerButton.scss";
import { AnswerButtonProps } from "./types";

export const AnswerButton = ({
  text,
  variant,
  selected,
  disabled,
  onSelect,
  answerIdx,
  ariaLabel,
}: AnswerButtonProps) => {
  const handleSelect = () => onSelect(answerIdx);

  return (
    <button
      data-testid="answer-button"
      className={classNames(`answer-button answer-button--${variant}`, {
        [`answer-button--${variant}-selected`]: selected,
        "answer-button--disabled": disabled,
      })}
      onClick={handleSelect}
      disabled={disabled || selected}
      aria-label={ariaLabel}
    >
      <div className={classNames("heading3 answer-button__text")}>{text}</div>
    </button>
  );
};

export default AnswerButton;
