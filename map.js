const _ = require('lodash');
const async = require('async');
const dotty = require('dotty');
const step = require('./step');

module.exports = (mapStep, path, target) => {
  const curryiedMapStep = _.curry(mapStep, 2);

  return step((ctx, cb) => {
    return async.map(
      _.isFunction(path) ? path(ctx) : dotty.get(ctx, path)
      , curryiedMapStep
      , cb
    );
  }, _.identity, target || ((c) => c));
};
