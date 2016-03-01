var data = require('../modules/data');

module.exports = function(req, res) {

    var params = req.body;
    var name = params.name;
    var url = params.url;

    var success = data.addTarget({
        name: name,
        url: url
    });

    if (success) {
        res.json({code:0});
    } else {
        res.json({code:-1});
    }

}
