import {antStats} from './antStats.js'
import { WORKERS, SERVER, INTERVAL, FARM } from './config.js'
import { io } from "socket.io-client";

// import fetch from 'node-fetch'
const socket = io(SERVER);

socket.emit('farm', FARM)

function fetchAllStats() {
    const stats = WORKERS.map(async w => await antStats(w))

    Promise.all(stats).then(stats => socket.emit('message', stats)).catch(e=> console.log(e))
}


setInterval(fetchAllStats, INTERVAL * 1000)
