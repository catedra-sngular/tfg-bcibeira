import { useEffect, useState } from 'react';
import { Observable } from 'rxjs';
import { getAnswerForQuestion } from '../../../helpers/get-answer-for-question';
import { Answer } from '../../../interfaces/answer';
import { QuestionSelector } from '../../../interfaces/question';
import { QuestionOption } from '../../../interfaces/question-option';
import { QuestionProps } from '../../../interfaces/question-props';
import './selector.scss';

export const WizardQuestionSelector = (props: QuestionProps<QuestionSelector>) => {
    const { question, answers, setAnswer, setLoadingState, disabled, scrollIntoView } = props;
    const [options, setOptions] = useState<QuestionOption[]>([]);
    let answer: Answer | undefined;
    useEffect(() => {
        answer = getAnswerForQuestion(answers, question.key);

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
            setOptions(question.options);
            scrollIntoView();
        }
    }, []);

    const handleSelectOption = (value: string | number): void => {
        setAnswer && setAnswer(question, value);
    };

    return (
        <div className='question-button-selector'>
            {question.loading && <div>Cargando opciones</div>}

            {!question.loading && options && (
                <select
                    onChange={($event) => handleSelectOption($event.target.value)}
                    disabled={disabled}
                    value={answer && answer.value}
                    autoFocus
                >
                    {!answer && <option>---</option>}
                    {options
                        .sort((a: QuestionOption, b: QuestionOption): number => {
                            if (question.sortOptions) {
                                return a.label > b.label ? 1 : -1;
                            }
                            return 1;
                        })
                        .map((option: QuestionOption) => (
                            <option key={`${question.key}-${option.value}`} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                </select>
            )}
        </div>
    );
};
