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
                    expect(res.body.error).to.be.defined;
                    done();
                });
        });

    });

    describe('Authorization', function () {

        it('should reject login with bad credentials', function (done) {
            utils.login(true, function(token) {
                expect(token.error).to.be.defined;
                expect(token.error.statusCode).to.be.equal(401);
                done();
            })
        });

    })

});
