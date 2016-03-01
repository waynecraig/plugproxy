var data = require('../modules/data');

module.exports = function(req, res) {

    var params = req.body;
    var id = params.id;
    var name = params.name;
    var rule = params.rule;

    var obj = { id: id };
    if (name) {
        obj.name = name;
    }
    if (rule) {
        obj.rule = rule;
    }

    var success = data.updateRule(obj);

    if (success) {
        res.json({code:0});
    } else {
        res.json({code:-1});
    }

}
