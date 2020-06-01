"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _gstats = require("gstats");

var _stats = _interopRequireDefault(require("stats.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Statistics = /*#__PURE__*/function () {
  function Statistics(renderer, options) {
    _classCallCheck(this, Statistics);

    this.renderer = renderer;
    this.options = Object.assign({
      target: document.body
    }, options);

    this._setup();

    this._setupStyle();

    this._setupEventListeners();
  }

  _createClass(Statistics, [{
    key: "_setup",
    value: function _setup() {
      this.hooks = new _gstats.PIXIHooks(this.renderer.app);
      this.stats = new _stats["default"]();
      this.stats.dom.id = 'renderer-statistics';
      this.engineStats = document.createElement("div");
      this.engineStats.style = 'position: fixed; top: 50px; left: 0px; cursor: pointer; opacity: 0.9; z-index: 10000;';
      this.engineStats.id = 'engine-statistics';
      this.panels = {};
      this.panels.draws = this.stats.addPanel(new _stats["default"].Panel('Draw', '#ff0', '#220'));
      this.panels.textures = this.stats.addPanel(new _stats["default"].Panel('Tex', '#ff0', '#220'));
      this.options.target.appendChild(this.stats.dom);
      this.options.target.appendChild(this.engineStats);
    }
  }, {
    key: "_setupStyle",
    value: function _setupStyle() {
      var panels = this.stats.dom.getElementsByTagName('canvas');

      for (var i = 0; i < panels.length; i++) {
        panels[i].style = 'width: 80px; height: 48px;';
      }
    }
  }, {
    key: "_setupEventListeners",
    value: function _setupEventListeners() {
      var _this = this;

      this.renderer.events.on('before-tick', function () {
        return _this._begin();
      });
      this.renderer.events.on('after-tick', function () {
        return _this._update();
      });
    }
  }, {
    key: "_begin",
    value: function _begin() {
      this.stats.begin();
    }
  }, {
    key: "_update",
    value: function _update() {
      this.stats.end();
      this.panels.draws.update(this.hooks.deltaDrawCalls, Math.max(50, this.hooks.maxDeltaDrawCalls));
      this.panels.textures.update(this.hooks.texturesCount, Math.max(20, this.hooks.maxTextureCount));
    }
  }]);

  return Statistics;
}();

exports["default"] = Statistics;