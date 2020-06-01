"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Visual = _interopRequireDefault(require("../Visual"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(creator) {
  return function (options) {
    options = _Visual["default"].options({
      color: creator.renderer.palette.primary,
      alpha: 1,
      width: 20,
      height: 20
    }, options, 'radius');
    var size = (options.width + options.height) / 2;
    var box = new creator.renderer.PIXI.Graphics();
    box.lineStyle(size / 10, Number('0x' + options.color), options.alpha);
    box.drawRect(0, 0, options.width, options.height);
    box.lineStyle(size / 20, Number('0x' + options.color), options.alpha);
    box.moveTo(0, 0);
    box.lineTo(options.width, options.height);
    box.moveTo(options.width, 0);
    box.lineTo(0, options.height);
    box.endFill();
    return _Visual["default"].prepare(box);
  };
};

exports["default"] = _default;