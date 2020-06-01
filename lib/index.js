"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Plugin = _interopRequireDefault(require("./Plugin"));

var _core = _interopRequireDefault(require("@hekojs/core"));

var _Palettes = _interopRequireDefault(require("./Palettes"));

var _Components = _interopRequireDefault(require("./Components"));

var _Systems = _interopRequireDefault(require("./Systems"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].registerComponents(_Components["default"]);

var _default = {
  Components: _Components["default"],
  Systems: _Systems["default"],
  Palettes: {
    Heko: _core["default"]
  },
  Plugin: _Plugin["default"]
};
exports["default"] = _default;