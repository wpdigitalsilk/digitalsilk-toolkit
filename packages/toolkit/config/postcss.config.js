const path = require('path');

module.exports = ({ file, env }) => {
	const config = {
		plugins: {
			'postcss-import': {},
			'postcss-mixins': {},
			'postcss-extend': {},
			'postcss-preset-env': {
				stage: 0,
				features: {
					'custom-properties': false,
				},
			},
			'@csstools/postcss-global-data': {
				files: [path.resolve(process.cwd(), '/assets/css/global/custom-media-queries.css')],
			},
			'postcss-custom-media': {},
			'postcss-nested-ancestors': {},
			'postcss-nested': {},
			'postcss-current-selector': {},
		},
	};

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
