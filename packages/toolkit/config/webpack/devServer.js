const { resolve, join } = require('path');

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
			devMiddleware: {
				writeToDisk: true,
			},
			static: resolve(process.cwd(), join('dist')),
			// by default allow any .test subdomains plus the devURL hostname
			allowedHosts,
			hot: true,
			client: {
				overlay: {
					errors: true,
					warnings: false,
				},
			},
			port: Number(devServerPort),
			proxy: {
				'/dist': {
					pathRewrite: {
						'^/dist': '',
					},
				},
			},
		};
	}

	return undefined;
};
