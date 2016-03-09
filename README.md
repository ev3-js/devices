# devices

[![NPM version][npm-image]][npm-url]
[![Code style][standard-image]][standard-url]

Collection of EV3 devices.

## Installation

    $ npm install ev3-js-devices

## Usage

```js
var devices = require('ev3-js-devices')
var motorA = devices('a')
motorA.runForever()

setTimeout(function () {
  motorA.stop()
}, 10000)
```

## API

### devices(port)

 - `port` - port to get device for

**Returns:** The device at the given port. The device could be a [motor](https://github.com/ev3-js/motor) or a sensor.


## License

MIT

[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat
[standard-url]: https://github.com/feross/standard
[npm-image]: https://img.shields.io/npm/v/ev3-js-devices.svg?style=flat-square
[npm-url]: https://npmjs.org/package/ev3-js-devices
