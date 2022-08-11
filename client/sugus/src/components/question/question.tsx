import { Answer } from '../../interfaces/answer';
import {
    Question,
    QuestionButtonList,
    QuestionGroup,
    QuestionNumeric,
    QuestionSelector,
    QuestionText,
    QuestionType,
} from '../../interfaces/question';
import { WizardQuestionButtonList } from './button-list/button-list';
import { WizardQuestionSelector } from './selector/selector';
import './question.scss';
import { WizardQuestionNumeric } from './numeric/numeric';
import { useRef, useState } from 'react';
import { Popover } from 'react-tiny-popover';
import parse from 'html-react-parser';
import { WizardQuestionText } from './text/text';
import { WizardQuestionCheckboxes } from './checkboxes/checkboxes';
import { WizardQuestionGroup } from './group/group';

export interface QuestionProps {
    question: Question;
    answers: Answer[];
    setAnswer?: (question: Question, value: string | number) => void;
    setLoadingState: (question: Question, loadingState: boolean) => void;
    disabled: boolean;
}
export const WizardQuestion = (props: QuestionProps) => {
    const { question, answers, setAnswer, setLoadingState, disabled } = props;

    const questionRef = useRef<null | HTMLDivElement>(null);
    const [showDescription, setShowDescription] = useState<boolean>(false);

    const scrollQuestionIntoView = () => {
        questionRef &&
            questionRef.current &&
            questionRef.current.scrollIntoView({
                block: 'center',
                behavior: 'smooth',
            });
    };

    const handleSetLoadingState = (question: Question, loadingState: boolean): void => {
        setLoadingState(question, loadingState);
    };

    const handleToggleShowDescription = (): void => {
        setShowDescription(!showDescription);
    };

    const renderQuestionType = (question: Question) => {
        switch (question.type) {
            case QuestionType.buttonList:
                return (
                    <WizardQuestionButtonList
                        question={question as QuestionButtonList}
                        answers={answers}
                        setAnswer={setAnswer}
                        setLoadingState={handleSetLoadingState}
                        disabled={disabled}
                        scrollIntoView={scrollQuestionIntoView}
                    ></WizardQuestionButtonList>
                );
            case QuestionType.selector:
                return (
                    <WizardQuestionSelector
                        question={question as QuestionSelector}
                        answers={answers}
                        setAnswer={setAnswer}
                        setLoadingState={handleSetLoadingState}
                        disabled={disabled}
                        scrollIntoView={scrollQuestionIntoView}
                    ></WizardQuestionSelector>
                );
            case QuestionType.numeric:
                return (
                    <WizardQuestionNumeric
                        question={question as QuestionNumeric}
                        answers={answers}
                        setAnswer={setAnswer}
                        setLoadingState={handleSetLoadingState}
                        disabled={disabled}
                        scrollIntoView={scrollQuestionIntoView}
                    ></WizardQuestionNumeric>
                );
            case QuestionType.text:
                return (
                    <WizardQuestionText
                        question={question as QuestionText}
                        answers={answers}
                        setAnswer={setAnswer}
                        setLoadingState={handleSetLoadingState}
                        disabled={disabled}
                        scrollIntoView={scrollQuestionIntoView}
                    ></WizardQuestionText>
                );
            case QuestionType.checkboxes:
                return (
                    <WizardQuestionCheckboxes
                        question={question as QuestionButtonList}
                        answers={answers}
                        setAnswer={setAnswer}
                        setLoadingState={handleSetLoadingState}
                        disabled={disabled}
                        scrollIntoView={scrollQuestionIntoView}
                    ></WizardQuestionCheckboxes>
                );
            case QuestionType.group:
                return (
                    <WizardQuestionGroup
                        question={question as QuestionGroup}
                        answers={answers}
                        setAnswer={setAnswer}
                        setLoadingState={handleSetLoadingState}
                        disabled={disabled}
                        scrollIntoView={scrollQuestionIntoView}
                    ></WizardQuestionGroup>
                );
            default:
                return (
                    <p>
                        Tipo de pregunta <em>{question.type}</em> no definida
                    </p>
                );
        }
    };

    return (
        <>
            <div className='question' ref={questionRef}>
                <div
                    className={
                        question.type === QuestionType.group
                            ? `question__title question__title__group`
                            : 'question__title'
                    }
                >
                    <span>{question.title}</span>
                    {question.description && question.type !== QuestionType.group && (
                        <Popover
                            isOpen={showDescription}
                            positions={['right']}
                            align='start'
                            onClickOutside={handleToggleShowDescription}
                            content={
                                <div className='question__description'>
                                    <div className='question__description__title'>
                                        {question.title}
                                    </div>
                                    {parse(question.description)}
                                </div>
                            }
                        >
                            <span className='icon__help' onClick={handleToggleShowDescription}>
                                ?
                            </span>
                        </Popover>
                    )}
                </div>
                {question.description && question.type === QuestionType.group && (
                    <p>{question.description}</p>
                )}

                {renderQuestionType(question)}
            </div>
        </>
    );
};
