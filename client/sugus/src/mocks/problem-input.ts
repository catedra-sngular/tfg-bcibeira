import { QuestionType } from '../interfaces/question';

export const PROBLEM_INPUT = {
    name: 'problem-input',
    title: 'Problem Input',
    groups: [
        {
            key: 'MESH_DEFINITION',
            title: 'MESH_DEFINITION',
            type: QuestionType.group,
            children: [
                {
                    key: 'MESH_FORMAT',
                    type: QuestionType.buttonList,
                    title: 'Mesh format',
                    options: [{ label: 'SU2', value: 'SU2' }],
                },
                {
                    key: 'MESH_FILENAME',
                    type: QuestionType.text,
                    title: 'Mesh filename',
                    minLength: 3,
                    maxLength: 64,
                },
            ],
        },
        {
            key: 'PROBLEM_INITIALIZATION',
            title: 'PROBLEM_INITIALIZATION',
            type: QuestionType.group,
            children: [
                {
                    key: 'RESTART_SOL',
                    type: QuestionType.buttonList,
                    title: 'Reestart solution',
                    options: [
                        { label: 'YES', value: 'YES' },
                        { label: 'NO', value: 'NO' },
                    ],
                },
            ],
        },
        {
            key: 'SOLUTION',
            title: 'SOLUTION',
            type: QuestionType.group,
            visibleWhen: {
                '==': [
                    {
                        var: 'RESTART_SOL',
                    },
                    'YES',
                ],
            },
            children: [
                {
                    key: 'SOLUTION_FILENAME',
                    type: QuestionType.text,
                    title: 'SOLUTION_FILENAME',
                },
            ],
        },
    ],
};
