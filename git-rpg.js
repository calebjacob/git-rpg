#!/usr/bin/env node

var program = require('commander');

program
  .version('0.1.0')
  .option('-f, --foobar', 'Do something')
  .parse(process.argv);

console.log('You did a thing!');

if (program.foobar) {
  console.log('Foobar for you!');
}

else {
  console.log('No foobar for you...');
}
