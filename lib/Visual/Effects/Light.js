"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _default = function _default(helper) {
  return function Light(options) {
    _classCallCheck(this, Light);

    if (typeof options === "number") options = {
      radius: options
    };
    this.options = _lodash["default"].merge({
      color: 0x00FFC0,
      alpha: 0.3,
      radius: 20,
      blur: 5,
      addChild: true,
      properties: {}
    }, options);
    this.container = new PIXI.Graphics();
    this.container.lineStyle(0);
    this.container.beginFill(this.options.color, this.options.alpha);
    this.container.drawCircle(0, 0, this.options.radius);
    this.container.drawCircle(0, 0, this.options.radius / 2);
    this.container.filters = [new PIXI.filters.BlurFilter(this.options.blur)];
    this.container.blendMode = PIXI.BLEND_MODES.SCREEN;
    this.container.endFill();

    for (var name in this.options.properties) {
      this.container[name] = this.options.properties[name];
    }

    if (this.options.addChild) {
      helper.container.addChild(this.container);
    }
  };
};

exports["default"] = _default;