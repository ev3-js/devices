/**
 * Imports
 */

var Motor = require('ev3-js-motor')
var map = require('@micro-js/map-obj')
var path = require('path')

/**
 * Vars
 */

var motors = map(createMotor, {
  a: 'motor0',
  b: 'motor1',
  c: 'motor2',
  d: 'motor3'
})

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
  return motors[port.toLowerCase()]
}

/**
 * Create a motor
 * @param  {String} basename
 * @return {Motor}
 */

function createMotor(basename) {
  return new Motor(path.join('/sys/class/tacho-motor', basename))
}

console.log(devices('a'))
