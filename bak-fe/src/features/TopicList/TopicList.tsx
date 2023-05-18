import "./TopicList.scss";
import TopicCard from "./components/TopicCard";
import { TopicListProps } from "./types";
import { TopicDto } from "utils/types";

const TopicList = ({ topics }: TopicListProps) => (
  <ul className="topic-list" data-testid="topic-list">
    {topics.map((topic) => (
      <TopicCard content={topic as TopicDto} isLecture={false} key={topic.id} />
    ))}
  </ul>
);

export default TopicList;
