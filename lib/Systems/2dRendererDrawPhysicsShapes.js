"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _core = _interopRequireDefault(require("@hekojs/core"));

var _dPhysics = _interopRequireDefault(require("@hekojs/2d-physics"));

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

var DrawPhysicsShapes = /*#__PURE__*/function (_Heko$System) {
  _inherits(DrawPhysicsShapes, _Heko$System);

  var _super = _createSuper(DrawPhysicsShapes);

  function DrawPhysicsShapes() {
    _classCallCheck(this, DrawPhysicsShapes);

    return _super.apply(this, arguments);
  }

  _createClass(DrawPhysicsShapes, [{
    key: "onAdd",
    value: function onAdd(_ref) {
      var _this = this;

      var physics = _ref.physics;
      this.physics = physics;
      this.renderer = this.getWorld().plugins.get(_Plugin["default"]);
      this.graphics = {};
      this.getWorld().events.on('added.entity', function (args) {
        return _this._createUpdateBody(args);
      });
      this.getWorld().events.on('removing.entity', function (args) {
        return _this._removeBody(args);
      });
    }
  }, {
    key: "onTick",
    value: function onTick(_ref2) {
      var _this2 = this;

      var delta = _ref2.delta,
          time = _ref2.time;
      this.queries.entities.results.forEach(function (entity) {
        if (entity.id in _this2.graphics) {
          var physics = entity.getComponent(_dPhysics["default"].Components.Physics);
          _this2.graphics[entity.id].x = physics.x;
          _this2.graphics[entity.id].y = physics.y;
          _this2.graphics[entity.id].angle = physics.angle;
        }
      });
    }
  }, {
    key: "_createUpdateBody",
    value: function _createUpdateBody(_ref3) {
      var entity = _ref3.entity;
      var physics = entity.getComponent(_dPhysics["default"].Plugin);

      if (physics) {
        var body = physics.body;

        if (!(entity.id in this.graphics)) {
          if (body.label === 'Rectangle Body') {
            this.graphics[entity.id] = this._createPolygon(body);
            this.renderer.containers.debug.addChild(this.graphics[entity.id]);
          } else if (body.label === 'Body') {
            this.graphics[entity.id] = this._createPolygon(body);
            this.renderer.containers.debug.addChild(this.graphics[entity.id]);
          } else if (body.label === 'Circle Body') {
            this.graphics[entity.id] = this._createCircle(body);
            this.renderer.containers.debug.addChild(this.graphics[entity.id]);
          } else {
            console.warn('Unknown body label ' + body.label + ', debugger can only handle rectangle circle and vertices based shapes.');
          }
        }

        this.graphics[entity.id].x = body.position.x;
        this.graphics[entity.id].y = body.position.y;
        this.graphics[entity.id].rotation = body.angle;
      }
    }
  }, {
    key: "_createPolygon",
    value: function _createPolygon(body) {
      var graphics = new this.renderer.PIXI.Graphics();
      graphics.lineStyle(2, Number('0x' + this.renderer.palette.primary), 1);
      graphics.moveTo(body.vertices[0].x - body.position.x, body.vertices[0].y - body.position.y);
      body.vertices.forEach(function (vertice) {
        graphics.lineTo(vertice.x - body.position.x, vertice.y - body.position.y);
      });
      graphics.closePath();
      graphics.endFill();
      return graphics;
    }
  }, {
    key: "_createCircle",
    value: function _createCircle(body) {
      var graphics = new this.renderer.PIXI.Graphics();
      graphics.lineStyle(2, Number('0x' + this.renderer.palette.primary), 1);
      graphics.drawCircle(0, 0, body.circleRadius);
      graphics.moveTo(0, 0);
      graphics.lineStyle(2, Number('0x' + this.renderer.palette.secondary), 1);
      graphics.lineTo(0, body.circleRadius * -1);
      graphics.endFill();
      return graphics;
    }
  }, {
    key: "_removeBody",
    value: function _removeBody(_ref4) {
      var entity = _ref4.entity;
      var physics = entity.getComponent(_dPhysics["default"].Plugin);

      if (physics) {
        if (entity.id in this.graphics) {
          this.renderer.containers.debug.removeChild(this.graphics[entity.id]);
          delete this.graphics[entity.id];
        }
      }
    }
  }]);

  return DrawPhysicsShapes;
}(_core["default"].System);

exports["default"] = DrawPhysicsShapes;
DrawPhysicsShapes.queries = {
  entities: {
    components: [_dPhysics["default"].Components.Physics]
  }
};