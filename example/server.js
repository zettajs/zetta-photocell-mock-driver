var zetta = require('zetta');
var SineWave = require('../index');

zetta()
  .use(SineWave)
  .listen(1337);
