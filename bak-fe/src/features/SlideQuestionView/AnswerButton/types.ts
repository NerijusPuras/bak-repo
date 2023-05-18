import { AnswerVariant } from "utils/enums";

export interface AnswerButtonProps {
  text: string,
  variant: AnswerVariant;
  answerIdx: number;
  selected?: boolean;
  disabled?: boolean;
  onSelect: (index: number) => void;
  ariaLabel?: string;
}
