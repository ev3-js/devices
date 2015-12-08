/**
 * Imports
 */

var Motor = require('ev3-js-motor')
var path = require('path')
var fs = require('fs')

/**
 * Vars
 */

var motors = map(createMotor, portToPath())

/**
 * Expose devices
 */

module.exports = devices

/**
 * Get a device
 * @param  {String} port
 * @return {Device}
 */

function devices (port) {
  var portName = 'out' + port.toUpperCase()
  return motors[portName]
}

/**
 * Create a motor
 * @param  {String} basename
 * @return {Motor}
 */

function createMotor (basename) {
  return new Motor(path.join('/sys/class/tacho-motor', basename))
}

/**
 * Convert port to path
 * @return {Object}
 */

function portToPath () {
  var motorPath = '/sys/class/tacho-motor'
  return fs.readdir(motorPath).reduce(function (obj, file) {
    var portName = fs.readFileSync(motorPath + file + '/port_name', 'utf-8')
    obj[portName] = file
    return obj
  }, {})
}


/**
 * map from micro-js/map
 * @param  {Function} fn
 * @param  {Object} obj
 * @return {Object}
 */
function map (fn, obj) {
  var result = {}
  var self = this

  obj.forEach(function (val, key) {
    result[key] = fn.call(self, val, key)
  })

  return result
}
