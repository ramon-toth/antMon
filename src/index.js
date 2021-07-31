import { antStats } from './antStats.js';
import { WORKERS, SERVER, INTERVAL, FARM } from './config.js';
import { io } from 'socket.io-client';

const socket = io(SERVER);

socket.emit('farm', FARM);

socket.on('command', (data) => {
  console.log('Command from server:', data);
});

function fetchAllStats() {
  const stats = WORKERS.map(async (w) => await antStats(w));

  Promise.all(stats)
    .then((stats) => socket.emit('message', stats))
    .catch((e) => console.log(e));
}

setInterval(fetchAllStats, INTERVAL * 1000);
