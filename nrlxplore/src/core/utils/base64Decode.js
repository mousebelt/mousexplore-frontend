import truncate from 'lodash/truncate';

const base64Decode = value => Buffer.from(value, 'base64').toString();
const base64DecodeToHex = value => Buffer.from(value, 'base64').toString('hex');
const shortHash = (hash, length = 10) => truncate(hash, {length})

export {
  base64Decode,
  base64DecodeToHex,
  shortHash
}