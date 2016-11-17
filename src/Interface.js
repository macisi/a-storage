export default class Interface {
  constructor(name) {
    this.__interface_name = name;
    this.__store = {};
  }
  getItem(key) {
    return this.__store[key];
  }
  setItem(key, value) {
    if (typeof value === 'object') {
      value = value.toString();
    }
    this.__store[key] = value;
  }
  removeItem(key) {
    delete this.__store[key];
  }
  clear() {
    this.__store = {};
  }
};