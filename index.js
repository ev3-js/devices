/**
 * Imports
 */

var Motor = require('ev3-js-motor')
var map = require('@micro-js/map-obj')
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
  fs.readdir('/sys/class/tacho-motor', function (err, files) {
    if (err) console.warn(err)
    return files.reduce(function (obj, file) {
      var portName = fs.readFileSync('/sys/class/tacho-motor/' + file + '/port_name', 'utf-8')
      obj[portName] = file
      return obj
    }, {})
  })
}
