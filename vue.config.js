
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
      },
      '/lyric': {
        target: 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg',   //代理接口
        changeOrigin: true,
        headers: {
          referer: 'https://c.y.qq.com/',
          host: 'c.y.qq.com'
        },
        pathRewrite: {
          '^/lyric': ''    //代理的路径
        }
      },
      '/getSongList': {
        target: 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg',   //代理接口
        changeOrigin: false,
        headers: {
          referer: 'https://c.y.qq.com/',
          host: 'c.y.qq.com'
        },
        pathRewrite: {
          '^/getSongList': ''    //代理的路径
        }
      },
      '/search': {
        target: 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp',   //代理接口
        changeOrigin: true,
        headers: {
          referer: 'https://c.y.qq.com/',
          host: 'c.y.qq.com'
        },
        pathRewrite: {
          '^/search': ''    //代理的路径
        }
      }     
    },

  }
}