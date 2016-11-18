import Storage, { DRIVERS } from './Storage';

let StorageFactory = options => new Storage(options);
StorageFactory.DRIVERS = DRIVERS;

export default StorageFactory;
export { DRIVERS };