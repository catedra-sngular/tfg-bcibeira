import { QuestionType } from '../interfaces/question';
import { QuestionFamily } from '../interfaces/question-family';

export const SOLUTION_CONTROL: QuestionFamily = {
    name: 'solution-control',
    title: 'Solution control',
    groups: [
        {
            key: 'iterations',
            title: 'Iterative solution',
            type: QuestionType.group,
            visibleWhen: { '==': [{ var: 'TIME_DOMAIN' }, 'NO'] },
            children: [
                {
                    key: 'ITER',
                    type: QuestionType.numeric,
                    title: 'Maximum number of iterations to converge the steady problem',
                },
            ],
        },

        {
            key: 'linear-solver-definition',
            title: 'Linear solver',
            type: QuestionType.group,
            children: [
                {
                    key: 'LINEAR_SOLVER',
                    type: QuestionType.buttonList,
                    title: 'Linear solver',
                    description: 'FGMRES recommended for flow problems',
                    options: [
                        { label: 'Conjugate gradient', value: 'CONJUGATE_GRADIENT' },
                        { label: 'FGMRES', value: 'FGMRES' },
                        { label: 'BCGSTAB', value: 'BCGSTAB' },
                        { label: 'Restarted FGMRES', value: 'RESTARTED_FGMRES' },
                    ],
                },
                {
                    key: 'LINEAR_SOLVER_PREC',
                    type: QuestionType.buttonList,
                    title: 'Linear solver preconditioner',
                    description: 'ILU recommended for flow problems',
                    options: [
                        { label: 'ILU(k)', value: 'ILU' },
                        { label: 'Jacobi', value: 'JACOBI' },
                        { label: 'LU SGS', value: 'LU_SGS' },
                        { label: 'Line implicit', value: 'LINELET' },
                    ],
                },
                {
                    key: 'LINEAR_SOLVER_ILU_FILL_IN',
                    type: QuestionType.numeric,
                    visibleWhen: { '==': [{ var: 'LINEAR_SOLVER_PREC' }, 'ILU'] },
                    title: 'k for ILU(k)',
                    default: 0,
                },
                {
                    key: 'LINEAR_SOLVER_ERROR',
                    type: QuestionType.text,
                    title: 'Linear solver error',
                    default: 1e-5,
                },
                {
                    key: 'LINEAR_SOLVER_ITER',
                    type: QuestionType.numeric,
                    title: 'Maximum number of linear solver iterations',
                    default: 2,
                },
            ],
        },

        {
            key: 'convergence-parameters',
            title: 'Convergence parameters',
            type: QuestionType.group,
            children: [
                {
                    key: 'CONV_FIELD',
                    type: QuestionType.checkboxes,
                    title: 'Convergence monitoring field',
                    options: [
                        { label: 'Drag', value: 'CD' },
                        { label: 'Lift', value: 'CL' },
                        { label: 'Moment', value: 'CM' },
                        { label: 'CAUCHY', value: 'CAUCHY' },
                    ],
                    minSelected: 1,
                },
                {
                    key: 'CONV_RESIDUAL_MINVAL',
                    type: QuestionType.numeric,
                    title: 'Log10 of the residual minimum value',
                    default: -8,
                },
                {
                    key: 'CONV_STARTITER',
                    type: QuestionType.numeric,
                    title: 'Start checking convergence at iteration',
                    default: 10,
                },
            ],
        },
        {
            key: 'couchy-parameters',
            title: 'Cauchy convergence parameters',
            type: QuestionType.group,
            visibleWhen: { in: ['CAUCHY', { var: 'CONV_FIELD' }] },

            children: [
                {
                    key: 'CONV_CAUCHY_ELEMS',
                    type: QuestionType.numeric,
                    title: 'Number of elements to apply the criteria',
                    default: 100,
                },
                {
                    key: 'CONV_CAUCHY_EPS',
                    type: QuestionType.text,
                    title: 'Epsilon to control the series convergence',
                    default: 1e-10,
                },
            ],
        },
        {
            key: 'time-domain-parameters',
            title: 'Time domain control',
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
                    visibleWhen: { '==': [{ var: 'WINDOW_CAUCHY_CRIT' }, 'YES'] },
                    description: 'Example: (TAVG_DRAG, TAVG_LIFT)',
                    default: '(TAVG_DRAG, TAVG_LIFT)',
                },
                {
                    key: 'CONV_WINDOW_STARTITER',
                    type: QuestionType.numeric,
                    visibleWhen: { '==': [{ var: 'WINDOW_CAUCHY_CRIT' }, 'YES'] },
                    title: 'Number of iterations to wait after the iteration specified in  WINDOW_START_ITER',
                    default: 0,
                },
                {
                    key: 'CONV_WINDOW_CAUCHY_EPS',
                    type: QuestionType.text,
                    visibleWhen: { '==': [{ var: 'WINDOW_CAUCHY_CRIT' }, 'YES'] },
                    title: 'Epsilon to control the series convergence',
                    default: 1e-3,
                },
                {
                    key: 'CONV_WINDOW_CAUCHY_ELEMS',
                    type: QuestionType.numeric,
                    visibleWhen: { '==': [{ var: 'WINDOW_CAUCHY_CRIT' }, 'YES'] },
                    title: 'Number of elements to apply the criteria',
                    default: 10,
                },
                {
                    key: 'WINDOW_START_ITER',
                    type: QuestionType.numeric,
                    visibleWhen: { '==': [{ var: 'WINDOW_CAUCHY_CRIT' }, 'YES'] },
                    title: 'Iteration to start the windowed time average',
                    default: 500,
                },
                {
                    key: 'WINDOW_FUNCTION',
                    type: QuestionType.buttonList,
                    visibleWhen: { '==': [{ var: 'WINDOW_CAUCHY_CRIT' }, 'YES'] },
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
            title: 'Non-dimensionalization',
            type: QuestionType.group,
            children: [
                {
                    key: 'REF_DIMENSIONALIZATION',
                    type: QuestionType.buttonList,
                    title: 'Non-dimensional models',
                    options: [
                        { label: 'Dimensional simulation', value: 'DIMENSIONAL' },
                        {
                            label: 'Freestream pressure equal to 1.0.',
                            value: 'FREESTREAM_PRESS_EQ_ONE',
                        },
                        {
                            label: 'Freestream velocity equal to Mach number',
                            value: 'FREESTREAM_VEL_EQ_MACH',
                        },
                        {
                            label: 'Freestream pressure equal to 1.0',
                            value: 'FREESTREAM_VEL_EQ_ONE',
                        },
                        {
                            label: 'Initial values for external flow (INC ONLY)',
                            value: 'INITIAL_VALUES',
                        },
                        { label: 'Reference values (INC ONLY)', value: 'REFERENCE_VALUES' },
                    ],
                },
            ],
        },
        {
            key: 'time-strategy',
            title: 'Time strategy',
            type: QuestionType.group,
            visibleWhen: { '==': [{ var: 'TIME_DOMAIN' }, 'YES'] },

            children: [
                {
                    key: 'TIME_MARCHING',
                    type: QuestionType.buttonList,
                    title: 'Time scheme',
                    options: [
                        { label: 'Time stepping', value: 'TIME_STEPPING' },
                        { label: 'Dual TS 1st order', value: 'DUAL_TIME_STEPPING-1ST_ORDER' },
                        { label: 'Dual TS 2nd order', value: 'DUAL_TIME_STEPPING-2ND_ORDER' },
                        { label: 'Harmonic balance', value: 'HARMONIC_BALANCE"' },
                        { label: 'Rotational frame', value: 'ROTATIONAL_FRAME"' },
                    ],
                },
                {
                    key: 'TIME_STEP',
                    type: QuestionType.text,
                    title: 'Time step',
                },
                {
                    key: 'TIME_ITER',
                    type: QuestionType.numeric,
                    title: 'Number of time iterations',
                },
                {
                    key: 'INNER_ITER',
                    type: QuestionType.numeric,
                    title: 'Number of iterations per time step',
                },
                {
                    key: 'RESTART_ITER',
                    type: QuestionType.numeric,
                    visibleWhen: { '==': [{ var: 'RESTART_SOL' }, 'YES'] },
                    title: 'Iteration from which to restart the problem',
                },
            ],
        },
    ],
};
