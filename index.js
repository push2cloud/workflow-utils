const _ = require('lodash');
const step = require('./step');
const map = require('./map');
const mapSeries = require('./mapSeries');
const mapLimit = require('./mapLimit');

const _res = (drop, res) => res;

module.exports = {
  step: step,
  waterfall: require('./waterfall'),
  parallel: require('./parallel'),
  map: (fn, path, target) => map(step(fn, _.identity, _res), path, target),
  mapLimit: (limit) => (fn, path, target) => mapLimit(limit)(step(fn, _.identity, _res), path, target),
  mapSeries: (fn, path, target) => mapSeries(step(fn, _.identity, _res), path, target),
  some: require('./some'),
  packageApp: require('./packageApp'),
  set: require('./set'),
  diff: require('./diff'),
  intersection: require('./intersection'),
  combine: require('./combine'),
  from: require('./from')
};
