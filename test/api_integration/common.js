'use strict';

var expect = require('chai').expect,
    app = require('../../server/server'),
    request = require('supertest')(app),
    utils = require('../utils').api(request);

describe('Common', function () {

    describe('Route handling', function () {

        it('should return 404 on wrong route', function (done) {
            utils.json('get', '/api/wrongroute')
                .expect(404)
                .end(function (err, res) {
                    expect(res.body.error.name).to.be.equal("Error");
                    expect(res.body.error.message).to.be.equal("There is no method to handle GET /wrongroute");
                    expect(res.body.error.statusCode).to.be.equal(404);
                    done();
                });
        });

    });
});
