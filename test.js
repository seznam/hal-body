var request = require('supertest');
var parse = require('./index');
var assert = require('assert');
var koa = require('koa');
var hal = require('halson');

describe('hal-body', function() {
    it('should parse hal+json body', function(done) {
        var app = koa();
        app.use(function*() {
            var res = yield parse(this);
            assert.equal(res.className, hal.Resource.prototype.className);
            assert.equal(res.title, 'Lorem Ipsum');
            assert.equal(res.getLink('self').href, '/lorem');
            this.body = "OK";
        });

        request(app.listen())
            .post('/')
            .set('Content-Type', 'application/hal+json')
            .send('{"title":"Lorem Ipsum","_links":{"self":{"href":"/lorem"}}}')
            .expect(200)
            .expect('OK')
            .end(done);
    });

    describe('with missing content-type', function() {
        it('should fail with 415', function(done) {
            var app = koa();

            app.use(function *() {
                yield parse(this);
            });

            request(app.listen())
                .post('/')
                .send('{}')
                .expect(415, 'Unsupported Media Type', done);
        });
    });

    describe('with unsupported content-type', function() {
        it('should fail with 415', function(done) {
            var app = koa();

            app.use(function *() {
                yield parse(this);
            });

            request(app.listen())
                .post('/')
                .set('Content-Type', 'application/json')
                .send('{}')
                .expect(415, 'Unsupported Media Type', done);
        });
    });
});
