import Layout from "components/Layout";
import Loader from "components/Loader";
import LeaderboardView from "features/LeaderboardView";
import { useParams } from "react-router-dom";
import { useGetLeaderboardListByTopicIdQuery } from "services/topic/topic.service";

const LectureLeaderboardPage = () => {
  const { topicId } = useParams();
  const { data: leaderboardScores, isLoading: isGetLeaderboardScoresLoading } =
    useGetLeaderboardListByTopicIdQuery(topicId!);

  // return <p>NU</p>;

  console.log("leaderboard page");

  return isGetLeaderboardScoresLoading ? (
    <Loader />
  ) : (
    <Layout>
      <h1 className="lecture-page__leaderboard-title">Temos lyderių lentelė</h1>
      <LeaderboardView leaderboard={leaderboardScores!} />
    </Layout>
  );
};

export default LectureLeaderboardPage;
