import { Question } from './question';

export type ScreenQuestion = Question & {
    render: boolean;
};
