'use strict';

var expect = require('chai').expect,
    app = require('../../server/server'),
    request = require('supertest')(app);

// utils not yet ready.. @TODO
//var utils = require('../utils').api;
//var api = new utils(apps, req);

function json(verb, url) {
    return request[verb](url)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/);
}

describe('User', function () {
    describe('GET', function () {

        it('should return a list of all customers', function (done) {
            json('get', '/api/users')
                .expect(401, function (err, res) {
                    // we are not logged in so we except error
                    expect(res.body.error).to.exist;
                    done()
                });
        });

    });

});
