import Storage, { DRIVERS } from './Storage';

let StorageFactory = options => new Storage(options);

export default StorageFactory;
export { DRIVERS };