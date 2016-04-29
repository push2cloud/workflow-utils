const _ = require('lodash');
const dotty = require('dotty');

module.exports = (from, fn) => {
  return (ctx) => {
    const clone = _.cloneDeep(ctx);
    if (_.isFunction(from)) {
      return _.flowRight(fn, from)(clone);
    }
    const fromCtx = dotty.get(clone, from);
    return fn(fromCtx);
  };
};
