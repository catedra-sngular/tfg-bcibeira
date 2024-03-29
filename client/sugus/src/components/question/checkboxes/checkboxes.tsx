import { useState, useEffect } from 'react';
import { Observable } from 'rxjs';
import { getAnswerForQuestion } from '../../../helpers/get-answer-for-question';
import { Answer } from '../../../interfaces/answer';
import { QuestionCheckboxes } from '../../../interfaces/question';
import { QuestionOption } from '../../../interfaces/question-option';
import { QuestionProps } from '../../../interfaces/question-props';
import Button from 'react-bootstrap/Button';
import './checkboxes.scss';
import * as jsonLogic from 'json-logic-js';

export const WizardQuestionCheckboxes = (props: QuestionProps<QuestionCheckboxes>) => {
    const { question, answers, setAnswer, setLoadingState, disabled, scrollIntoView } = props;
    const [options, setOptions] = useState<QuestionOption[]>([]);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [editMode, setEditMode] = useState<boolean>();
    const [minError, setMinError] = useState<boolean>();
    const [maxError, setMaxError] = useState<boolean>();

    let answer: Answer | undefined;

    useEffect(() => {
        answer = getAnswerForQuestion(answers, question.key);

        if (answer) {
            setSelectedOptions((answer?.value as string).split(', '));
        } else if (question.default !== undefined) {
            setSelectedOptions(question?.default.split(', '));
        }

        scrollIntoView();
        if (answer === undefined && editMode === undefined) {
            setEditMode(true);
        }
    }, []);

    useEffect(() => {
        if (question.options instanceof Observable) {
            setLoadingState(question, true);
            const subscription = question.options.subscribe((options) => {
                setLoadingState(question, false);
                setOptions(options);
                scrollIntoView();
            });

            return () => {
                subscription.unsubscribe();
            };
        } else {
            const answersObject: { [key: string]: string | number } = {};
            answers.forEach((answer: Answer) => {
                answersObject[answer.key] = answer.value;
            });
            const filteredOptions: QuestionOption[] = question.options.filter(
                (option: QuestionOption) => {
                    const isOptionVisible: boolean = jsonLogic.apply(
                        option.visibleWhen as jsonLogic.RulesLogic,
                        answersObject,
                    ) as boolean;

                    return !option.visibleWhen || isOptionVisible;
                },
            );

            setOptions(filteredOptions);
            scrollIntoView();
            setLoadingState(question, false);
        }
    }, []);

    useEffect(() => {
        validateBoundaries();
    }, [selectedOptions]);

    const validateBoundaries = (): void => {
        setMinError(!!question.minSelected && selectedOptions.length < question.minSelected);
        setMaxError(!!question.maxSelected && selectedOptions.length > question.maxSelected);
    };

    const toggleCheckOption = (value: string) => {
        if (!selectedOptions.includes(value)) {
            setSelectedOptions([...selectedOptions, value]);
        } else {
            setSelectedOptions(
                selectedOptions.filter((selectedOption: string) => selectedOption !== value),
            );
        }
    };

    const handleSendValue = () => {
        setAnswer && setAnswer(question, selectedOptions.join(', '));
        setEditMode(false);
    };

    const handleChangeValue = () => {
        setEditMode(true);
    };

    const handleCancelValue = () => {
        setSelectedOptions((answer?.value as string).split(', '));
        setEditMode(false);
    };

    return (
        <div className='question-checkbox'>
            {question.loading && <div>Loading options</div>}

            {!editMode && (
                <div className='question-checkbox__options'>
                    <span>{selectedOptions.join(', ')}</span>
                    <Button className='sugus__button' onClick={handleChangeValue}>
                        Change value
                    </Button>
                </div>
            )}

            {editMode &&
                !question.loading &&
                options &&
                options
                    .sort((a: QuestionOption, b: QuestionOption): number => {
                        if (question.sortOptions) {
                            return a.label > b.label ? 1 : -1;
                        }
                        return 1;
                    })
                    .map((option: QuestionOption) => (
                        <Button
                            key={`${question.key}-${option.value}`}
                            data-cy={question.key}
                            variant={
                                answer && selectedOptions.includes(option.value)
                                    ? 'primary'
                                    : 'secondary'
                            }
                            onClick={() => toggleCheckOption(option.value)}
                            disabled={disabled}
                        >
                            <input
                                type='checkbox'
                                checked={selectedOptions.includes(option.value)}
                                onChange={() => console.log('check')}
                            ></input>
                            {option.label}
                        </Button>
                    ))}
            {editMode && !question.loading && (
                <>
                    <Button
                        className='sugus__button'
                        data-cy={`${question.key}-send-value`}
                        onClick={handleSendValue}
                        disabled={minError || maxError}
                    >
                        Send value
                    </Button>

                    {answer && (
                        <Button className='sugus__button' onClick={handleCancelValue}>
                            Cancel
                        </Button>
                    )}
                </>
            )}

            <div className='error-container'>
                {minError && (
                    <div className='error'>
                        You cannot select less than {question.minSelected} options
                    </div>
                )}
                {maxError && (
                    <div className='error'>
                        The cannot select more than {question.maxSelected} options
                    </div>
                )}
            </div>
        </div>
    );
};
