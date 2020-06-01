"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Circle = _interopRequireDefault(require("./Circle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(creator) {
  return {
    Circle: (0, _Circle["default"])(creator)
  };
};

exports["default"] = _default;