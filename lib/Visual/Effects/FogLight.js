"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _default = function _default(helper) {
  return function FogLight(radius) {
    _classCallCheck(this, FogLight);

    this.options = Object.assign({
      radius: 20,
      color: "FFFFFF"
    }, {
      radius: radius
    });
    var light = new PIXI.Graphics();
    light.beginFill(Number("0x" + this.options.color), 1);
    light.drawCircle(0, 0, radius);
    light.endFill();
    light.filters = [new PIXI.filters.BlurFilter(5)];
    light.parentLayer = helper.view.layers.fog;
    helper.container.addChild(light);
  };
};

exports["default"] = _default;