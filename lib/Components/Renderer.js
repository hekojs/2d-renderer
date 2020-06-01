"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _core = _interopRequireDefault(require("@hekojs/core"));

var _Plugin = _interopRequireDefault(require("../Plugin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Renderer = /*#__PURE__*/function (_Heko$Component) {
  _inherits(Renderer, _Heko$Component);

  var _super = _createSuper(Renderer);

  function Renderer() {
    var _this;

    _classCallCheck(this, Renderer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.parent = 'scene';
    _this.structure = [{
      name: 'container',
      sync: ['x', 'y', 'angle'],
      zIndexSyncY: false
    }];
    return _this;
  }

  _createClass(Renderer, [{
    key: "attach",
    value: function attach() {
      var _this2 = this;

      this.renderer = this.entity.world.plugins.get(_Plugin["default"]);
      this.PIXI = this.renderer.PIXI;
      this.Create = this.renderer.visuals; // Create containers

      this.containers = {};
      this.structure.forEach(function (struct) {
        _this2.containers[struct.name] = new _this2.PIXI.Container();
        _this2.containers[struct.name].visible = false;
        _this2.containers[struct.name].initialized = false;

        _this2.renderer.getContainer(_this2.parent).addChild(_this2.containers[struct.name]);
      }); // Listen for movement

      this.watch(this.entity.body, 'x', function (_ref) {
        var value = _ref.value;

        _this2.structure.forEach(function (struct) {
          if (struct.sync.includes('x')) _this2.containers[struct.name].x = value;
        });
      });
      this.watch(this.entity.body, 'y', function (_ref2) {
        var value = _ref2.value;

        _this2.structure.forEach(function (struct) {
          if (struct.sync.includes('y')) _this2.containers[struct.name].y = value;
        });
      });
    }
  }, {
    key: "update",
    value: function update() {
      var _this3 = this;

      this.structure.forEach(function (struct) {
        // Sync positions of containers with the hasPosition ability
        if (_this3.entity.hasPosition) {
          struct.sync.forEach(function (sync) {
            _this3.containers[struct.name][sync] = _this3.entity.hasPosition[sync];
          });

          if ('zIndexSyncY' in struct && struct.zIndexSyncY === true) {
            _this3.containers[struct.name].zIndex = _this3.entity.hasPosition.y + _this3.containers[struct.name].height;
          }
        } // First initialization code when first actualisation


        if (_this3.containers[struct.name].initialized === false) {
          _this3.containers[struct.name].initialized = true; // Show the entity if set to be shown

          if (!('defaultVisible' in struct) || struct.defaultVisible === true) {
            _this3.containers[struct.name].visible = true;
          }
        }
      });
    }
  }, {
    key: "detach",
    value: function detach() {
      var _this4 = this;

      this.structure.forEach(function (struct) {
        _this4.renderer.getContainer(_this4.parent).removeChild(_this4.containers[struct.name]);
      });
    }
  }]);

  return Renderer;
}(_core["default"].Component);

exports["default"] = Renderer;