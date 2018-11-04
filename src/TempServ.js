// @flow

import Server from './temperusb/Server';
import TempReader from './temperusb/TempReader';
import TempHistory from './temperusb/TempHistory';

const server = new Server();
const tempReader = new TempReader();
const tempHistory = new TempHistory(60 * 60 * 1000 / 5000);

const sendTemp = async () => {
  const temp = await tempReader.readDevice();

  tempHistory.addTemp(temp);
  const tempSummary = tempHistory.getSummary();

  const msg = {
    name: 'Will\'s House',
    ip: null,
    areas: [{
      id: 0,
      name: 'Indoor',
      temperatures: {
        high: tempSummary.max,
        low: tempSummary.min,
        current: temp
      }
    }]
  };

  server.sendStr(JSON.stringify(msg));

};

// Send the temperature every five seconds.
setInterval(sendTemp, 5000);