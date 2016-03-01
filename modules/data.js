var fs = require('fs');
var path = require('path');
var uuid = require('uuid');
var touch = require('touch');

var DATAPATH = path.join(__dirname, '../data/data.json');

touch.sync(DATAPATH);

var data = fs.readFileSync(DATAPATH, 'utf-8');

data = JSON.parse(data || '{}');
data.rules = data.rules || [];
data.targets = data.targets || [];

function getData() {
    return data;
}

function _saveData() {
    fs.writeFileSync(DATAPATH, JSON.stringify(data));
}

function getRule(id) {
    return data.rules.filter(function(item){
        return item.id === id;
    })[0];
}

function getTarget(id) {
    return data.targets.filter(function(item){
        return item.id === id;
    })[0];
}

function getRulesByTarget(targetid) {
    return data.rules.filter(function(item){
        return item.target === targetid;
    });
}

function getTargetByRule(rule) {
    return data.targets.filter(function(item){
        return item.id === rule.target;
    })[0];
}

function addRule(rule) {
    rule.id = uuid.v4();
    data.rules.push(rule);
    _saveData();
    return rule.id;
}

function addTarget(target) {
    target.id = uuid.v4();
    data.targets.push(target);
    _saveData();
    return target.id;
}

function updateRule(rule) {
    var ori = getRule(rule.id);
    if (ori) {
        Object.assign(ori, rule);
        _saveData();
        return true;
    }
}

function updateTarget(target) {
    var ori = getTarget(target.id);
    if (ori) {
        Object.assign(ori, target);
        _saveData();
        return true;
    }
}

function deleteRule(id) {
    var rule = getRule(id);
    if (rule) {
        var index = data.rules.indexOf(rule);
        data.rules.splice(index, 1);
        _saveData();
        return true;
    }
}

function deleteTarget(id) {
    var relateRules = getRulesByTarget(id);
    if (relateRules.length) {
        return false;
    }
    var target = getTarget(id);
    if (target) {
        var index = data.targets.indexOf(target);
        data.targets.splice(index, 1);
        _saveData();
        return true;
    }
}

function relate(ruleid, targetid) {
    var rule = getRule(ruleid);
    var target = getTarget(targetid);
    if (rule && target) {
        rule.target = target.id;
        _saveData();
        return true;
    }
}

exports.getData = getData;
exports.addRule = addRule;
exports.addTarget = addTarget;
exports.updateRule = updateRule;
exports.updateTarget = updateTarget;
exports.deleteRule = deleteRule;
exports.deleteTarget = deleteTarget;
exports.relate = relate;
exports.getTargetByRule = getTargetByRule;
