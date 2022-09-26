import { ChangeEvent, useEffect, useState } from 'react';
import { getAnswerForQuestion } from '../../../helpers/get-answer-for-question';
import { Answer } from '../../../interfaces/answer';
import { QuestionNumeric } from '../../../interfaces/question';
import { QuestionProps } from '../../../interfaces/question-props';
import './numeric.scss';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const WizardQuestionNumeric = (props: QuestionProps<QuestionNumeric>) => {
    const { question, answers, setAnswer, scrollIntoView, disabled } = props;
    const [value, setValue] = useState<number | null>(null);
    const [minError, setMinError] = useState<boolean>();
    const [maxError, setMaxError] = useState<boolean>();
    const [editMode, setEditMode] = useState<boolean>();

    let answer: Answer | undefined;
    useEffect(() => {
        answer = getAnswerForQuestion(answers, question.key);

        if (answer) {
            setValue(answer.value as number);
        } else if (question.default !== undefined) {
            setValue(question.default);
        }

        scrollIntoView();
        if (answer === undefined && editMode === undefined) {
            setEditMode(true);
        }
    }, []);

    const handleKeyDown = (event: any) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (event.key === 'Enter') {
            if (
                !(
                    value === null ||
                    minError ||
                    maxError ||
                    disabled ||
                    (value !== null && isNaN(value))
                )
            ) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
                event.preventDefault();
                handleSendValue();
            }
        }
    };

    const validateBoundaries = (value: number | undefined): void => {
        setMinError(value !== undefined && question.min !== undefined && value < question.min);
        setMaxError(value !== undefined && question.max !== undefined && value > question.max);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.target.value);
        setValue(value);
        validateBoundaries(value);
    };

    const handleExitEditMode = () => {
        if (!!answer && value !== answer.value) {
            setValue(answer.value as number);
            validateBoundaries(answer.value as number);
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
                <div className='question-numeric__container'>
                    <div className='question-numeric__value'>{value}</div>
                    <div className='question-numeric__buttonset'>
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
                    <div className='question-numeric__container'>
                        <Form.Control
                            data-cy={question.key}
                            size='lg'
                            type='number'
                            autoFocus
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            value={value || value === 0 ? value : ''}
                        />

                        <div className='question-numeric__buttonset'>
                            <Button
                                className='sugus__button'
                                data-cy={`${question.key}-send-value`}
                                disabled={
                                    value === null ||
                                    minError ||
                                    maxError ||
                                    disabled ||
                                    (value !== null && isNaN(value))
                                }
                                onClick={handleSendValue}
                            >
                                Send value
                            </Button>
                            {!!answer && (
                                <Button
                                    className='sugus__button'
                                    onClick={handleExitEditMode}
                                    disabled={disabled}
                                >
                                    Cancel
                                </Button>
                            )}
                        </div>
                    </div>
                    <div className='error-container'>
                        {minError && (
                            <div className={value === null ? 'hint' : 'error'}>
                                The value cannot be less than {question.min}
                            </div>
                        )}
                        {maxError && (
                            <div className='error'>
                                The value cannot be greater than {question.max}
                            </div>
                        )}
                    </div>
                </>
            )}
        </>
    );
};
