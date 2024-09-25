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
			// static: {
			// 	directory: resolve(process.cwd(), join('dist')), // Base directory for the dev server
			// },
			devMiddleware: {
				writeToDisk: true,
			},
			allowedHosts,
			hot: 'only',
			liveReload: false,
			headers: {
				disableHostCheck: true,
				'Access-Control-Allow-Origin': '*',
			},
			client: {
				overlay: {
					errors: true,
					warnings: false,
				},
				reconnect: 5,
			},
			port: Number(devServerPort),
		};
	}

	return undefined;
};
