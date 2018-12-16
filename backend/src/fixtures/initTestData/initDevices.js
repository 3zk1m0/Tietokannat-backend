import mysql from 'mysql2/promise';
import { connectionSettings } from '../../settings';

const count = 5;

const deviceList = [
  { name: 'Arduino Nano', loantime: 14 },
  { name: 'Arduino Uno', loantime: 14 },
  { name: 'Arduino Mega', loantime: 14 },
  { name: 'Raspberry Pi 3', loantime: 21 },
  { name: 'Raspberry Pi 2', loantime: 21 },
  { name: 'Raspberry Pi ZERo', loantime: 21 },
  { name: 'PC', loantime: 28 },
  { name: 'Laptop', loantime: 28 },
];

export default async () => {
  const conn = await mysql.createConnection(connectionSettings);

  const [data] = await conn.execute(`
          SELECT count(id) as count
          FROM devices;
          `);
  if (data[0].count === 0) {
    console.log('initDevices');
    let device = '';
    for (let i = 0; i < count; i += 1) {
      device = deviceList[Math.floor(Math.random() * deviceList.length)];
      conn.execute(`
            INSERT INTO devices (deviceName, deviceInfo, loantime)
            VALUES ('${device.name}', '${device.name}', '${device.loantime}');
            `);
    }
  }
};
