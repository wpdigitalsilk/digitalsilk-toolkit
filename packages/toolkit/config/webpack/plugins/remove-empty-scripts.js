/**
 * Webpack 5 plugin to remove empty scripts generated by usage only styles in webpack entry.
 *
 * This is a fork of https://github.com/webdiscus/webpack-remove-empty-scripts to remove ansis.
 */

const path = require('path');

const outToConsole = (...args) => process.stdout.write(`${args.join(' ')}\n`);

const pluginName = 'remove-empty-scripts';
const defaultOptions = {
	enabled: true,
	verbose: false,
	extensions: ['css', 'scss', 'sass', 'less', 'styl'],
	ignore: [],
	remove: /\.(js|mjs)$/,
};

// Save unique id in dependency object as marker of 'analysed module'
// to avoid the infinite recursion by collect of resources.
let dependencyId = 1;

function getEntryResources(compilation, module, cache) {
	const { moduleGraph } = compilation;
	const index = moduleGraph.getPreOrderIndex(module);
	const propNameDependencyId = '__webpackRemoveEmptyScriptsUniqueId';
	const resources = [];

	// the index can be null
	if (index == null) return resources;

	// index of module is unique per compilation
	// module.id can be null, not used here
	if (cache[index] !== undefined) return cache[index];

	if (typeof module.resource === 'string') {
		const resources = [module.resource];
		cache[index] = resources;

		return resources;
	}

	if (module.dependencies) {
		module.dependencies.forEach((dependency) => {
			const module = moduleGraph.getModule(dependency);
			const originModule = moduleGraph.getParentModule(dependency);
			const nextModule = module || originModule;
			let useNextModule = false;

			if (!Object.prototype.hasOwnProperty.call(dependency, propNameDependencyId)) {
				dependency[propNameDependencyId] = dependencyId++;
				useNextModule = true;
			}

			if (nextModule && useNextModule) {
				const dependencyResources = getEntryResources(compilation, nextModule, cache);

				for (let i = 0, { length } = dependencyResources; i !== length; i++) {
					const file = dependencyResources[i];
					if (resources.indexOf(file) < 0) resources.push(file);
				}
			}
		});
	}

	if (resources.length > 0) cache[index] = resources;

	return resources;
}

class WebpackRemoveEmptyScriptsPlugin {
	outputPath = '';

	trash = [];

	constructor(options) {
		this.apply = this.apply.bind(this);
		this.options = { ...defaultOptions, ...options };
		this.enabled = this.options.enabled !== false;
		this.verbose = this.options.verbose;

		// if by assigned option the `ignore` was not array, then set as array
		if (!Array.isArray(this.options.ignore)) {
			this.options.ignore = [this.options.ignore];
		}

		if (Array.isArray(this.options.extensions)) {
			const pattern = this.options.extensions.map((etx) => (etx[0] === '.' ? etx.substring(1) : etx)).join('|');
			// note: the pattern must match a resource with a query, e.g.: style.css?key=val
			this.options.extensions = new RegExp(`.(${pattern})([?].*)?$`);
		}
	}

	apply(compiler) {
		if (!this.enabled) return;

		// clear cache for webpack dev server
		this.trash = [];
		this.outputPath = compiler.options.output.path;

		compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
			const resourcesCache = [];

			compilation.hooks.chunkAsset.tap(pluginName, (chunk, filename) => {
				const {
					remove: removeAssets,
					ignore: ignoreEntryResource,
					extensions: styleExtensionRegexp,
				} = this.options;
				if (!removeAssets.test(filename)) return;

				const { chunkGraph } = compilation;
				let entryResources = [];

				for (const module of chunkGraph.getChunkEntryModulesIterable(chunk)) {
					if (!compilation.modules.has(module)) {
						throw new Error(
							`\n${`[${pluginName}]`} entry module in chunk but not in compilation ${
								chunk.debugId
							} ${module.debugId}`,
						);
					}

					const moduleResources = getEntryResources(compilation, module, resourcesCache);
					entryResources = entryResources.concat(moduleResources);
				}

				const resources =
					ignoreEntryResource.length > 0
						? entryResources.filter((res) => ignoreEntryResource.every((item) => !res.match(item)))
						: entryResources;

				const isEmptyScript =
					resources.length > 0 && resources.every((resource) => styleExtensionRegexp.test(resource));

				if (isEmptyScript) {
					if (this.verbose) {
						const outputFile = path.join(this.outputPath, filename);
						outToConsole(`${`[${pluginName}]`} remove ${outputFile}\n`);
					}
					// note: do not delete here compilation empty assets, do it in 'afterProcessAssets' only
					this.trash.push(filename);
				}
			});

			// Delete empty scripts only after processing all plugins,
			// otherwise, by usage some plugins, the necessary files may be not created.
			compilation.hooks.afterProcessAssets.tap(pluginName, () => {
				this.trash.forEach((file) => compilation.deleteAsset(file));
			});
		});
	}
}

module.exports = WebpackRemoveEmptyScriptsPlugin;
