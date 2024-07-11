const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

const { hasBabelConfig, hasPostCSSConfig, fromConfigRoot } = require('../../utils');
const { isPackageInstalled } = require('../../utils/package');

const getCSSLoaders = ({ options, postcss, sass }) => {
	// Note that the order of loaders is important. The loaders are applied from right to left.
	// This goes as Sass -> PostCSS -> CSS -> MiniCSSExtractPlugin
	return [
		{
			loader: MiniCSSExtractPlugin.loader,
		},
		{
			loader: require.resolve('css-loader'),
			options,
		},

		postcss && {
			loader: require.resolve('postcss-loader'),
			options: {
				postcssOptions: {
					// Provide a fallback configuration if there's not
					// one explicitly available in the project.
					...(!hasPostCSSConfig() && {
						config: fromConfigRoot('postcss.config.js'),
					}),
				},
			},
		},
		sass && {
			loader: require.resolve('sass-loader'),
			options: {
				sourceMap: options ? options.sourceMap : false,
				sassOptions: {},
			},
		},
		require.resolve('sass-loader'),
	].filter(Boolean);
};

function shouldExclude(input, include) {
	let shouldInclude = false;

	include.forEach((includedInput) => {
		if (input.includes(includedInput) || input.includes(includedInput.replace(/\//g, '\\'))) {
			shouldInclude = true;
		}
	});

	// don't exclude if should include
	if (shouldInclude) {
		return false;
	}

	// exclude anything else that includes node_modules
	return /node_modules/.test(input);
}

module.exports = ({
	isProduction,
	isPackage,
	defaultTargets,
	packageConfig: { packageType, main },
	projectConfig: { wordpress, hot, include, publicPath },
}) => {
	const hasReactFastRefresh = hot && !isProduction;

	const outputPath = path.resolve(process.cwd(), 'dist');

	console.log(outputPath);

	// Provide a default configuration if there's not
	// one explicitly available in the project.
	const babelConfig = !hasBabelConfig()
		? {
				babelrc: false,
				configFile: false,
				sourceType: 'unambiguous',
				plugins: [hasReactFastRefresh && require.resolve('react-refresh/babel')].filter(Boolean),
				presets: [
					[
						require.resolve('@digitalsilk/babel-preset-default'),
						{
							wordpress,
							useBuiltIns: isPackage ? false : 'usage',
							targets: defaultTargets,
						},
					],
				],
		  }
		: {};

	return {
		rules: [
			{
				// Match all js/jsx/ts/tsx files except TS definition files
				test: /^(?!.*\.d\.tsx?$).*\.[tj]sx?$/,
				exclude: (input) => shouldExclude(input, include),
				use: [
					{
						loader: require.resolve('./plugins/noop-loader'),
					},
					{
						loader: require.resolve('babel-loader'),
						options: {
							// Babel uses a directory within local node_modules
							// by default. Use the environment variable option
							// to enable more persistent caching.
							cacheDirectory: process.env.BABEL_CACHE_DIRECTORY || true,
							...babelConfig,
						},
					},
				].filter(Boolean),
			},
			{
				test: /\.svg$/,
				use: ['@svgr/webpack', 'url-loader'],
			},
			{
				test: /\.css$/,
				use: getCSSLoaders({
					options: {
						sourceMap: !isProduction,
						url: isPackage,
					},
					postcss: true,
					sass: false,
				}),
				exclude: [/\.module\.css$/],
			},
			{
				test: /\.(sc|sa)ss$/,
				use: [
					...getCSSLoaders({
						options: {
							sourceMap: !isProduction,
							url: isPackage,
						},
						postcss: true,
						sass: true,
					}),
				],
				exclude: [/\.module\.scss$/],
			},
			{
				test: /\.module\.css$/,
				use: [
					...getCSSLoaders({
						options: {
							sourceMap: !isProduction,
							url: isPackage,
							import: false,
							modules: true,
						},
						postcss: true,
						sass: true,
					}),
				],
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				loader: require.resolve('file-loader'),
				options: {
					name: '[name].[ext]', // Adjust as needed to include the path if required
					outputPath: outputPath, // Output directory within the build folder
					publicPath: publicPath, // Public URL for accessing the images
				},
			},

			// when in package module only include referenced resources
			isPackage && {
				test: /\.(woff(2)?|ttf|eot|svg|jpg|jpeg|png|giff|webp)(\?v=\d+\.\d+\.\d+)?$/,
				type: 'asset/resource',
			},
		].filter(Boolean),
	};
};
