import { Leaderboard, MainLeaderboard } from "utils/types";

export interface LeaderboardProps {
  leaderboard?: Leaderboard;
  mainLeaderboard?: MainLeaderboard;
  playerCount?: number;
  isFinal?: boolean;
}
