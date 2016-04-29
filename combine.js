const _ = require('lodash');
const dotty = require('dotty');

module.exports = (a, b, by) => {
  return (ctx) => {
    const clone = _.cloneDeep(ctx);
    const ctxA = _.isString(a) ? dotty.get(clone, a) : a(clone);
    const ctxB = _.isString(b) ? dotty.get(clone, b) : b(clone);

    return _.map(ctxA, (x) => [x, _.find(ctxB, by(x))]);
  };
};
