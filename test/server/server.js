'use strict';

var expect = require('chai').expect,
    app = require('../../server/server');


describe('Main server functions', function () {

    describe('Server startup/shutdown', function () {

        it('should start a server', function (done) {
            app.start(function () {
                expect(app.close).to.be.a('function');
                expect(app.get).to.be.a('function');
                expect(app.loaded).to.be.equal(true);
                done();
            });
        });

        after(function () {
            app.close(function () {
            });
        });

    });
});
