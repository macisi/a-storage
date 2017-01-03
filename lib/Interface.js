'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Interface = function () {
  function Interface(name) {
    (0, _classCallCheck3.default)(this, Interface);

    this.__interface_name = name;
    this.__store = {};
  }

  (0, _createClass3.default)(Interface, [{
    key: 'getItem',
    value: function getItem(key) {
      return this.__store[key];
    }
  }, {
    key: 'setItem',
    value: function setItem(key, value) {
      if ((typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === 'object') {
        value = value.toString();
      }
      this.__store[key] = value;
    }
  }, {
    key: 'removeItem',
    value: function removeItem(key) {
      delete this.__store[key];
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.__store = {};
    }
  }]);
  return Interface;
}();

exports.default = Interface;
;
//# sourceMappingURL=Interface.js.map