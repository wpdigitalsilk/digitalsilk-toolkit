# DigitalSilk Stylelint Config


## Dependencies

1. [Node & NPM](https://www.npmjs.com/get-npm) - 3rd party dependencies are managed through NPM, so you will need that installed globally
2. [Stylelint](https://stylelint.io/) - as this is a config extension for Stylelint, you will need Stylelint installed in your main project in order for it to work.

### ⚠️ Dependency Warning

If you're using `npm >= 7` you might not need to install Stylelint directly since it's stated as a `peerDependency`. If you have a version that's not equal or greater than `7`, you'll need to install Stylelint manually.

## Installation

First, install Stylelint:

```bash
// NPM
npm install stylelint --save-dev

// Yarn
yarn add stylelint
```

Then install the DigitalSilk Stylelint config:

```bash
// NPM
npm install @digitalsilk/stylelint-config --save-dev
```

## Usage

Add the following to your `.stylelintrc` file:

```js
{
  "extends": [
    "@digitalsilk/stylelint-config"
  ]
}

```

### SCSS:

By default, DigitalSilk Stylelint Config does not support out-the-box support for `scss` based projects. That being said, it is not difficult to add support by following the below process:

Install the `stylelint-config-standard-scss` dependency:

```bash
// NPM
npm install stylelint-config-standard-scss --save-dev
```

You will then need to update the plugins section of your projects `.stylelintrc`:

```json
{
  "extends": [
    "stylelint-config-standard-scss",
    "@digitalsilk/stylelint-config/scss"
  ]
}
```

A set of rules are located on the [packages NPM page](https://www.npmjs.com/package/stylelint-config-standard-scss) if you would like to override or customize the defaults further.

#### Selector Nested Pattern

Certain rules that apply to flavours of CSS (`postcss`, `scss`, `sass`, etc) can cause a conflict in your build pipelines. One such rule is
[Selector Nested Pattern](https://stylelint.io/user-guide/rules/selector-nested-pattern).

By default, we ensure that any nested `css` uses a prefixed `&` symbol, as required in languages like `postcss` or `postcss-preset-env`, however you will want to turn this off if using `scss`.

To get around this issue, add the following to your projects, `.stylelintrc`

```js
{
  "rules": [
    "selector-nested-pattern": null,
  ]
}

```

### Webpack Setup
Run `npm install stylelint-webpack-plugin --save-dev`. You should already have the proper loader in `postcss-loader`, but if you don't install that as well. After installing stylelint and the configuration above add the following to your Webpack config:

```js
import StyleLintPlugin from 'stylelint-webpack-plugin';

plugins: [
  new StyleLintPlugin( {
    configFile: ".stylelintrc", // if your config is in a non-standard place
    files: "src/**/*.css", // location of your CSS files
    fix: true, // if you want to auto-fix some of the basic rules
  } ),
]
```

## Autofixing

Certain rules / violations can be fixed automatically using the `--fix` flag via the command line.
To ensure that Stylelint fixes what it can, you can run:

```bash
stylelint path/to/css/file.css --fix`
```
