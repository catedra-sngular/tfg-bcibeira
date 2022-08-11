import { Answer } from '../interfaces/answer';
import { Question } from '../interfaces/question';
import { ScreenQuestion } from '../interfaces/screen-question';
import * as jsonLogic from 'json-logic-js';

export const getVisibleQuestions = (
    questions: Question[],
    answers: Answer[],
    deleteAnswer?: (question: Question) => void,
    setIsComplete?: (isComplete: boolean) => void,
): ScreenQuestion[] => {
    const answersObject: { [key: string]: string | number } = {};
    answers.forEach((answer: Answer) => {
        answersObject[answer.key] = answer.value;
    });

    const conditionalVisibleQuestions = questions.filter((question: Question) => {
        if (!question.visibleWhen) {
            return true;
        }
        const isQuestionVisible: boolean = jsonLogic.apply(
            question.visibleWhen as jsonLogic.RulesLogic,
            answersObject,
        ) as boolean;

        if (!isQuestionVisible && deleteAnswer) {
            setTimeout(() => {
                deleteAnswer(question);
            }, 0);
        }
        return isQuestionVisible;
    });

    // Buscamos la primera pregunta no respondida
    const firstUnansweredQuestionsPosition = conditionalVisibleQuestions.findIndex(
        (question: Question) => !answers.find((answer: Answer) => answer.key === question.key),
    );

    // Si no encontramos preguntas no respondidas, es que hemos terminado el formulario por lo que devolvemos todas
    if (firstUnansweredQuestionsPosition === -1 && setIsComplete) {
        setTimeout(() => {
            setIsComplete(true);
        }, 0);
        return conditionalVisibleQuestions.map((question: Question, index: number) => ({
            ...question,
            render: true,
        }));
    }

    if (setIsComplete) {
        setTimeout(() => {
            setIsComplete(false);
        }, 0);
    }
    // Devolvemos la primera pregunta no respondida y sus preguntas anteriores
    return conditionalVisibleQuestions
        .map((question: Question, index: number) => ({
            ...question,
            render: index <= firstUnansweredQuestionsPosition,
        }))
        .filter((question: ScreenQuestion) => question.render);
};
