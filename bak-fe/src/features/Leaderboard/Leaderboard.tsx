import Container from "components/Container";
import "./Leaderboard.scss";
import LeaderboardItem from "./components/LeaderboardItem";
import { LeaderboardProps } from "./types";
import { getLeaderboardLength } from "./utils";

const Leaderboard = ({
  leaderboard,
  mainLeaderboard,
  playerCount,
  isFinal = false,
}: LeaderboardProps) => (
  <Container>
    <ul className="leaderboard">
      {Array.from(
        {
          length: getLeaderboardLength(
            isFinal,
            leaderboard,
            mainLeaderboard,
            playerCount
          ),
        },
        (_, index) => (
          <LeaderboardItem
            key={leaderboard ? leaderboard[index].playerName : index}
            userScore={leaderboard ? leaderboard[index] : undefined}
            jointUserScore={
              mainLeaderboard ? mainLeaderboard[index] : undefined
            }
            position={index + 1}
            isFinal={isFinal}
          />
        )
      )}
    </ul>
  </Container>
);

export default Leaderboard;
