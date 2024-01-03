# DigitalSilk babel preset
Babel preset for transforming JavaScript.

## Instalation

```sh
npm install --save-dev @digitalsilk/babel-preset-default
```

## Usage

Simply add `@digitalsilk/babel-preset-default` to your `.babelrc` file
```json
// .babelrc
{
    "presets": [ "@digitalsilk/babel-preset-default"]
}
```

### Options
This babel preset exposes a few options. The default options are listed below.

```json
// .babelrc
{
    "presets": [
        ["@digitalsilk/babel-preset-default", {
            "modules": "auto",
            // defaults to true if modules is false and false otherwise.
            "runtimeESModules": false,
            "wordpress": false,
            "debug": false,
            "removePropTypes": {},
            "targets": [
                "> 1%",
                "ie >= 11",
                "last 2 versions",
                "Firefox ESR"
            ]
        }]
    ]
}
```

#### options.modules
It's the `@babel/preset-env` [modules](https://babeljs.io/docs/en/babel-preset-env#modules) setting. Default's to `auto` which will detect whether the "caller" (e.g webpack) has ES6 modules support and if so, will disable module transpilation (this is the desired behavior for tree-shaking for example);

#### options.wordpress
When enabled will load `@wordpress/babel-preset-default`. Required when building WordPress Gutenberg blocks.

#### options.debug
Enables debug messages. Usefull to review which presets and plugins babel is using.

#### options.removePropTypes
By default this babel preset will remove any prop-types declarations when building for production.

You rarelly will need to change this setting, but in case you do, this option let's you specify any of the [babel-plugin-transform-react-remove-prop-types](https://github.com/oliviertassinari/babel-plugin-transform-react-remove-prop-types) options. 

#### options.targets

Let's you specify which browser's are support. Set this option to `{}` if you want to leverage browserlist config sources (`.browserslistrc`). By default, the following browsers will be supported.

```json
[
    "> 1%",
    "ie >= 11",
    "last 2 versions",
    "Firefox ESR"
]
```

The appropriate `core-js` polyfills will be added automatically for those browsers.

### options.development
You can set this flag to enable or disable development mode, however, this preset will automatically detect that based on how it was loaded by the caller (e.g webpack).
