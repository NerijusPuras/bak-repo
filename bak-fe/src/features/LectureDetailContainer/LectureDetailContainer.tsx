import classNames from "classnames";
import "./LectureDetailContainer.scss";
import { LectureDetailContainerProps } from "./types";

const LectureDetailContainer = ({
  children,
  // className,
  icon,
  arePointsAdded,
}: LectureDetailContainerProps) => {
  const lectureDetailContainerClasses = classNames(`lecture-detail-container`, {
    "lecture-detail-container__points-added": arePointsAdded,
  });

  return (
    <div className={lectureDetailContainerClasses}>
      <>
        {icon}
        {children}
      </>
    </div>
  );
};

export default LectureDetailContainer;
