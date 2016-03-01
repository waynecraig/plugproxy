var config = require('./config.json');
var proxy = require('./modules/proxy');
var ui = require('./modules/ui');

// Object.assign polyfill
Object.assign = require('object-assign');

proxy.listen(config.proxyPort, function() {
    console.log('proxy server is listening port', config.proxyPort);
});
ui.listen(config.uiPort, function() {
    console.log('ui server is listening port', config.uiPort);
});
