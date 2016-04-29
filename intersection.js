const _ = require('lodash');
const dotty = require('dotty');

function toArrayWithArrays(arr) {
  if (_.isArray(arr)) return arr;
  return _.map(arr, (value, key) => {
    if (value.name && value.app) return value;
    if (value.name && !value.app) {
      value.app = value.name;
      return value;
    }
    if (value.app && !value.name) {
      value.name = value.app;
      return value;
    }
    value.name = key;
    value.app = key;
    return value;
  });
}

module.exports = (from, to, by) => {
  return (ctx) => {
    const clone = _.cloneDeep(ctx);
    const fromCtx = toArrayWithArrays(dotty.get(clone, from));
    const toCtx = toArrayWithArrays(dotty.get(clone, to));
    const inter = _.intersectionBy(fromCtx, toCtx, by) || [];
    return inter;
  };
};

