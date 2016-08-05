#!/usr/bin/env node

var exec = require('child_process').exec;
var program = require('commander');

program
  .version('0.1.0')
  .arguments('<message>')
  .action(function(message) {
    // var gitCommitProcess = exec(`git commit -m "${message}"`, function (error, stdout, stderr) {
    //   console.log(stdout);
    //   console.log(stderr);
    // });

    var gitProcess = exec('git log --max-count=1 --pretty=tformat: --numstat', function (error, stdout, stderr) {
      console.log(stdout);
      // console.log(stderr);
    });

    // gitCommitProcess.stdout.on('data', function(data) {
    //   console.log(data);
    // });
  })
  .parse(process.argv);
