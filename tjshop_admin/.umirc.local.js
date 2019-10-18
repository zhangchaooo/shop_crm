const host = 'http://shop.tjb2c.cn'
export default {
  define: {
    APP_TYPE: process.env.APP_TYPE || '',
    'process.env.dev': {
      websocket: {
        host: host.replace('http', 'ws')
      }
      // 开发环境下的api走proxy
    },
    'process.env.production': {
      websocket: {
        host: host.replace('http', 'ws')
      },
      api: {
        url: host
      }
    }
  },
  /**
   * 部署（build）模式下无效，仅供开发环境下
   */
  proxy: {
    '/api/': {
      target: host,
      changeOrigin: true,
      pathRewrite: { '^/api': '/api' },
      secure: false
    }
  }
}
