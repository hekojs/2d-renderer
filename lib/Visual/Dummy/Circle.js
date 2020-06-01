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
      radius: 10,
      angle: 0,
      x: 0,
      y: 0
    }, options, 'radius');
    var circle = new creator.renderer.PIXI.Graphics();
    circle.lineStyle(options.radius / 5, Number('0x' + options.color), options.alpha);
    circle.drawCircle(0, 0, options.radius);
    circle.moveTo(0, 0);
    circle.lineTo(0, options.radius * -1);
    circle.endFill();
    circle.angle = options.angle;
    circle.x = options.x;
    circle.y = options.y;
    return _Visual["default"].prepare(circle);
  };
};

exports["default"] = _default;