const fs = require('fs');
const path = require('path');
const { getDSScriptsConfig } = require('../utils');

const projectConfig = getDSScriptsConfig();
const { globalCss = [] } = projectConfig;

module.exports = ({ file, env }) => {
	const isTestingEnv = process.env.NODE_ENV === 'test';

	const importPluginConfig = {
		resolve: (id, basedir) => {
			const extensions = ['.css', '.scss'];
			const possibleNames = [id, `_${id}`];

			let resolvedPath;

			for (const name of possibleNames) {
				for (const extension of extensions) {
					const filePath = path.resolve(basedir, name + extension);
					if (fs.existsSync(filePath)) {
						resolvedPath = filePath;
						break;
					}
				}
				if (resolvedPath) break;
			}

			return resolvedPath || id;
		},
	};

	const config = {
		plugins: {
			'postcss-import': importPluginConfig,
			'postcss-mixins': {},
			'postcss-preset-env': {
				stage: 0,
				features: {
					'custom-properties': false,
				},
			},
			'postcss-nested-ancestors': {},
			'postcss-nested': {},
		},
	};

	if (!isTestingEnv) {
		const includedFiles = globalCss.map((item) => path.resolve(process.cwd(), item));

		if (includedFiles && includedFiles.length > 0) {
			config.plugins['@csstools/postcss-global-data'] = {
				files: includedFiles,
			};
			config.plugins['postcss-custom-media'] = {};
		}
	}

	// Only load postcss-editor-styles plugin when we're processing the editor-style.css file.
	if (path.basename(file) === 'editor-style.css') {
		config.plugins['postcss-editor-styles'] = {
			scopeTo: '.editor-styles-wrapper',
			ignore: [':root', '.edit-post-visual-editor.editor-styles-wrapper', '.wp-toolbar'],
			remove: ['html', ':disabled', '[readonly]', '[disabled]'],
			tags: ['button', 'input', 'label', 'select', 'textarea', 'form'],
		};
	}

	config.plugins.cssnano =
		env === 'production'
			? {
					preset: [
						'default',
						{
							autoprefixer: true,
							calc: {
								precision: 8,
							},
							convertValues: true,
							discardComments: {
								removeAll: true,
							},
							mergeLonghand: false,
							zindex: false,
						},
					],
			  }
			: false;

	return config;
};
