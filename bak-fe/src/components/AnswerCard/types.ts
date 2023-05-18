import { AnswerVariant } from "utils/enums";

export interface AnswerCardProps {
  variant: AnswerVariant;
  text: string;
  isCorrect?: boolean;
}
