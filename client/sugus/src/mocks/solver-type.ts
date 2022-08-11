import { QuestionType } from '../interfaces/question';
import { QuestionFamily } from '../interfaces/question-family';

export const SOLVER_TYPE: QuestionFamily = {
    name: 'solver-type',
    title: 'Solver type',
    description:
        'Family description. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque laoreet eros elit, in placerat risus suscipit in. Proin vehicula laoreet justo. Cras dapibus lacus elit, at scelerisque urna maximus id. Nullam auctor, quam sit amet blandit finibus, sem dolor hendrerit est, non eleifend nisi mauris in neque. Mauris sit amet dui sit amet mauris sollicitudin tempus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam dapibus eu eros non volutpat. Integer vel feugiat tortor. Nullam vel metus blandit, ornare velit at, condimentum sem. Praesent consectetur ultricies orci in pulvinar.',
    groups: [
        {
            key: 'solver-type-group-1',
            title: 'solver-type-group-1',
            type: QuestionType.group,
            description:
                'Group description. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque laoreet eros elit, in placerat risus suscipit in. Proin vehicula laoreet justo. Cras dapibus lacus elit, at scelerisque urna maximus id. Nullam auctor, quam sit amet blandit finibus, sem dolor hendrerit est, non eleifend nisi mauris in neque. Mauris sit amet dui sit amet mauris sollicitudin tempus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam dapibus eu eros non volutpat. Integer vel feugiat tortor. Nullam vel metus blandit, ornare velit at, condimentum sem. Praesent consectetur ultricies orci in pulvinar.',

            children: [
                {
                    key: 'SOLVER',
                    type: QuestionType.buttonList,
                    title: 'Physical governing equations',
                    description:
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque laoreet eros elit, in placerat risus suscipit in. Proin vehicula laoreet justo. Cras dapibus lacus elit, at scelerisque urna maximus id. Nullam auctor, quam sit amet blandit finibus, sem dolor hendrerit est, non eleifend nisi mauris in neque. Mauris sit amet dui sit amet mauris sollicitudin tempus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam dapibus eu eros non volutpat. Integer vel feugiat tortor. Nullam vel metus blandit, ornare velit at, condimentum sem. Praesent consectetur ultricies orci in pulvinar.',
                    options: [
                        { label: 'EULER', value: 'EULER' },
                        { label: 'RANS', value: 'RANS' },
                        { label: 'INC_EULER', value: 'INC_EULER' },
                        { label: 'INC_RANS', value: 'INC_RANS' },
                        { label: 'ELASTICITY', value: 'ELASTICITY' },
                    ],
                },
            ],
        },
        {
            key: 'solver-type-group-2',
            title: 'solver-type-group-2',
            type: QuestionType.group,
            children: [
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
                        { label: 'NONE', value: 'NONE' },
                        { label: 'SA', value: 'SA' },
                    ],
                },
                {
                    key: 'GEOMETRIC_CONDITIONS',
                    type: QuestionType.buttonList,
                    title: 'Geometric conditions',
                    visibleWhen: { '==': [{ var: 'SOLVER' }, 'ELASTICITY'] },
                    options: [{ label: 'LARGE_DEFORMATIONS', value: 'LARGE_DEFORMATIONS' }],
                },
                {
                    key: 'TIME_DOMAIN',
                    type: QuestionType.buttonList,
                    title: 'Time domain',
                    options: [
                        { label: 'YES', value: 'YES' },
                        { label: 'NO', value: 'NO' },
                    ],
                },
            ],
        },
    ],
};
