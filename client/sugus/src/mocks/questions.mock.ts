import { delay, Observable, of } from 'rxjs';
import { getAllQuestionNamesForFamily } from '../helpers/get-all-questions-for-family';
import { getConfigFileContent } from '../helpers/get-config-file-content';
import { Answer } from '../interfaces/answer';
import { QuestionFamily } from '../interfaces/question-family';
import { QuestionOption } from '../interfaces/question-option';
import { WizardSection } from '../interfaces/wizard-section';
import { WizardSectionSummary } from '../interfaces/wizard-section-summary';
import { BOUNDARY_CONDITIONS } from './boundary-conditions';
import { PROBLEM_INPUT } from './problem-input';
import { PROBLEM_VARIABLES } from './problem-variables.mock';
import { SOLUTION_CONTROL } from './solution-control';
import { SOLUTION_OUTPUT } from './solution-output';
import { SOLUTION_STRATEGY } from './solution-strategy';
import { SOLVER_TYPE } from './solver-type';

export const getOptionsObservable = (options: QuestionOption[]): Observable<QuestionOption[]> => {
    const delayTime = 1000 + Math.random() * 250; // Metemos un retardo entre 1000 y 1250 milisegundos
    return of(options).pipe(delay(delayTime));
};

export const getSectionObservable = (
    section: WizardSection | undefined,
): Observable<WizardSection | undefined> => {
    const delayTime = 500 + Math.random() * 500; // Metemos un retardo entre 500 y 1000 milisegundos
    return of(section).pipe(delay(delayTime));
};

export const getSectionSummaryObservable = (
    sectionSummary: WizardSectionSummary | undefined,
): Observable<WizardSectionSummary | undefined> => {
    const delayTime = 250 + Math.random() * 250; // Metemos un retardo entre 250 y 500 milisegundos
    return of(sectionSummary).pipe(delay(delayTime));
};

export const getSectionSummary = (): Observable<WizardSectionSummary | undefined> => {
    const summary = {
        sections: [
            SOLVER_TYPE,
            PROBLEM_INPUT,
            PROBLEM_VARIABLES,
            BOUNDARY_CONDITIONS,
            SOLUTION_STRATEGY,
            SOLUTION_CONTROL,
            SOLUTION_OUTPUT,
        ].map((section: QuestionFamily) => {
            return {
                name: section.name,
                title: section.title,
                questionNames: getAllQuestionNamesForFamily(section.groups),
            };
        }),
    };
    return getSectionSummaryObservable(summary);
};

export const getSection = (name: string): Observable<WizardSection | undefined> => {
    const sections: WizardSection[] = [
        { ...SOLVER_TYPE, nextSection: 'problem-input' },
        { ...PROBLEM_INPUT, nextSection: 'problem-variables' },
        { ...PROBLEM_VARIABLES, nextSection: 'boundary-conditions' },
        { ...BOUNDARY_CONDITIONS, nextSection: 'solution-strategy' },
        { ...SOLUTION_STRATEGY, nextSection: 'solution-control' },
        { ...SOLUTION_CONTROL, nextSection: 'solution-output' },
        { ...SOLUTION_OUTPUT },
    ];

    return getSectionObservable(
        sections.find(
            (section: WizardSection | undefined): boolean => !!section && section.name === name,
        ),
    );
};

export const getExportFileSectionInfo = (answers: Answer[]): string[] => {
    return getConfigFileContent(
        [
            SOLVER_TYPE,
            PROBLEM_INPUT,
            PROBLEM_VARIABLES,
            BOUNDARY_CONDITIONS,
            SOLUTION_STRATEGY,
            SOLUTION_CONTROL,
            SOLUTION_OUTPUT,
        ],
        answers,
    );
};
