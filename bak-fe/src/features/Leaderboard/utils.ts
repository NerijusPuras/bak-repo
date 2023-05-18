import { Leaderboard, MainLeaderboard } from "utils/types";
import { LEADER_MAX_LENGTH } from "./constants";

export const getLeaderboardLength = (
  isFinal: boolean,
  leaderboard?: Leaderboard,
  mainLeaderboard?: MainLeaderboard,
  playerCount?: number
) => {
  if (leaderboard) {
    return isFinal
      ? leaderboard.length
      : leaderboard.slice(0, LEADER_MAX_LENGTH).length;
  }
  if (mainLeaderboard) {
    return isFinal
      ? mainLeaderboard.length
      : mainLeaderboard.slice(0, LEADER_MAX_LENGTH).length;
  }
  if (playerCount !== undefined) return playerCount;
  return LEADER_MAX_LENGTH;
};
