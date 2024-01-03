/**
 * External dependencies
 */
const babelJest = require('babel-jest');

module.exports = babelJest.default.createTransformer({
	presets: [[require.resolve('@digitalsilk/babel-preset-default'), { wordpress: true }]],
});
