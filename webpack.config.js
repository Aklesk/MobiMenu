const webpack = require('webpack');
const fs      = require('fs');
const path    = require('path'),
    join    = path.join,
    resolve = path.resolve;

const getConfig = require('hjs-webpack');

// Some directory variables that will be used later.
const root    = resolve(__dirname);
const src     = join(root, 'src');
const modules = join(root, 'node_modules');
const dest    = join(root, 'dist');

// Tell Webpack to figure out whether we're in development based on environment variables
const NODE_ENV = process.env.NODE_ENV;
const isDev = NODE_ENV === 'development';

// This should fix the "Promise is not defined" issue.
require('es6-promise').polyfill();

// hjs uses lodash's Default function for loading the config, so any settings we pass it to run will be saved
var config = getConfig({
    isDev: isDev,
    in: join(__dirname, 'src/app.jsx'),
    out: join(__dirname, 'dist'),
    clearBeforeBuild: true,
    port: 3001
})

module.exports = config;