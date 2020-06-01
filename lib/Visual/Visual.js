"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _default = {
  options: function options(defaultOptions, _options, alias) {
    if (alias && typeof _options !== 'undefined' && _typeof(_options) !== 'object') {
      defaultOptions[alias] = _options;
    }

    return _lodash["default"].merge(defaultOptions, _options);
  },
  prepare: function prepare(target) {
    target.to = function (entityRenderer, containerName) {
      entityRenderer.containers[containerName].addChild(target);
    };

    return target;
  }
};
exports["default"] = _default;