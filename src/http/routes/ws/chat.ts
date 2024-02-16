import { FastifyInstance } from 'fastify'

export default async function WebSocketChat(app: FastifyInstance) {
  app.get('/chat', { websocket: true }, (connection, request) => {
    connection.socket.on('message', message => {
      connection.socket.send('Olá senhor!')
    })
  })
}
