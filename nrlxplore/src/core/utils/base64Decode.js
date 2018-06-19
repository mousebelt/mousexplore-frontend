const base64Decode = value => Buffer.from(value, 'base64').toString();
const base64DecodeToHex = value => Buffer.from(value, 'base64').toString('hex');

export {
  base64Decode,
  base64DecodeToHex
}