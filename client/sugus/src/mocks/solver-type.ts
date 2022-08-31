import { QuestionType } from '../interfaces/question';
import { QuestionFamily } from '../interfaces/question-family';

export const SOLVER_TYPE: QuestionFamily = {
    name: 'solver-type',
    title: 'Solver type',
    description:
        'Define the kind of problem at hand. Select the equations that govern your problem, include information of additional modelling conditions such as turbulence models, and determine whether the problem is steady or unsteady.',
    groups: [
        {
            key: 'solver-type-group-1',
            title: 'Governing equations',
            type: QuestionType.group,
            description:
                'Choose the governing equations for your problem. For each model, they are the equations that describe the state of the system as a function of the problem parameters.',

            children: [
                {
                    key: 'SOLVER',
                    type: QuestionType.buttonList,
                    title: 'Physical governing equations',
                    description:
                        'Euler and RANS correspond to Fluid Dynamics problems. Incompressible flow conditions can be imposed here. Also, a structural model can be selected.',
                    options: [
                        { label: 'Euler', value: 'EULER' },
                        { label: 'RANS', value: 'RANS' },
                        { label: 'Incompressible Euler', value: 'INC_EULER' },
                        { label: 'Incompressible RANS', value: 'INC_RANS' },
                        { label: 'Solid Elasticity', value: 'ELASTICITY' },
                    ],
                },
                {
                    key: 'KIND_TURB_MODEL',
                    type: QuestionType.buttonList,
                    title: 'Kind of turbulence model',
                    visibleWhen: {
                        or: [
                            { '==': [{ var: 'SOLVER' }, 'RANS'] },
                            { '==': [{ var: 'SOLVER' }, 'INC_RANS'] },
                        ],
                    },
                    options: [
                        { label: 'Spalart-Allmaras (SA)', value: 'SA' },
                        { label: 'Shear-Stress Transport (SST)', value: 'SST' },
                    ],
                },
                {
                    key: 'SA_OPTIONS',
                    type: QuestionType.checkboxes,
                    title: 'Options and corrections for the SA turbulence model',
                    visibleWhen: {
                        or: [{ '==': [{ var: 'KIND_TURB_MODEL' }, 'SA'] }],
                    },
                    options: [
                        { label: 'Default SA', value: 'NONE' },
                        { label: 'Negative SA', value: 'NEG' },
                        { label: 'Edwards version', value: 'EDW' },
                        { label: 'Use FT2 term', value: 'FT2' },
                        { label: 'Quadratic constitutive relation', value: 'QCR2000' },
                        { label: 'Compressibility correction', value: 'COMP' },
                        { label: 'Rotation correction', value: 'ROT' },
                        { label: 'Bas-Cakmakcioclu transition', value: 'BC' },
                        {
                            label: 'Experimental combination according to TMR.',
                            value: 'EXPERIMENTAL',
                        },
                    ],
                    minSelected: 1,
                    default: 'NONE',
                },
                {
                    key: 'GEOMETRIC_CONDITIONS',
                    type: QuestionType.buttonList,
                    title: 'Geometric conditions',
                    visibleWhen: { '==': [{ var: 'SOLVER' }, 'ELASTICITY'] },
                    options: [
                        { label: 'Small deformations', value: 'SMALL_DEFORMATIONS' },
                        { label: 'Large deformations', value: 'LARGE_DEFORMATIONS' },
                    ],
                },
            ],
        },
        {
            key: 'solver-type-group-2',
            title: 'Time-domain problems',
            type: QuestionType.group,
            children: [
                {
                    key: 'TIME_DOMAIN',
                    type: QuestionType.buttonList,
                    title: 'Type of problem',
                    options: [
                        { label: 'Unsteady', value: 'YES' },
                        { label: 'Steady-state', value: 'NO' },
                    ],
                    default: 'NO',
                },
            ],
        },
    ],
};
