module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.eslint.json',
        tsconfigRootDir: __dirname,
    },
    settings: {
        'import/resolver': {
            typescript: {},
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
            alias: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
    },
    plugins: ['prettier', '@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'react-app',
        'react-app/jest',
        'plugin:eslint-comments/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
    ],
    rules: {
        eqeqeq: 'error',
        curly: 'error',
        'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
        'eslint-comments/no-unused-disable': 'error',
        'prettier/prettier': 'error',
        'import/no-named-as-default': 'off',
        'import/extensions': [
            'error',
            'always',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
            },
        ],
    },
};
