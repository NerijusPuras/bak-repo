// import CancelOutlinedIcon from "assets/icons/cancel-outlined-icon";
// import CheckCircleFilledIcon from "assets/icons/check-circle-filled-icon";
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
    {/* <div
      className={classNames("answer-card__result-wrapper", {
        "answer-card__result-wrapper--filler": isCorrect === undefined,
      })}
    >
      {isCorrect !== undefined &&
        (isCorrect ? (
          <CheckCircleFilledIcon className="answer-card__result-icon answer-card__result-icon--correct" />
        ) : (
          <CancelOutlinedIcon className="answer-card__result-icon answer-card__result-icon--incorrect" />
        ))}
    </div> */}
  </div>
);

export default AnswerCard;
