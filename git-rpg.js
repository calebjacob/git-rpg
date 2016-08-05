#!/usr/bin/env node

var exec = require('child_process').exec;
var program = require('commander');
var noActionOrArgumentsPassed = process.argv.length === 2;



program
  .version('0.1.0');



program
  .command('adventure <message>')
  .description('Begin a quick and exciting adventure! This stages all changes and makes a commit with the <message> you pass in.')
  .action(function(message) {
    exec('git add -A');
    exec(`git commit -m "${message}"`);

    exec('git log --max-count=1 --pretty=tformat: --numstat', function (error, stdout, stderr) {
      var commitStatistics = returnCommitTotals(stdout);
      console.log(commitStatistics);
    });
  });



program
  .command('inventory')
  .description('View and manage your weapons, items, and gear.')
  .action(function() {
    console.log('You have nothing in your inventory yet.');
  });



program
  .command('character')
  .description('View details about your experience and satistics.')
  .action(function() {
    console.log('You have no experience yet.');
  });



program
   .command('*')
   .action(function() {
     program.help();
   });



program.parse(process.argv);



if (noActionOrArgumentsPassed) {
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
