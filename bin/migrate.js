'use strict';

/**
 * This script create database schemas and insert them into postgres.
 */

var path = require('path');

// import our app for one time usage
var server = require(path.resolve(__dirname, '../server/server.js'));

// reference to our datasource that we named 'postgres'
var postgres = server.dataSources.postgres;

// the basic loopback model tables
var base = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role'];

// our custom models
var custom = ['Account'];

// merge them
var lbTables = [].concat(base, custom);

// run through and create all of them
postgres.automigrate(lbTables, function (err) {
    if (err) throw err;
    console.log('Tables [' + lbTables + '] reset in ' + postgres.adapter.name);
    postgres.disconnect();
    process.exit(0)
});
