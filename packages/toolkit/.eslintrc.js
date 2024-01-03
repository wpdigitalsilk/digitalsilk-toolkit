module.exports = {
	extends: ['@digitalsilk/eslint-config/node', '@digitalsilk/eslint-config/jest'],
	rules: {
		'global-require': 'off',
		'import/no-dynamic-require': 'off',
		'no-process-exit': 'off',
	},
};
