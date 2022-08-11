import { QuestionType } from '../interfaces/question';
import { QuestionFamily } from '../interfaces/question-family';

export const SOLUTION_OUTPUT: QuestionFamily = {
    name: 'solution-output',
    title: 'Solution output',
    groups: [
        {
            key: 'output-files',
            title: 'output-files',
            type: QuestionType.group,
            children: [
                {
                    key: 'OUTPUT_FILES',
                    type: QuestionType.checkboxes,
                    title: 'ITEM',
                    options: [
                        { label: 'RESTART', value: 'RESTART' },
                        { label: 'PARAVIEW', value: 'PARAVIEW' },
                        { label: 'HISTORY', value: 'HISTORY' },
                        { label: 'SCREEN', value: 'SCREEN' },
                        { label: 'SOLUTION', value: 'SOLUTION' },
                        { label: 'VOLUME', value: 'VOLUME' },
                        { label: 'SURFACE', value: 'SURFACE' },
                    ],
                    minSelected: 1,
                },
                {
                    key: 'OUTPUT_WRT_FREQ',
                    type: QuestionType.numeric,
                    title: 'OUTPUT_WRT_FREQ',
                },
            ],
        },

        {
            key: 'marker-output',
            title: 'marker-output',
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
                    title: 'MARKER_PLOTTING',
                },
                {
                    key: 'MARKER_MONITORING',
                    type: QuestionType.text,
                    title: 'MARKER_MONITORING',
                },
            ],
        },
        {
            key: 'history-output',
            title: 'history-output',
            type: QuestionType.group,
            visibleWhen: {
                in: ['HISTORY', { var: 'OUTPUT_FILES' }],
            },
            children: [
                {
                    key: 'TABULAR_FORMAT',
                    type: QuestionType.text,
                    title: 'TABULAR_FORMAT',
                },
                {
                    key: 'CONV_FILENAME',
                    type: QuestionType.text,
                    title: 'CONV_FILENAME',
                },
                {
                    key: 'HISTORY_WRT_FREQ_INNER',
                    type: QuestionType.text,
                    title: 'HISTORY_WRT_FREQ_INNER',
                    visibleWhen: { '==': [{ var: 'TIME_DOMAIN' }, 'YES'] },
                },
            ],
        },
        {
            key: 'screen-output',
            title: 'screen-output',
            type: QuestionType.group,
            visibleWhen: {
                in: ['SCREEN', { var: 'OUTPUT_FILES' }],
            },
            children: [
                {
                    key: 'SCREEN_OUTPUT',
                    type: QuestionType.checkboxes,
                    title: 'SCREEN_OUTPUT',
                    options: [
                        { label: 'INNER_ITER', value: 'INNER_ITER' },
                        { label: 'RMS_UTOL', value: 'RMS_UTOL' },
                        { label: 'RMS_RTOL', value: 'RMS_RTOL' },
                        { label: 'RMS_ETOL', value: 'RMS_ETOL' },
                        { label: 'VMS', value: 'VMS' },
                        { label: 'WALL_TIME', value: 'WALL_TIME' },
                        { label: 'RMS_DENSITY', value: 'RMS_DENSITY' },
                        { label: 'RMS_ENERGY', value: 'RMS_ENERGY' },
                        { label: 'LIFT', value: 'LIFT' },
                        { label: 'DRAG', value: 'DRAG' },
                        { label: 'RMS_NU_TILDE', value: 'RMS_NU_TILDE' },
                        { label: 'RMS_PRESSURE', value: 'RMS_PRESSURE' },
                        { label: 'RMS_VELOCITY-X', value: 'RMS_VELOCITY-X' },
                    ],
                    sortOptions: true,
                },
            ],
        },
        {
            key: 'solution-output',
            title: 'solution-output',
            type: QuestionType.group,
            visibleWhen: {
                in: ['SOLUTION', { var: 'OUTPUT_FILES' }],
            },
            children: [
                {
                    key: 'SCREEN_WRT_FREQ_INNER',
                    type: QuestionType.numeric,
                    title: 'SCREEN_WRT_FREQ_INNER',
                },
                {
                    key: 'RESTART_FILENAME',
                    type: QuestionType.text,
                    title: 'RESTART_FILENAME',
                },
            ],
        },
        {
            key: 'volume-output',
            title: 'volume-output',
            type: QuestionType.group,
            visibleWhen: {
                in: ['VOLUME', { var: 'OUTPUT_FILES' }],
            },
            children: [
                {
                    key: 'VOLUME_FILENAME',
                    type: QuestionType.text,
                    title: 'VOLUME_FILENAME',
                },
            ],
        },
        {
            key: 'surface-output',
            title: 'surface-output',
            type: QuestionType.group,
            visibleWhen: {
                in: ['SURFACE', { var: 'OUTPUT_FILES' }],
            },
            children: [
                {
                    key: 'SURFACE_FILENAME',
                    type: QuestionType.text,
                    title: 'SURFACE_FILENAME',
                },
            ],
        },
    ],
};
