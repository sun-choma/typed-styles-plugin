# Typed Styles Plugin

## Overview

Inspired by [class-variance-authority](https://github.com/joe-bell/cva) this PostCSS plugin dynamically generates TypeScript types for your CSS files.  Intended to use with TypeScript projects, its automatic type generation ensures a Single Source of Truth and promotes better Separation of Concerns.

It's just a Proof of Concept: currently repository only contains a minified build of the plugin.  The source code will be published after further optimizations.

## Concept

This plugin aims to solve the same problem as [class-variance-authority](https://github.com/joe-bell/cva), but without using css-in-ts.  Its achieved by extending the basic CSS syntax with a set of at-rules that handle type generation.  More details on the syntax are in the [syntax](#syntax) section.

## Quick Start

1. Set up PostCSS in your project.  Detailed instructions are available in the [PostCSS repository](https://github.com/postcss/postcss?tab=readme-ov-file#usage).
2. Place `postcss-style-props.min.cjs` in your project.
3. Add the plugin to your `postcss.config.cjs`:

```javascript
module.exports = {
    plugins: [
        require("autoprefixer")(),
        require("./path/to/postcss-style-props.min.cjs")(),
    ],
};
```

4. The plugin is ready to use.

## Examples

This repository includes several usage examples:

* `react-vite-example`: A configured Vite project using React. This demonstrates a minimal working configuration and the plugin's usage in creating a button component.
* `react-storybook-example`: A configured Storybook project using React. This shows integration with automated documentation systems.
* `syntax-example`: Detailed examples of correct and incorrect syntax. The `input.pcss` file is the source, and `output.css` is the plugin's output.

## Syntax

The plugin extends CSS syntax with a few at-rules. More detailed examples are provided in the `syntax-example` folder and in the example projects.

### `@variants`

Similar to [cva](https://github.com/joe-bell/cva), this declares possible component variants.  The only parameter is the property name in kebab-case. Child `@variant` nodes define the possible property values.

```postcss
@variants button-variant {
    @variant primary-btn {
        color: var(--text-primary);
        background: var(--bg-primary);
    }

    @variant secondary-btn {
        color: var(--text-secondary);
        background: var(--bg-secondary);
    }
}
```

This transpiles to a `.d.ts` file with the following content:

```typescript
export type StyleProps = {
    buttonVariant: 'primary-btn' | 'secondary-btn'
}
```

**Note:** CSS traditionally uses kebab-case. The plugin automatically converts property names from kebab-case to pascalCase.  Values, being strings, remain in their original form.

### `@switch`

Used to define a boolean property. Styles are applied if the value is true. The property name is specified as a parameter.

```postcss
@switch is-loading {
    padding: 0 12px;
}
```

This transpiles to:

```typescript
export type StyleProps = {
    isLoading?: boolean
}
```

### `@combine`

Similar to [compoundVariants](https://cva.style/docs/getting-started/variants#compound-variants) in cva.  Allows applying unique styles based on a specific combination of properties.  `variants()` must follow `@combine`. Arguments are listed like CSS properties: `prop-name: prop-value`.  A combination must have at least two properties; there's no upper limit.  When using `@switch`, use `on` and `off` values.

More details on this syntax are in the `syntax-example` folder.

```postcss
@combine variants(size: medium, is-loading: on) {
    cursor: not-allowed;
}
```

### Comments

The plugin supports adding comments to props.  Simply write a comment before the corresponding rule:

```postcss
/* Button styling. Used to change background, text, and border colors */
@variants variant {
    /* High-emphasis button. Used for primary actions */
    @variant primary {
        /* some styles */
    }

    /* Low-emphasis button. Used for secondary actions */
    @variant secondary {
        /* some styles */
    }
}
```

These comments will be included in the `.d.ts` file.  Generated comments can be used by automated documentation tools like Storybook (example in `react-storybook-example`).

### Configuration

The plugin can be configured with the following options:

* `mode`: Controls plugin behavior during style transformation. Accepts `robust` (default) and `strict`.
    * `robust`: Ignores rules with incorrect syntax.  Outputs information about incorrect syntax if logs are enabled.
    * `strict`: Throws an error on incorrect syntax.
* `enableLogs`: A flag to enable/disable logs. Defaults to `false`.
* `include`: A string or array of glob patterns specifying which files to process. Defaults to `"**/*.{css,pcss}"`.
* `util`: An object configuring the output of a utility file for converting props to class names. Contains:
    * `fileName`: The name of the utility file. Defaults to `"styleProps"`.
    * `outputDir`: The output directory for the utility file. Defaults to `"./src/utils"`.

Configuration example:

```javascript
module.exports = {
    plugins: [
        require("autoprefixer"),
        require("./postcss-style-props.min.cjs")({enableLogs: true, util: {outputDir: "./src/helpers"}}),
    ],
};
```
