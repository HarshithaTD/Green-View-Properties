import {io} from 'socket.io-client';
import {API_HOST} from './apiConfig';

const socket = io(API_HOST, {
  transports: ['websocket'],
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 10000,
});

export default socket;
