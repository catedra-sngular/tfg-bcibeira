import { Answer } from './answer';
import { Question } from './question';

export interface QuestionProps<T> {
    question: T;
    answers: Answer[];
    disabled: boolean;
    setLoadingState: (question: Question, loadingState: boolean) => void;
    scrollIntoView: () => void;
    setAnswer?: (question: Question, value: string | number) => void;
}
