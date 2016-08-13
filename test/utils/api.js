'use strict';

var server = require('../../server/server');
var _ = require('underscore');
/**
 * Utils functions/helpers for API tests.
 * @module utils
 */


module.exports = function (api) {
    var testUsername = 'test';
    var testPassword = 'asd';

    var obj = {};

    /**
     * JSON request to our API
     * @param verb POST, GET etc.
     * @param url where request must be send
     * @returns {*|Test}
     */
    obj.json = function (verb, url) {
        return api[verb](url)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/);
    };

    function onResponse(err, res) {
        auth.token = res.body.token;
        return done();
    }

    var token = {};
    /**
     * Login test user and retrives token
     * @param wrong should login be wrong
     * @param cb callback action on login request complete
     * @returns cb
     */
    obj.login = function (wrong, cb) {
        var credentials = {};
        if (wrong) {
            credentials.username = 'wronguser';
            credentials.password = 'wrongpass';
        } else {
            credentials.username = testUsername;
            credentials.password = testPassword;
        }
        if (_.isEmpty(token)) {
            api
                .post('/api/users/login')
                .send(credentials)
                .end(function (err, res) {
                    if (res.status == 200) {
                        // login is OK
                        token.token = res.body.id;
                        token.userId = res.body.userId;
                        return cb(token);
                    }
                    else {
                        return cb(res.body);
                    }
                });
        }
        else {
            return cb(token);
        }
    };

    return obj;
};
