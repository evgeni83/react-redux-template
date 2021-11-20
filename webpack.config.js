const path = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const TerserPlugin = require( 'terser-webpack-plugin' );

module.exports = {
	resolve: {
		extensions: [ '.js', '.jsx' ],
	},
	entry: path.resolve( __dirname, 'src', 'index.js' ),
	output: {
		path: path.resolve( __dirname, 'dist' ),
		filename: 'js/bundle.min.js',
		clean: true,
		publicPath: '/',
	},
	devServer: {
		port: 3333,
		open: true,
		hot: true,
		historyApiFallback: true,
	},
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
				test: /\.module\.s[ac]ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
							modules: {
								localIdentName: '[name]__[local]--[hash:base64:5]',
							},
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						},
					},
				],
			},
			{
				test: /\.s[ac]ss$/,
				exclude: /\.module.(s[ac]ss)$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
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
		new HtmlWebpackPlugin( {
			template: path.resolve( __dirname, 'src', 'index.html' ),
		} ),
		new MiniCssExtractPlugin( {
			filename: 'css/style.css',
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
	},
};
