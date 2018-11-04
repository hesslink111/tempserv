// @flow

import dgram from 'dgram';
import Queue from 'promise-queue';

/**
 * Broadcasts a message to everyone on the network.
 */
export default class Server {

  broadcaster: any;
  sendQueue: Queue;

  constructor() {
    this.broadcaster = dgram.createSocket('udp4');
    this.broadcaster.bind(29142);
    this.broadcaster.on('listening', this.onListening);

    this.sendQueue = new Queue(1, Infinity);
    this.sendQueue.add(() => new Promise(resolve => this.broadcaster.on('listening', () => resolve())));
  }

  onListening = () => {
    this.broadcaster.setBroadcast(true);
  };

  send = (message: Buffer) => {
    this.sendQueue.add(async () => {
      this.broadcaster.send(message, 0, message.length, 29143, '255.255.255.255');
    });
  };

  sendStr = (message: string) => {
    const buf = Buffer.from(message, 'utf8');
    this.send(buf);
  }
}