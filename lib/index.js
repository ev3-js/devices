/**
 * Imports
 */

var fs = require('fs')

/**
 * Vars
 */

var motorPath = '/sys/class/tacho-motor/'
var paths = fs.readdirSync(motorPath).reduce(function (obj, file) {
  var portName = fs.readFileSync(motorPath + file + '/port_name', 'utf-8').trim()
  obj[portName] = file.trim()
  return obj
}, {})

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
  const portName = 'out' + port.toUpperCase()
  return portToPath(portName)
}

/**
 * Convert port to path
 * @return {Object}
 */

function portToPath (port) {
  return motorPath + paths[port]
}
