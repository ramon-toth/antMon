import dotenv from 'dotenv';

dotenv.config();

export const SERVER = process.env.SERVER;

export const INTERVAL = process.env.UPDATE_INTERVAL;

export const FARM = { name: 'Office', id: 1 };

export const WORKERS = [
  {
    name: 'Worker1',
    workerID: 1,
    ip: '192.168.1.6',
    port: 4028
  },
  {
    name: 'Worker2',
    workerID: 2,
    ip: '192.168.1.7',
    port: 4028
  },
  {
    name: 'Worker3',
    workerID: 3,
    ip: '192.168.1.8',
    port: 4028
  },
  {
    name: 'Worker4',
    workerID: 4,
    ip: '192.168.1.9',
    port: 4028
  },
  {
    name: 'Worker5',
    workerID: 5,
    ip: '192.168.1.10',
    port: 4028
  },
  {
    name: 'Worker6',
    workerID: 6,
    ip: '192.168.1.11',
    port: 4028
  },
];
