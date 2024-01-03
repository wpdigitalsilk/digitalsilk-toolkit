class NoBrowserSyncPlugin {
	constructor() {
		this.displayed = false;
	}

	// Define `apply` as its prototype method which is supplied with compiler as its argument
	apply(compiler) {
		compiler.hooks.compilation.tap('NoBrowserSyncPlugin', (compilation) => {
			if (!this.displayed) {
				this.displayed = true;
				const logger = compilation.getLogger('DSToolkitBrowserSyncDeprecationNotice');
				logger.warn(
					'BrowserSync suppport has been deprecated in digitalsilk-toolkit in favor of the `--hot` option and will be completely removed in the next major release!',
				);
				logger.warn(
					'If you still wish to use BrowserSync you must manually install the `browser-sync` and `browser-sync-webpack-plugin` packages.',
				);
				logger.warn(
					'If those packages are installed digitalsilk-toolkit will start browser-sync automatically!',
				);
			}
		});
	}
}

module.exports = NoBrowserSyncPlugin;
