const _ = require('lodash');
const step = require('./step');

module.exports = (steps) => {
  return step((ctx, cb) => {
    return Promise.race(
      _.map(steps, (step) => step(ctx))
    ).then(
      (result) => cb(null, result),
      cb
    );
  });
};
