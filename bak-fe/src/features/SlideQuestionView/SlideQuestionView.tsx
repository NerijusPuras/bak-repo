import classNames from "classnames";
import { useEffect, useState } from "react";
import { SlideAnswered } from "utils/enums";
import { getAnswerVariant } from "utils/utils";
import AnswerButton from "./AnswerButton";
import "./SlideQuestionView.scss";
import { SlideQuestionViewProps } from "./types";

const SlideQuestionView = ({
  text,
  answers,
  disbleAnswers,
  onAnswerSelected,
  lectureTitle,
  shouldResetParams,
}: // slideAnswered,
SlideQuestionViewProps) => {
  const [response, setResponse] = useState<number>();

  const isSelectedAnswer = (index: number) => index === response;

  useEffect(() => {
    if (shouldResetParams) {
      onAnswerSelected(undefined);
      setResponse(-1);
    }
  }, [shouldResetParams]);

  const handleSelect = (index: number) => {
    setResponse(index);
    onAnswerSelected(answers![index].id);
  };

  return (
    <div className="slide-question-view" data-testid="slide-question-view">
      <div className="slide-question-view__content-container">
        <div className="slide-question-view__title-wrapper">
          <h3>{lectureTitle}</h3>
        </div>
        <h1 className="slide-question-view__title">{text}</h1>
        <div className="slide-question-view__answers-grid-wrapper">
          <div
            className={classNames("slide-question-view__answer-cards-grid", {
              "slide-question-view__answer-cards-grid--two-cards":
                answers!.length === 2,
            })}
          >
            {/* {getAnswerCards(answers!)} */}
            {answers?.map(({ text }, index) => (
              <AnswerButton
                text={text}
                key={index}
                variant={getAnswerVariant(index, answers!.length)}
                answerIdx={index}
                selected={isSelectedAnswer(index)}
                disabled={disbleAnswers && !isSelectedAnswer(index)}
                onSelect={handleSelect}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideQuestionView;
