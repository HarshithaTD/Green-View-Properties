import {io} from 'socket.io-client';
import {API_HOST} from './apiConfig';

const socket = io(API_HOST, {
  transports: ['websocket'],
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
});

export default socket;
