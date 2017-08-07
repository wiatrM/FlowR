'use strict';

var expect = require('chai').expect,
    app = require('../../server/server'),
    request = require('supertest')(app),
    utils = require('../utils').api(request);

describe('User', function () {

    describe('Main', function () {

        it('should require authorisation', function (done) {
            utils.json('get', '/api/users')
                .expect(401)
                .end(function (err, res) {
                    expect(res.body.error.name).to.be.equal("Error");
                    expect(res.body.error.message).to.be.equal("Authorization Required");
                    expect(res.body.error.statusCode).to.be.equal(401);
                    done();
                });
        });

    });

    describe('Authorization', function () {

        it('should reject login with bad credentials', function (done) {
            utils.login(true, function (token) {
                expect(token.error.name).to.be.equal("Error");
                expect(token.error.message).to.be.equal("login failed");
                expect(token.error.statusCode).to.be.equal(401);
                done();
            })
        });

    })

});
