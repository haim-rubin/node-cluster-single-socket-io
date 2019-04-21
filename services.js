const express = require('express')
const http = require ('http')
const socketIO = require('socket.io')

const getServer = ({ name, port }) =>{

  const app = express()
  const server = http.createServer(app)
  const ioServer = socketIO.listen(server)

  ioServer.on('connection', function(socket) {
    const onevent  = socket.onevent;
    socket.onevent = function( package ) {

      // New package with '*' as all events
      const newPackage = {
        ...package,
        data: ["*"].concat(package.data)
      }

      // Additional call to catch-all
      onevent.call(this, newPackage)

    }

    socket.on('*', function(event,data) {
      console.log(`event => ${event}`, data)
    })
    setInterval(() => {
      socket.emit('DateTime', ` ${name} - port: ${port} - ${new Date()}`)
    }, 100)
  })

  server.listen(port, () =>{
    console.log(`Server ${name} listen on port: ${port}`)
  })
}

module.exports = getServer
