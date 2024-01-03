module.exports = {
	plugins: ['@digitalsilk'],
	rules: {
		'@digitalsilk/no-unused-vars-before-return': 'error',
		'@digitalsilk/no-base-control-with-label-without-id': 'error',
		'@digitalsilk/no-unguarded-get-range-at': 'error',
		'@digitalsilk/no-global-active-element': 'error',
		'@digitalsilk/no-global-get-selection': 'error',
		'@digitalsilk/no-unsafe-wp-apis': 'error',
	},
	overrides: [
		{
			files: ['*.native.js'],
			rules: {
				'@digitalsilk/no-base-control-with-label-without-id': 'off',
				'@digitalsilk/i18n-no-flanking-whitespace': 'error',
				'@digitalsilk/i18n-hyphenated-range': 'error',
			},
		},
		{
			files: ['*.test.js', '**/test/*.js', 'packages/e2e-test-utils/**/*.js'],
			rules: {
				'@digitalsilk/no-global-active-element': 'off',
				'@digitalsilk/no-global-get-selection': 'off',
			},
		},
	],
};
