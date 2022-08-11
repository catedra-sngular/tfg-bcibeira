import { QuestionType } from '../interfaces/question';
import { QuestionFamily } from '../interfaces/question-family';

export const SOLUTION_CONTROL: QuestionFamily = {
    name: 'solution-control',
    title: 'Solution control',
    groups: [
        {
            key: 'iterations',
            title: 'iterations',
            type: QuestionType.group,
            visibleWhen: { '==': [{ var: 'TIME_DOMAIN' }, 'NO'] },
            children: [
                {
                    key: 'ITER',
                    type: QuestionType.numeric,
                    title: 'ITER',
                },
            ],
        },

        {
            key: 'linear-solver-definition',
            title: 'linear-solver-definition',
            type: QuestionType.group,
            children: [
                {
                    key: 'LINEAR_SOLVER',
                    type: QuestionType.text,
                    title: 'LINEAR_SOLVER',
                },
                {
                    key: 'LINEAR_SOLVER_PREC',
                    type: QuestionType.text,
                    title: 'LINEAR_SOLVER_PREC',
                },
                {
                    key: 'LINEAR_SOLVER_ILU_FILL_IN',
                    type: QuestionType.numeric,
                    title: 'LINEAR_SOLVER_ILU_FILL_IN',
                },
                {
                    key: 'LINEAR_SOLVER_ERROR',
                    type: QuestionType.text,
                    title: 'LINEAR_SOLVER_ERROR',
                },
                {
                    key: 'LINEAR_SOLVER_ITER',
                    type: QuestionType.numeric,
                    title: 'LINEAR_SOLVER_ITER',
                },
            ],
        },

        {
            key: 'convergence-parameters',
            title: 'convergence-parameters',
            type: QuestionType.group,
            children: [
                {
                    key: 'CONV_FIELD',
                    type: QuestionType.checkboxes,
                    title: 'CONV_FIELD',
                    options: [
                        { label: 'RMS_UTOL', value: 'RMS_UTOL' },
                        { label: 'RMS_RTOL', value: 'RMS_RTOL' },
                        { label: 'RMS_ETOL', value: 'RMS_ETOL' },
                        { label: 'CAUCHY', value: 'CAUCHY' },
                    ],
                    minSelected: 1,
                },
                {
                    key: 'CONV_RESIDUAL_MINVAL',
                    type: QuestionType.numeric,
                    title: 'CONV_RESIDUAL_MINVAL',
                },
                {
                    key: 'CONV_STARTITER',
                    type: QuestionType.numeric,
                    title: 'CONV_STARTITER',
                },
            ],
        },
        {
            key: 'couchy-parameters',
            title: 'couchy-parameters',
            type: QuestionType.group,
            visibleWhen: { in: ['CAUCHY', { var: 'CONV_FIELD' }] },

            children: [
                {
                    key: 'CONV_CAUCHY_ELEMS',
                    type: QuestionType.numeric,
                    title: 'Number of elements to apply the criteria',
                },
                {
                    key: 'CONV_CAUCHY_EPS',
                    type: QuestionType.text,
                    title: 'Epsilon to control the series convergence',
                },
            ],
        },
        {
            key: 'time-domain-parameters',
            title: 'time-domain-parameters',
            type: QuestionType.group,
            visibleWhen: { '==': [{ var: 'TIME_DOMAIN' }, 'YES'] },

            children: [
                {
                    key: 'WINDOW_CAUCHY_CRIT',
                    type: QuestionType.buttonList,
                    title: 'Activate the windowed cauchy criterion',
                    options: [
                        { label: 'YES', value: 'YES' },
                        { label: 'NO', value: 'NO' },
                    ],
                },
                {
                    key: 'CONV_WINDOW_FIELD',
                    type: QuestionType.text,
                    title: 'Specify convergence field(s)',
                },
                {
                    key: 'CONV_WINDOW_STARTITER',
                    type: QuestionType.numeric,
                    title: 'Number of iterations to wait after the iteration specified in  WINDOW_START_ITER',
                },
                {
                    key: 'CONV_WINDOW_CAUCHY_EPS',
                    type: QuestionType.text,
                    title: 'Epsilon to control the series convergence',
                },
                {
                    key: 'CONV_WINDOW_CAUCHY_ELEMS',
                    type: QuestionType.numeric,
                    title: 'Number of elements to apply the criteria',
                },
                {
                    key: 'WINDOW_START_ITER',
                    type: QuestionType.numeric,
                    title: 'Iteration to start the windowed time average',
                },
                {
                    key: 'WINDOW_FUNCTION',
                    type: QuestionType.buttonList,
                    title: 'Window-function to weight the time average',
                    options: [
                        { label: 'SQUARE', value: 'SQUARE' },
                        { label: 'HANN', value: 'HANN' },
                        { label: 'HANN_SQUARE', value: 'HANN_SQUARE' },
                        { label: 'BUMP', value: 'BUMP' },
                    ],
                },
            ],
        },
        {
            key: 'dimensionalization',
            title: 'dimensionalization',
            type: QuestionType.group,
            children: [
                {
                    key: 'REF_DIMENSIONALIZATION',
                    type: QuestionType.text,
                    title: 'REF_DIMENSIONALIZATION',
                },
            ],
        },
        {
            key: 'time-strategy',
            title: 'time-strategy',
            type: QuestionType.group,
            visibleWhen: { '==': [{ var: 'TIME_DOMAIN' }, 'YES'] },

            children: [
                {
                    key: 'TIME_MARCHING',
                    type: QuestionType.text,
                    title: 'TIME_MARCHING',
                },
                {
                    key: 'TIME_STEP',
                    type: QuestionType.text,
                    title: 'TIME_STEP',
                },
                {
                    key: 'TIME_ITER',
                    type: QuestionType.numeric,
                    title: 'TIME_ITER',
                },
                {
                    key: 'INNER_ITER',
                    type: QuestionType.numeric,
                    title: 'INNER_ITER',
                },
                {
                    key: 'RESTART_ITER',
                    type: QuestionType.numeric,
                    title: 'RESTART_ITER',
                },
            ],
        },
    ],
};
