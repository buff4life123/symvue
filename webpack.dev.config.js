const path = require('path');
const clonedeep = require('lodash.clonedeep')
const common = require('./webpack.common');

common.devtool = 'source-map';
common.optimization.minimize = false;

let element_common = clonedeep(common);

module.exports = [
    element_common,
];