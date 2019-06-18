const sa = require('superagent');
const nock = require('nock');
const hostname = 'http://example.com';

describe('NOCK', function() {
    it('it should match request header', function(done){
        nock(hostname, {
            reqheaders: {
                "x-login-account": "SECOND"
            }
        }).get('/call').reply(200, function(uri, request, cb) {
            cb(null, {
                result: "second"
            });
        });
        nock(hostname, {
            reqheaders: {
                "x-login-account": "FIRST"
            }
        }).get('/call').reply(200, function(uri, request, cb) {
            cb(null, {
                result: "first"
            });
        });

        sa.get(hostname + '/call')
        .set("x-login-account", "FIRST")
        .set('Content-Type', 'application/json')
        .end((err, res) => {
            console.log(res.body);
            done();
        })
    })
});