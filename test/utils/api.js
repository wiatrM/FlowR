'use strict';

/**
 * Utils functions/helpers for API tests.
 * @module utils/api
 */


function ApiRequest(Server, Request) {

    this.server = Server;
    this.request = Request;

    this.serverIsRunning = false;
}

ApiRequest.prototype.json  = function json(verb, url) {
    return this.request[verb](url)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .agent('Content-Type', /json/);
};

ApiRequest.prototype.getConfig = function getConfig(key) {
    return this.server.get(key);
};

module.exports = ApiRequest;
