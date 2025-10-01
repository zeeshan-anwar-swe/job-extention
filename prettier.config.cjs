/** @type {import('prettier').Config} */
const config = {
    // These ensure clean 2-space indentation
    tabWidth: 2,
    useTabs: false,

    // Set this to 100 or more to give Prettier room to format props on one line
    printWidth: 100,

    plugins: ['prettier-plugin-tailwindcss'],
    semi: true,
    singleQuote: true,
    jsxSingleQuote: true,
    trailingComma: 'all',
    bracketSameLine: true,
    arrowParens: 'always',
    endOfLine: 'lf',
};

module.exports = config;