import { io, type Socket } from 'socket.io-client'

export const socket: Socket = io('http://192.168.1.114:3000', {
  transports: ['websocket']
})
