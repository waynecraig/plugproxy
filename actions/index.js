var router = require('express').Router({caseSensitive: true});

router.use(function(req, res){

    var action = req.url.substr(1).replace(/\?.*/, '');

    if (action && !~action.indexOf('/')) {

        try {
            action = require('./' + action);
        } catch (e) { }

        if (typeof action === 'function') {
            return action(req, res);
        }

    }

    res.json('{code:-1, msg:"invalid action"}');

});

module.exports = router;
