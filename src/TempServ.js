// @flow

// import usb from 'usb';
// import HID from 'node-hid';
//
// type Device = {
//   busNumber: number,
//   deviceAddress: number,
//   deviceDescriptor: {
//     bLength: number,
//     bDescriptorType: number,
//     bcdUSB: number,
//     bDeviceClass: number,
//     bDeviceSubClass: number,
//     bDeviceProtocol: number,
//     bMaxPacketSize0: number,
//     idVendor: number,
//     idProduct: number,
//     bcdDevice: number,
//     iManufacturer: number,
//     iProduct: number,
//     iSerialNumber: number,
//     bNumConfigurations: number
//   },
//   portNumbers: Array<number>,
//
//   open: () => void,
//   close: () => void
// };
//
// type HIDDevice = {
//   vendorId: number,
//   productId: number,
//   path: string,
//   serialNumber: string,
//   manufacturer: string,
//   product: string,
//   release: number,
//   interface: number,
//   usagePage: number,
//   usage: number
// };
//
// type HIDOpenDevice = {
//   close: () => void,
//   pause: () => void,
//   read: (callback: (err: any, data: any) => void) => void,
//   readTimeout: (number) => void,
//   resume: () => void,
//   write: (buf: Buffer) => void,
// };
//
// //const device: Device = usb.findByIds(0x413d, 0x2107);
//
// // if(device == null) {
// //   throw "Temperature device 0x413d:0x2107 not found"
// // }
//
// const devices: Array<HIDDevice> = HID.devices();
// const device: ?HIDDevice = devices.find(device => device.vendorId === 0x413d && device.productId === 0x2107 && device.path.endsWith("1"));
//
// if(device == null) {
//   throw "Device not found"
// }
//
// console.log(device);
//
// const openDevice: HIDOpenDevice = new HID.HID(device.path);//new HID.HID(0x413d, 0x2107);
//
// const stuff = Buffer.from([0x01, 0x80, 0x33, 0x01, 0x00, 0x00, 0x00, 0x00]);
//
// openDevice.write(stuff);
//
// openDevice.on('data', data => console.log(data));
// openDevice.on('error', error => console.log(error));
//
// const data = openDevice.getFeatureReport(0x01, 1);
//
// console.log(data);
//
// //const data = openDevice.readTimeout(5000);
//
// //console.log(data);
//
// setTimeout(() => {
//   openDevice.close();
//   process.exit();
// }, 5000);


import {getTemperDevices} from './temperusb/temper';

const device = getTemperDevices()[0];
console.log("Device", device);
console.log("device: ", device.getTemperature('c', [1]));
