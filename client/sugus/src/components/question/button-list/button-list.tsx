import { useEffect, useState } from 'react';
import { Observable } from 'rxjs';
import { getAnswerForQuestion } from '../../../helpers/get-answer-for-question';
import { Answer } from '../../../interfaces/answer';
import { QuestionButtonList } from '../../../interfaces/question';
import { QuestionOption } from '../../../interfaces/question-option';
import { QuestionProps } from '../../../interfaces/question-props';
import './button-list.scss';
import Button from 'react-bootstrap/Button';

export const WizardQuestionButtonList = (props: QuestionProps<QuestionButtonList>) => {
    const { question, answers, setAnswer, setLoadingState, disabled, scrollIntoView } = props;
    const [options, setOptions] = useState<QuestionOption[]>([]);
    const [currentAnswer, setCurrentAnswer] = useState<Answer | undefined>();

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
            setOptions(question.options);
            scrollIntoView();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const answer: Answer | undefined = getAnswerForQuestion(answers, question.key);
        setCurrentAnswer(answer);
    }, [answers]);

    const handleSelectOption = (value: string | number): void => {
        setAnswer && setAnswer(question, value);
    };

    return (
        <div className='question-button-list'>
            {question.loading && <div>Loading options</div>}
            {!question.loading &&
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
                            variant={
                                currentAnswer && option.value === currentAnswer.value
                                    ? 'primary'
                                    : 'outline-secondary'
                            }
                            onClick={() => handleSelectOption(option.value)}
                            disabled={disabled}
                            className='button-list__item'
                        >
                            {option.label}
                        </Button>
                    ))}
        </div>
    );
};
