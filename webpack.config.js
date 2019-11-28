const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const clonedeep = require('lodash.clonedeep')
const common = require('./webpack.common');

common.mode = 'production';
common.optimization.minimizer = [
    new TerserPlugin({
        terserOptions: {
            output: {
                comments: false,
            },
        },
    })
];

let element_common = clonedeep(common);

module.exports = [
    element_common,
];

