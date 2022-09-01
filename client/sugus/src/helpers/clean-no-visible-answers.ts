import { Answer } from '../interfaces/answer';
import * as jsonLogic from 'json-logic-js';

export const cleanNoVisibleAnswers = (answers: Answer[]): Answer[] => {
    const cleanAnswers: Answer[] = [];

    answers.forEach((answer: Answer) => {
        if (answer.visibleWhen === undefined) {
            cleanAnswers.push(answer);
        } else {
            const answersObject: { [key: string]: string | number } = {};
            cleanAnswers.forEach((answer: Answer) => {
                answersObject[answer.key] = answer.value;
            });
            const isOptionVisible: boolean = jsonLogic.apply(
                answer.visibleWhen as jsonLogic.RulesLogic,
                answersObject,
            ) as boolean;
            if (isOptionVisible) {
                cleanAnswers.push(answer);
            }
        }
    });

    return cleanAnswers;
};
