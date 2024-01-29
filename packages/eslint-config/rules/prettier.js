module.exports = {
	rules: {
		'prettier/prettier': [
			2,
			{
				useTabs: true,
				tabWidth: 4,
				printWidth: 999,
				singleQuote: true,
				trailingComma: 'all',
				bracketSpacing: true,
				parenSpacing: false,
				bracketSameLine: false,
				semi: true,
				arrowParens: 'always',
			},
			{
				usePrettierrc: false,
			},
		],
	},
};
