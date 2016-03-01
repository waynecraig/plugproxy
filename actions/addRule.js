var data = require('../modules/data');

module.exports = function(req, res) {

    var params = req.body;
    var name = params.name;
    var rule = params.rule;
    var target = params.target;

    var success = data.addRule({
        name: name,
        rule: rule,
        target: target
    });

    if (success) {
        res.json({code:0});
    } else {
        res.json({code:-1});
    }

}
