import AnswerCard from "components/AnswerCard";
import { AnswerVariant } from "./enums";
import { Answer } from "./types";

export const getAnswerVariant = (index: number, answerCount: number) =>
  answerCount === 2
    ? Object.values(AnswerVariant)[index === 1 ? 3 : 0]
    : Object.values(AnswerVariant)[index];



// export const getAnswerCards = (answers: Answer[], isAnswersView?: boolean) =>
//   answers.map((answer, index) => (
//     <AnswerCard
//       key={answer.id}
//       variant={getAnswerVariant(index, answers.length)}
//       text={answer.text}
//       isCorrect={isAnswersView ? Boolean(answer.isCorrect) : undefined}
//     />
//   ));
