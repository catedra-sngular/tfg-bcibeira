import { QuestionGroup } from './question';

export interface QuestionFamily {
    name: string;
    title: string;
    groups: QuestionGroup[];
    description?: string;
}
