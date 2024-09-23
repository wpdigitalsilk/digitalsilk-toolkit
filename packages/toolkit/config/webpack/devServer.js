const { resolve, join, path } = require('path');

module.exports = ({ isPackage, projectConfig: { devServer, devURL, hot, devServerPort } }) => {
	if (!devServer && !hot) {
		return undefined;
	}

	if (isPackage && devServer) {
		return {
			compress: true,
			port: Number(devServerPort),
		};
	}

	if (!isPackage && hot) {
		const allowedHosts = ['.test', '.local', '.dev'];

		try {
			allowedHosts.push(new URL(devURL).host);
		} catch (e) {
			// do nothing
		}

		return {
			contentBase: path.join(__dirname, 'dist'), // Base directory for the dev server
			devMiddleware: {
				writeToDisk: true,
			},
			// static: resolve(process.cwd(), join('dist')),
			allowedHosts,
			hot: true,
			client: {
				overlay: {
					errors: true,
					warnings: false,
				},
			},
			port: Number(devServerPort),
			proxy: [
				{
					context: ['/dist'],
					pathRewrite: { '^/dist': '' },
				},
			],
		};
	}

	return undefined;
};
