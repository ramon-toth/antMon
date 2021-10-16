import { antStats } from './antStats.js';
import { WORKERS, SERVER, INTERVAL, FARM } from './config.js';
import { io } from 'socket.io-client';
import dotenv from 'dotenv';

dotenv.config();

const socket = io(SERVER, { auth: { token: process.env.API_KEY } });

socket.emit('farm', FARM);
socket.on('connect', () => console.log(timestamp(), 'Connected to Server at', SERVER));

socket.on('command', (data) => {
  console.log(timestamp(), 'Message from server:', data); // Not implemented
});

socket.on('connect_error', (err) => {
  console.log(timestamp(), 'Connection Error');
});

socket.on('disconnect', () => console.log(timestamp(), 'Server disconnected'));

function fetchAllStats() {
  const stats = WORKERS.map(async (w) => await antStats(w));

  Promise.all(stats)
    .then((stats) => socket.emit('message', stats))
    .catch((e) => console.log(e));
}

export function timestamp() {
  return `[${new Date().toLocaleString('en-US')}] -`;
}

setInterval(fetchAllStats, INTERVAL * 1000);
