'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Expose devices
 */

exports.default = devices;

/**
 * Get a device
 * @param  {String} port
 * @return {String} path
 */

/**
 * Imports
 */

function devices(port) {
  var portName = 'out' + port.toUpperCase();
  return portToPath(portName);
}

/**
 * Convert port to path
 * @return {Object}
 */

function portToPath(port) {
  var motorPath = '/sys/class/tacho-motor/';
  var paths = _fs2.default.readdirSync(motorPath).reduce(function (obj, file) {
    var portName = _fs2.default.readFileSync(motorPath + file + '/port_name', 'utf-8').trim();
    obj[portName] = file.trim();
    return obj;
  }, {});
  return paths[port];
}
