import { SetStateAction } from "react";
import { SlideAnswered } from "utils/enums";
import { Answer } from "utils/types";

export interface SlideQuestionViewProps {
  text: string;
  answers?: Answer[];
  disbleAnswers?: boolean;
  onAnswerSelected: SetStateAction<any>
  isContribution?: boolean;
  lectureTitle: string;
  shouldResetParams?: boolean;
  // slideAnswered?: SlideAnswered;
}