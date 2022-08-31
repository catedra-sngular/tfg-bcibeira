import { QuestionType } from '../interfaces/question';

export const PROBLEM_VARIABLES = {
    name: 'problem-variables',
    title: 'Problem variables',
    groups: [
        {
            key: 'COMPRESSIBLE_FREE-STREAM_DEFINITION',
            title: 'Free-Stream Definition for compressible problems',
            type: QuestionType.group,
            visibleWhen: {
                or: [{ '==': [{ var: 'SOLVER' }, 'EULER'] }, { '==': [{ var: 'SOLVER' }, 'RANS'] }],
            },
            children: [
                {
                    key: 'MACH_NUMBER',
                    type: QuestionType.numeric,
                    title: 'Mach number (non-dimensional, based on the free-stream values)',
                },
                {
                    key: 'AOA',
                    type: QuestionType.numeric,
                    title: 'Angle of attack (degrees)',
                    default: 0.0,
                },
                {
                    key: 'SIDESLIP_ANGLE',
                    type: QuestionType.numeric,
                    title: 'Side-slip angle (degrees)',
                    default: 0.0,
                },
                {
                    key: 'FREESTREAM_PRESSURE',
                    type: QuestionType.numeric,
                    title: 'Free-stream pressure (N/m^2)',
                    default: 101325.0,
                },
                {
                    key: 'FREESTREAM_TEMPERATURE',
                    type: QuestionType.numeric,
                    title: 'Free-stream temperature (K)',
                    default: 273.15,
                },
                {
                    key: 'REYNOLDS_NUMBER',
                    type: QuestionType.numeric,
                    title: 'Reynolds number',
                    default: 1e6,
                },
                {
                    key: 'REYNOLDS_LENGTH',
                    type: QuestionType.numeric,
                    title: 'Length for Reynolds number calculation (m)',
                    default: 1.0,
                },
            ],
        },
        {
            key: 'INCOMPRESSIBLE_FLOW_CONDITIONS',
            title: 'Free-Stream Definition for incompressible problems',
            type: QuestionType.group,
            visibleWhen: {
                or: [
                    { '==': [{ var: 'SOLVER' }, 'INC_EULER'] },
                    { '==': [{ var: 'SOLVER' }, 'INC_RANS'] },
                ],
            },
            children: [
                {
                    key: 'INC_DENSITY_INIT',
                    type: QuestionType.numeric,
                    title: 'Initial density (kg/m^3)',
                    default: 1.2886,
                },
                {
                    key: 'INC_VELOCITY_INIT',
                    type: QuestionType.text,
                    title: 'Initial velocity (Ux, Uy, Uz) in m/s',
                    default: '(1.0, 0.0, 0.0)',
                },
            ],
        },
        {
            key: 'VISCOSITY',
            title: 'Viscosity Definition for incompressible problems',
            type: QuestionType.group,
            visibleWhen: {
                or: [
                    { '==': [{ var: 'SOLVER' }, 'INC_EULER'] },
                    { '==': [{ var: 'SOLVER' }, 'INC_RANS'] },
                ],
            },
            children: [
                {
                    key: 'VISCOSITY_MODEL',
                    type: QuestionType.buttonList,
                    title: 'Viscosity model',
                    options: [
                        { label: 'Sutherland', value: 'SUTHERLAND' },
                        { label: 'Constant viscosity', value: 'CONSTANT_VISCOSITY' },
                    ],
                },
                {
                    key: 'MU_CONSTANT',
                    type: QuestionType.text,
                    visibleWhen: {
                        or: [{ '==': [{ var: 'VISCOSITY_MODEL' }, 'CONSTANT_VISCOSITY'] }],
                    },
                    title: 'Constant viscosity',
                    default: 1.716e-5,
                },
                {
                    key: 'MU_REF',
                    type: QuestionType.text,
                    visibleWhen: {
                        or: [{ '==': [{ var: 'VISCOSITY_MODEL' }, 'SUTHERLAND'] }],
                    },
                    title: 'Reference viscosity for Sutherland model',
                    default: 1.716e-5,
                },
                {
                    key: 'MU_T_REF',
                    type: QuestionType.text,
                    visibleWhen: {
                        or: [{ '==': [{ var: 'VISCOSITY_MODEL' }, 'SUTHERLAND'] }],
                    },
                    title: 'Reference temperature for Sutherland model',
                    default: 273.15,
                },
                {
                    key: 'SUTHERLAND_CONSTANT',
                    type: QuestionType.text,
                    visibleWhen: {
                        or: [{ '==': [{ var: 'VISCOSITY_MODEL' }, 'SUTHERLAND'] }],
                    },
                    title: 'Sutherland constant (default for air)',
                    default: 110.4,
                },
            ],
        },
        {
            key: 'REFERENCE_VALUE_DEFINITION',
            title: 'Reference value',
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
                    key: 'REF_ORIGIN_MOMENT_X',
                    type: QuestionType.numeric,
                    title: 'X Reference origin for moment computation',
                    default: 0.25,
                },
                {
                    key: 'REF_ORIGIN_MOMENT_Y',
                    type: QuestionType.numeric,
                    title: 'Y Reference origin for moment computation',
                    default: 0,
                },
                {
                    key: 'REF_ORIGIN_MOMENT_Z',
                    type: QuestionType.numeric,
                    title: 'Z Reference origin for moment computation',
                    default: 0,
                },
                {
                    key: 'REF_LENGTH',
                    type: QuestionType.numeric,
                    title: 'Reference length for pitching, rolling, and yawing non-dimensional moment',
                    default: 1.0,
                },
                {
                    key: 'REF_AREA',
                    type: QuestionType.numeric,
                    title: 'Reference area for force coefficients',
                    description: '0 implies automatic calculation',
                    default: 1.0,
                },
            ],
        },
        {
            key: 'STRUCTURAL_PROPERTIES',
            title: 'Structural properties and material model',
            type: QuestionType.group,
            visibleWhen: { '==': [{ var: 'SOLVER' }, 'ELASTICITY'] },
            children: [
                {
                    key: 'MATERIAL_MODEL',
                    type: QuestionType.buttonList,
                    title: 'Material Model',
                    visibleWhen: { '==': [{ var: 'GEOMETRIC_CONDITIONS' }, 'LARGE_DEFORMATIONS'] },
                    options: [
                        { label: 'Linear elastic', value: 'LINEAR_ELASTIC' },
                        { label: 'Neo-Hookean', value: 'NEO_HOOKEAN' },
                    ],
                },
                {
                    key: 'ELASTICITY_MODULUS',
                    type: QuestionType.numeric,
                    title: 'Elasticity Modulus E (Pa)',
                },
                {
                    key: 'POISSON_RATIO',
                    type: QuestionType.numeric,
                    title: 'Poisson ratio',
                    default: 0.3,
                },
            ],
        },
    ],
};
