import assign from 'object-assign';
import Interface from './Interface';

const STORAGE_DRIVERS = [
  'MEMORY',
  'LOCALSTORAGE',
  'SESSIONSTORAGE',
  'DOMAINSTORAGE',
];

const DRIVERS = {
  MEMORY: 'MEMORY',
  LOCALSTORAGE: 'LOCALSTORAGE',
  SESSIONSTORAGE: 'SESSIONSTORAGE',
  // available under dingtalk env
  DOMAINSTORAGE: 'DOMAINSTORAGE'
};

export { DRIVERS };

const STORAGE_INTERFACE = {};

for (let driver of STORAGE_DRIVERS) {
  switch (driver) {
    case 'MEMORY':
    default:
      STORAGE_INTERFACE[driver] = new Interface(driver);
      break;
    case 'LOCALSTORAGE':
      if (typeof window === 'object' && window.localStorage) {
        STORAGE_INTERFACE[driver] = window.localStorage;
      } else {
        STORAGE_INTERFACE[driver] = new Interface(driver);
      }
      break;
    case 'SESSIONSTORAGE':
      if (typeof window === 'object' && window.sessionStorage) {
        STORAGE_INTERFACE[driver] = window.sessionStorage;
      } else {
        STORAGE_INTERFACE[driver] = new Interface(driver);
      }
      break;
    case 'DOMAINSTORAGE':
      try {
        let _storage = dd.biz.util.domainStorage;
        assign(_storage, {
          clear() {
            _storage.clearItems();
          }
        });
        STORAGE_INTERFACE[driver] = _storage;
      } catch (e) {
        STORAGE_INTERFACE[driver] = new Interface(driver);
      }
      break;
  }
}

const defaultConfig = {
  driver: DRIVERS.LOCALSTORAGE,
  Promise: window.Promise,
};

export default class Storage {
  constructor(options = {}) {
    this.config = assign(defaultConfig, options);
    // set storage interface
    this.interface =  STORAGE_INTERFACE[this.config.driver];
    this.Promise = this.config.Promise;
  }
  setItem(key, value) {
    try {
      this.interface.setItem(key, value);
    } catch (error) {
      return this.Promise.reject(error);
    }
    return this.Promise.resolve();
  }
  getItem(key) {
    return this.Promise.resolve(this.interface.getItem(key));
  }
  removeItem(key) {
    this.interface.removeItem(key);
    return this.Promise.resolve();
  }
  clear() {
    this.interface.clear();
    return this.Promise.resolve();
  }
}