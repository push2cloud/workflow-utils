const _ = require('lodash');
const dotty = require('dotty');

module.exports = (
  stepFn
, fromCtx
, toCtx
) => {
  return (ctx, cb) => {
    cb = cb || _.noop;
    var fromFn = fromCtx || _.identity;
    var toFn = toCtx || ((c) => c);

    if (_.isString(fromCtx)) {
      fromFn = (c) => dotty.get(c, fromCtx);
    }

    if (_.isString(toCtx)) {
      toFn = (c, r) => { dotty.put(c, toCtx, r); return c; };
    }

    return new Promise((resolve, reject) => {
      try {
        stepFn(_.cloneDeep(fromFn(ctx)), (err, res) => {
          cb(err, toFn(ctx, res));
          if (err) return reject(err);
          resolve(toFn(ctx, res));
        });
      } catch (e) {
        cb(e);
        reject(e);
      }
    });
  };
};
