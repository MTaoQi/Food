module.exports = {
    devServer: {
        port: '8080', // 设置端口号
        proxy: {
            '/api': {
              target: 'http://172.24.10.130:8080/foodService', //API服务器的地址
              ws: true, //代理websockets
              changeOrigin: true, // 是否跨域，虚拟的站点需要更管origin
              pathRewrite: {
                // '^/api'是一个正则表达式，表示要匹配请求的url中，全部'http://localhost:8080/api' 转接为 http://localhost:8080/
                '^/api': '',
              }
            }
        },
    }
}