/**
 * Imports
 */

var fs = require('fs')

/**
 * Vars
 */

function motor () {
  return {
    path: '/sys/class/tacho-motor/',
    available: getPaths('/sys/class/tacho-motor/'),
    prefix: 'out'
  }
}

function sensor () {
  return {
    path: '/sys/class/lego-sensor/',
    available: getPaths('/sys/class/lego-sensor/'),
    prefix: 'in'
  }
}

/**
 * Expose devices
 */

module.exports = devices

/**
 * Get a device
 * @param  {String} port
 * @return {String} path
 */

function devices (port) {
  var device = isNaN(port) ? motor() : sensor()
  if (device.prefix === motor().prefix) {
    port = port.toUpperCase()
  }
  if (device.available[device.prefix + port]) {
    return device.path + device.available[device.prefix + port]
  } else {
    throw new Error('No device')
  }
}

function getPaths (path) {
  return fs.readdirSync(path).reduce(function (obj, file) {
    var portName = fs.readFileSync(path + file + '/address', 'utf-8').trim()
    obj[portName] = file.trim()
    return obj
  }, {})
}
