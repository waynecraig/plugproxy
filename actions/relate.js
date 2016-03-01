var data = require('../modules/data');

module.exports = function(req, res) {

    var params = req.body;
    var ruleid = params.ruleid; 
    var targetid = params.targetid;

    var success = data.relate(ruleid, targetid);

    if (success) {
        res.json({code:0});
    } else {
        res.json({code:-1});
    }

}
