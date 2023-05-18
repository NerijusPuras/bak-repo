import { JointUserScore, UserScore } from "utils/types";

export interface LeaderboardItemProps {
  userScore?: UserScore;
  jointUserScore?: JointUserScore;
  position?: number;
  isFinal?: boolean;
}
