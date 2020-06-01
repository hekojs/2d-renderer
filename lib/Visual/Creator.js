"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Graphics = _interopRequireDefault(require("./Graphics"));

var _Dummy = _interopRequireDefault(require("./Dummy"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Creator = /*#__PURE__*/function () {
  function Creator(renderer) {
    _classCallCheck(this, Creator);

    this.renderer = renderer;
    this.container = null;
    this.Graphics = (0, _Graphics["default"])(this);
    this.Dummy = (0, _Dummy["default"])(this);
  }

  _createClass(Creator, [{
    key: "getTexture",
    value: function getTexture(path) {
      var temp = path.split(/\/(.+)/);

      if (typeof temp[1] !== 'undefined') {
        if (path in this.renderer.PIXI.Loader.shared.resources[temp[0]].textures) {
          return this.renderer.PIXI.Loader.shared.resources[temp[0]].textures[path];
        } else {
          return false;
        }
      } else {
        return this.renderer.PIXI.Loader.shared.resources[temp[0]].textures;
      }
    }
  }, {
    key: "getTextures",
    value: function getTextures(path) {
      var _this = this;

      var getNextTexture = function getNextTexture(path, number) {
        return _this.getTexture(path.replace('01', number.toString().padStart(2, '0')));
      };

      var textures = [];
      var number = 1;

      while (getNextTexture(path, number) !== false) {
        textures.push(getNextTexture(path, number));
        number++;
      }

      return textures;
    }
  }]);

  return Creator;
}();

exports["default"] = Creator;