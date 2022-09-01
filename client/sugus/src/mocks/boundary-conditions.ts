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
                    title: 'Choose the boundary conditions',
                    description:
                        'The boundary conditions and options available are those that can be applied for the solver you have selected',
                    internal: true,
                    type: QuestionType.checkboxes,
                    options: [
                        {
                            label: 'No-slip wall',
                            value: 'MARKER_HEATFLUX',
                            visibleWhen: {
                                or: [
                                    { '==': [{ var: 'SOLVER' }, 'RANS'] },
                                    { '==': [{ var: 'SOLVER' }, 'INC_RANS'] },
                                ],
                            },
                        },

                        {
                            label: 'Inlet type',
                            value: 'INC_INLET_TYPE',
                            visibleWhen: {
                                or: [
                                    { '==': [{ var: 'SOLVER' }, 'INC_EULER'] },
                                    { '==': [{ var: 'SOLVER' }, 'INC_RANS'] },
                                ],
                            },
                        },
                        {
                            label: 'Inlet damping',
                            value: 'INC_INLET_DAMPING',
                            visibleWhen: {
                                or: [
                                    { '==': [{ var: 'SOLVER' }, 'INC_EULER'] },
                                    { '==': [{ var: 'SOLVER' }, 'INC_RANS'] },
                                ],
                            },
                        },
                        {
                            label: 'Outlet type',
                            value: 'INC_OUTLET_TYPE',
                            visibleWhen: {
                                or: [
                                    { '==': [{ var: 'SOLVER' }, 'INC_EULER'] },
                                    { '==': [{ var: 'SOLVER' }, 'INC_RANS'] },
                                ],
                            },
                        },
                        {
                            label: 'Outlet damping',
                            value: 'INC_OUTLET_DAMPING',
                            visibleWhen: {
                                or: [
                                    { '==': [{ var: 'SOLVER' }, 'INC_EULER'] },
                                    { '==': [{ var: 'SOLVER' }, 'INC_RANS'] },
                                ],
                            },
                        },

                        {
                            label: 'Farfield',
                            value: 'MARKER_FAR',
                            visibleWhen: {
                                or: [
                                    { '==': [{ var: 'SOLVER' }, 'EULER'] },
                                    { '==': [{ var: 'SOLVER' }, 'RANS'] },
                                ],
                            },
                        },

                        {
                            label: 'Inlet type',
                            value: 'INLET_TYPE',
                            visibleWhen: {
                                or: [
                                    { '==': [{ var: 'SOLVER' }, 'EULER'] },
                                    { '==': [{ var: 'SOLVER' }, 'RANS'] },
                                ],
                            },
                        },
                        {
                            label: 'Inlet',
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
                            label: 'Outlet',
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
                            label: 'Symmetry',
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
                            label: 'Slip wall',
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
                            label: 'Clamped',
                            value: 'MARKER_CLAMPED',
                            visibleWhen: {
                                or: [{ '==': [{ var: 'SOLVER' }, 'ELASTICITY'] }],
                            },
                        },
                        {
                            label: 'Normal pressure',
                            value: 'MARKER_PRESSURE',
                            visibleWhen: {
                                or: [{ '==': [{ var: 'SOLVER' }, 'ELASTICITY'] }],
                            },
                        },
                        {
                            label: 'Directional load',
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
                    title: 'Heatflux boundary',
                    description: 'Sample: ( wall, 0.0 ) | Corresponds to ( marker, heatflux value)',
                },
            ],
        },
        {
            key: 'boundary-conditions-group-2',
            title: 'Farfield boundaries',
            type: QuestionType.group,
            visibleWhen: {
                or: [{ in: ['MARKER_FAR', { var: 'boundary-conditions-selection' }] }],
            },
            children: [
                {
                    key: 'MARKER_FAR',
                    type: QuestionType.text,
                    title: 'Farfield marker',
                    description: 'Sample: ( farfield ) | Corresponds to ( marker )',
                },
            ],
        },
        {
            key: 'boundary-conditions-group-3',
            title: 'Incompressible inlet definition',
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
                    type: QuestionType.buttonList,
                    title: 'Inlet type',
                    visibleWhen: {
                        or: [{ in: ['INC_INLET_TYPE', { var: 'boundary-conditions-selection' }] }],
                    },
                    options: [
                        { label: 'Velocity inlet', value: 'VELOCITY_INLET' },
                        { label: 'Total pressure inlet', value: 'PRESSURE_INLET' },
                    ],
                },
                {
                    key: 'INC_INLET_DAMPING',
                    type: QuestionType.numeric,
                    title: 'Inlet damping',
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
                    type: QuestionType.buttonList,
                    title: 'Outlet type',
                    visibleWhen: {
                        or: [{ in: ['INC_OUTLET_TYPE', { var: 'boundary-conditions-selection' }] }],
                    },
                    options: [
                        { label: 'Gauge pressure', value: 'PRESSURE_OUTLET' },
                        { label: 'Mass flow', value: 'MASS_FLOW_OUTLET' },
                    ],
                },
                {
                    key: 'INC_OUTLET_DAMPING',
                    type: QuestionType.numeric,
                    title: 'Outlet damping',
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
                {
                    key: 'INLET_TYPE',
                    type: QuestionType.buttonList,
                    title: 'Inlet type',
                    visibleWhen: {
                        or: [{ in: ['INLET_TYPE', { var: 'boundary-conditions-selection' }] }],
                    },
                    options: [
                        { label: 'Gauge pressure', value: 'TOTAL_CONDITIONS' },
                        { label: 'Mass flow', value: 'MASS_FLOW' },
                        { label: 'User input file', value: 'INPUT_FILE' },
                    ],
                },
            ],
        },

        {
            key: 'boundary-conditions-group-4',
            title: 'Inlet boundary conditions',
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
                    key: 'MARKER_INLET',
                    type: QuestionType.text,
                    title: 'Inlet marker list',
                    description:
                        'Sample: ( inlet, 288.6, 102010.0, 1.0, 0.0, 0.0 ) | Corresponds to ( marker, temperature, pressure, ux, uy, uz )',
                    visibleWhen: {
                        or: [{ in: ['MARKER_INLET', { var: 'boundary-conditions-selection' }] }],
                    },
                },
                {
                    key: 'MARKER_OUTLET',
                    type: QuestionType.text,
                    title: 'Outlet marker list',
                    description:
                        'Sample: ( outlet, 101300.0 ) | Corresponds to ( marker, outlet pressure )',
                    visibleWhen: {
                        or: [{ in: ['MARKER_OUTLET', { var: 'boundary-conditions-selection' }] }],
                    },
                },
                {
                    key: 'MARKER_SYM',
                    type: QuestionType.text,
                    title: 'Symmetry marker list',
                    description: 'Sample: ( symmetry ) | Corresponds to ( marker )',
                    visibleWhen: {
                        or: [{ in: ['MARKER_SYM', { var: 'boundary-conditions-selection' }] }],
                    },
                },
                {
                    key: 'MARKER_EULER',
                    type: QuestionType.text,
                    title: 'No-slip boundary list',
                    description: 'Sample: ( euler ) | Corresponds to ( marker )',
                    visibleWhen: {
                        or: [{ in: ['MARKER_EULER', { var: 'boundary-conditions-selection' }] }],
                    },
                },
            ],
        },
        {
            key: 'boundary-conditions-group-5',
            title: 'Structural boundary conditions',
            description: 'Note that all markers must have a boundary condition',
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
                    title: 'Clamped marker list',
                    description: 'Sample: ( clamped ) | Corresponds to ( marker )',
                    visibleWhen: {
                        or: [{ in: ['MARKER_CLAMPED', { var: 'boundary-conditions-selection' }] }],
                    },
                },
                {
                    key: 'MARKER_PRESSURE',
                    type: QuestionType.text,
                    title: 'Normal pressure marker list',
                    description: 'Sample: ( left, 1E3 ) | Corresponds to ( marker, pressure )',
                    visibleWhen: {
                        or: [{ in: ['MARKER_PRESSURE', { var: 'boundary-conditions-selection' }] }],
                    },
                },
                {
                    key: 'MARKER_LOAD',
                    type: QuestionType.text,
                    title: 'Directional load marker list',
                    description:
                        'Sample: ( right, 1.0, 1000, 1, 0, 0) | Corresponds to ( marker, multiplier, load, Px, Py, Pz )',
                    visibleWhen: {
                        or: [{ in: ['MARKER_LOAD', { var: 'boundary-conditions-selection' }] }],
                    },
                },
            ],
        },
    ],
};
