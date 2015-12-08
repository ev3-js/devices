var Motor = require('ev3-js-motor')
var basePath = '/sys/class/tacho-motor/'
var motors = {
  a: 'motor0',
  b: 'motor1',
  c: 'motor2',
  d: 'motor3'
}

function devices (port) {
  this.path = basePath + motors[port.toLowerCase()]
  return Motor(this.path)
}

exports.module = devices
