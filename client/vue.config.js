module.exports = {
	outputDir: __dirname + '../../server/static',
	transpileDependencies: ['vuetify'],
	configureWebpack: {
		devServer: {
			open: true
		}
	}
};
