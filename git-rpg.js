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
      var lines = stdout.split('\n');
      var totalLinesInserted = 0;
      var totalLinesDeleted = 0;
      var totalFilesChanged = 0;

      lines.forEach(function(line) {
        line = line.trim();

        if (line) {
          var statistics = line.split('\t');
          var linesInserted = parseInt(statistics[0]);
          var linesDeleted = parseInt(statistics[1]);

          totalLinesInserted = totalLinesInserted + linesInserted;
          totalLinesDeleted = totalLinesDeleted + linesDeleted;
          totalFilesChanged++;
        }
      });

      console.log(totalLinesInserted, totalLinesDeleted, totalFilesChanged);
    });

    // gitCommitProcess.stdout.on('data', function(data) {
    //   console.log(data);
    // });
  })
  .parse(process.argv);
