const path = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const TerserPlugin = require( 'terser-webpack-plugin' );

const IS_DEV = process.env.NODE_ENV === 'development';

module.exports = {
	mode: process.env.NODE_ENV || 'development',
	resolve: {
		extensions: [ '.js', '.jsx' ],
	},
	entry: { main: path.resolve( __dirname, 'src', 'index.js' ) },
	output: {
		path: path.resolve( __dirname, 'dist' ),
		filename: 'js/[name].js',
		clean: true,
		publicPath: '/',
	},
	devServer: {
		port: 3333,
		open: true,
		hot: true,
	},
	devtool: IS_DEV ? 'source-map' : false,
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.module\.s?[ac]ss$/,
				use: [
					IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: IS_DEV,
							modules: {
								localIdentName: '[name]__[local]--[hash:base64:5]',
							},
						},
					},
					'postcss-loader',
					{
						loader: 'sass-loader',
						options: {
							sourceMap: IS_DEV,
						},
					},
				],
			},
			{
				test: /\.s?[ac]ss$/,
				exclude: /\.module.(s[ac]ss)$/,
				use: [
					IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: IS_DEV,
						},
					},
					'postcss-loader',
					{
						loader: 'sass-loader',
						options: {
							sourceMap: IS_DEV,
						},
					},
				],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				loader: 'file-loader',
				options: {
					outputPath: 'img',
				},
			},
		],
	},
	plugins: [
		IS_DEV ? new HtmlWebpackPlugin( {
			template: path.resolve( __dirname, 'src', 'index.html' ),
		} ) : () => {
		},
		new MiniCssExtractPlugin( {
			filename: 'css/[name].css',
		} ),
	],
	optimization: {
		minimize: true,
		minimizer: [ new TerserPlugin( {
			terserOptions: {
				format: {
					comments: false,
				},
			},
			extractComments: false,
		} ) ],
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
				},
			},
		},
	},
};
