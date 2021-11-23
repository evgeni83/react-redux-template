module.exports = {
	sourcemap: true,
	plugins: [
		require( 'postcss-combine-media-query' ),
		require( 'cssnano' )( {
			preset: 'default',
		} ),
		require( 'postcss-preset-env' ),
	],
};
