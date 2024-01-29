module.exports = {
	extends: ['stylelint-config-standard-scss', './index.js'],
	rules: {
		'at-rule-no-unknown': null,
		'import-notation': null,
		'scss/at-rule-no-unknown': [true, { ignoreAtRules: ['mixin', 'define-mixin'] }],
	},
};
