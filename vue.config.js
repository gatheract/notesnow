module.exports = { 
  chainWebpack: config => {    
    const svgRule = config.module.rule('svg')
    config.plugins.delete('named-chunks')
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