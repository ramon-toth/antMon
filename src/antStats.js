import net from 'net';

// Host config object: { name, ip, port}

export function antStats(host = { name: '', ip: '0.0.0.0', port: 4028 }) {
  const socket = net.connect({
    host: host.ip,
    port: host.port
  });

  return new Promise((resolve, reject) => {
    socket.on('error', function (err) {
      resolve({
        worker: host.name,
        ip: host.ip,
        online: false,
        stats: null
      });
      // return reject(err);
    });

    socket.on('connect', () => {
      socket.write('stats');
      var buffer = '';
      socket.on('data', (data) => {
        buffer += data.toString();
      });
      socket.on('end', () => {
        try {
          const json = parseBuffer(buffer);
          resolve({
            worker: host.name,
            ip: host.ip,
            online: true,
            stats: json
          });
        } catch (e) {
          reject(e);
        }
      });
    });
  });
}

function parseBuffer(buffer) {
  const str = buffer.replace(/\-nan/g, '0').replace(/[^\x00-\x7F]/g, '');

  let array = str.split(',');
  array = array.map((e) => {
    return { [e.split('=')[0]]: e.split('=')[1] };
  });
  let json = {};
  array.forEach((e) => {
    Object.assign(json, e);
  });
  return json;
}
