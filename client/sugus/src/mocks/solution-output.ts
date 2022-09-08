import { QuestionType } from '../interfaces/question';
import { QuestionFamily } from '../interfaces/question-family';

export const SOLUTION_OUTPUT: QuestionFamily = {
    name: 'solution-output',
    title: 'Solution output',
    groups: [
        {
            key: 'output-files',
            title: 'Output files',
            type: QuestionType.group,
            children: [
                {
                    key: 'OUTPUT_FILES',
                    type: QuestionType.checkboxes,
                    title: 'ITEM',
                    options: [
                        { label: 'Restart', value: 'RESTART' },
                        { label: 'Paraview', value: 'PARAVIEW' },
                        { label: 'History', value: 'CSV' },
                        { label: 'Screen', value: 'SCREEN' },
                        { label: 'Solution', value: 'SOLUTION' },
                        { label: 'Volume', value: 'VOLUME' },
                        { label: 'Surface', value: 'SURFACE' },
                    ],
                    minSelected: 1,
                },
                {
                    key: 'OUTPUT_WRT_FREQ',
                    type: QuestionType.numeric,
                    title: 'Output frequency for files',
                },
            ],
        },

        {
            key: 'marker-output',
            title: 'Marker output',
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
                    key: 'MARKER_PLOTTING',
                    type: QuestionType.text,
                    title: 'Markers to be plotted',
                    description: 'Sample: ( body ) | Corresponds to ( marker )',
                },
                {
                    key: 'MARKER_MONITORING',
                    type: QuestionType.text,
                    title: 'Markers to be monitored',
                    description: 'Sample: ( body ) | Corresponds to ( marker )',
                },
            ],
        },
        {
            key: 'history-output',
            title: 'History output',
            type: QuestionType.group,
            visibleWhen: {
                in: ['HISTORY', { var: 'OUTPUT_FILES' }],
            },
            children: [
                {
                    key: 'TABULAR_FORMAT',
                    type: QuestionType.buttonList,
                    title: 'TABULAR_FORMAT',
                    options: [
                        { label: 'TECPLOT', value: 'TECPLOT' },
                        { label: 'CSV', value: 'CSV' },
                    ],
                },
                {
                    key: 'CONV_FILENAME',
                    type: QuestionType.text,
                    title: 'Name of the convergence file',
                    default: 'history',
                },
                {
                    key: 'HISTORY_WRT_FREQ_INNER',
                    type: QuestionType.numeric,
                    title: 'Frequency to write the inner iterations',
                    visibleWhen: { '==': [{ var: 'TIME_DOMAIN' }, 'YES'] },
                },
            ],
        },
        {
            key: 'screen-output',
            title: 'Screen output',
            type: QuestionType.group,
            visibleWhen: {
                in: ['SCREEN', { var: 'OUTPUT_FILES' }],
            },
            children: [
                {
                    key: 'SCREEN_OUTPUT',
                    type: QuestionType.checkboxes,
                    title: 'Screen output',
                    options: [
                        { label: 'Inner iterations', value: 'INNER_ITER' },
                        { label: 'VMS', value: 'VMS' },
                        { label: 'Wall time', value: 'WALL_TIME' },
                        { label: 'RMS Density', value: 'RMS_DENSITY' },
                        { label: 'RMS Energy', value: 'RMS_ENERGY' },
                        { label: 'Lift', value: 'LIFT' },
                        { label: 'Drag', value: 'DRAG' },
                        { label: 'RMS NU TILDE', value: 'RMS_NU_TILDE' },
                        { label: 'RMS Pressure', value: 'RMS_PRESSURE' },
                        { label: 'RMS Ux', value: 'RMS_VELOCITY-X' },
                        { label: 'RMS UTOL', value: 'RMS_UTOL' },
                        { label: 'RMS RTOL', value: 'RMS_RTOL' },
                        { label: 'RMS ETOL', value: 'RMS_ETOL' },
                    ],
                    sortOptions: true,
                },
            ],
        },
        {
            key: 'solution-output',
            title: 'Solution output',
            type: QuestionType.group,
            visibleWhen: {
                in: ['SOLUTION', { var: 'OUTPUT_FILES' }],
            },
            children: [
                {
                    key: 'SCREEN_WRT_FREQ_INNER',
                    type: QuestionType.numeric,
                    title: 'Frequency to write inner iters',
                },
                {
                    key: 'RESTART_FILENAME',
                    type: QuestionType.text,
                    title: 'Name of the restart file',
                },
            ],
        },
        {
            key: 'volume-output',
            title: 'Volume output',
            type: QuestionType.group,
            visibleWhen: {
                in: ['VOLUME', { var: 'OUTPUT_FILES' }],
            },
            children: [
                {
                    key: 'VOLUME_FILENAME',
                    type: QuestionType.text,
                    title: 'Name of the volume file',
                },
            ],
        },
        {
            key: 'surface-output',
            title: 'Surface output',
            type: QuestionType.group,
            visibleWhen: {
                in: ['SURFACE', { var: 'OUTPUT_FILES' }],
            },
            children: [
                {
                    key: 'SURFACE_FILENAME',
                    type: QuestionType.text,
                    title: 'Name of the surface file',
                },
            ],
        },
    ],
};
