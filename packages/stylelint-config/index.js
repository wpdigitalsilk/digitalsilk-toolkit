module.exports = {
	extends: ['stylelint-config-recommended', 'stylelint-config-standard-scss'],
	plugins: [],
	rules: {
		'at-rule-empty-line-before': null,
		'at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: ['mixin', 'define-mixin'],
			},
		],
		'color-hex-length': 'short',
		'color-named': 'never',
		'comment-empty-line-before': null,
		'custom-property-pattern': null,
		'declaration-block-no-duplicate-properties': [
			true,
			{
				ignore: ['consecutive-duplicates'],
			},
		],
		'declaration-property-unit-allowed-list': {
			'line-height': ['px'],
		},
		'font-family-name-quotes': 'always-where-recommended',
		'font-weight-notation': [
			'numeric',
			{
				ignore: ['relative'],
			},
		],
		'function-name-case': [
			'lower',
			{
				ignoreFunctions: ['/^DXImageTransform.Microsoft.*$/'],
			},
		],
		'function-url-quotes': 'always',
		'length-zero-no-unit': true,
		'no-descending-specificity': null,
		'number-max-precision': 6,
		'property-no-vendor-prefix': null,
		'media-feature-range-notation': null,
		'value-no-vendor-prefix': null,
		'selector-not-notation': null,
		'rule-empty-line-before': null,
		'selector-attribute-quotes': 'always',
		'selector-class-pattern': null,
		'selector-id-pattern': [
			'^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
			{
				message: 'Selector should use lowercase and separate words with hyphens (selector-id-pattern)',
			},
		],
		'selector-nested-pattern': null,
		'selector-pseudo-element-colon-notation': 'double',
		'selector-type-case': 'lower',
		'value-keyword-case': [
			'lower',
			{
				camelCaseSvgKeywords: true,
				ignoreKeywords: ['currentcolor'],
			},
		],
		'import-notation': null,
		'scss/at-rule-no-unknown': [true, { ignoreAtRules: ['mixin', 'define-mixin'] }],
		'declaration-empty-line-before': null,
		'custom-property-empty-line-before': null,
		'declaration-block-no-redundant-longhand-properties': null,
		'color-function-notation': null,
		'alpha-value-notation': 'number',
		'selector-nested-pattern': null,
		'no-duplicate-selectors': null,
		'at-rule-no-unknown': null,
	},
};
