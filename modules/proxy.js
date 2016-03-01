var http = require('http');
var httpProxy = require('http-proxy');
var express = require('express');
var data = require('./data');

var app = express();

function applyRules(url) {
    for (var i = 0; i < data.getData().rules.length; i++) {
        var item = data.getData().rules[i];
        if (new RegExp(item.rule).test(url)) {
            return data.getTargetByRule(item).url;
        }
    };
}

var proxy = httpProxy.createProxyServer({});

app.use(function(req, res) {

    var target = applyRules(req.url);
    if (target) {
        proxy.web(req, res, { target: target });
    } else {
        res.json({code:-1, msg:"no match rules"});
    }

});

var server = http.createServer(app);

module.exports = server;

