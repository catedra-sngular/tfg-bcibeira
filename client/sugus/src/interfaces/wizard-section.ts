import { QuestionGroup } from './question';

export interface WizardSection {
    name: string;
    groups: QuestionGroup[];
    title?: string;
    description?: string;
    nextSection?: string;
}
