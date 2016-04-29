const _ = require('lodash');
const async = require('async');
const dotty = require('dotty');
const step = require('./step');

module.exports = (limit) => (mapStep, path, target) => {
  const curryiedMapStep = _.curry(mapStep, 2);

  return step((ctx, cb) => {
    return async.mapLimit(
      _.isFunction(path) ? path(ctx) : dotty.get(ctx, path)
      , limit
      , curryiedMapStep
      , cb
    );
  }, _.identity, target || ((c) => c));
};
