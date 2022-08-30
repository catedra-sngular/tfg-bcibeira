import { Question } from './question';

export type Answer = {
    key: string;
    value: string | number;
    section?: string;
    questionTitle?: string;
};
