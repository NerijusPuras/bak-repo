import Layout from "components/Layout";
import Loader from "components/Loader";
import TopicList from "features/TopicList";
import Button from "components/Button";
import { useGetTopicListQuery } from "services/topic/topic.service";
import "./Topics.scss";
import { ButtonVariant } from "components/Button/enums";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "router";
import { useEffect } from "react";

const Topics = () => {
  const { data: topicsList, isLoading } = useGetTopicListQuery();
  const navigate = useNavigate();

  useEffect(() => {
    navigate(ROUTES.topics);
  }, [navigate]);

  const handleOverallLeaderboardClick = () => {
    navigate(`${ROUTES.leaderboard}`);
  };

  return (
    <Layout>
      <div className="topics-page content-wrapper">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="topics-page__heading-and-actions">
              <h1>Temos</h1>
              <div className="topics-page__actions">
                <Button
                  onClick={handleOverallLeaderboardClick}
                  variant={ButtonVariant.secondaryFilled}
                >
                  Bendra lyderių lentelė
                </Button>
              </div>
            </div>
            <div>
              {topicsList?.length ? <TopicList topics={topicsList} /> : null}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Topics;
