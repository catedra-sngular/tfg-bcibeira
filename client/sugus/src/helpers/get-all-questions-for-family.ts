import { Question, QuestionGroup, QuestionType } from '../interfaces/question';

export const getAllQuestionNamesForFamily = (questions: Question[]): string[] => {
    return getQuestionNames([], questions);
};

const getQuestionNames = (questionNames: string[], questions: Question[]): string[] => {
    let names: string[] = [...questionNames];

    questions.forEach((question: Question) => {
        if (question.type === QuestionType.group) {
            names = questionNames.concat(
                getQuestionNames(names, (question as QuestionGroup).children),
            );
        } else {
            names = [...names, question.key];
        }
    });
    return names;
};
