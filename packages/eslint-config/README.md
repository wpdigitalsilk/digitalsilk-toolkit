# DigitalSilk Eslint Config


## Installation

Install [@digitalsilk/eslint-config](https://github.com/wpdigitalsilk/digitalsilk-toolkit/blob/master/packages/eslint-config/README.md) as a development dependency of your project:

```sh
npm install @digitalsilk/eslint-config --save-dev
```

## Available ESLint configs

### @digitalsilk/eslint-config

The default export contains common rules that are not specific to any framework or environment.

```js
// eslintrc.js
module.exports = {
	extends: ['@digitalsilk/eslint-config'],
};
```

### @digitalsilk/eslint-config/react

Extends `@digitalsilk/eslint-config` adding specific rules to React.

```js
// eslintrc.js
module.exports = {
	extends: ['@digitalsilk/eslint-config/react'],
};
```

### @digitalsilk/eslint-config/wordpress

Extends `@digitalsilk/eslint-config/react` adding the custom gutenberg rules from `@wordpress/eslint-plugin`.

*Note*: This is an optional dependency, if you want to use this set of rules you must install `@wordpress/eslint-plugin` first.

```bash
npm install --save-dev @wordpress/eslint-plugin
```

```js
// eslintrc.js
module.exports = {
	extends: ['@digitalsilk/eslint-config/wordpress'],
};
```

### @digitalsilk/eslint-config/node

Extends `@digitalsilk/eslint-config` adding specific rules to Node.js.

```js
// eslintrc.js
module.exports = {
	extends: ['@digitalsilk/eslint-config/node'],
};
```

### @digitalsilk/eslint-config/jest

Adds specific rules for the `jest` testing framework.

```js
// eslintrc.js
module.exports = {
	extends: ['@digitalsilk/eslint-config/react', '@digitalsilk/eslint-config/jest'],
};
```

### @digitalsilk/eslint-config/legacy

This legacy config contains only rules for ES5. It should be used for projects without babel that are still writing legacy JavaScript code.

```js
// eslintrc.js
module.exports = {
	extends: ['@digitalsilk/eslint-config/legacy'],
};
```

## Usage

In order to use this config, choose the one you want and add this configuration to your `package.json`:

```json
{
    "eslintConfig": {
        "extends": "@digitalsilk/eslint-config"
    }
}
```

Or add a `.eslintrc.js` file to your project root containing:
```js
module.exports = {
	extends: ['@digitalsilk/eslint-config'],
};
```

## TypeScript Support

If you want TypeScript support, make sure to install `@typescript-eslint/eslint-plugin` and `@typescript-eslint/parser`

```sh
npm install --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

change the eslint parser to `@typescript-eslint/parser` and add the typescript plugin

```js
// eslintrc.js
module.exports = {
	parser: '@typescript-eslint/parser',
	extends: ['@digitalsilk/eslint-config/react'],
	plugins: ['@typescript-eslint'],
}
```

## VSCode integration

We recommend turning on VSCode settings to automatically run `eslint --fix` on save.

```json
"editor.codeActionsOnSave": {
   "source.fixAll.eslint": true,
}
```

This will automagically format your code once you save. You don't need VSCode prettier extension enabled or running on save as eslint will automatically run `prettier` for you.
