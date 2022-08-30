import { getVisibleQuestions } from '../../helpers/get-visible-questions';
import { Answer } from '../../interfaces/answer';
import { Question } from '../../interfaces/question';
import { WizardQuestion } from '../question/question';

import './wizard.scss';

interface WizardProps {
    questions: Question[];
    answers: Answer[];
    setAnswer: (question: Question, value: string | number) => void;
    deleteAnswer: (question: Question) => void;
    setIsComplete: (isComplete: boolean) => void;
    setLoadingState: (question: Question, loadingState: boolean) => void;
    disabled: boolean;
}

export const Wizard = (props: WizardProps) => {
    const {
        questions,
        answers,
        setAnswer,
        deleteAnswer,
        setIsComplete,
        setLoadingState,
        disabled,
    } = props;

    const visibleQuestions = getVisibleQuestions(questions, answers, deleteAnswer, setIsComplete);

    return (
        <div className='wizard'>
            {visibleQuestions.map((question: Question) => (
                <WizardQuestion
                    key={question.key}
                    question={question}
                    answers={answers}
                    setAnswer={setAnswer}
                    setLoadingState={setLoadingState}
                    disabled={disabled}
                ></WizardQuestion>
            ))}
        </div>
    );
};
