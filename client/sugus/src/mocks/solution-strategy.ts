import { QuestionType } from '../interfaces/question';
import { QuestionFamily } from '../interfaces/question-family';

export const SOLUTION_STRATEGY: QuestionFamily = {
    name: 'solution-strategy',
    title: 'Solution strategy',
    groups: [
        {
            key: 'flow-numerics',
            title: 'Flow numerics',
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
                    type: QuestionType.buttonList,
                    title: 'Numerical method for spatial gradients',
                    options: [
                        { label: 'Green-Gauss theorem', value: 'GREEN_GAUSS' },
                        { label: 'Unweighted least squares', value: 'LEAST_SQUARES' },
                        {
                            label: 'Inverse-distance weighted least squares',
                            value: 'WEIGHTED_LEAST_SQUARES',
                        },
                    ],
                },
                {
                    key: 'CFL_NUMBER',
                    type: QuestionType.numeric,
                    title: 'CFL Number',
                    default: 15,
                },
                {
                    key: 'CFL_ADAPT',
                    type: QuestionType.buttonList,
                    title: 'Adaptive CFL',
                    options: [
                        { label: 'Yes', value: 'YES' },
                        { label: 'No', value: 'NO' },
                    ],
                },
                {
                    key: 'CFL_ADAPT_PARAM',
                    type: QuestionType.text,
                    title: 'Adaptation parameters',
                    visibleWhen: { '==': [{ var: 'CFL_ADAPT' }, 'YES'] },
                    description: 'Example: ( 0.1, 2.0, 50.0, 1e10 )',
                    default: '( 0.1, 2.0, 50.0, 1e10 )',
                },
                {
                    key: 'MAX_DELTA_TIME',
                    type: QuestionType.text,
                    title: 'Maximum local dt in local time stepping simulations',
                    default: 1e6,
                },
                {
                    key: 'RK_ALPHA_COEFF',
                    type: QuestionType.text,
                    title: 'Runge-Kutta alpha coefficients',
                    description: 'Default: ( 0.66667, 0.66667, 1.000000 )',
                    default: '( 0.66667, 0.66667, 1.000000 )',
                },
            ],
        },
        {
            key: 'slope-limiter-definition',
            title: 'Slope limiter',
            type: QuestionType.group,
            visibleWhen: {
                or: [{ '==': [{ var: 'SOLVER' }, 'EULER'] }, { '==': [{ var: 'SOLVER' }, 'RANS'] }],
            },
            children: [
                {
                    key: 'VENKAT_LIMITER_COEFF',
                    type: QuestionType.numeric,
                    title: "Coefficient for the Venkat's limiter",
                    default: 0.1,
                },
            ],
        },
        {
            key: 'multigrid-strategy',
            title: 'Multi-grid strategy',
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
                    title: 'Multigrid level',
                    default: 0,
                },
            ],
        },

        {
            key: 'with-mglevel',
            title: 'Type of multi-grid',
            type: QuestionType.group,
            visibleWhen: {
                '!==': [{ var: 'MGLEVEL' }, 0],
            },
            children: [
                {
                    key: 'MGCYCLE',
                    type: QuestionType.buttonList,
                    title: 'Multi-grid cycle',
                    options: [
                        { label: 'V cycle', value: 'V_CYCLE' },
                        { label: 'W cycle', value: 'W_CYCLE' },
                        { label: 'FullMG cycle.', value: 'FULLMG_CYCLE' },
                    ],
                },
                {
                    key: 'MG_PRE_SMOOTH',
                    type: QuestionType.text,
                    title: 'Multi-grid pre-smoothing level',
                    default: '( 1, 2, 3, 3 )',
                },
                {
                    key: 'MG_POST_SMOOTH',
                    type: QuestionType.text,
                    title: 'Multi-grid post-smoothing level',
                    default: '( 0, 0, 0, 0 )',
                },
                {
                    key: 'MG_CORRECTION_SMOOTH',
                    type: QuestionType.text,
                    title: 'Multi-grid smoothing correction',
                    default: '( 0, 0, 0, 0 )',
                },
                {
                    key: 'MG_DAMP_RESTRICTION',
                    type: QuestionType.numeric,
                    title: 'Multi-grid damping restriction',
                    default: 0.75,
                },
                {
                    key: 'MG_DAMP_PROLONGATION',
                    type: QuestionType.numeric,
                    title: 'Damping factor for the correction prolongation',
                    default: 0.75,
                },
            ],
        },
        {
            key: 'flow-convection',
            title: 'Convective methods for the flow',
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
                    type: QuestionType.buttonList,
                    title: 'Convective numerical method',
                    options: [
                        { label: 'Jameson-Smith-Turkel centered', value: 'JST' },
                        { label: 'Lax-Friedrich centered', value: 'LAX' },
                        { label: 'JST with matrix dissipation', value: 'JST_MAT' },
                        { label: 'Scalar upwind', value: 'SCALAR_UPWIND' },
                        { label: 'Roe', value: 'ROE' },
                        { label: 'AUSM', value: 'AUSM' },
                    ],
                },
                {
                    key: 'JST_SENSOR_COEFF',
                    type: QuestionType.text,
                    visibleWhen: {
                        '==': [{ var: 'CONV_NUM_METHOD_FLOW' }, 'JST'],
                    },
                    title: '2nd and 4th order artificial dissipation for JST',
                    default: '( 0.5, 0.02 )',
                },
                {
                    key: 'MUSCL_FLOW',
                    type: QuestionType.buttonList,
                    title: 'Monotonic Upwind Scheme for Conservation Laws (MUSCL)',
                    options: [
                        { label: 'YES', value: 'YES' },
                        { label: 'NO', value: 'NO' },
                    ],
                },
                {
                    key: 'SLOPE_LIMITER_FLOW',
                    type: QuestionType.buttonList,
                    title: 'Slope limiter',
                    options: [
                        { label: 'None', value: 'NONE' },
                        { label: 'VENKATAKRISHNAN', value: 'VENKATAKRISHNAN' },
                        { label: 'Van-Albada Edge', value: 'VAN_ALBADA_EDGE' },
                    ],
                },
                {
                    key: 'TIME_DISCRE_FLOW',
                    type: QuestionType.buttonList,
                    title: 'Time discretization',
                    options: [
                        { label: 'Explicit RK', value: 'RUNGE-KUTTA_EXPLICIT' },
                        { label: 'Explicit Euler', value: 'EULER_EXPLICIT' },
                        { label: 'Implicit', value: 'EULER_IMPLICIT' },
                    ],
                },
            ],
        },
        {
            key: 'turbulent-convection',
            title: 'Convective methods for turbulence',
            type: QuestionType.group,
            visibleWhen: {
                or: [
                    { '==': [{ var: 'SOLVER' }, 'RANS'] },
                    { '==': [{ var: 'SOLVER' }, 'INC_RANS'] },
                ],
            },
            children: [
                {
                    key: 'CONV_NUM_METHOD_TURB',
                    type: QuestionType.buttonList,
                    title: 'Convective numerical method',
                    options: [
                        { label: 'Scalar upwind', value: 'SCALAR_UPWIND' },
                        { label: 'Roe', value: 'ROE' },
                    ],
                },
                {
                    key: 'MUSCL_TURB',
                    type: QuestionType.buttonList,
                    title: 'Monotonic Upwind Scheme for Conservation Laws (MUSCL)',
                    options: [
                        { label: 'YES', value: 'YES' },
                        { label: 'NO', value: 'NO' },
                    ],
                },
                {
                    key: 'SLOPE_LIMITER_TURB',
                    type: QuestionType.buttonList,
                    title: 'Slope limiter',
                    options: [
                        { label: 'None', value: 'NONE' },
                        { label: 'VENKATAKRISHNAN', value: 'VENKATAKRISHNAN' },
                        { label: 'Van-Albada Edge', value: 'VAN_ALBADA_EDGE' },
                    ],
                },
                {
                    key: 'TIME_DISCRE_TURB',
                    type: QuestionType.buttonList,
                    title: 'Time discretization',
                    options: [
                        { label: 'Explicit RK', value: 'RUNGE-KUTTA_EXPLICIT' },
                        { label: 'Explicit Euler', value: 'EULER_EXPLICIT' },
                        { label: 'Implicit', value: 'EULER_IMPLICIT' },
                    ],
                },
            ],
        },
        {
            key: 'structural-model',
            title: 'Structural model',
            type: QuestionType.group,
            visibleWhen: { '==': [{ var: 'SOLVER' }, 'ELASTICITY'] },
            children: [
                {
                    key: 'NONLINEAR_FEM_SOLUTION_METHOD',
                    type: QuestionType.buttonList,
                    title: 'Non-linear FEM Method',
                    options: [
                        { label: 'Newton-Raphson', value: 'NEWTON_RAPHSON' },
                        { label: 'Modified Newton-Raphson', value: 'MODIFIED_NEWTON_RAPHSON' },
                    ],
                },
                {
                    key: 'INNER_ITER',
                    type: QuestionType.numeric,
                    title: 'Number of iterations per time step',
                    default: 10,
                },
            ],
        },
    ],
};
