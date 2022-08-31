import { QuestionType } from '../interfaces/question';
import { QuestionFamily } from '../interfaces/question-family';

export const BOUNDARY_CONDITIONS: QuestionFamily = {
    name: 'boundary-conditions',
    title: 'Boundary conditions',
    groups: [
        {
            key: 'boundary-conditions-selection-group',
            type: QuestionType.group,
            children: [
                {
                    key: 'boundary-conditions-selection',
                    title: 'boundary-conditions-selection',
                    internal: true,
                    type: QuestionType.checkboxes,
                    options: [
                        {
                            label: 'MARKER_HEATFLUX',
                            value: 'MARKER_HEATFLUX',
                            visibleWhen: {
                                or: [
                                    { '==': [{ var: 'SOLVER' }, 'RANS'] },
                                    { '==': [{ var: 'SOLVER' }, 'INC_RANS'] },
                                ],
                            },
                        },

                        {
                            label: 'INC_INLET_TYPE',
                            value: 'INC_INLET_TYPE',
                            visibleWhen: {
                                or: [
                                    { '==': [{ var: 'SOLVER' }, 'INC_EULER'] },
                                    { '==': [{ var: 'SOLVER' }, 'INC_RANS'] },
                                ],
                            },
                        },
                        {
                            label: 'INC_INLET_DAMPING',
                            value: 'INC_INLET_DAMPING',
                            visibleWhen: {
                                or: [
                                    { '==': [{ var: 'SOLVER' }, 'INC_EULER'] },
                                    { '==': [{ var: 'SOLVER' }, 'INC_RANS'] },
                                ],
                            },
                        },
                        {
                            label: 'INC_OUTLET_TYPE',
                            value: 'INC_OUTLET_TYPE',
                            visibleWhen: {
                                or: [
                                    { '==': [{ var: 'SOLVER' }, 'INC_EULER'] },
                                    { '==': [{ var: 'SOLVER' }, 'INC_RANS'] },
                                ],
                            },
                        },
                        {
                            label: 'INC_OUTLET_DAMPING',
                            value: 'INC_OUTLET_DAMPING',
                            visibleWhen: {
                                or: [
                                    { '==': [{ var: 'SOLVER' }, 'INC_EULER'] },
                                    { '==': [{ var: 'SOLVER' }, 'INC_RANS'] },
                                ],
                            },
                        },

                        {
                            label: 'MARKER_FAR',
                            value: 'MARKER_FAR',
                            visibleWhen: {
                                or: [
                                    { '==': [{ var: 'SOLVER' }, 'EULER'] },
                                    { '==': [{ var: 'SOLVER' }, 'RANS'] },
                                ],
                            },
                        },

                        {
                            label: 'INLET_TYPE',
                            value: 'INLET_TYPE',
                            visibleWhen: {
                                or: [
                                    { '==': [{ var: 'SOLVER' }, 'EULER'] },
                                    { '==': [{ var: 'SOLVER' }, 'RANS'] },
                                    { '==': [{ var: 'SOLVER' }, 'INC_EULER'] },
                                    { '==': [{ var: 'SOLVER' }, 'INC_RANS'] },
                                ],
                            },
                        },
                        {
                            label: 'MARKER_INLET',
                            value: 'MARKER_INLET',
                            visibleWhen: {
                                or: [
                                    { '==': [{ var: 'SOLVER' }, 'EULER'] },
                                    { '==': [{ var: 'SOLVER' }, 'RANS'] },
                                    { '==': [{ var: 'SOLVER' }, 'INC_EULER'] },
                                    { '==': [{ var: 'SOLVER' }, 'INC_RANS'] },
                                ],
                            },
                        },
                        {
                            label: 'MARKER_OUTLET',
                            value: 'MARKER_OUTLET',
                            visibleWhen: {
                                or: [
                                    { '==': [{ var: 'SOLVER' }, 'EULER'] },
                                    { '==': [{ var: 'SOLVER' }, 'RANS'] },
                                    { '==': [{ var: 'SOLVER' }, 'INC_EULER'] },
                                    { '==': [{ var: 'SOLVER' }, 'INC_RANS'] },
                                ],
                            },
                        },
                        {
                            label: 'MARKER_SYM',
                            value: 'MARKER_SYM',
                            visibleWhen: {
                                or: [
                                    { '==': [{ var: 'SOLVER' }, 'EULER'] },
                                    { '==': [{ var: 'SOLVER' }, 'RANS'] },
                                    { '==': [{ var: 'SOLVER' }, 'INC_EULER'] },
                                    { '==': [{ var: 'SOLVER' }, 'INC_RANS'] },
                                ],
                            },
                        },
                        {
                            label: 'MARKER_EULER',
                            value: 'MARKER_EULER',
                            visibleWhen: {
                                or: [
                                    { '==': [{ var: 'SOLVER' }, 'EULER'] },
                                    { '==': [{ var: 'SOLVER' }, 'RANS'] },
                                    { '==': [{ var: 'SOLVER' }, 'INC_EULER'] },
                                    { '==': [{ var: 'SOLVER' }, 'INC_RANS'] },
                                ],
                            },
                        },

                        {
                            label: 'MARKER_CLAMPED',
                            value: 'MARKER_CLAMPED',
                            visibleWhen: {
                                or: [{ '==': [{ var: 'SOLVER' }, 'ELASTICITY'] }],
                            },
                        },
                        {
                            label: 'MARKER_PRESSURE',
                            value: 'MARKER_PRESSURE',
                            visibleWhen: {
                                or: [{ '==': [{ var: 'SOLVER' }, 'ELASTICITY'] }],
                            },
                        },
                        {
                            label: 'MARKER_LOAD',
                            value: 'MARKER_LOAD',
                            visibleWhen: {
                                or: [{ '==': [{ var: 'SOLVER' }, 'ELASTICITY'] }],
                            },
                        },
                    ],
                    minSelected: 1,
                },
            ],
        },

        {
            key: 'boundary-conditions-group-1',
            title: 'boundary-conditions-group-1',
            type: QuestionType.group,
            visibleWhen: {
                or: [{ in: ['MARKER_HEATFLUX', { var: 'boundary-conditions-selection' }] }],
            },
            children: [
                {
                    key: 'MARKER_HEATFLUX',
                    type: QuestionType.text,
                    title: 'MARKER_HEATFLUX',
                },
            ],
        },
        {
            key: 'boundary-conditions-group-2',
            title: 'boundary-conditions-group-2',
            type: QuestionType.group,
            visibleWhen: {
                or: [
                    { in: ['INC_INLET_TYPE', { var: 'boundary-conditions-selection' }] },
                    { in: ['INC_INLET_DAMPING', { var: 'boundary-conditions-selection' }] },
                    { in: ['INC_OUTLET_TYPE', { var: 'boundary-conditions-selection' }] },
                    { in: ['INC_OUTLET_DAMPING', { var: 'boundary-conditions-selection' }] },
                ],
            },
            children: [
                {
                    key: 'INC_INLET_TYPE',
                    type: QuestionType.numeric,
                    title: 'INC_INLET_TYPE',
                    visibleWhen: {
                        or: [{ in: ['INC_INLET_TYPE', { var: 'boundary-conditions-selection' }] }],
                    },
                },
                {
                    key: 'INC_INLET_DAMPING',
                    type: QuestionType.numeric,
                    title: 'INC_INLET_DAMPING',
                    visibleWhen: {
                        or: [
                            {
                                in: ['INC_INLET_DAMPING', { var: 'boundary-conditions-selection' }],
                            },
                        ],
                    },
                },
                {
                    key: 'INC_OUTLET_TYPE',
                    type: QuestionType.numeric,
                    title: 'INC_OUTLET_TYPE',
                    visibleWhen: {
                        or: [{ in: ['INC_OUTLET_TYPE', { var: 'boundary-conditions-selection' }] }],
                    },
                },
                {
                    key: 'INC_OUTLET_DAMPING',
                    type: QuestionType.numeric,
                    title: 'INC_OUTLET_DAMPING',
                    visibleWhen: {
                        or: [
                            {
                                in: [
                                    'INC_OUTLET_DAMPING',
                                    { var: 'boundary-conditions-selection' },
                                ],
                            },
                        ],
                    },
                },
            ],
        },
        {
            key: 'boundary-conditions-group-3',
            title: 'boundary-conditions-group-3',
            type: QuestionType.group,
            visibleWhen: {
                or: [{ in: ['MARKER_FAR', { var: 'boundary-conditions-selection' }] }],
            },
            children: [
                {
                    key: 'MARKER_FAR',
                    type: QuestionType.text,
                    title: 'MARKER_FAR',
                },
            ],
        },

        {
            key: 'boundary-conditions-group-4',
            title: 'boundary-conditions-group-4',
            type: QuestionType.group,
            visibleWhen: {
                or: [
                    { in: ['INLET_TYPE', { var: 'boundary-conditions-selection' }] },
                    { in: ['MARKER_INLET', { var: 'boundary-conditions-selection' }] },
                    { in: ['MARKER_OUTLET', { var: 'boundary-conditions-selection' }] },
                    { in: ['MARKER_SYM', { var: 'boundary-conditions-selection' }] },
                    { in: ['MARKER_EULER', { var: 'boundary-conditions-selection' }] },
                ],
            },
            children: [
                {
                    key: 'INLET_TYPE',
                    type: QuestionType.text,
                    title: 'INLET_TYPE',
                    visibleWhen: {
                        or: [{ in: ['INLET_TYPE', { var: 'boundary-conditions-selection' }] }],
                    },
                },
                {
                    key: 'MARKER_INLET',
                    type: QuestionType.text,
                    title: 'MARKER_INLET',
                    visibleWhen: {
                        or: [{ in: ['MARKER_INLET', { var: 'boundary-conditions-selection' }] }],
                    },
                },
                {
                    key: 'MARKER_OUTLET',
                    type: QuestionType.text,
                    title: 'MARKER_OUTLET',
                    visibleWhen: {
                        or: [{ in: ['MARKER_OUTLET', { var: 'boundary-conditions-selection' }] }],
                    },
                },
                {
                    key: 'MARKER_SYM',
                    type: QuestionType.text,
                    title: 'MARKER_SYM',
                    visibleWhen: {
                        or: [{ in: ['MARKER_SYM', { var: 'boundary-conditions-selection' }] }],
                    },
                },
                {
                    key: 'MARKER_EULER',
                    type: QuestionType.text,
                    title: 'MARKER_EULER',
                    visibleWhen: {
                        or: [{ in: ['MARKER_EULER', { var: 'boundary-conditions-selection' }] }],
                    },
                },
            ],
        },
        {
            key: 'boundary-conditions-group-5',
            title: 'boundary-conditions-group-5',
            type: QuestionType.group,
            visibleWhen: {
                or: [
                    { in: ['MARKER_CLAMPED', { var: 'boundary-conditions-selection' }] },
                    { in: ['MARKER_PRESSURE', { var: 'boundary-conditions-selection' }] },
                    { in: ['MARKER_LOAD', { var: 'boundary-conditions-selection' }] },
                ],
            },
            children: [
                {
                    key: 'MARKER_CLAMPED',
                    type: QuestionType.text,
                    title: 'MARKER_CLAMPED',
                    visibleWhen: {
                        or: [{ in: ['MARKER_CLAMPED', { var: 'boundary-conditions-selection' }] }],
                    },
                },
                {
                    key: 'MARKER_PRESSURE',
                    type: QuestionType.text,
                    title: 'MARKER_PRESSURE',
                    visibleWhen: {
                        or: [{ in: ['MARKER_PRESSURE', { var: 'boundary-conditions-selection' }] }],
                    },
                },
                {
                    key: 'MARKER_LOAD',
                    type: QuestionType.text,
                    title: 'MARKER_LOAD',
                    visibleWhen: {
                        or: [{ in: ['MARKER_LOAD', { var: 'boundary-conditions-selection' }] }],
                    },
                },
            ],
        },
    ],
};
