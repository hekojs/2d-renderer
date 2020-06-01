"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Circle = _interopRequireDefault(require("./Circle"));

var _Rectangle = _interopRequireDefault(require("./Rectangle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(creator) {
  return {
    Circle: (0, _Circle["default"])(creator),
    Rectangle: (0, _Rectangle["default"])(creator)
  };
};

exports["default"] = _default;