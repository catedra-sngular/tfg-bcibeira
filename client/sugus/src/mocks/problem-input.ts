import { QuestionType } from '../interfaces/question';

export const PROBLEM_INPUT = {
    name: 'problem-input',
    title: 'Problem Input',
    groups: [
        {
            key: 'MESH_DEFINITION',
            title: 'Definition of the physical domain',
            type: QuestionType.group,
            children: [
                {
                    key: 'MESH_FORMAT',
                    type: QuestionType.buttonList,
                    title: 'Format of the mesh file',
                    options: [
                        { label: 'SU2 Native format', value: 'SU2' },
                        { label: 'CGNS format', value: 'CGNS' },
                    ],
                },
                {
                    key: 'MESH_FILENAME',
                    type: QuestionType.text,
                    title: 'Mesh filename',
                    minLength: 4,
                    maxLength: 64,
                },
            ],
        },
        {
            key: 'PROBLEM_INITIALIZATION',
            title: 'Initialization',
            type: QuestionType.group,
            children: [
                {
                    key: 'RESTART_SOL',
                    type: QuestionType.buttonList,
                    title: 'Restart from a previously computed solution',
                    options: [
                        { label: 'YES', value: 'YES' },
                        { label: 'NO', value: 'NO' },
                    ],
                },
                {
                    key: 'SOLUTION_FILENAME',
                    type: QuestionType.text,
                    description:
                        'Make sure the solution comes from a previous run of SU2 with the same connectivity!',
                    visibleWhen: {
                        '==': [
                            {
                                var: 'RESTART_SOL',
                            },
                            'YES',
                        ],
                    },
                    title: 'Name of the solution file',
                    minLength: 4,
                    maxLength: 64,
                },
            ],
        },
    ],
};
