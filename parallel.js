const _ = require('lodash');
const async = require('async');
const step = require('./step');

module.exports = (steps) => {
  const stepsWithCtx = _.map(steps, (s) => _.curry(s, 2));

  return step((ctx, cb) => {
    return async.parallel(
      _.map(stepsWithCtx, (step) => step(ctx)),
      (err, results) => {
        cb(err, _.assign.apply(null, {}, ctx));
      }
    );
  });
};
