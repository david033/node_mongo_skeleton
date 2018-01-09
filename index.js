var readLineSync = require('readline-sync');

var userName = readLineSync.question('May I have your name? ');
console.log('Hi ' + userName + '!');
