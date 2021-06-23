const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
  },
  // devServer:{
  //   Proxy:{
  //     '/api':{
  //       target:'http://localhost:3000',
  //       changeOrigin:true,
  //       ws:true,
  //       pathRewrite:{
  //         '^/api': 'http://localhost:3000' 
  //       }
  //     }
  //   }
  // }
};