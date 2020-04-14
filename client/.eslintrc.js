module.exports = {
	root: true,
	env: {
		node: true
	},
  extends: [
    'plugin:vue/essential',
    '@vue/typescript/recommended',
    '@vue/prettier/@typescript-eslint'
  ],
	parserOptions: {
		ecmaVersion: 2020,
		"sourceType": "module",
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		"@typescript-eslint/ban-ts-ignore": "off"
	},
	overrides: [
		{
			files: [
				'**/__tests__/*.{j,t}s?(x)',
				'**/tests/unit/**/*.spec.{j,t}s?(x)'
			],
			env: {
				jest: true
			}
		}
	]
};
