var data = require('../modules/data');

module.exports = function(req, res) {

    res.json({code: 0, data:data.getData()});

}
