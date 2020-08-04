module.exports = {
  outputDir: __dirname + '../../server/static',
  transpileDependencies: ['vuetify'],
  configureWebpack: {
    devServer: {
      open: true
    }
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/assets/global_scss/app.scss";`
      }
    }
  },
  devServer: {
    proxy: 'http://backend:8000'
  }
};
