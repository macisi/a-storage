'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Interface = function () {
  function Interface(name) {
    _classCallCheck(this, Interface);

    this.__interface_name = name;
    this.__store = {};
  }

  _createClass(Interface, [{
    key: 'getItem',
    value: function getItem(key) {
      return this.__store[key];
    }
  }, {
    key: 'setItem',
    value: function setItem(key, value) {
      if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
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