/**
 * Imports
 */

import fs from 'fs'

/**
 * Expose devices
 */

export default devices

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
  const motorPath = '/sys/class/tacho-motor/'
  const paths = fs.readdirSync(motorPath).reduce(function (obj, file) {
    var portName = fs.readFileSync(motorPath + file + '/port_name', 'utf-8').trim()
    obj[portName] = file.trim()
    return obj
  }, {})
  return paths[port]
}
