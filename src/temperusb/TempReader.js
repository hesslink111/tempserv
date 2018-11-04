// @flow

import HID from 'node-hid';

type HIDDevice = {
  vendorId: number,
  productId: number,
  path: string,
  serialNumber: string,
  manufacturer: string,
  product: string,
  release: number,
  interface: number,
  usagePage: number,
  usage: number
};

type HIDOpenDevice = {
  close: () => void,
  pause: () => void,
  read: (callback: (err: any, data: any) => void) => void,
  readTimeout: (number) => Array<number>,
  resume: () => void,
  write: (buf: Array<number>) => void,
};

/**
 * Reads the temperature from a usb device.
 */
export default class TempReader {

  tempDevice: HIDOpenDevice;

  constructor() {
    const devices: Array<HIDDevice> = HID.devices();
    const device: ?HIDDevice = devices.find(device => device.vendorId === 0x413d && device.productId === 0x2107 && device.path.endsWith("1"));

    if(device == null) {
      throw "USB Device Not Found"
    }

    this.tempDevice = new HID.HID(device.path);
  }

  readDevice = async (): Promise<number> => {
    this.tempDevice.write([0x01, 0x80, 0x33, 0x01, 0x00, 0x00, 0x00, 0x00]);
    const data = await new Promise(resolve => this.tempDevice.read((err, data) => { resolve(data) }));

    const celsiusTemp = this.convertTemperature(data[2], data[3]);
    return this.convertToFahrenheit(celsiusTemp);
  };

  convertTemperature = (highByte: number, lowByte: number): number => {
    if (highByte === 255 && lowByte === 255) {
      return NaN;
    } else if ((highByte & 128) === 128) {
      return -((256-highByte) + (1 + ~(lowByte >> 4)) / 16.0);
    } else {
      return highByte + ((lowByte >> 4) / 16.0);
    }
  };

  convertToFahrenheit = (celsius: number): number => celsius * 9 / 5 + 32;
}