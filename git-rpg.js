#!/usr/bin/env node

var exec = require('child_process').exec;
var program = require('commander');
var gitChildProcess;

program
  .version('0.1.0')
  .option('-m, --message', 'commit message')
  .parse(process.argv);

var gitChildProcess = exec(`git commit -m "${program.message}"`, function (error, stdout, stderr) {
  console.log('======== stdout: ' + stdout);
  console.log('======== stderr: ' + stderr);

  if (error) {
    console.log('exec error: ' + error);
  }
});
