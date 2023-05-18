// import CorrectAnswerIcon from "assets/icons/correct-answer-icon";
// import GoalIcon from "assets/icons/goal-icon";
// import TimerIcon from "assets/icons/timer-icon";
import classNames from "classnames";
// import ImageThumbnailNoImg from "components/ImageThumbnailNoImg";
import "./LectureCard.scss";
import { LectureCardProps } from "./types";

const LectureCard = ({ lecture, className }: LectureCardProps) => (
  <div
    className={classNames("lecture-card", { [`${className}`]: className })}
    data-testid="lecture-card"
  >
    {/* <p className="paragraph2-regular">{lecture.index}</p> */}
    <div className="lecture-card__content">
      <p
        className="lecture-card__title paragraph1-bold"
        data-testid="lecture-title"
      >
        {lecture.title}
      </p>
      {/* <ul className="lecture-card__answers">
        {lecture.answers.map((answer) => (
          <li key={answer.id} className="lecture-card__answer">
            {answer.isCorrect && (
              <CorrectAnswerIcon className="lecture-card__answer-icon" />
            )}
            <p className="lecture-card__answer-text paragraph2-regular">
              {answer.text}
            </p>
          </li>
        ))}
      </ul> */}
    </div>
    {/* <div className="lecture-card__details">
      <div>
        <TimerIcon />
        <span>{lecture.time}s</span>
      </div>
      <div>
        <GoalIcon />
        <span>+{lecture.score}pts</span>
      </div>
    </div> */}
  </div>
);

export default LectureCard;
