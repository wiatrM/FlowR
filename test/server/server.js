'use strict';

var expect = require('chai').expect,
    app = require('../../server/server');


describe('Main server functions', function () {

    describe('Server startup/shutdown', function () {

        it('should start a server', function (done) {
            app.start(function() {
                expect(app.get('port')).to.be.equal(3000);
                done();
            });
        });

        after(function() {
            app.close(function(){});
        });

    });
});
