import Layout from "components/Layout";
import Loader from "components/Loader";
import LeaderboardView from "features/LeaderboardView";
import { useGetOverallLeaderboardListQuery } from "services/topic/topic.service";

const LeaderboardPage = () => {
  const { data: leaderboardScores, isLoading: isGetLeaderboardScoresLoading } =
    useGetOverallLeaderboardListQuery();

  return isGetLeaderboardScoresLoading ? (
    <Loader />
  ) : (
    <Layout>
      <h1 className="lecture-page__leaderboard-title">
        Bendra lyderių lentelė
      </h1>
      <LeaderboardView mainLeaderboard={leaderboardScores!} />
    </Layout>
  );
};
export default LeaderboardPage;
