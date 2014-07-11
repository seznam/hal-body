var raw = require('raw-body');
var hal = require('halson');

module.exports = function(req, opts) {
    req = req.req || req;

    // parse Content-type
    var type = req.headers['content-type'] || '';
    type = type.split(';')[0];

    if (type == 'application/hal+json') {
        opts = opts || {};

        // defaults
        var len = req.headers['content-length'];
        if (len) opts.length = ~~len;
        opts.encoding = opts.encoding || 'utf8';
        opts.limit = opts.limit || '1mb';

        return function(done) {
            raw(req, opts, function(err, str) {
                if (err) return done(err);
                try {
                    done(null, hal(str));
                } catch (err) {
                    err.status = 400;
                    err.body = str;
                    done(err);
                }
            });
        };
    }

    // invalid
    return function(done) {
        var err = new Error('Unsupported or missing content-type');
        err.status = 415;
        done(err);
    };
};

