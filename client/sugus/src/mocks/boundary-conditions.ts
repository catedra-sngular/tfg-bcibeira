import { QuestionType } from '../interfaces/question';
import { QuestionFamily } from '../interfaces/question-family';

export const BOUNDARY_CONDITIONS: QuestionFamily = {
    name: 'boundary-conditions',
    title: 'Boundary conditions',
    groups: [
        {
            key: 'boundary-conditions-group-1',
            title: 'boundary-conditions-group-1',
            type: QuestionType.group,
            visibleWhen: {
                or: [
                    { '==': [{ var: 'SOLVER' }, 'RANS'] },
                    { '==': [{ var: 'SOLVER' }, 'INC_RANS'] },
                ],
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
                    { '==': [{ var: 'SOLVER' }, 'INC_EULER'] },
                    { '==': [{ var: 'SOLVER' }, 'INC_RANS'] },
                ],
            },
            children: [
                {
                    key: 'INC_INLET_TYPE',
                    type: QuestionType.numeric,
                    title: 'INC_INLET_TYPE',
                },
                {
                    key: 'INC_INLET_DAMPING',
                    type: QuestionType.numeric,
                    title: 'INC_INLET_DAMPING',
                },
                {
                    key: 'INC_OUTLET_TYPE',
                    type: QuestionType.numeric,
                    title: 'INC_OUTLET_TYPE',
                },
                {
                    key: 'INC_OUTLET_DAMPING',
                    type: QuestionType.numeric,
                    title: 'INC_OUTLET_DAMPING',
                },
            ],
        },
        {
            key: 'boundary-conditions-group-3',
            title: 'boundary-conditions-group-3',
            type: QuestionType.group,
            visibleWhen: {
                or: [{ '==': [{ var: 'SOLVER' }, 'EULER'] }, { '==': [{ var: 'SOLVER' }, 'RANS'] }],
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
                    { '==': [{ var: 'SOLVER' }, 'EULER'] },
                    { '==': [{ var: 'SOLVER' }, 'RANS'] },
                    { '==': [{ var: 'SOLVER' }, 'INC_EULER'] },
                    { '==': [{ var: 'SOLVER' }, 'INC_RANS'] },
                ],
            },
            children: [
                {
                    key: 'INLET_TYPE',
                    type: QuestionType.text,
                    title: 'INLET_TYPE',
                },
                {
                    key: 'MARKER_INLET',
                    type: QuestionType.text,
                    title: 'MARKER_INLET',
                },
                {
                    key: 'MARKER_OUTLET',
                    type: QuestionType.text,
                    title: 'MARKER_OUTLET',
                },
                {
                    key: 'MARKER_SYM',
                    type: QuestionType.text,
                    title: 'MARKER_SYM',
                },
                {
                    key: 'MARKER_EULER',
                    type: QuestionType.text,
                    title: 'MARKER_EULER',
                },
            ],
        },
        {
            key: 'boundary-conditions-group-5',
            title: 'boundary-conditions-group-5',
            type: QuestionType.group,
            visibleWhen: {
                or: [{ '==': [{ var: 'SOLVER' }, 'ELASTICITY'] }],
            },
            children: [
                {
                    key: 'MARKER_CLAMPED',
                    type: QuestionType.text,
                    title: 'MARKER_CLAMPED',
                },
                {
                    key: 'MARKER_PRESSURE',
                    type: QuestionType.text,
                    title: 'MARKER_PRESSURE',
                },
                {
                    key: 'MARKER_LOAD',
                    type: QuestionType.text,
                    title: 'MARKER_LOAD',
                },
            ],
        },
    ],
};
