var Device = require('zetta-device');
var util = require('util');

function degToRad(x) {
  return x * ( Math.PI / 180 );
}

var WaveGenerator = module.exports = function() {
  Device.call(this);
  this.wave = 0;
};
util.inherits(WaveGenerator, Device);

WaveGenerator.prototype.init = function(config) {
  config
    .name('SineWave')
    .type('generator')
    .monitor('wave');

  var self = this;
  var counter = 0;
  setInterval(function() {
    self.wave = Math.sin(degToRad(counter));
    counter += 15;
  }, 100);
};
