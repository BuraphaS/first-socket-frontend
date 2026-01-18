import { io, type Socket } from 'socket.io-client'

export const bingoSocket: Socket = io(`${import.meta.env.VITE_APP_API_URL}/bingo`,)
export const chatSocket: Socket = io(`${import.meta.env.VITE_APP_API_URL}/chat`,)