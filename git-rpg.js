#!/usr/bin/env node

var exec = require('child_process').exec;
var program = require('commander');

program
  .version('0.1.0')
  .arguments('<message>')
  .action(function(message) {
    exec(`git commit -m "${message}"`, function (error, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
    });
  });
  .parse(process.argv);
