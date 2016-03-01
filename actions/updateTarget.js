var data = require('../modules/data');

module.exports = function(req, res) {

    var params = req.body;
    var id = params.id;
    var name = params.name;
    var url = params.url;

    var obj = { id: id };

    if (name) {
        obj.name = name;
    }
    if (url) {
        obj.url = url;
    }

    var success = data.updateTarget(obj);

    if (success) {
        res.json({code:0});
    } else {
        res.json({code:-1});
    }

}
