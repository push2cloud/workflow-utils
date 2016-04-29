const debug = require('debug')('executeScripts');
const _ = require('lodash');
const exec = require('child_process').exec;
const debugCb = require('./debugCb');

const executeScript = _.curry((command, cb) => {
  debug('Executing command', command);
  exec(command, debugCb(debug, cb));
});

module.exports = executeScript;
