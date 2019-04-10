module.exports = { 
  css:{
      loaderOptions:{
        sass:{
          data: `
            @import '@/../node_modules/include-media/dist/_include-media.scss';
          `
        } 
        
      } 
  },
  chainWebpack: config => {    
    const svgRule = config.module.rule('svg')
    config.plugins.delete('named-chunks')
    
    
    config.module.rule('svgstatic')
      .test(/\.(svg2)(\?.*)?$/)
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'img/[name].[hash:8].svg'
      })    
    // config.module.rule('svgstatic')
    // .test(/\.(svg)(\?.*)?$/)
    // .use('file-loader')
    //   .loader('file-loader')
      
    
    svgRule.uses.clear()
    svgRule
      .use('raw-loader')
      .loader('raw-loader')
    
    config.entryPoints.delete('app')
    config.entry('app')
      .add('./src/Main.ts')
      .end()
    
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/notesnow/'
    : '/',
  productionSourceMap: false
}