import { Skeleton } from "@mui/material";
import CheckCircleFilledIcon from "assets/icons/check-circle-filled-icon";
import GoalIcon from "assets/icons/goal-icon";
import Tag from "components/Tag";
import { TagVariant } from "components/Tag/enums";
import "./LeaderboardItem.scss";
import { LOADER_HEIGHT, LOADER_WIDTH } from "./constants";
import { LeaderboardItemProps } from "./types";
import classNames from "classnames";

const LeaderboardItem = ({
  userScore,
  jointUserScore,
  position,
  isFinal = false,
}: LeaderboardItemProps) => (
  <li
    className={classNames("leaderboard-item", {
      "leaderboard-item__user-cell": userScore
        ? userScore.playerName === "Vardenis Pavardenis"
        : jointUserScore?.playerName === "Vardenis Pavardenis",
    })}
  >
    <div className="leaderboard-item__content-left">
      {userScore ? (
        <>
          <p className="heading3">{position}</p>
          <p className="heading3">{userScore.playerName}</p>
        </>
      ) : jointUserScore ? (
        <>
          <p className="heading3">{position}</p>
          <p className="heading3">{jointUserScore.playerName}</p>
        </>
      ) : (
        <Skeleton
          animation="wave"
          width={LOADER_WIDTH}
          height={LOADER_HEIGHT}
        />
      )}
    </div>
    <div className="leaderboard-item__content-right heading3">
      {userScore ? (
        <>
          {userScore.hasExpertBadge && (
            <Tag variant={TagVariant.expertBadge}>
              <p className="paragraph1-bold">EKSPERTAS</p>
            </Tag>
          )}
          {userScore.hasKnowledgeSharingBadge && (
            <Tag variant={TagVariant.knowledgeSharingBadge}>
              <p className="paragraph1-bold">ŽINIŲ DALINTOJAS</p>
            </Tag>
          )}
          {isFinal &&
            (userScore.correctAnswers || userScore.correctAnswers === 0) && (
              <Tag variant={TagVariant.correctAnswerAmount}>
                <CheckCircleFilledIcon className="leaderboard-item__correct-amount-icon" />
                <p className="paragraph1-bold">{`${userScore.correctAnswers}/${userScore.totalQuestions} teisingai`}</p>
              </Tag>
            )}
          <div className="leaderboard-item__points">
            <GoalIcon className="leaderboard-item__points-icon" />
            <span>{`${userScore.totalScore} tašk.`}</span>
          </div>
        </>
      ) : jointUserScore ? (
        <>
          {jointUserScore.hasExpertBadge && (
            <Tag variant={TagVariant.expertBadge}>
              <p className="paragraph1-bold">
                EKSPERTAS - {jointUserScore.expertBadgeCount}k.
              </p>
            </Tag>
          )}
          {jointUserScore.hasKnowledgeSharingBadge && (
            <Tag variant={TagVariant.knowledgeSharingBadge}>
              <p className="paragraph1-bold">
                ŽINIŲ DALINTOJAS - {jointUserScore.knowledgeSharingBadgeCount}k.
              </p>
            </Tag>
          )}
          {isFinal &&
            (jointUserScore.correctAnswers ||
              jointUserScore.correctAnswers === 0) && (
              <Tag variant={TagVariant.correctAnswerAmount}>
                <CheckCircleFilledIcon className="leaderboard-item__correct-amount-icon" />
                <p className="paragraph1-bold">{`${jointUserScore.correctAnswers}/${jointUserScore.totalQuestions} teisingai`}</p>
              </Tag>
            )}
          <div className="leaderboard-item__points">
            <GoalIcon className="leaderboard-item__points-icon" />
            <span>{`${jointUserScore.totalScore} tašk.`}</span>
          </div>
        </>
      ) : (
        <Skeleton
          animation="wave"
          width={LOADER_WIDTH}
          height={LOADER_HEIGHT}
        />
      )}
    </div>
  </li>
);

export default LeaderboardItem;
