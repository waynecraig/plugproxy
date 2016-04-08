var config = require('./config.json');
var proxy = require('./modules/proxy');
var ui = require('./modules/ui');
var objectAssign = require('object-assign');
if (!Object.assign) {
    Object.assign = objectAssign;
}

proxy.listen(config.proxyPort, function() {
    console.log('proxy server is listening port', config.proxyPort);
});
ui.listen(config.uiPort, function() {
    console.log('ui server is listening port', config.uiPort);
});
