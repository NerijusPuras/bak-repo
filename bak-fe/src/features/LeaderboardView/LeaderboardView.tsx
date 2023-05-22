import Leaderboard from "features/Leaderboard";
import "./LeaderboardView.scss";
import { LeaderboardViewProps } from "./types";

const LeaderboardView = ({
  leaderboard,
  mainLeaderboard,
}: LeaderboardViewProps) => {
  return (
    <div className="leaderboard-view">
      <Leaderboard
        leaderboard={leaderboard}
        mainLeaderboard={mainLeaderboard}
        isFinal
      />
    </div>
  );
};

export default LeaderboardView;
