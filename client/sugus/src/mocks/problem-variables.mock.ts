import { QuestionType } from '../interfaces/question';

export const PROBLEM_VARIABLES = {
    name: 'problem-variables',
    title: 'Problem variables',
    groups: [
        {
            key: 'COMPRESSIBLE_FREE-STREAM_DEFINITION',
            title: 'COMPRESSIBLE_FREE-STREAM_DEFINITION',
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
                },
                {
                    key: 'SIDESLIP_ANGLE',
                    type: QuestionType.numeric,
                    title: 'SIDESLIP_ANGLE',
                },
                {
                    key: 'FREESTREAM_PRESSURE',
                    type: QuestionType.numeric,
                    title: 'FREESTREAM_PRESSURE',
                },
                {
                    key: 'FREESTREAM_TEMPERATURE',
                    type: QuestionType.numeric,
                    title: 'Free-stream temperature (273.15 K by default)',
                    default: 273.15,
                },
                {
                    key: 'REYNOLDS_NUMBER',
                    type: QuestionType.numeric,
                    title: 'REYNOLDS_NUMBER',
                },
                {
                    key: 'REYNOLDS_LENGTH',
                    type: QuestionType.numeric,
                    title: 'REYNOLDS_LENGTH',
                },
            ],
        },
        {
            key: 'INCOMPRESSIBLE_FLOW_CONDITIONS',
            title: 'INCOMPRESSIBLE_FLOW_CONDITIONS',
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
                    title: 'INC_DENSITY_INIT',
                },
                {
                    key: 'INC_VELOCITY_INIT',
                    type: QuestionType.text,
                    title: 'INC_VELOCITY_INIT',
                },
            ],
        },
        {
            key: 'VISCOSITY',
            title: 'VISCOSITY',
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
                    type: QuestionType.numeric,
                    title: 'VISCOSITY_MODEL',
                },
                {
                    key: 'MU_CONSTANT',
                    type: QuestionType.text,
                    title: 'MU_CONSTANT',
                },
            ],
        },
        {
            key: 'REFERENCE_VALUE_DEFINITION',
            title: 'REFERENCE_VALUE_DEFINITION',
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
                    title: 'REF_ORIGIN_MOMENT_X',
                    default: 0.25,
                },
                {
                    key: 'REF_ORIGIN_MOMENT_Y',
                    type: QuestionType.numeric,
                    title: 'REF_ORIGIN_MOMENT_Y',
                    default: 0,
                },
                {
                    key: 'REF_ORIGIN_MOMENT_Z',
                    type: QuestionType.numeric,
                    title: 'REF_ORIGIN_MOMENT_Z',
                    default: 0,
                },
                {
                    key: 'REF_LENGTH',
                    type: QuestionType.numeric,
                    title: 'REF_LENGTH',
                },
                {
                    key: 'REF_AREA',
                    type: QuestionType.numeric,
                    title: 'REF_AREA',
                },
            ],
        },
        {
            key: 'STRUCTURAL_PROPERTIES',
            title: 'STRUCTURAL_PROPERTIES',
            type: QuestionType.group,
            visibleWhen: { '==': [{ var: 'SOLVER' }, 'ELASTICITY'] },
            children: [
                {
                    key: 'MATERIAL_MODEL',
                    type: QuestionType.text,
                    title: 'MATERIAL_MODEL',
                },
                {
                    key: 'ELASTICITY_MODULUS',
                    type: QuestionType.numeric,
                    title: 'ELASTICITY_MODULUS',
                },
                {
                    key: 'POISSON_RATIO',
                    type: QuestionType.numeric,
                    title: 'POISSON_RATIO',
                },
            ],
        },
    ],
};
