const step = require('./step');

module.exports = (key, obj) => step((ctx, cb) => cb(null, obj), null, key);
