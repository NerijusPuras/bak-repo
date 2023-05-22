import { AnswerVariant } from "./enums";

export const getAnswerVariant = (index: number, answerCount: number) =>
  answerCount === 2
    ? Object.values(AnswerVariant)[index === 1 ? 3 : 0]
    : Object.values(AnswerVariant)[index];
