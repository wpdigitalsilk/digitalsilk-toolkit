const fs = require('fs');
const path = require('path');

module.exports = ({ file, env }) => {
	const isTestingEnv = process.env.NODE_ENV === 'test';

	const importPluginConfig = {
		resolve: (id, basedir, importOptions) => {
			const extensions = ['.css', '.scss'];
			const fileExtension = path.extname(id);

			if (!fileExtension) {
				for (const extension of extensions) {
					const filePath = path.resolve(basedir, id + extension);
					if (fs.existsSync(filePath)) {
						return filePath;
					}
				}
			}

			return id;
		},
	};

	const config = {
		plugins: {
			'postcss-import': importPluginConfig,
			'postcss-mixins': {},
			'postcss-extend': {},
			'postcss-preset-env': {
				stage: 0,
				features: {
					'custom-properties': false,
				},
			},
			'postcss-custom-media': {},
			'postcss-nested-ancestors': {},
			'postcss-nested': {},
			'postcss-current-selector': {},
		},
	};

	if (!isTestingEnv) {
		config.plugins['@csstools/postcss-global-data'] = {
			files: [path.resolve(process.cwd(), 'assets/css/frontend/global/custom-media-queries.css')],
		};
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
