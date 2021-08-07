import { antStats } from './antStats.js';
import { WORKERS, SERVER, INTERVAL, FARM } from './config.js';
import { io } from 'socket.io-client';
import dotenv from 'dotenv';

dotenv.config();

const socket = io(SERVER, { auth: {token: process.env.API_KEY} });

socket.emit('farm', FARM);
socket.on('connect', () => console.log('Connected to Server at', SERVER));

socket.on('command', (data) => {
  console.log('Message from server:', data);
});

socket.on("connect_error", (err) => {
  console.log('Connection Error'); 
});

socket.on('disconnect', () => console.log('Server disconnected'));

function fetchAllStats() {
  const stats = WORKERS.map(async (w) => await antStats(w));

  Promise.all(stats)
    .then((stats) => socket.emit('message', stats))
    .catch((e) => console.log(e));
}

setInterval(fetchAllStats, INTERVAL * 1000);
