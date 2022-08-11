import { Answer } from '../interfaces/answer';

export const getAnswerForQuestion = (
    answers: Answer[],
    key: string | number,
): Answer | undefined => {
    return answers.find((answer: Answer) => answer.key === key);
};
