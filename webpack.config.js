const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = [
	{
		entry: __dirname + '/client/index.js', 
		output: {
			path: __dirname + '/public/js',
			filename: 'bundle.js',
		},
		module: {
			loaders: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel',
				},
			],
		},
		plugins: [
			/*
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false,
				}
			}),
			*/
		],
		//devtool: 'inline-source-map',
	},

	{
		entry: {
			common: __dirname + '/client/scss/index.scss'
		},
		output: {
			path: __dirname + '/public/css',
			filename: 'index.css',
		},
		module: {
			loaders: [
				{
					test: /\.css$/,
					loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
				},
				{
					test: /\.scss$/,
					loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader'),
				},
			],
		},
		plugins: [
			new ExtractTextPlugin('index.css')
		],
	},

	{
		entry: __dirname + '/client/polyfills/index.js',
		output: {
			path: __dirname + '/public/js',
			filename: 'polyfills.js',
		},
		plugins: [
			new webpack.IgnorePlugin(/vertx/),
			/*
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false,
				}
			}),
			*/
		],
	},
];