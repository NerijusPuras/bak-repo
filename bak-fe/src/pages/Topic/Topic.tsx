import { useNavigate, useParams } from "react-router-dom";
import Button from "components/Button";
import Layout from "components/Layout";
import Loader from "components/Loader";
import LecturesList from "features/LecturesList";
import "./Topic.scss";
import {
  useGetLectureListByTopicIdQuery,
  useGetTopicByTopicIdQuery,
} from "services/topic/topic.service";
import { ButtonVariant } from "components/Button/enums";
import { ROUTES } from "router";

const Topic = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const { data: lectures, isFetching: isFetchingLectures } =
    useGetLectureListByTopicIdQuery(topicId!);
  const { data: topic, isFetching: isFetchingTopic } =
    useGetTopicByTopicIdQuery(topicId!);

  const handleLectureLeaderboardClick = () => {
    navigate(`${ROUTES.leaderboard}`);
  };

  return (
    <Layout>
      <div className="topic-page content-wrapper" data-testid="topic-page">
        {isFetchingLectures || isFetchingTopic ? (
          <Loader />
        ) : (
          <>
            <div className="topic-page__heading-and-actions">
              <h1>Potemės - {topic?.title}</h1>
              <div className="topics-page__actions">
                <Button
                  onClick={handleLectureLeaderboardClick}
                  variant={ButtonVariant.secondaryFilled}
                >
                  Temos lyderių lentelė
                </Button>
              </div>
            </div>
            <div>
              {lectures?.length && <LecturesList lectures={lectures} />}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Topic;
