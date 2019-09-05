// webpack v4
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
	optimization: {
		splitChunks: {
			cacheGroups: {
				styles: {
					name: 'styles',
					test: /\.css$/,
					chunks: 'all',
					enforce: true
				}
			}
		}
	},
	plugins: [
		new CleanWebpackPlugin('dist', {}),
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: '[name].[chunkhash].css',
			chunkFilename: '[id].css'
		}),
		new HtmlWebpackPlugin({
			inject: false,
			hash: true,
			template: './src/index.html',
			filename: 'index.html'
		})
	],
	entry: {
		main: './src/index.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[chunkhash].js'
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader'
			}
		},
		{
			enforce: 'pre',
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'eslint-loader',
			options: {
				fix: false
			}
		},
		{
			test: /\.(scss)$/,
			use: [{
				loader: MiniCssExtractPlugin.loader,
				options: {
					// you can specify a publicPath here
					// by default it use publicPath in webpackOptions.output
					publicPath: '../'
				}
			},
			{
				loader: 'css-loader' // translates CSS into CommonJS modules
			}, {
				loader: 'postcss-loader', // Run post css actions
				options: {
					plugins: function () { // post css plugins, can be exported to postcss.config.js
						return [
							require('precss'),
							require('autoprefixer'),
							require('cssnano')()
						];
					}
				}
			}, {
				loader: 'sass-loader' // compiles Sass to CSS
			}
			]
		},
		{
			test: /\.(png|jpg|gif)$/,
			use: [{
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					outputPath: 'images/'
				}
			}]
		},
		{
			test: /\.svg/,
			use: {
				loader: 'svg-url-loader',
				options: {}
			}
		},
		{
			test: /jquery-plugin/,
			loader: 'imports?jQuery=jquery,$=jquery,this=>window'
		}
		]
	}
};
