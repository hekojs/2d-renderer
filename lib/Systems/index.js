"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _RendererRenderScene = _interopRequireDefault(require("./RendererRenderScene"));

var _RendererDrawPhysicsShapes = _interopRequireDefault(require("./RendererDrawPhysicsShapes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  RendererRenderScene: _RendererRenderScene["default"],
  RendererDrawPhysicsShapes: _RendererDrawPhysicsShapes["default"]
};
exports["default"] = _default;