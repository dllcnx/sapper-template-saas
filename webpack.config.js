const webpack = require('webpack');
const path = require('path');
const config = require('sapper/config/webpack.js');
const pkg = require('./package.json');

const mode = process.env.NODE_ENV;
const dev = mode === 'development';

const alias = { svelte: path.resolve('node_modules', 'svelte') };
const extensions = ['.mjs', '.js', '.json', '.svelte', '.html'];
const mainFields = ['svelte', 'module', 'browser', 'main'];
const onwarn = (warning, onwarn) => {
	if(warning.message === 'Unused CSS selector'){
		return;
	}else{
		return (warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message)) || onwarn(warning)
	}
};

const sveltePreprocess = require('svelte-preprocess');
const preprocess = sveltePreprocess({
	scss: {
		includePaths: ['src'],
	},
	postcss: {
		plugins: [require('autoprefixer')],
	},
});
module.exports = {
	client: {
		entry: config.client.entry(),
		output: config.client.output(),
		resolve: { alias, extensions, mainFields },
		module: {
			rules: [
				{
					test: /\.(svelte|html)$/,
					use: {
						loader: 'svelte-loader',
						options: {
							onwarn,
							preprocess, // <-- ADD THIS LINE
							dev,
							hydratable: true,
							hotReload: false // pending https://github.com/sveltejs/svelte/issues/2377
						}
					}
				},
				{
					test: /\.css|.scss$/,
					use: [{ loader: 'style-loader' }, { loader: 'css-loader' },{loader: 'sass-loader'}],
				},
			]
		},
		mode,
		plugins: [
			// pending https://github.com/sveltejs/svelte/issues/2377
			// dev && new webpack.HotModuleReplacementPlugin(),
			new webpack.DefinePlugin({
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
		].filter(Boolean),
		devtool: dev && 'inline-source-map'
	},

	server: {
		entry: config.server.entry(),
		output: config.server.output(),
		target: 'node',
		resolve: { alias, extensions, mainFields },
		externals: Object.keys(pkg.dependencies).concat('encoding'),
		module: {
			rules: [
				{
					test: /\.(svelte|html)$/,
					use: {
						loader: 'svelte-loader',
						options: {
							onwarn,
							preprocess, // <-- ADD THIS LINE
							css: false,
							generate: 'ssr',
							dev
						}
					}
				},
				{
					test: /\.css|.scss$/,
					use: [{ loader: 'style-loader' }, { loader: 'css-loader' },{loader: 'sass-loader'}],
				},
			]
		},
		mode: process.env.NODE_ENV,
		performance: {
			hints: false // it doesn't matter if server.js is large
		}
	},

	serviceworker: {
		entry: config.serviceworker.entry(),
		output: config.serviceworker.output(),
		mode: process.env.NODE_ENV
	}
};
