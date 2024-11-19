const globals = require("globals");
const tsEslint = require("typescript-eslint");
const pluginImport = require("eslint-plugin-simple-import-sort");
const pluginIncutonez = require("@incutonez/eslint-plugin");

module.exports = [
	...tsEslint.configs["recommended"],
	{
		"ignores": [
			"**/dist",
			"**/generated",
			"**/eslint.config.js",
		],
	},
	{
		plugins: {
			"typescript-eslint": tsEslint.plugin,
		},
		languageOptions: {
			ecmaVersion: "latest",
			globals: {
				...globals.node,
				...globals.jest,
				...globals.es2021,
			},
			parserOptions: {
				parser: tsEslint.parser,
				extraFileExtensions: [".vue"],
				sourceType: "module",
			},
		},
	},
	{
		plugins: {
			"simple-import-sort": pluginImport,
			"@incutonez": pluginIncutonez,
		},
		rules: {
			"@typescript-eslint/no-unused-vars": "error",
			"@typescript-eslint/prefer-namespace-keyword": "off",
			"@/indent": [
				"error",
				"tab",
				{
					SwitchCase: 1,
					ignoredNodes: ["PropertyDefinition"],
				},
			],
			"@typescript-eslint/ban-ts-comment": [
				"error",
				{
					"ts-expect-error": "allow-with-description",
				},
			],
			indent: [
				"error",
				"tab",
				{
					SwitchCase: 1,
					ignoredNodes: ["PropertyDefinition"],
				},
			],
			"brace-style": ["error", "stroustrup"],
			curly: ["error", "all"],
			"space-before-function-paren": [
				"error",
				{
					anonymous: "never",
					named: "never",
					asyncArrow: "always",
				},
			],
			semi: [2, "always"],
			quotes: ["error", "double"],
			"no-mixed-spaces-and-tabs": "off",
			"comma-dangle": ["error", "always-multiline"],
			"eol-last": ["error", "always"],
			"object-curly-newline": [
				"error",
				{
					ObjectExpression: {
						multiline: true,
						minProperties: 1,
					},
					ObjectPattern: "never",
				},
			],
			"object-curly-spacing": ["error", "always"],
			"object-property-newline": "error",
			"no-trailing-spaces": ["error"],
			"no-var": "error",
			"arrow-spacing": "error",
			"no-duplicate-imports": "error",
			"arrow-parens": "error",
			"computed-property-spacing": ["error", "never"],
			"func-call-spacing": ["error", "never"],
			"new-parens": "error",
			"prefer-const": "error",
			"array-bracket-spacing": ["error", "never"],
			"comma-spacing": ["error", {
				before: false,
				after: true,
			}],
			"array-element-newline": ["error", "consistent"],
			"key-spacing": "error",
			"space-infix-ops": "error",
			"no-multi-spaces": "error",
			"space-before-blocks": "error",
			"keyword-spacing": "error",
			"space-in-parens": "error",
			"simple-import-sort/imports": [
				"error",
				{
					groups: [
					// Side effect imports.
						["^\\u0000"],
						// Node.js builtins prefixed with `node:`.
						["^node:"],
						["^vue"],
						// Packages.
						// Things that start with a letter (or digit or underscore), or `@` followed by a letter.
						["^@?\\w"],
						// Absolute imports and other imports such as Vue-style `@/foo`.
						// Anything not matched in another group.
						["^"],
						// Relative imports.
						// Anything that starts with a dot.
						["^\\."],
					],
				},
			],
		},
	}];
