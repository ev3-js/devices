/**
 * Imports
 */

var fs = require('fs')
var defaults = require('@f/defaults')
var path = require('path')

/**
 * Default paths
 */

var defaultPaths = {
  motor: '/sys/class/tacho-motor/',
  sensor: '/sys/class/lego-sensor/'
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

function devices (port, paths) {
  paths = paths || {}
  var actualPath = defaults(paths, defaultPaths)
  var device = isNaN(port) ? motor() : sensor()

  if (device.prefix === motor().prefix) {
    port = port.toUpperCase()
  }
  if (device.available[device.prefix + port]) {
    return path.join(device.path, device.available[device.prefix + port])
  } else {
    throw new Error('no device in port ' + port)
  }

  function motor () {
    return {
      path: actualPath.motor,
      available: getPaths(actualPath.motor),
      prefix: 'out'
    }
  }

  function sensor () {
    return {
      path: actualPath.sensor,
      available: getPaths(actualPath.sensor),
      prefix: 'in'
    }
  }
}

function getPaths (dirPath) {
  var re = /(in.)|(out.)/gi
  return fs.readdirSync(dirPath).reduce(function (obj, file) {
    var portName = fs.readFileSync(path.join(dirPath, file, 'address'), 'utf-8').match(re)[0]
    obj[portName] = file.trim()
    return obj
  }, {})
}
