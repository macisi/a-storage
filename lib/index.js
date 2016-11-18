'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DRIVERS = undefined;

var _Storage = require('./Storage');

var _Storage2 = _interopRequireDefault(_Storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StorageFactory = function StorageFactory(options) {
  return new _Storage2.default(options);
};
StorageFactory.DRIVERS = _Storage.DRIVERS;

exports.default = StorageFactory;
exports.DRIVERS = _Storage.DRIVERS;
//# sourceMappingURL=index.js.map