#!/usr/bin/env node

process.env.GENERATE_CLI = true;
var generator = require('../lib/generators');
var verb = require('..');

/**
 * Create verb "runner"
 */

var run = verb.runner('verbfile.js', generator);
var app = verb();

/**
 * Run generators and tasks
 */

run(app, function(err, argv, app) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  app.emit('done');
});
