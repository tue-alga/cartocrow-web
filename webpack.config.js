const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
	let config = {
		entry: './src/index.ts',
		resolve: {
			extensions: ['.ts', '.js']
		},
		output: {
			filename: 'js/main.js',
			path: path.resolve(__dirname, 'dist'),
			clean: true
		},
		plugins: [
			new HtmlWebpackPlugin()
		],
		devServer: {
			static: './dist'
		},
		module: {
			rules: [
				{
					test: /\.less$/i,
					use: [
						MiniCssExtractPlugin.loader,
						'css-loader',
						'less-loader',
					],
				},
				{
					test: /\.ts$/,
					use: 'ts-loader',
					exclude: /node_modules/,
				},
				{
					test: /\.(woff|woff2|eot|ttf|otf)$/i,
					type: 'asset/resource',
				},
				{
					test: /\.(svg|png|jpg)$/i,
					type: 'asset/resource',
				},
				{
					test: /\.(html)$/i,
					use: 'html-loader',
				}
			],
		},
		performance: {
			maxAssetSize: 1000000,
		},
	};

	if (argv.mode === 'development') {
		config['devtool'] = 'inline-source-map';
		config['module']['rules'][0]['use'][0] = 'style-loader';
		config['mode'] = 'development';
	} else {
		config['plugins'].push(new MiniCssExtractPlugin());
		config['mode'] = 'production';
	}
	return config;
}
