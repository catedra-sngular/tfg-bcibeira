import { Answer } from '../interfaces/answer';
import { Question, QuestionGroup, QuestionType } from '../interfaces/question';
import { QuestionFamily } from '../interfaces/question-family';

const familySeparator =
    '%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%';
const groupSeparator = '----------------------';

export const getConfigFileContent = (sections: QuestionFamily[], answers: Answer[]): string[] => {
    const fileConfigData: string[] = [];

    sections.forEach((section: QuestionFamily) => {
        const familyContent: string[] = getChildContent(section.groups, answers);
        if (familyContent.length > 0) {
            addFamilyHeader(fileConfigData, section.title);
            fileConfigData.push(...familyContent);
        }
    });

    return fileConfigData;
};

const getChildContent = (questions: Question[], answers: Answer[]): string[] => {
    const content: string[] = [];

    questions.forEach((question: Question) => {
        if (question.type === QuestionType.group) {
            const childContent: string[] = getChildContent(
                (question as QuestionGroup).children,
                answers,
            );
            if (childContent.length > 0 && question.title) {
                addGroupHeader(content, question.title);
                content.push(...childContent);
            }
        } else {
            const answer: Answer | undefined = answers.find(
                (answer: Answer) => answer.key === question.key,
            );
            if (answer) {
                addVariableContent(content, question, answer);
            }
        }
    });
    return content;
};

const addFamilyHeader = (content: string[], familyName: string): void => {
    content.push(
        `\n\n% ${familySeparator}\n% ${familySeparator} \n% FAMILY: ${familyName}\n% ${familySeparator}\n% ${familySeparator}\n\n`,
    );
};

const addGroupHeader = (content: string[], familyName: string): void => {
    content.push(`\n% ${groupSeparator} GROUP: ${familyName} ${groupSeparator}\n`);
};

const addVariableContent = (content: string[], question: Question, answer: Answer): void => {
    content.push(`% ${question?.title || ''}\n${question.key} = ${answer.value}\n`);
};
