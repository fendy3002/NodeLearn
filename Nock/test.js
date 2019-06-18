const assert = require('assert');
const sa = require('superagent');
const nock = require('nock');
const hostname = 'http://example.com';

describe('NOCK', function() {
    it('it should match request header for get', function(done){
        nock(hostname)
        .matchHeader("x-login-account", "SECOND")
        .persist()
        .get('/call').reply(200, function(uri, request, cb) {
            cb(null, {
                result: "second"
            });
        });
        nock(hostname)
        .matchHeader("x-login-account", "FIRST")
        .persist()
        .get('/call').reply(200, function(uri, request, cb) {
            cb(null, {
                result: "first"
            });
        });

        sa.get(hostname + '/call')
        .set("x-login-account", "SECOND")
        .set('Content-Type', 'application/json')
        .end((err, res) => {
            assert.equal(res.body.result, "second");
            sa.get(hostname + '/call')
            .set("x-login-account", "FIRST")
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                assert.equal(res.body.result, "first");
                done();
            });
        });
    })

    it('it should match request header for post', function(done){
        nock(hostname)
        .matchHeader("x-login-account", "SECOND")
        .persist()
        .post('/call').reply(200, function(uri, request, cb) {
            cb(null, {
                result: "second"
            });
        });
        nock(hostname)
        .matchHeader("x-login-account", "FIRST")
        .persist()
        .post('/call').reply(200, function(uri, request, cb) {
            cb(null, {
                result: "first"
            });
        });

        sa.post(hostname + '/call')
        .set("x-login-account", "SECOND")
        .set("x-login-password", "asdasdsa")
        .set('Content-Type', 'application/json')
        .send({
            "my": "my",
            "value": "value"
        })
        .end((err, res) => {
            assert.equal(res.body.result, "second");
            sa.post(hostname + '/call')
            .set("x-login-account", "FIRST")
            .set('Content-Type', 'application/json')
            .send({
                "my": "my",
                "value": "value"
            })
            .end((err, res) => {
                assert.equal(res.body.result, "first");
                done();
            });
        });
    })
});