
module.exports = {
  lintOnSave: true,
 
  devServer: {
    proxy: {
      '/getDiscList': {
        target: 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg',   //代理接口
        changeOrigin: true,
        headers: {
          referer: 'https://c.y.qq.com/',
          host: 'c.y.qq.com'
        },
        pathRewrite: {
          '^/getDiscList': ''    //代理的路径
        }
      }
    }
  }
}