const _ = require('lodash');
const async = require('async');
const executeScript = require('./executeScript');

module.exports = (app, cb) => {
  if (!app.scripts || !app.scripts.package) return cb(null);

  const path = app.path || '.';
  const scripts = app.scripts.package.map(
    (p) => `cd ${path}; ${_.template(p)({appDir: path, rootDir: process.cwd() }) }`
  );
  async.map(scripts, executeScript, cb);
};
