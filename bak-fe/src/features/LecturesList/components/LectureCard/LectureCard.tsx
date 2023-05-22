import classNames from "classnames";
import "./LectureCard.scss";
import { LectureCardProps } from "./types";

const LectureCard = ({ lecture, className }: LectureCardProps) => (
  <div
    className={classNames("lecture-card", { [`${className}`]: className })}
    data-testid="lecture-card"
  >
    <div className="lecture-card__content">
      <p
        className="lecture-card__title paragraph1-bold"
        data-testid="lecture-title"
      >
        {lecture.title}
      </p>
    </div>
  </div>
);

export default LectureCard;
