import classNames from "classnames";
import "./AnswerCard.scss";
import { AnswerCardProps } from "./types";

export const AnswerCard = ({ variant, text, isCorrect }: AnswerCardProps) => (
  <div
    data-testid="answer-card"
    className={classNames(`answer-card answer-card--${variant}`, {
      [`answer-card--${variant}-correct`]: isCorrect,
    })}
  >
    <div
      className={classNames("heading3 answer-card__text", {
        "answer-card__text--correct": isCorrect,
      })}
      data-testid="answer-card-text"
    >
      {text}
    </div>
  </div>
);

export default AnswerCard;
