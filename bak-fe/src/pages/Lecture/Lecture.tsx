import { useNavigate, useParams } from "react-router-dom";
import ExitIcon from "assets/icons/exit-icon";
import HandIcon from "assets/icons/hand-icon";
import ListIcon from "assets/icons/list-icon";
import Button from "components/Button";
import { ButtonVariant } from "components/Button/enums";
import Layout from "components/Layout";
import Loader from "components/Loader";
import Toolbar from "components/Toolbar";
import LectureDetailContainer from "features/LectureDetailContainer";
import {
  useLazyGetContributionByLectureIdQuery,
  useGetSlideIdsByLectureIdQuery,
  useLazyGetSlideDtoByLectureIdAndSlideIdQuery,
  useGetLectureQuery,
  useLazyGetLeaderboardScoresByLectureIdQuery,
  usePostLectureEntryScoreMutation,
  usePostContributionValidationMutation,
} from "services/lecture/lecture.service";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { selectLecture } from "store/game/selectors/lecture";
import { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import {
  setCurrentSlideIndex,
  setPoints,
  setTotalSlides,
} from "store/game/slices/lecture";
import SlideQuestionView from "features/SlideQuestionView";
import { useLazyGetCorrectAnswerIdForSlideQuery } from "services/slide/slide.service";
import { showToast } from "store/toast/slices/toast";
import { TOAST_TYPES } from "utils/constants";
import { ROUTES } from "router";
import Tag from "components/Tag";
import { TagVariant } from "components/Tag/enums";
import PeopleIcon from "assets/icons/people-icon";
import "./Lecture.scss";
import LeaderboardView from "features/LeaderboardView";
import ProgressBar from "components/ProgressBar";
import React from "react";
import KnowledgeSharingPage from "pages/KnowledgeSharingPage";

const Lecture = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isStoreSet, setIsStoreSet] = useState(false);
  const [isQuestionAnswered, setIsQuestionAnswered] = useState(false);
  const [arePointsAdded, setArePointsAdded] = useState(false);
  const [isContribution, setIsContribution] = useState(false);
  const [isLeaderboard, setIsLeaderboard] = useState(false);
  const [isKnowledgeSharing, setIsKnowledgeSharing] = useState(false);
  const [hasExpertBadge, setHasExpertBadge] = useState(false);
  const [hasKnowledgeSharingBadge, setHasKnowledgeSharingBadge] =
    useState(false);
  const [shouldResetParams, setShouldResetParams] = useState(false);
  const [lectureGameFinished, setLectureGameFinished] = useState(false);
  const [currentIndexToDisplay, setCurrentIndexToDisplay] = useState(1);
  const [isContinueButtonDisabled, setIsContinueButtonDisabled] =
    useState(false);
  const [selectedAnswerId, setSelectedAnswerId] = useState<string>();
  const { lectureId } = useParams();
  const { currentSlideIndex, totalSlides, points } =
    useAppSelector(selectLecture);

  const { data: slideIds, isLoading: isGetSlideIdsLoading } =
    useGetSlideIdsByLectureIdQuery(lectureId!);

  const { data: lecture, isLoading: isGetLectureLoading } = useGetLectureQuery(
    lectureId!
  );

  const [
    getLeaderboardScoresByLectureId,
    { data: leaderboardScores, isLoading: isGetLeaderboardScoresLoading },
  ] = useLazyGetLeaderboardScoresByLectureIdQuery();

  const [getCorrectAnswerId] = useLazyGetCorrectAnswerIdForSlideQuery();

  const [getSlideById, { data }] =
    useLazyGetSlideDtoByLectureIdAndSlideIdQuery();

  const [
    getContribution,
    { data: contributionData, isLoading: isGetContributionLoading },
  ] = useLazyGetContributionByLectureIdQuery();

  const [postLectureEntryScore] = usePostLectureEntryScoreMutation();
  const [postContributionValidation] = usePostContributionValidationMutation();

  const defaultScoreForCorrectAnswer = 10;
  const totalSlidesCount = totalSlides && totalSlides / 2;

  const standartProgressProgressCalculation =
    ((currentSlideIndex! - 1) / totalSlides!) * 100;
  const progressPercentage = isLeaderboard
    ? 100
    : isContribution && !isQuestionAnswered
    ? standartProgressProgressCalculation +
      (100 - standartProgressProgressCalculation) / 3
    : isContribution && isQuestionAnswered
    ? standartProgressProgressCalculation +
      ((100 - standartProgressProgressCalculation) / 3) * 2
    : standartProgressProgressCalculation;

  const getLeaderboard = async (knowledgeShared?: boolean) => {
    await saveLectureEntry(knowledgeShared);
    setIsLeaderboard(true);
    await getLeaderboardScoresByLectureId(lectureId!);
  };

  useEffect(() => {
    if (isGetSlideIdsLoading) return;

    dispatch(setTotalSlides(slideIds?.length));
    dispatch(setCurrentSlideIndex(1));
    dispatch(setPoints(0));
    setIsStoreSet(true);
    getSlideById([lectureId!, slideIds![0]]).then();
  }, [isGetSlideIdsLoading]);

  const contributionAnswers = [
    { text: "Taip", id: "0" },
    { text: "Ne", id: "1" },
    { text: "Nežinau", id: "2" },
    { text: "Netinka pagal temą", id: "3" },
  ];

  useEffect(() => {
    selectedAnswerId && setIsContinueButtonDisabled(false);
  }, [selectedAnswerId]);

  useEffect(() => {
    if (data?.isQuestion || isContribution) {
      setIsContinueButtonDisabled(true);
    }
  }, [data, isContribution]);

  useEffect(() => {
    if (
      isContribution &&
      lecture &&
      !isGetContributionLoading &&
      contributionData == null
    ) {
      setIsContribution(false);
      getLeaderboard();
    }
  }, [
    contributionData,
    isContribution,
    isGetContributionLoading,
    lecture,
    getLeaderboard,
  ]);

  const saveLectureEntry = async (knowledgeShared?: boolean) => {
    await postLectureEntryScore({
      playerName: "Vardenis Pavardenis",
      totalScore: points!,
      correctAnswers: points! / 10,
      totalQuestions: totalSlidesCount!,
      lectureId: lectureId,
      hasExpertBadge: hasExpertBadge,
      hasKnowledgeSharingBadge: knowledgeShared ?? hasKnowledgeSharingBadge,
    });
  };

  const isQuestionAnsweredPhase = data?.isQuestion && !isQuestionAnswered;

  const handleNextSlide = async () => {
    if (isLeaderboard) {
      await postLectureEntryScore({
        playerName: "Vardenis Pavardenis",
        totalScore: points!,
        correctAnswers: points! / 10,
        totalQuestions: totalSlidesCount!,
        lectureId: lectureId,
        hasExpertBadge: hasExpertBadge,
        hasKnowledgeSharingBadge: hasKnowledgeSharingBadge,
      });
      navigate(`${ROUTES.topics}`);
      return;
    }

    if (isContribution && isQuestionAnswered) {
      setIsContribution(false);
      setLectureGameFinished(true);
      setIsKnowledgeSharing(true);
      return;
    }

    if (isKnowledgeSharing) {
      getLeaderboard();
      setIsKnowledgeSharing(false);
    }

    if (isContribution && !isQuestionAnswered) {
      await postContributionValidation({
        contributionId: contributionData!.id,
        validationResult: parseInt(selectedAnswerId!),
        validatedUserName: "Vardenis Pavardenis",
      });

      setIsQuestionAnswered(true);
      setHasExpertBadge(true);
      dispatch(
        showToast({
          type: TOAST_TYPES.info,
          title: "Ačiū už atsakymą!",
          message:
            "Tai padės plėsti žinių bagažą sistemoje. Už atsakymą įgavote “Ekspertas” statusą šioje potemėje",
        })
      );
      return;
    } else if (isQuestionAnsweredPhase) {
      setIsQuestionAnswered(true);
      getCorrectAnswerId(slideIds![currentSlideIndex! - 1]).then(({ data }) => {
        if (selectedAnswerId === data) {
          dispatch(
            showToast({
              type: TOAST_TYPES.success,
              title: "Teisingai!",
              message: `Žingsnis po žingsnio iki tobulumo :)\nGavai ${defaultScoreForCorrectAnswer} taškų!`,
            })
          );
          setArePointsAdded(true);

          dispatch(setPoints(points! + defaultScoreForCorrectAnswer));

          return;
        }
        dispatch(
          showToast({
            type: TOAST_TYPES.error,
            title: "Neteisingai",
            message: "Nepasiduok, stenkis ir pamatysi gerėjančius rezultatus",
          })
        );
      });

      return;
    }

    if (currentSlideIndex === totalSlides) {
      if (
        points! / totalSlidesCount! === defaultScoreForCorrectAnswer &&
        !isContribution
      ) {
        setArePointsAdded(false);
        setIsQuestionAnswered(false);
        getContribution(lectureId!).then(({ data: contribution }) => {});
        setIsContribution(true);
        setShouldResetParams(true);
        return;
      }

      if (!isLeaderboard && isQuestionAnswered) {
        setLectureGameFinished(true);
        setIsKnowledgeSharing(true);
        return;
      }
    }

    if (isQuestionAnswered) setCurrentIndexToDisplay(currentIndexToDisplay + 1);
    setArePointsAdded(false);
    setIsQuestionAnswered(false);
    getSlideById([lectureId!, slideIds![currentSlideIndex!]]);
    dispatch(setCurrentSlideIndex(currentSlideIndex! + 1));
    if (isContribution || currentSlideIndex === totalSlidesCount) return;
  };

  const handleOpenKnowledgeSharing = () => {
    setIsKnowledgeSharing(true);
  };

  const handleCloseKnowledgeSharing = () => {
    if (lectureGameFinished) {
      getLeaderboard();
    }
    setIsKnowledgeSharing(false);
  };

  const handleSubmitKnowledgeSharing = async (knowledgeShared?: boolean) => {
    setHasKnowledgeSharingBadge(true);
    if (lectureGameFinished) {
      getLeaderboard(knowledgeShared);
    }
    setIsKnowledgeSharing(false);
  };

  const assignKnowledgeSharingBadge = () => {
    setHasKnowledgeSharingBadge(true);
  };

  const handleExitModalOpen = () => {
    navigate(`${ROUTES.topics}`);
  };

  const isLoading =
    isGetSlideIdsLoading ||
    !isStoreSet ||
    isGetContributionLoading ||
    isGetLectureLoading ||
    isGetLeaderboardScoresLoading;

  return isLoading ? (
    <Loader />
  ) : true ? (
    <Layout>
      <Toolbar
        contentLeft={
          <>
            <Button
              variant={ButtonVariant.dangerTextWithIcon}
              icon={<ExitIcon />}
              onClick={handleExitModalOpen}
            >
              Išeiti
            </Button>
            <>
              <LectureDetailContainer icon={<ListIcon />}>
                <p className="paragraph1-bold">{`Skyrius ${currentIndexToDisplay}/${totalSlidesCount}`}</p>
              </LectureDetailContainer>
              <LectureDetailContainer
                icon={<HandIcon />}
                arePointsAdded={arePointsAdded}
              >
                <p className="paragraph1-bold">{`${points} tašk. `}</p>
              </LectureDetailContainer>
              {isContribution && (
                <Tag variant={TagVariant.contribution}>
                  <PeopleIcon />
                  <p className="paragraph1-bold">
                    EKSPERTO KLAUSIMAS - Įvertink pateiktą informaciją ir gauk
                    „Eksperto" ženklelį!
                  </p>
                </Tag>
              )}
            </>
          </>
        }
        contentRight={
          !isKnowledgeSharing ? (
            <Tooltip
              title={
                !isLeaderboard &&
                isContinueButtonDisabled &&
                "Nepasirinktas atsakymas"
              }
            >
              <span>
                <Button
                  onClick={handleNextSlide}
                  isDisabled={!isLeaderboard && isContinueButtonDisabled}
                >
                  {isLeaderboard ? "Baigti" : "Tęsti"}
                </Button>
              </span>
            </Tooltip>
          ) : null
        }
      />
      {isContribution && lecture && contributionData != null ? (
        <SlideQuestionView
          answers={contributionAnswers}
          text={`Ar ši informacija teisinga pamokai „${lecture.title}"? „${
            contributionData!.text
          }"`}
          disbleAnswers={isQuestionAnswered}
          onAnswerSelected={setSelectedAnswerId}
          isContribution={isContribution}
          lectureTitle={lecture.title}
          shouldResetParams={shouldResetParams}
        />
      ) : !isLeaderboard &&
        data?.isQuestion &&
        lecture &&
        !isKnowledgeSharing ? (
        <SlideQuestionView
          answers={data?.answers}
          text={data?.text}
          disbleAnswers={isQuestionAnswered}
          onAnswerSelected={setSelectedAnswerId}
          lectureTitle={lecture.title}
          shouldResetParams={shouldResetParams}
        />
      ) : isLeaderboard && leaderboardScores ? (
        <div>
          <h1 className="lecture-page__leaderboard-title">
            Potemės lyderių lentelė
          </h1>
          <LeaderboardView leaderboard={leaderboardScores} />
        </div>
      ) : isKnowledgeSharing ? (
        <KnowledgeSharingPage
          lectureTitle={lecture!.title}
          lectureId={lectureId!}
          slideId={slideIds![currentSlideIndex! - 1]}
          onKnowledgeSharingClose={handleCloseKnowledgeSharing}
          onKnowledgeSharingSubmit={handleSubmitKnowledgeSharing}
          assignKnowledgeSharingBadge={assignKnowledgeSharingBadge}
        />
      ) : (
        <div className="lecture-page__content-container content-wrapper">
          <div className="lecture-page__title-wrapper">
            <h3>{lecture!.title}</h3>
          </div>
          <div>
            {data?.text.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                <p className="paragraph2-regular">{line}</p>
                {index !== data?.text.split("\n").length - 1 && <br />}
              </React.Fragment>
            ))}
          </div>
          <Button
            className="lecture-page__knowledge-sharing-button"
            variant={ButtonVariant.secondaryFilled}
            onClick={handleOpenKnowledgeSharing}
          >
            ŽINAI PAPILDOMAI INFORMACIJOS ŠIAM SKYRIUI? PASIDALINK PASPAUDĘS
            ČIA!
          </Button>
        </div>
      )}
      <div className="lecture-page__progress-bar">
        <ProgressBar percentage={progressPercentage} />
      </div>
    </Layout>
  ) : (
    <div></div>
  );
};
export default Lecture;
