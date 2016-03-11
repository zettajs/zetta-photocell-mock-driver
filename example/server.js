var zetta = require('zetta');
var Photocell = require('../index');
var style = require('./apps/style');

zetta()
  .use(Photocell)
  .use(style)
  .listen(1337);
