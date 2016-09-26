const htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackBrowserPlugin = require('webpack-browser-plugin');

const config = {
	entry: './src/index.js',
	output: {
		filename:'bundle[hash:8].js',
		// publicPath: '/static',
		path: __dirname + '/dist'
	},
	'devtool': "source-map",
	// 'devServer': {
	// 	publicPath: '/static'
	// },
	module: {
		loaders: [
			{
			    test: /\.less$/,
			    loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
			},
			{
				test:/\.js/,
				exclude: /node_modules/,
				loader: 'babel'
			}
		]
	},
	resolve:['','.js','.json'],
	plugins: [
		new ExtractTextPlugin("bundle[hash:8].css"),
		new htmlWebpackPlugin({
			template: './src/index.html',
			filename: './index.html'
		}),
		// new WebpackBrowserPlugin()
	]
};
module.exports = config;