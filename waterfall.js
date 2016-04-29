const _ = require('lodash');
const async = require('async');

const step = require('./step');


module.exports = (steps) => {
  const first = _.curry(steps[0]);
  const following = steps.slice(1);

  return step((ctx, cb) => {
    return async.waterfall([first(ctx)].concat(following), cb);
  }, null, (ctx, res) => res);
};
