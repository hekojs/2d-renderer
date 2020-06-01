"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _events = _interopRequireDefault(require("events"));

var _lodash = _interopRequireDefault(require("lodash"));

var PIXI = _interopRequireWildcard(require("pixi.js"));

var _Statistics = _interopRequireDefault(require("./Modules/Statistics"));

var _Creator = _interopRequireDefault(require("./Visual/Creator"));

var _Heko = _interopRequireDefault(require("./Palettes/Heko"));

var _RendererRenderScene = _interopRequireDefault(require("./Systems/RendererRenderScene"));

var _RendererDrawPhysicsShapes = _interopRequireDefault(require("./Systems/RendererDrawPhysicsShapes"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * The renderer plugin
 */
var Renderer = /*#__PURE__*/function () {
  function Renderer(world, options) {
    _classCallCheck(this, Renderer);

    this.world = world;
    this.events = new _events["default"]();
    this.palette = options && options.palette ? options.palette : _Heko["default"];
    this.visuals = new _Creator["default"](this);
    this.PIXI = window.PIXI = PIXI;

    require('pixi-layers');

    require('pixi-tilemap');

    this.options = _lodash["default"].merge({
      resize: 'size',
      app: {
        antialias: true,
        width: 800,
        height: 600,
        resolution: 1,
        backgroundColor: Number('0x' + this.palette.background)
      },
      modules: {
        statistics: true,
        physicsDebugger: false
      },
      containers: ['scene', 'ui'],
      layers: [],
      target: document.body
    }, options);
    this.resolution = {
      x: this.options.app.width,
      y: this.options.app.height,
      absolute: {
        x: this.options.app.width,
        y: this.options.app.height,
        scale: this.options.app.resolution
      }
    };
  }

  _createClass(Renderer, [{
    key: "onStart",
    value: function onStart() {
      this.events.emit('starting');

      this._setupApplication();

      this._setupApplicationStage();

      this._setupApplicationResize();

      this._setupSystems();

      this._setupStatistics();

      this.events.emit('started');
    }
  }, {
    key: "getContainer",
    value: function getContainer(name) {
      return this.containers[name];
    }
  }, {
    key: "getLayer",
    value: function getLayer(name) {
      return this.layers[name];
    }
  }, {
    key: "_setupApplication",
    value: function _setupApplication() {
      this.app = new this.PIXI.Application(this.options.app);
      this.app.ticker.stop();
      this.options.target.appendChild(this.app.view);
    }
  }, {
    key: "_setupApplicationStage",
    value: function _setupApplicationStage() {
      var _this = this;

      this.app.stage = new PIXI.display.Stage();
      this.containers = {};
      this.options.containers.forEach(function (name) {
        _this.containers[name] = new _this.PIXI.Container();

        _this.app.stage.addChild(_this.containers[name]);
      }); // Create debug container

      this.containers.debug = new this.PIXI.Container();
      this.app.stage.addChild(this.containers.debug);
      this.layers = {};
      this.options.layers.forEach(function (name) {
        _this.layers[name] = new _this.PIXI.display.Layer();

        _this.app.stage.addChild(_this.layers[name]);
      });
    }
  }, {
    key: "_setupApplicationResize",
    value: function _setupApplicationResize() {
      var _this2 = this;

      var resize = {
        scale: function scale(width, height) {
          var ratio = {
            x: width / _this2.resolution.x,
            y: height / _this2.resolution.y
          };
          _this2.resolution.absolute.scale = ratio.x > ratio.y ? ratio.y : ratio.x;
          _this2.resolution.absolute.x = _this2.resolution.x * _this2.resolution.absolute.scale;
          _this2.resolution.absolute.y = _this2.resolution.y * _this2.resolution.absolute.scale;
          _this2.app.renderer.resolution = _this2.resolution.absolute.scale;

          _this2.app.renderer.resize(width / _this2.resolution.absolute.scale, height / _this2.resolution.absolute.scale);
        },
        size: function size(width, height) {
          _this2.resolution.absolute.x = _this2.resolution.x = width;
          _this2.resolution.absolute.y = _this2.resolution.y = height;

          _this2.app.renderer.resize(width, height);
        }
      };

      if (this.options.resize !== false) {
        window.addEventListener('resize', function () {
          if (_this2.options.target === document.body) {
            // If we linked directly the body, resize to document size
            resize[_this2.options.resize](window.innerWidth, window.innerHeight);
          } else {
            // If this is not the body, check the target size
            resize[_this2.options.resize](_this2.options.target.offsetWidth, _this2.options.target.offsetHeight);
          }

          _this2.events.emit('resize', {
            resolution: _this2.resolution
          });
        });
        window.dispatchEvent(new window.Event('resize'));
      }
    }
  }, {
    key: "_setupSystems",
    value: function _setupSystems() {
      this.world.systems.add(_RendererRenderScene["default"], {
        renderer: this
      });

      if (this.options.drawPhysicsShapes) {
        this.world.systems.add(_RendererDrawPhysicsShapes["default"], {
          renderer: this
        });
      }
    }
  }, {
    key: "_setupStatistics",
    value: function _setupStatistics() {
      this.statistics = this.options.modules.statistics ? new _Statistics["default"](this, {
        target: this.options.target
      }) : null;
    }
  }]);

  return Renderer;
}();

exports["default"] = Renderer;