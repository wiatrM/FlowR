var loopback = require('loopback');
var boot = require('loopback-boot');
var http = require('http');

var app = module.exports = loopback();

boot(app, __dirname, function (err) {
    if (err) throw err;

    var isMain = require.main === module;
    app.start = function (done) {
        var port = app.get('port');
        var host = app.get('host');
        var httpServer = http.createServer(app).listen(port, host, function () {
            if (isMain)
                printServerListeningMsg('http', host, port);
            app.emit('started');

            if (app.get('loopback-component-explorer')) {
                var baseUrl = host.replace(/\/$/, '');
                var explorerPath = app.get('loopback-component-explorer').mountPath;
                console.log('Browse your REST API at http://%s%s', baseUrl, explorerPath);
            }

            app.close = function (cb) {
                app.removeAllListeners('started');
                app.removeAllListeners('loaded');
                httpServer.close(function () {
                    console.log('Server closed');
                    cb();
                });
            };
            done();
        });
    };

    if (isMain)
        app.start(function () {
            console.log('Server started!')
        });

    app.loaded = true;
    app.emit('loaded');
});

function printServerListeningMsg(protocol, host, port) {
    var url = protocol + '://' + host + ':' + port;
    console.log('Web server listening at', url);
}
