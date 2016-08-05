#!/usr/bin/env node

var exec = require('child_process').exec;
var program = require('commander');
var commitMessage = null;



program
  .version('0.1.0')
  .arguments('<message>')
  .action(function(message) {
    commitMessage = message;
  })
  .parse(process.argv);



if (commitMessage) {
  exec(`git commit -m "${commitMessage}"`, function (error, stdout, stderr) {
    // console.log(stdout);
    // console.log(stderr);
  });

  exec('git log --max-count=1 --pretty=tformat: --numstat', function (error, stdout, stderr) {
    var commitStatistics = returnCommitTotals(stdout);
    console.log(commitStatistics);
  });
}

else {
  program.help();
}



function returnCommitTotals(log) {
  var files = log.split('\n');
  var totals = {
    filesChanged: 0,
    linesDeleted: 0,
    linesInserted: 0
  };

  files.forEach(function(file) {
    file = file.trim();

    if (file) {
      var values = file.split('\t');
      var linesInserted = parseInt(values[0]);
      var linesDeleted = parseInt(values[1]);

      totals.linesInserted = totals.linesInserted + linesInserted;
      totals.linesDeleted = totals.linesDeleted + linesDeleted;
      totals.filesChanged++;
    }
  });

  return totals;
}
