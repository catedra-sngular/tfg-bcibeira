import { ChangeEvent, useEffect, useState } from 'react';
import { getAnswerForQuestion } from '../../../helpers/get-answer-for-question';
import { Answer } from '../../../interfaces/answer';
import { QuestionText } from '../../../interfaces/question';
import { QuestionProps } from '../../../interfaces/question-props';
import './text.scss';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const WizardQuestionText = (props: QuestionProps<QuestionText>) => {
    const { question, answers, setAnswer, scrollIntoView, disabled } = props;
    const [value, setValue] = useState<string | null>(null);
    const [minLengthError, setMinLengthError] = useState<boolean>();
    const [maxLengthError, setMaxLengthError] = useState<boolean>();
    const [editMode, setEditMode] = useState<boolean>();
    let answer: Answer | undefined;

    useEffect(() => {
        validateBoundaries(value);
    }, [value]);

    useEffect(() => {
        answer = getAnswerForQuestion(answers, question.key);

        if (answer) {
            setValue(answer.value as string);
            validateBoundaries(value);
        } else if (question.default !== undefined) {
            setValue(question.default);
        }

        scrollIntoView();
        if (answer === undefined && editMode === undefined) {
            validateBoundaries(value);

            setEditMode(true);
        }
    }, []);

    const validateBoundaries = (value: string | null): void => {
        setMinLengthError(
            question.minLength !== undefined &&
                (value === null ||
                    (value !== undefined &&
                        question.minLength !== undefined &&
                        value.length < question.minLength)),
        );
        setMaxLengthError(
            value !== undefined &&
                value !== null &&
                question.maxLength !== undefined &&
                value.length > question.maxLength,
        );
    };

    const handleKeyDown = (event: any) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (event.key === 'Enter') {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
            event.preventDefault();
            handleSendValue();
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const handleExitEditMode = () => {
        if (!!answer && value !== answer.value) {
            setValue(answer.value as string);
        }
        setEditMode(false);
    };
    const handleEnterEditMode = () => {
        setEditMode(true);
    };

    const handleSendValue = () => {
        if (value !== null) {
            setAnswer && setAnswer(question, value);
            setEditMode(false);
        }
    };

    return (
        <>
            {!editMode && (
                <div className='question-text__container'>
                    <div className='question-text__value'>{value}</div>
                    <div className='question-text__buttonset'>
                        <Button
                            variant='outline-secondary'
                            onClick={handleEnterEditMode}
                            disabled={disabled}
                        >
                            Change value
                        </Button>
                    </div>
                </div>
            )}

            {editMode && (
                <>
                    <div className='question-text__container'>
                        <Form.Control
                            size='lg'
                            type='text'
                            placeholder='Large text'
                            autoFocus
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            value={value !== null ? value : ''}
                        />

                        <div className='question-text__buttonset'>
                            <Button
                                className='sugus-button'
                                disabled={
                                    disabled || minLengthError || maxLengthError || value === null
                                }
                                onClick={handleSendValue}
                            >
                                Send value
                            </Button>
                            {!!answer && (
                                <Button
                                    className='sugus-button'
                                    onClick={handleExitEditMode}
                                    disabled={disabled}
                                >
                                    Cancel
                                </Button>
                            )}
                        </div>
                    </div>
                    <div className='error-container'>
                        {minLengthError && (
                            <div className={value === null ? 'hint' : 'error'}>
                                The value cannot be less than {question.minLength} characters
                            </div>
                        )}
                        {maxLengthError && (
                            <div className='error'>
                                The value cannot be greater than {question.maxLength} characters
                            </div>
                        )}
                    </div>
                </>
            )}
        </>
    );
};
