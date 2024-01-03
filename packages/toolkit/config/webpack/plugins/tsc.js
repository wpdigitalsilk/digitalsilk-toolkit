const spawn = require('cross-spawn');
const { sync: resolveBin } = require('resolve-bin');
const { hasTsConfig, fromProjectRoot } = require('../../../utils');

class DSToolkitTscPlugin {
	apply(compiler) {
		compiler.hooks.done.tap('DSToolkitTscPlugin', ({ compilation }) => {
			const logger = compilation.getLogger('DSToolkitTscPlugin');
			if (hasTsConfig()) {
				logger.info('tsconfig.json detected, running tsc');
				const result = spawn.sync(
					resolveBin('typescript', { executable: 'tsc' }),
					[
						'--project',
						fromProjectRoot('tsconfig.json'),
						'--outDir',
						fromProjectRoot('dist'),
					],
					{
						stdio: 'inherit',
					},
				);
				if (result.error) {
					logger.warn('There was an error running tsc');
				}
			}
		});
	}
}

module.exports = DSToolkitTscPlugin;
