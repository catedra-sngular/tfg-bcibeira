import { Observable } from 'rxjs';
import { QuestionOption } from './question-option';

export enum QuestionType {
    buttonList = 'BUTTONLIST',
    selector = 'SELECTOR',
    numeric = 'NUMERIC',
    text = 'TEXT',
    checkboxes = 'CHECKBOXES',
    group = 'GROUP',
}

export type QuestionBase = {
    key: string;
    type: QuestionType;
    title?: string;
    visibleWhen?: any; // Object
    loading?: boolean;
    description?: string;
    internal?: boolean;
};

export type QuestionButtonList = QuestionBase & {
    options: QuestionOption[] | Observable<QuestionOption[]>;
    sortOptions: boolean;
};

export type QuestionSelector = QuestionBase & {
    options: QuestionOption[] | Observable<QuestionOption[]>;
    sortOptions: boolean;
};

export type QuestionNumeric = QuestionBase & {
    max?: number;
    min?: number;
    default?: number;
};

export type QuestionText = QuestionBase & {
    maxLength?: number;
    minLength?: number;
    default?: string;
};

export type QuestionCheckboxes = QuestionBase & {
    options: QuestionOption[] | Observable<QuestionOption[]>;
    sortOptions: boolean;
    maxSelected?: number;
    minSelected?: number;
    default?: string;
};

export type QuestionGroup = QuestionBase & {
    children: Question[];
};

export type Question =
    | QuestionButtonList
    | QuestionSelector
    | QuestionNumeric
    | QuestionText
    | QuestionCheckboxes
    | QuestionGroup;
