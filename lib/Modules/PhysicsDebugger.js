"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dPhysics = _interopRequireDefault(require("@hekojs/2d-physics"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * This is a physics debugger
 */
var PhysicsDebugger = /*#__PURE__*/function () {
  function PhysicsDebugger(renderer, options) {
    _classCallCheck(this, PhysicsDebugger);

    this.renderer = renderer;
    this.options = Object.assign({
      target: document.body
    }, options);
    this.graphics = {};

    this._setup();
  }

  _createClass(PhysicsDebugger, [{
    key: "_setup",
    value: function _setup() {
      var _this = this;

      this.renderer.world.events.on('added.entity', function (args) {
        return _this._createUpdateBody(args);
      });
      this.renderer.world.events.on('removing.entity', function (args) {
        return _this._removeBody(args);
      });
      this.renderer.world.ticker.add(function () {
        _this.renderer.world.entities.get().forEach(function (entity) {
          if (entity.id in _this.graphics) {
            var physics = entity.getComponent(_dPhysics["default"].Components.Physics);
            _this.graphics[entity.id].x = physics.x;
            _this.graphics[entity.id].y = physics.y;
            _this.graphics[entity.id].angle = physics.angle;
          }
        });
      });
    }
  }, {
    key: "_createUpdateBody",
    value: function _createUpdateBody(_ref) {
      var entity = _ref.entity;
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
    value: function _removeBody(_ref2) {
      var entity = _ref2.entity;
      var physics = entity.getComponent(_dPhysics["default"].Plugin);

      if (physics) {
        if (entity.id in this.graphics) {
          this.renderer.containers.debug.removeChild(this.graphics[entity.id]);
          delete this.graphics[entity.id];
        }
      }
    }
  }]);

  return PhysicsDebugger;
}();

exports["default"] = PhysicsDebugger;