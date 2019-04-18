const express = require('express')
const http = require ('http')
const socketIO = require('socket.io')
const ioClient = require('socket.io-client');
const getSocketClient = ({ host }) => {
  const socket = ioClient.connect(host, { reconnect: true })

  // Add a connect listener
  socket.on('connect', function(socket) {
      console.log(`${host} - Connected!`)
  })

  return socket
}

const getServer = ({ name, port, services }) =>{

  const app = express()
  const server = http.createServer(app)
  const ioServer = socketIO.listen(server)

  const sockets =
    services.map( ({ host }) =>
      getSocketClient({ host })
    )

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
      sockets.forEach(socket => {
        socket.emit(event, data)
      })
      console.log(`event => ${event}`, data)
    })


  })

  sockets.forEach(csocket => {
    csocket.on('DateTime', (data) => {
      console.log(data)
    })
  })

  server.listen(port, () =>{
    console.log(`Server ${name} listen on port: ${port}`)
  })
}
const services = [
  {host: 'http://localhost:6001'},
  {host: 'http://localhost:6002'}
]
getServer({ name: 'S1', port: 5555, services })
