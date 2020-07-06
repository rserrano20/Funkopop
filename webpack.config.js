const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: {
		index: './src/js/index.js',
		admin: './src/js/admin.js'
	},
	output: {
		filename: 'js/[name].js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
			{
				test: /\.css$/i,
				use: [ MiniCssExtractPlugin.loader, 'css-loader' ]
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'img/[name].[ext]'
						}
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			minify: {
				collapseWhitespace: true,
				removeComments: true,
				removeRedundantAttributes: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true,
				useShortDoctype: true
			},
			inject: true,
			chunks: [ 'index' ]
		}),
		new HtmlWebpackPlugin({
			template: './src/admin.html',
			minify: {
				collapseWhitespace: true,
				removeComments: true,
				removeRedundantAttributes: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true,
				useShortDoctype: true
			},
			inject: true,
			chunks: [ 'admin' ],
			filename: './admin.html'
		}),
		new MiniCssExtractPlugin({
			filename: 'css/style.css'
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: './src/img',
					to: 'img'
				}
			]
		})
	]
};
