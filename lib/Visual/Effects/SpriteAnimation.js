"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _default = function _default(helper) {
  return /*#__PURE__*/function () {
    function SpriteAnimation(textures, options) {
      _classCallCheck(this, SpriteAnimation);

      this.textures = textures;
      this.options = _lodash["default"].merge({
        center: true,
        animation: {
          speed: 1 / 10,
          autoplay: false
        },
        shadow: {
          alpha: 1,
          blur: 1,
          distance: 4
        }
      }, options);
      this.container = new PIXI.Container();

      this._prepareSprite();

      if (this.options.shadow !== false) this._prepareShadow();

      if (this.options.animation.autoplay) {
        this.play();
      }

      helper.container.addChild(this.container);
    }

    _createClass(SpriteAnimation, [{
      key: "gotoAndPlay",
      value: function gotoAndPlay(frameNumber) {
        this.sprite.gotoAndPlay(frameNumber);
        if (this.shadow) this.shadow.gotoAndPlay(frameNumber);
        return this;
      }
    }, {
      key: "gotoAndStop",
      value: function gotoAndStop(frameNumber) {
        this.sprite.gotoAndStop(frameNumber);
        if (this.shadow) this.shadow.gotoAndStop(frameNumber);
        return this;
      }
    }, {
      key: "play",
      value: function play() {
        this.sprite.play();
        if (this.shadow) this.shadow.play();
        return this;
      }
    }, {
      key: "getCurrentFrame",
      value: function getCurrentFrame() {
        return this.sprite.currentFrame;
      }
    }, {
      key: "stop",
      value: function stop() {
        this.sprite.stop();
        if (this.shadow) this.shadow.stop();
        return this;
      }
    }, {
      key: "_createSprite",
      value: function _createSprite() {
        var sprite = new PIXI.AnimatedSprite(helper.textures(this.textures));
        sprite.animationSpeed = this.options.animation.speed;

        if (this.options.center) {
          sprite.x -= sprite.width / 2;
          sprite.y -= sprite.height / 2;
        }

        return sprite;
      }
    }, {
      key: "_prepareSprite",
      value: function _prepareSprite() {
        this.sprite = this._createSprite();
        this.container.addChild(this.sprite);
      }
    }, {
      key: "_prepareShadow",
      value: function _prepareShadow() {
        this.shadow = this._createSprite();
        this.shadow.filters = [new DropShadowFilter({
          shadowOnly: true,
          alpha: this.options.shadow.alpha,
          blur: this.options.shadow.blur,
          distance: this.options.shadow.distance
        })];
        this.shadow.parentLayer = helper.view.layers.shadow;
        this.container.addChild(this.shadow);
      }
    }]);

    return SpriteAnimation;
  }();
};

exports["default"] = _default;