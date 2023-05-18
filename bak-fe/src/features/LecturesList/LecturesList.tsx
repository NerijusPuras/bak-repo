import "./LecturesList.scss";
import TopicCard from "features/TopicList/components/TopicCard";
import { LectureDto } from "utils/types";
import { LecturesListProps } from "./types";

const LecturesList = ({ lectures }: LecturesListProps) => (
  <ul className="lectures-list" data-testid="lectures-list">
    {lectures.map((lecture) => (
      <TopicCard content={lecture as LectureDto} isLecture={true} key={lecture.id} />
    ))}
  </ul>
);

export default LecturesList;