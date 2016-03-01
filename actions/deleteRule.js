var data = require('../modules/data');

module.exports = function(req, res) {

    var params = req.body;
    var id = params.id;

    var success = data.deleteRule(id);

    if (success) {
        res.json({code:0});
    } else {
        res.json({code:-1});
    }

}
