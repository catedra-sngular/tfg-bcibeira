import { getVisibleQuestions } from '../../../helpers/get-visible-questions';
import { Question, QuestionGroup } from '../../../interfaces/question';
import { QuestionProps } from '../../../interfaces/question-props';
import { ScreenQuestion } from '../../../interfaces/screen-question';
import { WizardQuestion } from '../question';

export const WizardQuestionGroup = (props: QuestionProps<QuestionGroup>) => {
    const {
        question,
        answers,
        setAnswer,
        setLoadingState,
        disabled,
        // scrollIntoView,
    } = props;

    const setIsComplete = (isComplete: boolean): void => {
        if (isComplete) {
            setAnswer &&
                !answers.find((answer) => answer.key === question.key) &&
                setAnswer(question, 'GROUP_HEADER');
        }
    };

    const visibleQuestions: ScreenQuestion[] = getVisibleQuestions(
        question.children,
        answers,
        undefined,
        setIsComplete,
    );

    return (
        <>
            {visibleQuestions.map((child: Question) => (
                <WizardQuestion
                    key={child.key}
                    question={child}
                    answers={answers}
                    setAnswer={setAnswer}
                    setLoadingState={setLoadingState}
                    disabled={disabled}
                ></WizardQuestion>
            ))}
        </>
    );
};
