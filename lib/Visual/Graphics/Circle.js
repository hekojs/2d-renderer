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
      blur: 0,
      blendMode: 'normal'
    }, options, 'radius');
    var circle = new creator.renderer.PIXI.Graphics();
    circle.lineStyle(0);
    circle.beginFill(Number('0x' + options.color), options.alpha);
    circle.drawCircle(0, 0, options.radius);
    circle.endFill();

    if (options.blur) {
      circle.filters = [new creator.renderer.PIXI.filters.BlurFilter(options.blur)];
    }

    if (options.blend === 'screen') {
      circle.blendMode = creator.renderer.PIXI.BLEND_MODES.SCREEN;
    }

    return _Visual["default"].prepare(circle);
  };
};

exports["default"] = _default;