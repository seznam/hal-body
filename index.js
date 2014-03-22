var parse = require('co-body');
var hal = require('halson');

module.exports = function(req, opts){
    return function*() {
        var json = yield parse.json(req, opts);
        return hal(json);
    };
};
