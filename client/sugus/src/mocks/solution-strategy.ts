import { QuestionType } from '../interfaces/question';
import { QuestionFamily } from '../interfaces/question-family';

export const SOLUTION_STRATEGY: QuestionFamily = {
    name: 'solution-strategy',
    title: 'Solution strategy',
    groups: [
        {
            key: 'flow-numerics',
            title: 'flow-numerics',
            type: QuestionType.group,
            visibleWhen: {
                or: [
                    { '==': [{ var: 'SOLVER' }, 'EULER'] },
                    { '==': [{ var: 'SOLVER' }, 'RANS'] },
                    { '==': [{ var: 'SOLVER' }, 'INC_EULER'] },
                    { '==': [{ var: 'SOLVER' }, 'INC_RANS'] },
                ],
            },
            children: [
                {
                    key: 'NUM_METHOD_GRAD',
                    type: QuestionType.text,
                    title: 'NUM_METHOD_GRAD',
                },
                {
                    key: 'CFL_NUMBER',
                    type: QuestionType.numeric,
                    title: 'CFL_NUMBER',
                },
                {
                    key: 'CFL_ADAPT',
                    type: QuestionType.buttonList,
                    title: 'CFL_ADAPT',
                    options: [
                        { label: 'YES', value: 'YES' },
                        { label: 'NO', value: 'NO' },
                    ],
                },
                {
                    key: 'CFL_ADAPT_PARAM',
                    type: QuestionType.text,
                    title: 'CFL_ADAPT_PARAM',
                },
                {
                    key: 'MAX_DELTA_TIME',
                    type: QuestionType.text,
                    title: 'MAX_DELTA_TIME',
                },
                {
                    key: 'RK_ALPHA_COEFF',
                    type: QuestionType.text,
                    title: 'RK_ALPHA_COEFF',
                },
            ],
        },
        {
            key: 'slope-limiter-definition',
            title: 'slope-limiter-definition',
            type: QuestionType.group,
            visibleWhen: {
                or: [{ '==': [{ var: 'SOLVER' }, 'EULER'] }, { '==': [{ var: 'SOLVER' }, 'RANS'] }],
            },
            children: [
                {
                    key: 'VENKAT_LIMITER_COEFF',
                    type: QuestionType.numeric,
                    title: 'VENKAT_LIMITER_COEFF',
                },
            ],
        },
        {
            key: 'multigrid-strategy',
            title: 'multigrid-strategy',
            type: QuestionType.group,
            visibleWhen: {
                or: [
                    { '==': [{ var: 'SOLVER' }, 'EULER'] },
                    { '==': [{ var: 'SOLVER' }, 'RANS'] },
                    { '==': [{ var: 'SOLVER' }, 'INC_EULER'] },
                    { '==': [{ var: 'SOLVER' }, 'INC_RANS'] },
                ],
            },
            children: [
                {
                    key: 'MGLEVEL',
                    type: QuestionType.numeric,
                    title: 'MGLEVEL',
                },
            ],
        },

        {
            key: 'with-mglevel',
            title: 'with-mglevel',
            type: QuestionType.group,
            visibleWhen: {
                '!==': [{ var: 'MGLEVEL' }, '0'],
            },
            children: [
                {
                    key: 'MGCYCLE',
                    type: QuestionType.numeric,
                    title: 'MGCYCLE',
                },
                {
                    key: 'MG_PRE_SMOOTH',
                    type: QuestionType.text,
                    title: 'MG_PRE_SMOOTH',
                },
                {
                    key: 'MG_POST_SMOOTH',
                    type: QuestionType.text,
                    title: 'MG_POST_SMOOTH',
                },
                {
                    key: 'MG_CORRECTION_SMOOTH',
                    type: QuestionType.text,
                    title: 'MG_CORRECTION_SMOOTH',
                },
                {
                    key: 'MG_DAMP_RESTRICTION',
                    type: QuestionType.numeric,
                    title: 'MG_DAMP_RESTRICTION',
                },
                {
                    key: 'MG_DAMP_PROLONGATION',
                    type: QuestionType.numeric,
                    title: 'MG_DAMP_PROLONGATION',
                },
            ],
        },
        {
            key: 'flow-convection',
            title: 'flow-convection',
            type: QuestionType.group,
            visibleWhen: {
                or: [
                    { '==': [{ var: 'SOLVER' }, 'EULER'] },
                    { '==': [{ var: 'SOLVER' }, 'RANS'] },
                    { '==': [{ var: 'SOLVER' }, 'INC_EULER'] },
                    { '==': [{ var: 'SOLVER' }, 'INC_RANS'] },
                ],
            },
            children: [
                {
                    key: 'CONV_NUM_METHOD_FLOW',
                    type: QuestionType.text,
                    title: 'CONV_NUM_METHOD_FLOW',
                },
                {
                    key: 'JST_SENSOR_COEFF',
                    type: QuestionType.text,
                    title: 'JST_SENSOR_COEFF',
                },
                {
                    key: 'MUSCL_FLOW',
                    type: QuestionType.buttonList,
                    title: 'MUSCL_FLOW',
                    options: [
                        { label: 'YES', value: 'YES' },
                        { label: 'NO', value: 'NO' },
                    ],
                },
                {
                    key: 'SLOPE_LIMITER_FLOW',
                    type: QuestionType.text,
                    title: 'SLOPE_LIMITER_FLOW',
                },
                {
                    key: 'TIME_DISCRE_FLOW',
                    type: QuestionType.text,
                    title: 'TIME_DISCRE_FLOW',
                },
            ],
        },
        {
            key: 'turbulent-convection',
            title: 'turbulent-convection',
            type: QuestionType.group,
            visibleWhen: {
                or: [{ '==': [{ var: 'SOLVER' }, 'EULER'] }, { '==': [{ var: 'SOLVER' }, 'RANS'] }],
            },
            children: [
                {
                    key: 'CONV_NUM_METHOD_TURB',
                    type: QuestionType.text,
                    title: 'CONV_NUM_METHOD_TURB',
                },
                {
                    key: 'MUSCL_TURB',
                    type: QuestionType.buttonList,
                    title: 'MUSCL_TURB',
                    options: [
                        { label: 'YES', value: 'YES' },
                        { label: 'NO', value: 'NO' },
                    ],
                },
                {
                    key: 'SLOPE_LIMITER_TURB',
                    type: QuestionType.text,
                    title: 'SLOPE_LIMITER_TURB',
                },
                {
                    key: 'TIME_DISCRE_TURB',
                    type: QuestionType.text,
                    title: 'TIME_DISCRE_TURB',
                },
            ],
        },
        {
            key: 'structural-model',
            title: 'structural-model',
            type: QuestionType.group,
            visibleWhen: { '==': [{ var: 'SOLVER' }, 'ELASTICITY'] },
            children: [
                {
                    key: 'NONLINEAR_FEM_SOLUTION_METHOD',
                    type: QuestionType.text,
                    title: 'NONLINEAR_FEM_SOLUTION_METHOD',
                },
            ],
        },
    ],
};
