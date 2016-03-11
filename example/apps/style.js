var util = require('util');
var extend = require('node.extend');

var IMAGE_URL_ROOT = 'http://www.zettaapi.org/icons/';
var IMAGE_EXTENSION = '.png';

var stateImageForDevice = function(device) {
  return IMAGE_URL_ROOT + device.type + '-' + device.state + IMAGE_EXTENSION;
}

module.exports = function(server) {
  var deviceQuery = server.where({ type: 'photocell' });
  server.observe([deviceQuery], function(device) {

    var states = Object.keys(device._allowed);
    for (i = 0; i < states.length; i++) {
      device._allowed[states[i]].push('update-style');
    }
    device._transitions['update-style'] = {
      handler: function(updatedStyle, cb) {
        this.style = extend(this.style, updatedStyle);
        cb();
      }
    };

    device.call('update-style', {stateImage: stateImageForDevice(device)});
    var stateStream = device.createReadStream('state');
    stateStream.on('data', function(newState) {
      device.call('update-style', {stateImage: stateImageForDevice(device)});
    });
  });
}
