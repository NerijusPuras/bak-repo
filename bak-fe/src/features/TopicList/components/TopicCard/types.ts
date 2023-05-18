import { LectureDto, TopicDto } from "utils/types";

export interface ContentCardProps {
  content: TopicDto | LectureDto;
  isLecture: Boolean
}
