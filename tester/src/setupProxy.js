const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  console.log('proxxxy')
  app.use(
    proxy('/api', {
      target: 'http://localhost:5555',
      pathRewrite: {
        '^/api': ''
      }
    })
  )

  app.use(
    proxy('/socket.io', {
      target: 'ws://127.0.0.1:5555',
      ws: true
    })
  )


}